import React, { useContext } from "react";
import { ShopContext } from "../Context/ShopContext";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import stick from "../assets/stick.jpg";

const Cart = () => {
  const { cart, updateCart, currency } = useContext(ShopContext);
 
  const navigate = useNavigate();


  if (!cart || cart.length === 0) {
    return (
      <p className="text-center text-gray-500 mt-10 text-lg">
        Your cart is empty
      </p>
    );
  }

  // ✅ Handle Update (safe wrapper)
  const handleUpdate = async (id, size, qty) => {
    try {
      await updateCart(id, size, qty);
      if (qty === 0) {
        console.log("Item removed from cart");
      } else {
       console.log(error);
      }
    } catch (err) {
      console.error(err);
     
    }
  };

  return (
  <div className="mb-12">
  <div
        className="relative md:h-64 h-48 w-full flex items-center justify-center bg-cover bg-center"
        style={{ backgroundImage: `url(${stick})` }}
      >
        <div className="absolute inset-0 bg-black/35"></div>
        <div className="relative z-10 text-center text-white">
          <h1 className="text-2xl md:text-3xl font-extrabold uppercase tracking-wider drop-shadow-lg">
            Your Cart
          </h1>
          <p className="mt-3 text-base md:text-lg tracking-wide">
            <a href="/" className="hover:cursor-pointer">
              Home
            </a>{" "}
            /{" "}
            <span className="text-white">
              Cart
            </span>
          </p>
        </div>
      </div>
      <div className="p-5 mt-8 max-w-5xl mx-auto">
      
      <h2 className="md:text-2xl text-xl font-bold md:mb-16 mb-4">Your Cart</h2>

      <div className="space-y-5">
        {cart.map((item, index) => (
          <div
            key={index}
            className="flex items-center justify-between border-b pb-4"
          >
            {/* Product Image */}
            <img
              src={item.productId?.image[0]}
              alt={item.productId?.name}
              className="w-16 h-16 object-cover text-md"
            />

            {/* Product Info */}
            <div className="flex-1 ml-4">
              <h3 className="font-medium">{item.productId?.name}</h3>
              <p className="text-sm text-gray-500">Size: {item.size}</p>

              <div className="flex items-center mt-2">
                {/* Quantity control */}
                <button
                  type="button"
                  className="px-3 py-1 border border-gray-400 text-md hover:bg-gray-100 transition"
                  onClick={() =>
                    handleUpdate(item.productId._id, item.size, item.quantity - 1)
                  }
                  disabled={item.quantity <= 1}
                >
                  -
                </button>
                <span className="px-3 border px-2 py-1 border-gray-400">{item.quantity}</span>
                <button
                  type="button"
                  className="px-3 py-1 border border-gray-400 text-md hover:bg-gray-100 transition"
                  onClick={() =>
                    handleUpdate(item.productId._id, item.size, item.quantity + 1)
                  }
                >
                  +
                </button>
              </div>
            </div>

            {/* Price */}
            <div className="font-semibold text-right min-w-[80px]">
              {currency}
              {(item.productId?.price * item.quantity).toFixed(2)}
            </div>

            {/* Remove button */}
            <button
              type="button"
              onClick={() => handleUpdate(item.productId._id, item.size, 0)}
              className="ml-4 text-red-500 hover:text-red-700 text-xl transition"
            >
              ✕
            </button>
          </div>
        ))}
      </div>

      {/* Checkout Section */}
      <div className="flex md:flex-row flex-col justify-end mt-10 gap-5">
        <button
          type="button"
          onClick={() => navigate("/place-order")}
          className="hover:bg-[#5b4f47] hover:text-white border-[#5b4f47] border px-6 py-3 text-md-lg hover:opacity-90 transition"
        >
          Proceed to Checkout
        </button>
        <button
          type="button"
          onClick={() => navigate("/collection")}
          className="hover:bg-[#5b4f47] hover:text-white border-[#5b4f47] border px-6 py-3 text-md-lg hover:opacity-90 transition"
        >
          Continue Shopping
        </button>
      </div>
    </div>
  </div>
  );
};

export default Cart;
