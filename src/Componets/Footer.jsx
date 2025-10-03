import React from "react";
import { FaFacebookF, FaInstagram, FaTwitter, FaYoutube } from "react-icons/fa";
import logo from "../assets/logo.png"; // update path as per project

const Footer = () => {
  const quickLinks = [
  { name: "Home", href: "/" },
  { name: "About", href: "/about" },
  { name: "Services", href: "/service" },
  { name: "Contact", href: "/contact" },
];
const categories = [
  { name: "Men's Perfume", href: "/collection/Men'sPerfume" },
        { name: "Women's Perfume", href: "/collection/Women'sPerfume" },
        { name: "Unisex Perfume", href: "/collection/UnisexPerfume" },
 
];
  return (
    <footer className="bg-[#f8f7f4] text-black pt-12">
      <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          {/* About with Logo */}
          <div>
            <img src={logo} alt="Perfume Villa" className="h-24" />
            <p className="text-md leading-6 text-gray-700">
              Discover timeless fragrances for men, women, homes, and cars.  
              Our perfumes are crafted with elegance and passion.
            </p>
            <div className="flex space-x-4 mt-4">
              {/* Facebook */}
              <a
                href="#"
                className="p-2 rounded-full bg-[#5b4f47] text-white hover:scale-110 transition-transform duration-300"
              >
                <FaFacebookF />
              </a>
              {/* Instagram */}
              <a
                href="#"
                className="p-2 rounded-full bg-[#5b4f47] from-pink-500 via-red-500 to-yellow-500 text-white hover:scale-110 transition-transform duration-300"
              >
                <FaInstagram />
              </a>
              {/* Twitter */}
              <a
                href="#"
                className="p-2 rounded-full bg-[#5b4f47] text-white hover:scale-110 transition-transform duration-300"
              >
                <FaTwitter />
              </a>
              {/* YouTube */}
              <a
                href="#"
                className="p-2 rounded-full bg-[#5b4f47] text-white hover:scale-110 transition-transform duration-300"
              >
                <FaYoutube />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h2 className="text-lg font-semibold uppercase mb-4">Quick Links</h2>
           <ul className="space-y-2 text-md">
  {quickLinks.map((link, i) => (
    <li key={i}>
      <a
        href={link.href}
        className="hover:font-semibold hover:text-[#5b4f47] transition-all duration-200"
      >
        {link.name}
      </a>
    </li>
  ))}
</ul>
          </div>

          {/* Categories */}
          <div>
            <h2 className="text-lg font-semibold uppercase mb-4">Categories</h2>
<ul className="space-y-2 text-md">
  {categories.map((cat, i) => (
    <li key={i}>
      <a
        href={cat.href}
        className="hover:font-semibold hover:text-[#5b4f47] transition-all duration-200"
      >
        {cat.name}
      </a>
    </li>
  ))}
</ul>
          </div>

          {/* Newsletter */}
          <div>
            <h2 className="text-lg font-semibold uppercase mb-4">Newsletter</h2>
            <p className="text-sm text-gray-700 mb-4">
              Subscribe to get updates about new arrivals & offers.
            </p>
            <form className="flex">
              <input
                type="email"
                placeholder="Enter your email"
                className="w-full px-3 py-2  text-black border border-gray-300 focus:outline-none"
              />
              <button
                type="submit"
                className="bg-[#5b4f47] px-4 py-2  text-white hover:bg-[#463e38] transition"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-10 border-t border-gray-300 pt-6  pb-6 text-center text-md text-gray-600">
          © {new Date().getFullYear()} <a className="cursor-pointer text-[#5b4f47] font-bold" href="/">Perfume Villa.</a> All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
