import React, { useRef, useEffect, useState } from "react";
import { FaFlagUsa, FaShippingFast, FaStar, FaPaw } from "react-icons/fa";
import "animate.css";

const OurServices = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);

  const services = [
    {
      icon: <FaFlagUsa className="text-[#5b4f47] md:text-5xl text-xl" />,
      title: "Born in the USA",
      desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut posuere nibh augue, non cursus enim posuere vel.",
    },
    {
      icon: <FaShippingFast className="text-[#5b4f47] md:text-5xl text-xl" />,
      title: "Free Shipping & Returns",
      desc: "Enjoy free delivery and hassle-free returns on all orders with no minimum purchase required.",
    },
    {
      icon: <FaStar className="text-[#5b4f47] md:text-5xl text-xl" />,
      title: "10,000+ Reviews",
      desc: "Trusted by thousands of customers worldwide with excellent ratings and testimonials.",
    },
    {
      icon: <FaPaw className="text-[#5b4f47] md:text-5xl text-xl" />,
      title: "Cruelty Free",
      desc: "All our products are 100% cruelty-free, ethically sourced, and environmentally friendly.",
    },
  ];

  // IntersectionObserver to trigger animation
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) setIsVisible(true);
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) observer.observe(sectionRef.current);

    return () => {
      if (sectionRef.current) observer.unobserve(sectionRef.current);
    };
  }, []);

  return (
    <div ref={sectionRef} className="py-16 bg-[#f8f7f4]">
      {/* Heading */}
      <div
        className={`text-center mb-10 ${
          isVisible ? "animate__animated animate__fadeInUp" : "opacity-0"
        }`}
      >
        <h1 className="text-2xl md:text-3xl font-bold text-[#5b4f47]">
          Our Services
        </h1>
        <p className="text-gray-600 text-sm mt-2">
          We’re committed to delivering quality, care, and convenience.
        </p>
      </div>

      {/* Grid Section */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 px-6">
        {services.map((service, idx) => (
          <div
            key={idx}
            className={`flex flex-col items-center text-center p-6 hover:shadow-lg transition 
              ${isVisible ? "animate__animated animate__fadeInUp" : "opacity-0"}`}
            style={{ animationDelay: `${idx * 0.2}s` }} // staggered delay
          >
            <div className="mb-4">{service.icon}</div>
            <h3 className="text-lg font-semibold mb-2 text-[#5b4f47]">
              {service.title}
            </h3>
            <p className="text-sm text-gray-600">{service.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OurServices;
