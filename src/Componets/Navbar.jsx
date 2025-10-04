import React, { useState, useContext } from "react";
import logo from "../assets/logo.png";
import { BsCart4 } from "react-icons/bs";
import { FaRegHeart } from "react-icons/fa6";
import { Link } from "react-router-dom";
import { ShopContext } from "../Context/ShopContext";
import { FaBoxOpen } from "react-icons/fa"; 

const Navbar = () => {
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeLink, setActiveLink] = useState("Home");
  const [openDropdown, setOpenDropdown] = useState(null);

  // ✅ cart from context
  const { cart } = useContext(ShopContext);
  const { totalItems ,wishlistCount } = useContext(ShopContext);

  const navItems = [
    { label: "Home", href: "/" },
    {
      label: "Shop",
      isDropdown: true,
      items: [
        { label: "Men's Perfume", href: "/collection/Men'sPerfume" },
        { label: "Women's Perfume", href: "/collection/Women'sPerfume" },
        { label: "Unisex Perfume", href: "/collection/UnisexPerfume" },
      ],
    },
    {
      label: "Pages",
      isDropdown: true,
      items: [
        { label: "About", href: "/about" },
        { label: "Services", href: "/service" },
      ],
    },
    { label: "Contact", href: "/contact" },
  ];

  return (
    <nav className="bg-[#F8F7F4] border-gray-200 dark:bg-gray-900 dark:border-gray-700">
      <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between py-2">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link to="/" className="flex items-center space-x-2">
              <img
                src={logo}
                className="md:h-20 object-contain pt-1 h-16"
                alt="Logo"
              />
            </Link>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex md:space-x-8 items-center">
            {navItems.map((item, idx) =>
              item.isDropdown ? (
                <div key={idx} className="relative group">
                  <button
                    onClick={() => setActiveLink(item.label)}
                    className={`flex items-center text-sm text-gray-700 font-medium uppercase hover:text-[#5b4f47] cursor-pointer transition-colors duration-200 ${
                      activeLink === item.label
                        ? "text-[#5b4f47] font-semibold"
                        : ""
                    }`}
                  >
                    <span>{item.label}</span>
                    <svg
                      className="w-3 h-3 ml-1"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 10 6"
                    >
                      <path
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="m1 1 4 4 4-4"
                      />
                    </svg>
                  </button>

                  {/* Dropdown */}
                  <div className="absolute left-0 mt-6 w-48 opacity-0 scale-95 group-hover:opacity-100 group-hover:scale-100 transition-all duration-200 z-20 shadow-lg bg-[#5b4f47]">
                    <ul className="py-2 text-sm text-white font-light uppercase border-t-2 border-[#5b4f47]">
                      {item.items.map((subItem, subIdx) => (
                        <li key={subIdx}>
                          <Link
                            to={subItem.href}
                            className="block px-4 py-2 hover:text-white hover:font-medium transition-colors duration-200"
                          >
                            {subItem.label}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ) : (
                <Link
                  key={idx}
                  to={item.href}
                  onClick={() => setActiveLink(item.label)}
                  className={`text-sm text-gray-700 font-medium uppercase hover:text-[#5b4f47] transition-colors duration-200 ${
                    activeLink === item.label
                      ? "text-[#5b4f47] font-semibold"
                      : ""
                  }`}
                >
                  {item.label}
                </Link>
              )
            )}
          </div>

          {/* Icons */}
          <div className="flex items-center space-x-5">
  {/* ✅ Wishlist */}
   <Link to="/wishlist" className="relative text-[#5b4f47]">
        <FaRegHeart className="text-2xl sm:text-3xl" />
        <span className="h-5 w-5 absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full text-center">
          {wishlistCount}
        </span>
      </Link>

      {/* Cart */}
      <Link to="/cart" className="relative text-[#5b4f47]">
        <BsCart4 className="text-2xl sm:text-3xl" />
        <span className="h-5 w-5 absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full text-center">
          {totalItems}
        </span>
      </Link>
 <Link to="/orders" className="relative text-[#5b4f47] ml-4 group">
  <FaBoxOpen className="text-3xl sm:text-4xl" />

  {/* Tooltip only for md and above */}
  <span className="hidden md:inline-block absolute top-1/2 left-full ml-2 -translate-y-1/2 bg-[#5b4f47] text-white text-xs px-2 py-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap">
    Order Track
  </span>
</Link>





  {/* Mobile Menu Toggle */}
  <button
    className="md:hidden text-gray-700 dark:text-gray-200 hover:text-[#5b4f47]"
    onClick={() => setMobileMenuOpen(!isMobileMenuOpen)}
  >
    <svg
      className="w-8 h-8"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M4 6h16M4 12h16M4 18h16"
      />
    </svg>
  </button>
</div>

        </div>
      </div>

      {/* Mobile Menu */}
    {isMobileMenuOpen && (
  <div className="md:hidden mx-4 my-2 rounded-xl shadow-lg bg-[#5b4f47] p-4 animate-fadeIn">
    {navItems.map((item, idx) =>
      item.isDropdown ? (
        <div key={idx} className=" border-gray-200 pb-2">
          <button
            className="flex justify-between items-center w-full text-left text-sm text-white font-semibold uppercase py-2"
            onClick={() =>
              setOpenDropdown(
                openDropdown === item.label ? null : item.label
              )
            }
          >
            {item.label}
            <svg
              className={`w-5 h-5 ml-2 transform transition-transform ${
                openDropdown === item.label ? "rotate-180" : ""
              }`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </button>
          {openDropdown === item.label && (
            <div className="pl-4 mt-1 space-y-2 transition-all duration-300 ease-in-out">
              {item.items.map((subItem, subIdx) => (
                <Link
                  key={subIdx}
                  to={subItem.href}
                  className="block text-sm text-white transition-colors duration-200 uppercase"
                  onClick={() => {
                    setOpenDropdown(null); // close dropdown
                    setMobileMenuOpen(false); // close mobile menu
                    setActiveLink(subItem.label); // optional: set active link
                  }}
                >
                  {subItem.label}
                </Link>
              ))}
            </div>
          )}
        </div>
      ) : (
        <Link
          key={idx}
          to={item.href}
          onClick={() => {
            setActiveLink(item.label);
            setMobileMenuOpen(false); // close mobile menu
          }}
          className={`block py-2 text-sm text-white uppercase transition-colors duration-200 ${
            activeLink === item.label ? "font-semibold" : "font-normal"
          }`}
        >
          {item.label}
        </Link>
      )
    )}
  </div>
)}

    </nav>
  );
};

export default Navbar;
