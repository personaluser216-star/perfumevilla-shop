import React from "react";
import stick from "../assets/stick.jpg";
import { IoLocationSharp } from "react-icons/io5";
import { MdAddIcCall } from "react-icons/md";
import { IoMailSharp } from "react-icons/io5";


const ContactUs = () => {
  return (
    <section className="bg-[#F8F7F4]">
      {/* Hero / Banner */}
      <div
        className="relative md:h-64 h-48 w-full flex items-center justify-center bg-cover bg-center"
        style={{ backgroundImage: `url(${stick})` }}
      >
        <div className="absolute inset-0 bg-black/35"></div>
        <div className="relative z-10 text-center text-white">
          <h1 className="text-2xl md:text-3xl font-extrabold uppercase tracking-wider drop-shadow-lg">
            Contact Us
          </h1>
          <p className="mt-3 text-base md:text-lg tracking-wide">
            <a href="/" className="hover:cursor-pointer">
              Home
            </a>{" "}
            / <span className="text-white">Contact</span>
          </p>
        </div>
      </div>

      {/* Contact Section */}
      <div className="max-w-screen-xl mx-auto px-6 lg:px-16 md:py-20 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Left: Info */}
{/* Left: Info */}
<div className="space-y-8">
  <div className="bg-white/70 backdrop-blur-md shadow-lg p-6 hover:shadow-xl transition flex items-center space-x-4">
    <div className="p-3 rounded-full bg-[#5b4f47]/10 text-[#5b4f47] text-2xl">
      <IoLocationSharp />
    </div>
    <div>
      <h3 className="text-md font-semibold text-[#5b4f47] uppercase tracking-wide">
        Our Store
      </h3>
      <p className="text-gray-500">123 Aroma Street, Fragrance City</p>
    </div>
  </div>

  <div className="bg-white/70 backdrop-blur-md shadow-lg p-6 hover:shadow-xl transition flex items-center space-x-4">
    <div className="p-3 rounded-full bg-[#5b4f47]/10 text-[#5b4f47] text-2xl">
      <MdAddIcCall />
    </div>
    <div>
      <h3 className="text-md font-semibold text-[#5b4f47] uppercase tracking-wide">
        Call Us
      </h3>
      <p className="text-gray-500">+1 (123) 456-7890</p>
    </div>
  </div>

  <div className="bg-white/70 backdrop-blur-md shadow-lg p-6 hover:shadow-xl transition flex items-center space-x-4">
    <div className="p-3 rounded-full bg-[#5b4f47]/10 text-[#5b4f47] text-2xl">
      <IoMailSharp />
    </div>
    <div>
      <h3 className="text-md font-semibold text-[#5b4f47] uppercase tracking-wide">
        Email
      </h3>
      <p className="text-gray-500">support@perfumevilla.com</p>
    </div>
  </div>

  {/* Social */}
  <div className="flex space-x-4 pt-4">
    <a
      href="#"
      className="text-2xl text-[#5b4f47] hover:text-pink-600 transition transform hover:scale-110"
    >
      <i className="fab fa-instagram"></i>
    </a>
    <a
      href="#"
      className="text-2xl text-[#5b4f47] hover:text-blue-600 transition transform hover:scale-110"
    >
      <i className="fab fa-facebook"></i>
    </a>
    <a
      href="#"
      className="text-2xl text-[#5b4f47] hover:text-sky-500 transition transform hover:scale-110"
    >
      <i className="fab fa-twitter"></i>
    </a>
  </div>
</div>


          {/* Right: Form */}
          <div className="bg-white shadow-2xl  p-8 hover:shadow-xl transition">
            <form className="space-y-6">
              <div>
                <label className="block text-sm font-bold text-[#5b4f47] uppercase tracking-wide">
                  Full Name
                </label>
                <input
                  type="text"
                  required
                  placeholder="Enter Your Name"
                  className="mt-2 w-full p-2 border border-gray-300  focus:ring-2 focus:ring-[#5b4f47] focus:outline-none shadow-sm hover:shadow-md transition"
                />
              </div>

              <div>
                <label className="block text-sm font-bold text-[#5b4f47] uppercase tracking-wide">
                  Email Address
                </label>
                <input
                  type="email"
                  required
                  placeholder="Enter Your Email Address"
                  className="mt-2 w-full p-2 border border-gray-300  focus:ring-2 focus:ring-[#5b4f47] focus:outline-none shadow-sm hover:shadow-md transition"
                />
              </div>

             

              <div>
                <label className="block text-sm font-bold text-[#5b4f47] uppercase tracking-wide">
                  Message
                </label>
                <textarea
                  rows="4"
                  placeholder="Write your message..."
                  className="mt-2 w-full p-2 border border-gray-300  focus:ring-2 focus:ring-[#5b4f47] focus:outline-none shadow-sm hover:shadow-md transition"
                ></textarea>
              </div>

              <button
                type="submit"
                className="w-full bg-[#5b4f47] text-white py-2  font-semibold text-md uppercase tracking-wide hover:bg-[#463c35] transition shadow-lg hover:shadow-2xl"
              >
                Send Message 
              </button>
            </form>
          </div>
        </div>

        {/* Map */}
        {/* Map */}
<div className="md:mt-20 mt-12">
  <iframe
    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d25668.125489045535!2d76.29856563445632!3d32.21677687974309!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x391b50df65bd7311%3A0x3e08bdb100c6dc10!2sDharamshala%2C%20Himachal%20Pradesh!5e1!3m2!1sen!2sin!4v1758901962376!5m2!1sen!2sin"
    width="100%"
    height="450"
    style={{ border: 0 }}
    allowFullScreen=""
    loading="lazy"
    referrerPolicy="no-referrer-when-downgrade"
    className=" shadow-lg"
  ></iframe>
</div>


      </div>
    </section>
  );
};

export default ContactUs;
