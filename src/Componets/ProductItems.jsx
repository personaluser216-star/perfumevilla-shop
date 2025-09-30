import React, { useContext } from 'react'
import { ShopContext } from "../Context/ShopContext";
import { Link } from 'react-router-dom';

const ProductItems = ({id,image,name,price}) => {
  const slugify = (text) => {
  return text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/\s+/g, "-")        // space → -
    .replace(/[^\w\-]+/g, "")    // non-word chars remove
    .replace(/\-\-+/g, "-");     // multiple - → single -
};


    const {currency}=useContext(ShopContext);
  return (
   <Link className='text-gray-700 cursor-pointer' to={`/product/${slugify(name)}/${id}`}>
    <div className='overflow-hidden border bg-[#f8f7f4]'>
<img className='hover:scale-110 transition ease-in-out md:h-72 h-40 mx-auto pt-4' src={image[0]} alt=''/>
   <p className='pt-3 pb-1 text-md text-center text-[#5b4f47] font-bold'>{name}</p>
    <p className='text-sm font-medium text-center'>${price}</p>
<div className='text-center pb-3 pt-3'>
      <button 
      
      className='bg-[#5b4f47] px-12 py-2 text-white'>Shop Now</button>
</div>
    </div>
    
   </Link>
  )
}

export default ProductItems