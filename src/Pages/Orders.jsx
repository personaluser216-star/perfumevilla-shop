
import React, { useContext, useEffect, useState } from "react";
import { ShopContext } from "../Context/ShopContext";
import axios from "axios";

const Orders = () => {
  const { backendUrl, currency } = useContext(ShopContext);
  const [orders, setOrders] = useState([]);
  const deviceId = localStorage.getItem("deviceId");

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await axios.get(`${backendUrl}/order/${deviceId}`);
        if (res.data.success) {
          setOrders(res.data.orders);
        }
      } catch (err) {
        console.error("Error fetching orders:", err);
      }
    };
    fetchOrders();
  }, [backendUrl, deviceId]);

  const steps = [
    "Order Placed",
    "Packing",
    "Shipped",
    "Out for delivery",
    "Delivered",
  ];

  const statusColors = {
    "Order Placed": "bg-yellow-100 text-yellow-700",
    Packing: "bg-blue-100 text-blue-700",
    Shipped: "bg-purple-100 text-purple-700",
    "Out for delivery": "bg-orange-100 text-orange-700",
    Delivered: "bg-green-100 text-green-700",
    Cancelled: "bg-red-100 text-red-700",
  };

  const statusMessages = {
    "Order Placed": "Your order has been placed successfully.",
    Packing: "We are packing your items.",
    Shipped: "Your order is on the way.",
    "Out for delivery": "Your package is out for delivery.",
    Delivered: "Your order has been delivered successfully.",
    Cancelled: "Your order has been cancelled.",
  };

  return (
    <div className="max-w-6xl mx-auto p-4 sm:p-6 mt-8 mb-12">
      <h2 className="text-lg sm:text-xl font-bold mb-6 text-gray-800">
        My Orders
      </h2>

      {orders.length === 0 ? (
       <div className="text-center">
         <p className="text-gray-500">No orders yet.</p>
         <button
          type="button"
          onClick={() => navigate("/collection")}
          className="mt-2 mb-12 hover:bg-[#5b4f47] hover:text-white border-[#5b4f47] border px-6 py-3 text-md-lg hover:opacity-90 transition"
        >
          Continue Shopping
        </button>
        </div>
      ) : (
        <div className="space-y-8">
          {orders
  .filter(order => order.status !== "Delivered") 
  .map(order => {
    const currentIndex = steps.indexOf(order.status);

            return (
              <div
                key={order._id}
                className="border p-4 sm:p-6 shadow-md bg-[#f8f7f4] hover:shadow-lg transition duration-300"
              >
                {/* Header */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-4 gap-2">
                  <p className="font-semibold text-base sm:text-md text-gray-700 break-all">
                    Order ID: <span className="text-gray-900">{order._id}</span>
                  </p>
                  <span
                    className={`px-3 py-1  text-xs sm:text-sm font-medium capitalize ${statusColors[order.status]}`}
                  >
                    {order.status}
                  </span>
                </div>

                {/* Items */}
                <div className="space-y-2 mb-4">
                  {order.items.map((item, idx) => (
                    <div
                      key={idx}
                      className="flex flex-col sm:flex-row sm:justify-between sm:items-center text-sm text-gray-600"
                    >
                      <span className="mb-1 sm:mb-0">
                        {item.name} × {item.quantity}
                      </span>
                      <span>
                        {currency}
                        {(item.price * item.quantity).toFixed(2)}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Footer */}
                <div className="flex flex-col sm:flex-row justify-between border-t pt-3 text-xs sm:text-sm text-gray-500 gap-1">
                  <span>
                    Total: {currency}
                    {order.amount}
                  </span>
                  <span>{new Date(order.date).toLocaleDateString()}</span>
                </div>

                {/* Timeline */}
                <div className="mt-8">
                  {/* Desktop Timeline */}
                  <div className="hidden sm:flex relative justify-between">
                    {steps.map((step, index) => {
                      const isCompleted = index <= currentIndex;

                      return (
                        <div
                          key={step}
                          className="flex flex-col items-center w-1/5 relative"
                        >
                          {index > 0 && (
                            <div
                              className={`absolute top-5 left-0 w-1/2 h-1 ${
                                index <= currentIndex
                                  ? "bg-green-500"
                                  : "bg-gray-300"
                              }`}
                            ></div>
                          )}
                          <div
                            className={`w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center text-xs sm:text-sm font-bold z-10 ${
                              isCompleted
                                ? "bg-green-500 text-white shadow-lg"
                                : "bg-gray-300 text-gray-600"
                            }`}
                          >
                            {isCompleted ? "✔" : index + 1}
                          </div>
                          {index < steps.length - 1 && (
                            <div
                              className={`absolute top-5 right-0 w-1/2 h-1 ${
                                index < currentIndex
                                  ? "bg-green-500"
                                  : "bg-gray-300"
                              }`}
                            ></div>
                          )}
                          <span
                            className={`mt-2 text-xs sm:text-sm capitalize ${
                              isCompleted
                                ? "text-green-600 font-semibold"
                                : "text-gray-400"
                            }`}
                          >
                            {step}
                          </span>
                        </div>
                      );
                    })}
                  </div>

                  {/* Mobile Vertical Timeline */}
                  <div className="flex flex-col gap-4 sm:hidden">
                    {steps.map((step, index) => {
                      const isCompleted = index <= currentIndex;
                      return (
                        <div
                          key={step}
                          className="flex items-center gap-3 relative"
                        >
                          <div
                            className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold ${
                              isCompleted
                                ? "bg-green-500 text-white"
                                : "bg-gray-300 text-gray-600"
                            }`}
                          >
                            {isCompleted ? "✔" : index + 1}
                          </div>
                          <span
                            className={`text-sm ${
                              isCompleted
                                ? "text-green-600 font-semibold"
                                : "text-gray-400"
                            }`}
                          >
                            {step}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Message */}
                <p className="mt-6 text-center text-gray-700 text-sm sm:text-base font-medium">
                  {statusMessages[order.status]}
                </p>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default Orders;

