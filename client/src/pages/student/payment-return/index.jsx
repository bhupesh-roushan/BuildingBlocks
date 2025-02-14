import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { captureAndFinalizePaymentService } from "@/services";
import { CircleDashed } from "lucide-react";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";

function PaypalPaymentReturnPage() {
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const paymentId = params.get("paymentId");
  const payerId = params.get("PayerID");

  useEffect(() => {
    if (paymentId && payerId) {
      async function capturePayment() {
        const orderId = JSON.parse(sessionStorage.getItem("currentOrderId"));

        const response = await captureAndFinalizePaymentService(
          paymentId,
          payerId,
          orderId
        );

        if (response?.success) {
          sessionStorage.removeItem("currentOrderId");
            window.location.href = "/student-courses";
        }
      }

      capturePayment();
    }
  }, [payerId, paymentId]);

  return (
    <Card>
      <CardHeader>
        <CardTitle>
          {" "}
          <div className="flex flex-row items-center justify-center gap-5 text-3xl w-full">
          <span >
            <CircleDashed className="animate-spin"/>
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
