import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ShopContext } from "../Context/ShopContext";
import { BsCart3 } from "react-icons/bs";
import { FaRegHeart } from "react-icons/fa6";

import stick from "../assets/stick.jpg";
import RelatedProduct from "../Componets/RelatedProduct";

const Product = () => {
  const { name, id } = useParams();
  const navigate=useNavigate()
  const { products, currency, addToCart ,addToWishlist} = useContext(ShopContext); // ✅ addToCart added
  const [selectedSize, setSelectedSize] = useState("");
  const [selectedFragrance, setSelectedFragrance] = useState("");
  const [productData, setProductData] = useState(null);
  const [image, setImage] = useState("");
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    if (products.length > 0) {
      const selectedProduct = products.find((item) => item._id === id);
      if (selectedProduct) {
        setProductData(selectedProduct);
        setImage(selectedProduct.image[0]);
      }
    }
  }, [id, products]);

  if (!productData) {
    return <div className="p-10 text-gray-500">Loading product...</div>;
  }
const handleAddToCart = async () => {
  if (!selectedSize) {
    alert("Please select a size!");
    return;
  }
   
 await addToCart(productData._id, selectedSize, quantity); 

};
const handleAddTowishlist = async () => {
 
   
 await addToWishlist(productData._id, selectedSize, quantity); 

};
  return (
    <div>
      {/* Banner Section */}
      <div
        className="relative md:h-64 h-48 w-full flex items-center justify-center bg-cover bg-center"
        style={{ backgroundImage: `url(${stick})` }}
      >
        <div className="absolute inset-0 bg-black/35"></div>
        <div className="relative z-10 text-center text-white">
          <h1 className="text-2xl md:text-3xl font-extrabold uppercase tracking-wider drop-shadow-lg">
            {productData.name}
          </h1>
          <p className="mt-3 text-base md:text-lg tracking-wide">
            <a href="/" className="hover:cursor-pointer">
              Home
            </a>{" "}
            /{" "}
            <span className="text-white">
              {productData.category
                ? `${productData.category} Collection`
                : "All Collections"}
            </span>
          </p>
        </div>
      </div>

      {/* Product Details */}
      <div className="-t-2 md:pt-16 md:pb-16 md:mr-0  mr-3">
        <div className="flex flex-col sm:flex-row gap-10 ">
          {/* Image Section */}
          <div className="flex-1 flex items-start justify-center">
            <img
              src={image}
              alt={productData.name}
              className="w-96 h-96 object-cover"
            />
            <div className="flex gap-2 mt-3">
              {productData.image.map((img, index) => (
                <img
                  key={index}
                  src={img}
                  alt=""
                  className="w-20 md:h-20 border border-[#5b4f47] cursor-pointer"
                  onClick={() => setImage(img)}
                />
              ))}
            </div>
          </div>

          {/* Info Section */}
          <div className="flex-1 pr-12 pl-5">
            <h1 className="text-2xl font-bold">{productData.name}</h1>
            <p className="mt-3 text-gray-600">{productData.description}</p>

            {/* Table */}
            <table className="table-auto w-full mt-4 text-md">
              <tbody>
                {/* Price */}
                <tr>
                  <td className="py-2 font-semibold w-40">Price:</td>
                  <td className="px-4 py-2 text-[#5b4f47] font-bold">
                    ${productData.price}
                  </td>
                </tr>

                {/* Size */}
                <tr>
                  <td className="py-2 font-semibold">Size:</td>
                  <td className="px-4 py-2 text-gray-600">
                    <div className="flex gap-2 flex-wrap">
                      {productData.sizes &&
                        productData.sizes.map((item, index) => (
                          <button
                            key={index}
                            onClick={() => setSelectedSize(item)}
                            className={`px-3 py-2 border flex items-center justify-center cursor-pointer
                              ${
                                selectedSize === item
                                  ? "border-black bg-gray-200"
                                  : "border-gray-400"
                              }`}
                          >
                            {item}
                          </button>
                        ))}
                    </div>
                  </td>
                </tr>

                {/* Fragrance */}
                <tr>
                  <td className="py-2 font-semibold">Fragrance:</td>
                  <td className="px-4 py-2 text-gray-600">
                    <div className="flex gap-2 flex-wrap">
                      {productData.fragrance &&
                        productData.fragrance.map((item, index) => (
                          <button
                            key={index}
                            onClick={() => setSelectedFragrance(item)}
                            className={`px-3 py-2 border flex items-center justify-center cursor-pointer
                              ${
                                selectedFragrance === item
                                  ? "border-black bg-gray-200"
                                  : "border-gray-400"
                              }`}
                          >
                            {item}
                          </button>
                        ))}
                    </div>
                  </td>
                </tr>

                {/* Brand */}
                <tr>
                  <td className="py-2 font-semibold">Brand:</td>
                  <td className="px-4 py-2 text-gray-600">
                    {productData.brand}
                  </td>
                </tr>

                {/* Product Type */}
                <tr>
                  <td className="py-2 font-semibold">Product Type:</td>
                  <td className="px-4 py-2 text-gray-600">
                    {productData.category}
                  </td>
                </tr>

                {/* Use Type */}
                <tr>
                  <td className="py-2 font-semibold">Use Type:</td>
                  <td className="px-4 py-2 text-gray-600">
                    {productData.subCategory}
                  </td>
                </tr>

                {/* Quantity */}
                <tr>
                  <td className="py-2 font-semibold">Quantity:</td>
                  <td className="px-4 py-2">
                    <div className="flex items-center border border-gray-400  w-fit overflow-hidden">
                      <button
                        className="px-3 py-1 text-xl border-r border-gray-400"
                        onClick={() =>
                          setQuantity((prev) => (prev > 1 ? prev - 1 : 1))
                        }
                      >
                        -
                      </button>
                      <span className="px-4">{quantity}</span>
                      <button
                        className="px-3 py-1 text-xl border-l border-gray-400"
                        onClick={() => setQuantity((prev) => prev + 1)}
                      >
                        +
                      </button>
                    </div>
                  </td>
                </tr>

                {/* Subtotal */}
                <tr>
                  <td className="py-2 font-semibold">Subtotal:</td>
                  <td className="px-4 py-2 text-[#5b4f47] font-bold">
                    ${(productData.price * quantity).toFixed(2)}
                  </td>
                </tr>
              </tbody>
            </table>

            {/* Buttons */}
            <div className="grid md:grid-cols-2 md:gap-4">
              {/* Wishlist */}
              <div>
                <button 
                onClick={handleAddTowishlist}
                className="hover:bg-[#5b4f47] hover:text-white transition-colors duration-300 mt-10 border border-gray-500 w-full p-2 flex items-center justify-center gap-2">
                  <FaRegHeart className="text-lg" />
                  <span>Add To WishList</span>
                </button>
              </div>

              {/* Add to Cart */}
              <div>
                <button
                 onClick={handleAddToCart}
                  className="hover:bg-[#5b4f47] hover:text-white transition-colors duration-300 md:mt-10  mt-4 border border-gray-500 w-full p-2 flex items-center justify-center gap-2"
                >
                  <BsCart3 className="text-xl" />
                  <span>Add To Cart</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Description + Reviews */}
      <div className="mt-16 md:ml-12 md:mr-12 ml-4 mr-4">
        <div className="flex">
          <b className="border px-5 py-3 text-md">Description</b>
          <p className="border px-5 py-3 text-md">Reviews (122)</p>
        </div>
        <div className="flex flex-col gap-4 border px-6 py-6 text-md text-gray-500">
          <p>
            An e-commerce website is an online platform that facilitates the
            buying and selling of products or services over the internet.
          </p>
        </div>
      </div>

      {/* Related Products */}
      <div>
        <RelatedProduct
          category={productData.category}
          subCategory={productData.subCategory}
        />
      </div>
    </div>
  );
};

export default Product;
