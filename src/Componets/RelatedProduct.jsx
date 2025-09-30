import React, { useContext, useEffect, useState } from 'react';
import ProductItems from "../Componets/ProductItems";
import { ShopContext } from '../Context/ShopContext';



const RelatedProduct = ({ category, subCategory }) => {
  const { products } = useContext(ShopContext);
  const [relatedproduct, setRelatedproduct] = useState([]);

  useEffect(() => {
    if (products.length > 0) {
      let productCopy = products.slice();
      productCopy = productCopy.filter((item) => category === item.category);
      productCopy = productCopy.filter((item) => subCategory === item.subCategory);

      setRelatedproduct(productCopy.slice(0, 5));
    }
  }, [products, category, subCategory]);

  return (
    <div className='md:my-24 my-16'>
      <div className='text-center py-2'>
      <h1 className=' text-2xl'>Related Product</h1>
      
      </div>

      <div className='md:mr-12 md:ml-12 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-6'>
        {relatedproduct.map((item, index) => (
          <ProductItems
            key={item._id}
            id={item._id}
            name={item.name}
            price={item.price}
            image={item.image}
          />
        ))}
      </div>
    </div>
  );
};

export default RelatedProduct;
