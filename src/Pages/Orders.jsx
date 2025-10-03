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

  // 👇 Steps exactly as admin panel options
  const steps = [
    "Order Placed",
    "Packing",
    "Shipped",
    "Out for delivery",
    "Delivered",
  ];

  const statusColors = {
    "Order Placed": "bg-yellow-100 text-yellow-700",
    "Packing": "bg-blue-100 text-blue-700",
    "Shipped": "bg-purple-100 text-purple-700",
    "Out for delivery": "bg-orange-100 text-orange-700",
    "Delivered": "bg-green-100 text-green-700",
    "Cancelled": "bg-red-100 text-red-700",
  };

  const statusMessages = {
    "Order Placed": "Your order has been placed successfully.",
    "Packing": "We are packing your items.",
    "Shipped": "Your order is on the way.",
    "Out for delivery": "Your package is out for delivery.",
    "Delivered": "Your order has been delivered successfully.",
    "Cancelled": "Your order has been cancelled.",
  };

  return (
    <div className="max-w-6xl mx-auto p-6 mt-12 mb-12">
      <h2 className="text-3xl font-bold mb-8 text-gray-800">My Orders</h2>
      {orders.length === 0 ? (
        <p className="text-gray-500">No orders yet.</p>
      ) : (
        <div className="space-y-8">
          {orders.map((order) => {
            const currentIndex = steps.indexOf(order.status);

            return (
              <div
                key={order._id}
                className="border -xl p-6 shadow-lg bg-white hover:shadow-xl transition duration-300"
              >
                {/* Order Header */}
                <div className="flex justify-between items-center mb-4">
                  <p className="font-semibold text-lg text-gray-700">
                    Order ID: <span className="text-gray-900">{order._id}</span>
                  </p>
                  <span
                    className={`px-4 py-1 -full text-sm font-medium capitalize ${statusColors[order.status]}`}
                  >
                    {order.status}
                  </span>
                </div>

                {/* Order Items */}
                <div className="space-y-2 mb-4">
                  {order.items.map((item, idx) => (
                    <div
                      key={idx}
                      className="flex justify-between text-sm text-gray-600"
                    >
                      <span>
                        {item.name} × {item.quantity}
                      </span>
                      <span>
                        {currency}
                        {(item.price * item.quantity).toFixed(2)}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Order Footer */}
                <div className="flex justify-between border-t pt-3 text-sm text-gray-500">
                  <span>
                    Total: {currency}
                    {order.amount}
                  </span>
                  <span>{new Date(order.date).toLocaleDateString()}</span>
                </div>

                {/* Order Tracking Timeline */}
                <div className="mt-8">
                  <div className="relative flex justify-between">
                    {steps.map((step, index) => {
                      const isCompleted = index <= currentIndex;

                      return (
                        <div
                          key={step}
                          className="flex flex-col items-center w-1/5 relative"
                        >
                          {/* Left Connector */}
                          {index > 0 && (
                            <div
                              className={`absolute top-5 left-0 w-1/2 h-1 
                                ${index <= currentIndex ? "bg-green-500" : "bg-gray-300"}
                              `}
                            ></div>
                          )}

                          {/* Step Circle */}
                          <div
                            className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold z-10
                              ${
                                isCompleted
                                  ? "bg-green-500 text-white shadow-lg"
                                  : "bg-gray-300 text-gray-600"
                              }`}
                          >
                            {isCompleted ? "✔" : index + 1}
                          </div>

                          {/* Right Connector */}
                          {index < steps.length - 1 && (
                            <div
                              className={`absolute top-5 right-0 w-1/2 h-1 
                                ${index < currentIndex ? "bg-green-500" : "bg-gray-300"}
                              `}
                            ></div>
                          )}

                          {/* Step Label */}
                          <span
                            className={`mt-2 text-sm capitalize ${
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

                {/* Status Message */}
                <p className="mt-6 text-center text-gray-700 font-medium">
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
