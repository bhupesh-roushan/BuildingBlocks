import { Card, CardHeader, CardTitle } from "../../../components/ui/card";
import { captureAndFinalizePaymentService } from "../../../services/index.js";
import { CircleDashed } from "lucide-react";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";

function PaypalPaymentReturnPage() {
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const token = params.get("token"); // Change to 'token'
  const payerId = params.get("PayerID"); // 'PayerID' is correct

  useEffect(() => {
    if (token && payerId) { // Use 'token' here
      async function capturePayment() {
        const orderId = JSON.parse(sessionStorage.getItem("currentOrderId"));

        if (!orderId) {
          // Handle case where orderId is missing in sessionStorage
          window.location.href = "/error";
          return;
        }

        // Pass 'token' instead of 'paymentId' to the service
        const response = await captureAndFinalizePaymentService(token, payerId, orderId);
        
        console.log(response); // Log response to check if it is successful
        
        if (response?.success) {
          sessionStorage.removeItem("currentOrderId");
          window.location.href = "/student-courses";
        } else {
          // Handle failure case (e.g., payment failure)
          window.location.href = "/error"; // Redirect to error page
        }
      }

      capturePayment();
    }
  }, [payerId, token]); // Use 'token' here as well

  return (
    <Card>
      <CardHeader>
        <CardTitle>
          <div className="flex flex-row items-center justify-center gap-5 text-3xl w-full">
            <span>
              <CircleDashed className="animate-spin" />
            </span>{" "}
            Please wait
            <span className="animate-bounce">. . .</span>
          </div>
        </CardTitle>
      </CardHeader>
    </Card>
  );
}

export default PaypalPaymentReturnPage;
