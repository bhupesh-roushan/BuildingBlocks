import paypal from "@paypal/checkout-server-sdk";
import dotenv from "dotenv";
dotenv.config();

// Configure the PayPal environment
const clientId = process.env.PAYPAL_CLIENT_ID;
const clientSecret = process.env.PAYPAL_CLIENT_SECRET;

// Initialize the PayPal SDK
const environment = new paypal.core.SandboxEnvironment(clientId, clientSecret);
const client = new paypal.core.PayPalHttpClient(environment);

const createOrder = async (req, res) => {
  try {
    const orderRequest = new paypal.orders.OrdersCreateRequest();
    orderRequest.prefer('return=representation');
    
    // Replace with actual item details
    const items = [
      {
        name: "Item Name",
        unit_amount: {
          currency_code: "USD",
          value: "10.00"
        },
        quantity: "1"
      }
    ];

    const itemTotal = items.reduce((acc, item) => acc + (parseFloat(item.unit_amount.value) * parseInt(item.quantity)), 0).toFixed(2);

    // Construct the order request with the breakdown
    orderRequest.requestBody({
      intent: "CAPTURE",
      purchase_units: [
        {
          reference_id: "default",
          amount: {
            currency_code: "USD",
            value: itemTotal, // Total amount for the order
            breakdown: {
              item_total: {
                currency_code: "USD",
                value: itemTotal // The total amount of all items
              }
            }
          },
          items: items
        }
      ]
    });

    const order = await client.execute(orderRequest);

    // Send back the order details to the client
    res.status(200).json(order.result);
  } catch (err) {
    console.error("Error creating PayPal order:", err);
    res.status(500).send("Error creating PayPal order");
  }
};

export { client, createOrder };
