import React, { useEffect } from "react";
import image1 from "../assets/hero1.png";
import image2 from "../assets/hero2.png";
import "animate.css";
import { useNavigate } from "react-router-dom";


const HeroSection = () => {
  const Navigate = useNavigate()
  const slides = [
    {
      image: image2,
      title: "Refreshing And Clean Spring Scents are Here!",
      subtitle: "Exclusively Available Online",
      buttonText: "Shop Now",
      
    },
    {
      image: image1,
      title: "Perfect Balance of Passion And Smell",
      subtitle: "Don't miss out!",
      buttonText: "Shop Now",
    },
  ];

  useEffect(() => {
    const items = document.querySelectorAll("[data-carousel-item]");
    let current = 0;

    const showSlide = (index) => {
      items.forEach((item, i) => {
        if (i === index) {
          item.classList.remove("hidden");
          item.setAttribute("data-carousel-item", "active");
        } else {
          item.classList.add("hidden");
          item.removeAttribute("data-carousel-item");
        }
      });
    };

    const interval = setInterval(() => {
      current = (current + 1) % items.length;
      showSlide(current);
    }, 4000);

    const prevBtn = document.querySelector("[data-carousel-prev]");
    const nextBtn = document.querySelector("[data-carousel-next]");

    prevBtn?.addEventListener("click", () => {
      current = (current - 1 + items.length) % items.length;
      showSlide(current);
    });

    nextBtn?.addEventListener("click", () => {
      current = (current + 1) % items.length;
      showSlide(current);
    });

    return () => clearInterval(interval);
  }, []);

  return (
    <div id="indicators-carousel" className="relative w-full h-[60vh] md:h-[88vh] group">
      <div className="relative h-[60vh] md:h-[88vh] overflow-hidden">
        {slides.map((slide, index) => (
          <div
            key={index}
            className={`${
              index === 0
                ? "duration-700 ease-in-out"
                : "hidden duration-700 ease-in-out"
            }`}
            data-carousel-item={index === 0 ? "active" : ""}
          >
            {/* Background Image */}
            <img
              src={slide.image}
              className="w-full h-[60vh] md:h-[88vh] object-cover"
              alt={`Slide ${index + 1}`}
            />

            {/* Overlay Content */}
            <div className="absolute inset-0 bg-black/10 flex items-center justify-start text-[#5b4f47] px-4 sm:px-8 md:px-20 h-[60vh] md:h-[88vh]">
              <div className="text-left max-w-xs sm:max-w-md md:max-w-xl">
                <h1 className="text-xl sm:text-2xl md:text-4xl lg:text-5xl font-bold mb-2 sm:mb-4 animate__slideInLeft animate__animated">
                  {slide.title}
                </h1>
                <p className="text-sm sm:text-base md:text-lg lg:text-xl mb-4 sm:mb-6 animate__slideInLeft animate__animated">
                  {slide.subtitle}
                </p>
                <button
                onClick={()=>Navigate("/collection")}
                className="bg-transparent border-[#5b4f47] border-2 text-black text-sm sm:text-base px-3 sm:px-6 py-2 sm:py-3 transition hover:bg-[#5b4f47] hover:text-white">
                  {slide.buttonText}
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Prev Button */}
      <button
        type="button"
        className="absolute top-1/2 left-2 sm:left-4 transform -translate-y-1/2 
                   z-30 hidden group-hover:flex items-center justify-center 
                   w-8 h-8 sm:w-10 sm:h-10 border border-black rounded-full 
                   bg-transparent hover:bg-transparent 
                   hover:border-[#5b4f47] transition"
        data-carousel-prev
      >
        <svg
          className="w-3 h-3 sm:w-4 sm:h-4 text-black group-hover:text-[#5b4f47]"
          fill="none"
          viewBox="0 0 6 10"
        >
          <path
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M5 1L1 5l4 4"
          />
        </svg>
      </button>

      {/* Next Button */}
      <button
        type="button"
        className="absolute top-1/2 right-2 sm:right-4 transform -translate-y-1/2 
                   z-30 hidden group-hover:flex items-center justify-center 
                   w-8 h-8 sm:w-10 sm:h-10 border border-black rounded-full 
                   bg-transparent hover:bg-transparent 
                   hover:border-[#5b4f47] transition"
        data-carousel-next
      >
        <svg
          className="w-3 h-3 sm:w-4 sm:h-4 text-black group-hover:text-[#5b4f47]"
          fill="none"
          viewBox="0 0 6 10"
        >
          <path
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            d="m1 9 4-4-4-4"
          />
        </svg>
      </button>
    </div>
  );
};

export default HeroSection;
