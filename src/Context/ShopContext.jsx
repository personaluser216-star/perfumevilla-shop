import React, { createContext, useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";

export const ShopContext = createContext();

const backendUrl = "https://perfumevillanodejsapi.onrender.com"

const ShopContextProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);
  const [deviceId, setDeviceId] = useState(null);
  const [wishlist, setWishlist] = useState(() => {
    const stored = localStorage.getItem("wishlist");
    return stored ? JSON.parse(stored) : [];
  });

  // ✅ Generate deviceId
  useEffect(() => {
    let id = localStorage.getItem("deviceId");
    if (!id) {
      id = crypto.randomUUID();
      localStorage.setItem("deviceId", id);
    }
    setDeviceId(id);
  }, []);

  // ✅ Fetch products
  const getProductData = async () => {
    try {
      const res = await axios.get(`${backendUrl}/product/get`);
      if (res.data.success) {
        setProducts(res.data.products);
      } else {
        toast.error(res.data.message);
      }
    } catch (err) {
      console.error(err);
    }
  };

  // ✅ Add to Cart
  const addToCart = async (productId, size, quantity = 1) => {
    try {
      if (!deviceId) {
        toast.error("Device ID missing");
        return;
      }
      const { data } = await axios.post(`${backendUrl}/cart/add`, {
        deviceId,
        productId,
        size,
        quantity,
      });

      if (data.success) {
        setCart(data.cart.items || []);
      } else {
        toast.error(data.message || "Add to cart failed");
      }
    } catch (error) {
      console.log(error);
    }
  };

  // ✅ Wishlist
  useEffect(() => {
    localStorage.setItem("wishlist", JSON.stringify(wishlist));
  }, [wishlist]);

  const addToWishlist = (productId) => {
    if (!wishlist.includes(productId)) {
      setWishlist((prev) => [...prev, productId]);
    }
  };

  const removeFromWishlist = (productId) => {
    setWishlist((prev) => prev.filter((id) => id !== productId));
  };

  const clearWishlist = () => setWishlist([]);

  const toggleWishlist = (productId) => {
    if (wishlist.includes(productId)) {
      removeFromWishlist(productId);
    } else {
      addToWishlist(productId);
    }
  };

  // ✅ Get user cart
  const getUserCart = async () => {
    if (!deviceId) return;
    try {
      const { data } = await axios.post(`${backendUrl}/cart/get`, { deviceId });
      if (data.success) {
        setCart(data.cart.items || []);
      }
    } catch (error) {
      console.error("getUserCart error:", error);
    }
  };

  // ✅ Update Cart
  const updateCart = async (productId, size, quantity) => {
    try {
      const { data } = await axios.post(`${backendUrl}/cart/update`, {
        deviceId,
        productId,
        size,
        quantity,
      });

      if (data.success) {
        setCart(data.cart.items || []);
      } else {
        toast.error(data.message || "Failed to update cart");
      }
    } catch (err) {
      console.error("updateCart error:", err);
      toast.error("Something went wrong while updating cart");
    }
  };

 // ShopContext.js
const placeOrder = async (orderData, navigate) => {
  try {
    const res = await axios.post(`${backendUrl}/order/place`, orderData);

    if (res.data.success) {
      if (orderData.payment === "COD") {
        toast.success("Order placed successfully!");
        setCart([]);
        localStorage.removeItem("cart");
        navigate("/orders");
      }

      if (orderData.payment === "STRIPE") {
        const { clientSecret } = res.data;
        const stripe = await loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY);

        const result = await stripe.redirectToCheckout({
          clientSecret,
        });

        if (result.error) {
          toast.error(result.error.message);
        } else {
          toast.success("Payment successful, order confirmed!");
          setCart([]);
          localStorage.removeItem("cart");
          navigate("/orders");
        }
      }
    } else {
      toast.error(res.data.message || "Order failed");
    }
  } catch (err) {
    console.error(err);
    toast.error("Server error");
  }
};



  useEffect(() => {
    getProductData();
  }, []);

  useEffect(() => {
    if (deviceId) {
      getUserCart();
    }
  }, [deviceId]);
const clearCart = () => {
  setCart([]);  // clear React state immediately
  localStorage.setItem("cart", JSON.stringify([])); // clear local cache if you use it
};

  // ✅ Totals
  const totalItems = cart.reduce((acc, item) => acc + (item.quantity || 1), 0,);
  const wishlistCount = wishlist.length;
  const wishlistProducts = products.filter((p) => wishlist.includes(p._id));

  return (
    <ShopContext.Provider
      value={{
        products,
        cart,
        addToCart,
        updateCart,
        getUserCart,
        getProductData,
        totalItems,
        addToWishlist,
        removeFromWishlist,
        clearWishlist,
        wishlistCount,
        wishlistProducts,
        toggleWishlist,
        placeOrder,  
        backendUrl,setCart,
        clearCart
      }}
    >
      {children}
    </ShopContext.Provider>
  );
};

export default ShopContextProvider;
