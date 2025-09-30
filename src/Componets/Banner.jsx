import React, { useRef, useEffect, useState } from "react";
import banner1 from "../assets/banner1.png";
import banner2 from "../assets/banner2.png";
import banner3 from "../assets/banner3.png";
import banner4 from "../assets/banner4.png";
import "animate.css";
import { useNavigate } from "react-router-dom";

const Banner = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.2 } // 20% section visible then animate
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  const banners = [
    { image: banner1, title: "Men's Perfume", href: "/collection/Men'sPerfume" },
    { image: banner2, title: "Women's Perfume", href: "/collection/Women'sPerfume" },
    { image: banner3, title: "Unisex Perfume", href: "/collection/UnisexPerfume" }
    
  ];

  return (
    <section ref={sectionRef} className="bg-[#f8f7f4] py-12">
      <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {banners.map((item, idx) => (
            <div
              key={idx}
              onClick={() => item.href && navigate(item.href)}
              className={`group relative overflow-hidden shadow-lg cursor-pointer 
                ${isVisible ? "animate__animated animate__fadeInUp" : "opacity-0"}`}
              style={{ animationDelay: `${idx * 0.2}s` }}
            >
              <img
                src={item.image}
                alt={item.title}
                className="w-full md:h-80 h-36 object-cover transform group-hover:scale-110 transition duration-500"
              />
              <div className="absolute inset-0 bg-black/30 group-hover:bg-black/40 transition"></div>
              <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/60 to-transparent text-center">
                <h3 className="text-white md:text-md text-sm font-semibold uppercase tracking-wide">
                  {item.title}
                </h3>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Banner;
