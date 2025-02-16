import { Card, CardHeader, CardTitle, CardFooter } from "../../../components/ui/card";
import { captureAndFinalizePaymentService } from "../../../services/index.js";
import { CircleDashed } from "lucide-react";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import bbLogo from "../../../assets/bbLogo.svg";

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
    <div className="relative min-h-screen bg-white flex flex-col items-center justify-center">

    {/* Glassmorphic Circles with Orange Tint */}
    <div className="absolute top-10 left-10 w-56 h-56 rounded-full bg-orange-400/30 backdrop-blur-lg opacity-60"></div>
    <div className="absolute top-40 right-20 w-72 h-72 rounded-full bg-orange-400/40 backdrop-blur-lg opacity-50"></div>
    <div className="absolute bottom-10 left-10 w-64 h-64 rounded-full bg-orange-400/30 backdrop-blur-lg opacity-55"></div>
    <div className="absolute bottom-40 right-20 w-56 h-56 rounded-full bg-orange-400/20 backdrop-blur-lg opacity-60"></div>
    <div className="absolute top-80 left-60 w-72 h-72 rounded-full bg-orange-400/30 backdrop-blur-lg opacity-40"></div>

    {/* Card Container */}
    <Card className="z-10 p-10 shadow-lg bg-white/50 backdrop-blur-lg rounded-lg">
      <CardHeader>
        <CardTitle>
          <div className="flex flex-col items-center justify-center gap-5 text-3xl w-full text-gray-800">
            <span>Your Payment is Processing</span>
            <span>
              <CircleDashed className="animate-spin text-orange-600" />
            </span>
            Please wait
            <span className="animate-bounce text-orange-600">. . .</span>
          </div>
        </CardTitle>
      </CardHeader>
      <CardFooter className="flex animate-pulse items-center justify-center text-gray-600">
        <img src={bbLogo} alt="404 Error" className="w-24 h-24" />
      </CardFooter>
    </Card>

    {/* Optional text */}
    <p className="text-lg flex flex-col text-center  text-gray-800 mt-4 font-light">We are processing your payment. <sapn>Please be patient while we finalize your transaction.</sapn> </p>
  </div>
  );
}

export default PaypalPaymentReturnPage;
