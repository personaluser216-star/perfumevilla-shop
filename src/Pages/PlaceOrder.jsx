import React, { useContext, useState } from "react";
import { ShopContext } from "../Context/ShopContext";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";

const PlaceOrder = () => {
  const { cart, currency, setCart, backendUrl,clearCart } = useContext(ShopContext);
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    zipcode: "",
    payment: "cod", 
  });

  const deviceId = localStorage.getItem("deviceId");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const total = cart.reduce(
    (sum, item) => sum + (item.productId?.price || 0) * item.quantity,
    0
  );

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!cart.length) {
      toast.warning("Cart is empty.");
      return;
    }

    const orderItems = cart.map((item) => ({
      productId: item.productId?._id,
      name: item.productId?.name,
      size: item.size,
      quantity: item.quantity,
      price: item.productId?.price,
      image: item.productId?.image?.[0],
    }));

    const orderData = {
      deviceId,
      items: orderItems,
      amount: String(total),
      address: {
        name: form.name,
        email: form.email,
        phone: form.phone,
        address: form.address,
        city: form.city,
        state: form.state,
        zipcode: form.zipcode,
      },
      paymentMethod: form.payment.toLowerCase(),
      payment: false,
      date: Date.now(),
    };

    try {
      // ✅ lowercase check
      if (form.payment.toLowerCase() === "stripe") {
        const response = await axios.post(`${backendUrl}/order/stripe`, orderData);
        if (response.data.success) {
          window.location.href = response.data.session_url;
        } else {
          toast.error(response.data.message || "Stripe session failed.");
        }
      } else {
        const response = await axios.post(`${backendUrl}/order/place`, orderData);
        if (response.data.success) {
          clearCart();
          toast.success("Order placed successfully!");
          
          navigate("/orders");
        } else {
          toast.error(response.data.message || "Failed to place order.");
        }
      }
    } catch (error) {
      console.error("Order Error:", error.message);
      toast.error("Something went wrong while placing the order.");
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-6 mt-12 mb-12">
      <p className="text-xl font-bold mb-6">Place Your Order</p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        <form onSubmit={handleSubmit} className="space-y-3">
          <input type="text" name="name" placeholder="Full Name"
            value={form.name} onChange={handleChange}
            className="w-full border p-2" required />
          <input type="email" name="email" placeholder="Email Address"
            value={form.email} onChange={handleChange}
            className="w-full border p-2" required />
          <input type="text" name="phone" placeholder="Phone Number"
            value={form.phone} onChange={handleChange}
            className="w-full border p-2" required />
          <textarea name="address" placeholder="Street Address"
            value={form.address} onChange={handleChange}
            rows={3} className="w-full border p-2"></textarea>
          <div className="grid grid-cols-2 gap-4">
            <input type="text" name="city" placeholder="City"
              value={form.city} onChange={handleChange}
              className="w-full border p-2" required />
            <input type="text" name="state" placeholder="State"
              value={form.state} onChange={handleChange}
              className="w-full border p-2" required />
          </div>
          <input type="text" name="zipcode" placeholder="Zip Code"
            value={form.zipcode} onChange={handleChange}
            required className="w-full border p-2" />

          {/* Payment Options */}
          <div className="space-y-3 mt-4">
            <label className="flex items-center gap-3 border p-2 rounded cursor-pointer">
              <input type="radio" name="payment" value="cod"
                checked={form.payment === "cod"} onChange={handleChange} />
              <span>Cash on Delivery</span>
            </label>
            <label className="flex items-center gap-3 border p-2 rounded cursor-pointer">
              <input type="radio" name="payment" value="stripe"
                checked={form.payment === "stripe"} onChange={handleChange} />
              <span>Pay with Stripe</span>
            </label>
          </div>

          <button type="submit"
            className="w-full mt-6 bg-[#5b4f47] text-white py-3">
            Place Order
          </button>
        </form>

        {/* RIGHT SUMMARY */}
        <div>
          <h3 className="text-xl font-semibold mb-4">Order Summary</h3>
          <div className="space-y-3 border p-4">
            {cart.map((item, i) => (
              <div key={i} className="flex justify-between items-center border-b pb-2">
                <div>
                  <p className="font-medium">{item.productId?.name}</p>
                  <p className="text-sm text-gray-500">
                    Size: {item.size} × {item.quantity}
                  </p>
                </div>
                <p>{currency}{(item.productId?.price * item.quantity).toFixed(2)}</p>
              </div>
            ))}
            <div className="flex justify-between font-bold text-lg pt-2">
              <span>Total:</span>
              <span>{currency}{total.toFixed(2)}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlaceOrder;
