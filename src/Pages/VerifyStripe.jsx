import { useContext, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { ShopContext } from "../Context/ShopContext";

const VerifyStripe = () => {
     const { backendUrl,clearCart } = useContext(ShopContext); 
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const query = new URLSearchParams(location.search);
    const success = query.get("success");
    const orderId = query.get("orderId");

    if (orderId) {
     axios.post(`${backendUrl}/order/verify-stripe`, { orderId, success })
  .then(res => {
    if (res.data.success) {
      clearCart(); 
      toast.success("Payment successful! Order confirmed.");
      setTimeout(() => navigate("/orders", { replace: true }), 500);
    } else {
       toast.error(res.data.message || "Payment failed or cancelled.");
      navigate("/cart");
    }
  })

        .catch(() => {
          toast.error("Verification failed.");
          navigate("/cart");
        });
    }
  }, [location, backendUrl, navigate]);

  return <p className="text-center mt-10">Verifying your payment...</p>;
};

export default VerifyStripe;
