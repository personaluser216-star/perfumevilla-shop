import React, { createContext, useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

export const ShopContext = createContext();

const backendUrl = "http://localhost:5000";

const ShopContextProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);
  const [deviceId, setDeviceId] = useState(null);
  
  
  // ✅ Generate deviceId once
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
        quantity, // 👈 send quantity
      });

      console.log("✅ addToCart response:", data);

      if (data.success) {
        setCart(data.cart.items || []);
        
       
      } else {
   console.log(error)
      }
    } catch (error) {
      console.log(error)
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
      console.error(" getUserCart error:", error);
    }
  };

const updateCart = async (productId, size, quantity) => {
  try {
    // direct server call → no local guess
    const { data } = await axios.post(`${backendUrl}/cart/update`, {
      deviceId,
      productId,
      size,
      quantity,
    });

    if (data.success) {
      setCart(data.cart.items || []); // ✅ server ni cart sync karo
    } else {
      toast.error(data.message || "Failed to update cart");
    }
  } catch (err) {
    console.error("updateCart error:", err);
    toast.error("Something went wrong while updating cart");
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

  // ✅ Calculate total items
  const totalItems = cart.reduce(
    (acc, item) => acc + (item.quantity || 1),
    0
  );

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
      }}
    >
      {children}
    </ShopContext.Provider>
  );
};

export default ShopContextProvider;
