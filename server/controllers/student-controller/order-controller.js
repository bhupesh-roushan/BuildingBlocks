import { client } from "../../helpers/paypal.js";
import { Order } from "../../models/Order.js";
import { Course } from "../../models/Course.js";
import { StudentCourses } from "../../models/StudentCourses.js";
import paypal from '@paypal/checkout-server-sdk'; // Ensure the PayPal SDK is imported


export const createOrder = async (req, res) => {
  try {
    const {
      userId,
      userName,
      userEmail,
      orderStatus,
      paymentMethod,
      paymentStatus,
      orderDate,
      paymentId,
      payerId,
      instructorId,
      instructorName,
      courseImage,
      courseTitle,
      courseId,
      coursePricing,
    } = req.body;

    const request = new paypal.orders.OrdersCreateRequest();
    request.requestBody({
      intent: "CAPTURE",
      purchase_units: [
        {
          amount: {
            currency_code: "USD",
            value: coursePricing.toFixed(2),
            breakdown: {
              item_total: {
                currency_code: "USD",
                value: coursePricing.toFixed(2),
              },
            },
          },
          description: courseTitle,
          items: [
            {
              name: courseTitle,
              sku: courseId,
              unit_amount: {
                currency_code: "USD",
                value: coursePricing.toFixed(2),
              },
              quantity: "1",
            },
          ],
        },
      ],
      application_context: {
        return_url: `${process.env.CLIENT_URL}/payment-return`,
        cancel_url: `${process.env.CLIENT_URL}/payment-cancel`,
      },
    });

    const response = await client.execute(request);

    const newlyCreatedCourseOrder = new Order({
      userId,
      userName,
      userEmail,
      orderStatus,
      paymentMethod,
      paymentStatus,
      orderDate,
      paymentId:response.result.id,
      payerId,
      instructorId,
      instructorName,
      courseImage,
      courseTitle,
      courseId,
      coursePricing,
    });

    await newlyCreatedCourseOrder.save();

    const approveUrl = response.result.links.find(
      (link) => link.rel === "approve"
    ).href;

    res.status(201).json({
      success: true,
      data: {
        approveUrl,
        orderId: newlyCreatedCourseOrder._id,
      },
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      success: false,
      message: "Error while creating PayPal payment!",
    });
  }
};


export const capturePaymentAndFinalizeOrder = async (req, res) => {
  try {
    const { paymentId, payerId, orderId } = req.body;

    let order = await Order.findById(orderId);

    if (!order) {
      return res.status(404).json({
        success: false,
        message: "Order cannot be found",
      });
    }

    // Capture the PayPal payment
    const request = new paypal.orders.OrdersCaptureRequest(paymentId);
    request.requestBody({});

    const response = await client.execute(request);

    if (response.result.status !== "COMPLETED") {
      return res.status(400).json({
        success: false,
        message: "Payment capture failed",
      });
    }

    // Update the order status after capturing payment
    order.paymentStatus = "paid";
    order.orderStatus = "confirmed";
    order.paymentId = paymentId;
    order.payerId = payerId;

    await order.save();

    // Update the student course model
    const studentCourses = await StudentCourses.findOne({
      userId: order.userId,
    });

    if (studentCourses) {
      studentCourses.courses.push({
        courseId: order.courseId,
        title: order.courseTitle,
        instructorId: order.instructorId,
        instructorName: order.instructorName,
        dateOfPurchase: order.orderDate,
        courseImage: order.courseImage,
      });

      await studentCourses.save();
    } else {
      const newStudentCourses = new StudentCourses({
        userId: order.userId,
        courses: [
          {
            courseId: order.courseId,
            title: order.courseTitle,
            instructorId: order.instructorId,
            instructorName: order.instructorName,
            dateOfPurchase: order.orderDate,
            courseImage: order.courseImage,
          },
        ],
      });

      await newStudentCourses.save();
    }

    // Update the course schema with students
    await Course.findByIdAndUpdate(order.courseId, {
      $addToSet: {
        students: {
          studentId: order.userId,
          studentName: order.userName,
          studentEmail: order.userEmail,
          paidAmount: order.coursePricing,
        },
      },
    });

    res.status(200).json({
      success: true,
      message: "Order confirmed",
      data: order,
    });
  } catch (err) {
    console.error("Error confirming payment:", err);
    res.status(500).json({
      success: false,
      message: "Some error occurred while confirming the payment!",
    });
  }
};