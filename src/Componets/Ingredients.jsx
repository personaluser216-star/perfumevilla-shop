import React, { useState, useRef, useEffect } from "react";
import perfumeImg from "../assets/perfume.png";
import { FiPlus } from "react-icons/fi";
import "animate.css";

const Ingredients = () => {
  const [openIndexes, setOpenIndexes] = useState([0]);
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);

  const ingredients = [
    {
      name: "Sandalwood",
      desc: "Sandalwood is an alluring and sophisticated fragrance. Valued for its woody composition, it is evocative of the Orient and has an intensity that can be both exotic and comforting.",
    },
    {
      name: "Lavender",
      desc: "In modern fragrance, lavender is lightly used in 'feminine' scents, although it turns up in plenty of 'shared' colognes and men's fragrances",
    },
    {
      name: "Rosemary",
      desc: "A woody evergreen, rosemary has super-fragrant needle-like leaves, and white, purple, blue or pink flowers, depending on the variety.",
    },
    {
      name: "Jasmine",
      desc: "Jasmine and rose are the two 'foundation stones' of perfumery. ... Jasmine gives a richness and intensity to fragrances.",
    },
    {
      name: "Chocolate",
      desc: "Chocolate is real, it smells so fantastic that its taste cannot give me as much pleasure as I get from its aroma.",
    },
  ];

  // IntersectionObserver for animation
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => {
      if (sectionRef.current) observer.unobserve(sectionRef.current);
    };
  }, []);

  const toggleDropdown = (index) => {
    if (openIndexes.includes(index)) {
      setOpenIndexes(openIndexes.filter((i) => i !== index));
    } else {
      setOpenIndexes([...openIndexes, index]);
    }
  };

  return (
    <section ref={sectionRef} className="bg-[#f8f7f4] py-12">
      <div className="text-center">
        <h2
          className={`text-2xl md:text-3xl font-bold text-[#5b4f47] mb-4 md:mt-6 ${
            isVisible ? "animate__animated animate__fadeInUp" : "opacity-0"
          }`}
        >
          Ingredients You Understand
        </h2>
        <p
          className={`text-gray-600 mb-6 text-lg md:text-base md:pb-20 ${
            isVisible ? "animate__animated animate__fadeInUp animate__delay-1s" : "opacity-0"
          }`}
        >
          If you subscribe to Native products, you can save up to 25% and get
          exclusive access to mini products!
        </p>
      </div>

      <div className="mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 items-start px-6">
        {/* Left Image */}
        <div
          className={`flex justify-end ${
            isVisible
              ? "animate__animated animate__fadeInLeft animate__delay-1s"
              : "opacity-0"
          }`}
        >
          <img
            src={perfumeImg}
            alt="Ingredients"
            className="shadow-lg md:h-[500px] w-[580px] object-cover"
          />
        </div>

        {/* Right Content */}
        <div
          className={`${
            isVisible
              ? "animate__animated animate__fadeInUp animate__delay-1s"
              : "opacity-0"
          }`}
        >
          <div className="space-y-3 md:mr-16">
            {ingredients.map((item, idx) => (
              <div
                key={idx}
                className={`border bg-[#f8f7f4] shadow-sm overflow-hidden ${
                  isVisible
                    ? "animate__animated animate__fadeInUp"
                    : "opacity-0"
                }`}
                style={{ animationDelay: `${idx * 0.2 + 1.2}s` }}
              >
                <button
                  onClick={() => toggleDropdown(idx)}
                  className="w-full flex justify-between items-center px-4 py-3 text-left font-semibold text-[#5b4f47]"
                >
                  {item.name}
                  <span
                    className={`transform transition-transform duration-300 ${
                      openIndexes.includes(idx) ? "rotate-45" : "rotate-0"
                    }`}
                  >
                    <FiPlus className="text-xl" />
                  </span>
                </button>

                <div
                  className={`px-4 pb-3 text-md text-gray-600 transition-all duration-500 ease-in-out ${
                    openIndexes.includes(idx)
                      ? "max-h-40 opacity-100"
                      : "max-h-0 opacity-0"
                  } overflow-hidden`}
                >
                  {item.desc}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Ingredients;
