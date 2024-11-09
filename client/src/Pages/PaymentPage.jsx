import { useCallback, useEffect } from "react";
import useRazorpay from "react-razorpay";
import { useLocation } from "react-router-dom";
import { useLoader } from "../Components/Context/LoaderContext";

export default function App() {
  const [Razorpay, isLoaded] = useRazorpay();

  const location = useLocation();
  const totalAmount = location.state;

  const {handleLoading} = useLoader();

  const handlePayment = useCallback(() => {

    const options = {
      key: "rzp_test_84KKEt3nRwqxN7",
      amount: 10000*totalAmount,
      currency: "INR",
      name: "Acme Corp",
      description: "Test Transaction",
      image: "https://example.com/your_logo",
    //   order_id: order.id,
      handler: (res) => {
        console.log(res);
      },
      prefill: {
        name: "Piyush Garg",
        email: "youremail@example.com",
        contact: "9999999999",
      },
      notes: {
        address: "Razorpay Corporate Office",
      },
      theme: {
        color: "#3399cc",
      },
    };

    const rzpay = new Razorpay(options);
    rzpay.open();
  }, [Razorpay]);

  useEffect(() => {
    handleLoading(false);
    if (isLoaded) {
      handlePayment();
    }
  }, [isLoaded, handlePayment])

  return (
    <div className="App">
      {handlePayment}
    </div>
  );
}