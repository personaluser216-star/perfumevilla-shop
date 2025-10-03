import React from 'react';
import { BrowserRouter, Route, Router, Routes } from 'react-router-dom';

import Navbar from "./Componets/Navbar"
import Footer from './Componets/Footer';
import ScrollToTop from './Componets/ScrollToTop';
import Contact from './Pages/Contact';
import Home from './Pages/Home';
import About from './Pages/About';
import Service from './Pages/Service';
import Product from './Pages/Product';
import Collection from './Pages/Collections';
import ShopContextProvider from './Context/ShopContext';
import AutoScrollTop from './Componets/AutoScrollTop';
import Cart from './Pages/Cart';
import { ToastContainer } from "react-toastify";
import Wishlist from './Pages/WishList';
import PlaceOrder from './Pages/PlaceOrder';
import VerifyStripe from './Pages/VerifyStripe';
import Orders from './Pages/Orders';

const App = () => {
  return (
   <ShopContextProvider>

     <BrowserRouter>
     <AutoScrollTop/>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/collection/Men'sPerfume" element={<Collection category="Men's" />} />
        <Route path="/collection/Women'sPerfume" element={<Collection category="Women's" />} />
        <Route path="/collection/UnisexPerfume" element={<Collection category="Unisex" />} />
        


        <Route path='/about' element={<About/>}/>
        <Route path='/contact' element={<Contact/>}/>
      <Route path='/service' element={<Service/>}/>
      <Route path='/product/:id' element={<Product/>}/>
      <Route path="/product/:name/:id" element={<Product />} />

      <Route path='/collection' element={<Collection/>}/>
      <Route path='/cart' element={<Cart/>}/>
      <Route path='/wishlist' element={<Wishlist/>}/>
      <Route path='/place-order' element={<PlaceOrder/>}/>
      <Route path="/verify" element={<VerifyStripe />} />
      <Route path='/orders' element={<Orders/>}/>

      </Routes>
      <Footer/>
      <ScrollToTop/>
        <ToastContainer position="top-right" autoClose={2000} />
    </BrowserRouter>
   </ShopContextProvider>
  );
};

export default App;
