import React, { useContext } from "react";
import { ShopContext } from "../Context/ShopContext";
import { Link } from "react-router-dom";
import stick from "../assets/stick.jpg";
import { FaRegEye } from "react-icons/fa";
import emptywishlist from "../assets/emptywishlist.png"
import { div } from "framer-motion/client";

const Wishlist = () => {
  const { wishlistProducts, removeFromWishlist } = useContext(ShopContext);

 if (wishlistProducts.length === 0) {
  return (
   <div>
      <div
                className="relative md:h-64 h-48 w-full flex items-center justify-center bg-cover bg-center"
                style={{ backgroundImage: `url(${stick})` }}
              >
                <div className="absolute inset-0 bg-black/35"></div>
                <div className="relative z-10 text-center text-white">
                  <h1 className="text-2xl md:text-3xl font-extrabold uppercase tracking-wider drop-shadow-lg">
                  Your  WishList
                  </h1>
                  <p className="mt-3 text-base md:text-lg tracking-wide">
                    <a href="/" className="hover:cursor-pointer">
                      Home
                    </a>{" "}
                    / <span className="text-white">Wishlist</span>
                  </p>
                </div>
              </div>
     <div className="flex flex-col items-center justify-center py-20">
      <img 
        src={emptywishlist}  
        alt="Empty Wishlist"
        className="w-60 h-60 object-contain opacity-80"
      />
      <p className="mt-6 text-lg font-semibold text-gray-600">
        No Items In Wishlist
      </p>
      <Link
        to="/collection"
        className="mt-4 px-6 py-2 bg-[#5b4f47] text-white hover:bg-[#3c332d] transition"
      >
        Continue Shopping
      </Link>
    </div>
   </div>
  );
}


  return (
  <div>
    <div>
        <div
                className="relative md:h-64 h-48 w-full flex items-center justify-center bg-cover bg-center"
                style={{ backgroundImage: `url(${stick})` }}
              >
                <div className="absolute inset-0 bg-black/35"></div>
                <div className="relative z-10 text-center text-white">
                  <h1 className="text-2xl md:text-3xl font-extrabold uppercase tracking-wider drop-shadow-lg">
                  Your  WishList
                  </h1>
                  <p className="mt-3 text-base md:text-lg tracking-wide">
                    <a href="/" className="hover:cursor-pointer">
                      Home
                    </a>{" "}
                    / <span className="text-white">Wishlist</span>
                  </p>
                </div>
              </div>
    </div>

      <div className="pt-6 pb-6 m-12 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
     
      {wishlistProducts.map((product) => (
        <div key={product._id} className="border -lg shadow p-4">
          <img
            src={product.image}
            alt={product.name}
            className="w-48 h-48 object-cover mx-auto "
          />
          <h3 className="mt-2 font-semibold">{product.name}</h3>
          <p className="text-gray-600">₹{product.price}</p>
          
          <div className="flex justify-between mt-3">
            <Link
              to={`/product/${product._id}`}
              className="text-xl text-[#5b4f47] hover:underline"
            >
              <FaRegEye />
            </Link>
            <button
              onClick={() => removeFromWishlist(product._id)}
              className="text-sm text-red-600 hover:underline"
            >
              Remove
            </button>
          </div>
        </div>
      ))}
    </div>
  </div>
  );
};

export default Wishlist;
