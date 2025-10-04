import React, { useContext, useEffect, useState } from 'react';
import ProductItems from './ProductItems';
import { ShopContext } from "../Context/ShopContext";
import { motion } from "framer-motion";

const BestSeller = () => {
  const { products } = useContext(ShopContext);
  const [bestseller, setBestSeller] = useState([]);

  useEffect(() => {
    const bestProduct = products.filter((item) => item.bestSeller);
    setBestSeller(bestProduct.slice(0, 5));
  }, [products]);

  // animation variants
  const fadeUp = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <div className="md:py-10 bg-[#f8f7f4]">
      {/* Title */}
      <motion.div
        className="text-center md:text-3xl py-8"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        variants={fadeUp}
      >
        <h1 className="text-2xl md:text-3xl font-bold text-[#5b4f47]">Shop Our Best Seller</h1>
        <p className="w-3/4 m-auto text-xs sm:text-sm md:text-base text-gray-600 pt-4 pb-4">
          Discover our best-selling clothes, where style meets comfort in every stitch.
        </p>
      </motion.div>

      {/* Products Grid */}
      <div className="md:ml-32 ml-4 mr-4  md:mr-32 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {bestseller.map((item, index) => (
          <motion.div
            key={index}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: index * 0.2 }}
            variants={fadeUp}
          >
            <ProductItems
              id={item._id}
              name={item.name}
              image={item.image}
              price={item.price}
            />
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default BestSeller;
