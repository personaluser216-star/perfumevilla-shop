import React from "react";
import AnimateOnScroll from "../Componets/AnimateOnScroll";
import aboutbanner from "../assets/aboutbanner.png";
import stick from "../assets/stick.jpg";
import about1 from "../assets/about1.png";
import about2 from "../assets/about2.png";
import about3 from "../assets/about3.png";
import about4 from "../assets/about4.png";
import about5 from "../assets/about5.png";
import about6 from "../assets/about6.png";

import { FaStar, FaLeaf, FaHeart } from "react-icons/fa";
import "animate.css";

// ✅ Data arrays
const images = [
  { src: about1, title: "Fresh Florals" },
  { src: about2, title: "Heaven Scent" },
  { src: about3, title: "Alluring Aromas" },
  { src: about4, title: "Sensual Scents" },
  { src: about5, title: "The Essence of Love" },
  { src: about6, title: "Spiritual Scent" },
];

const bullets = [
  { icon: <FaStar />, text: "Premium quality fragrances curated globally" },
  { icon: <FaLeaf />, text: "Natural & long-lasting scents for every occasion" },
  { icon: <FaHeart />, text: "Unique blends that define your personality" },
];

const stats = [
  { value: "10+", label: "Years", desc: "Experience" },
  { value: "500+", label: "Items", desc: "Products" },
  { value: "2K+", label: "Clients", desc: "Happy Customers" },
  { value: "50+", label: "Locations", desc: "Stores Worldwide" },
];

// ✅ Reusable components
const ImageCard = ({ src, title }) => (
  <AnimateOnScroll>
    <div className="relative overflow-hidden shadow-lg cursor-pointer group">
      <img
        src={src}
        alt={title}
        className="w-full h-full object-cover transition duration-500 group-hover:blur-sm"
      />
      <div className="absolute inset-0 bg-[#5b4f47]/50 -translate-x-full group-hover:translate-x-0 transition-transform duration-500 flex items-center justify-center p-6">
        <span className="text-white text-md font-bold">{title}</span>
      </div>
    </div>
  </AnimateOnScroll>
);

const BulletItem = ({ icon, text }) => (
  <li className="flex items-center space-x-4">
    <div className="md:h-10 md:w-10 h-6 w-6 flex items-center justify-center rounded-full bg-[#5b4f47]/10 text-[#5b4f47]">
      {icon}
    </div>
    <span className="text-gray-700">{text}</span>
  </li>
);

const StatCard = ({ value, label, desc }) => (
  <AnimateOnScroll animation="animate__zoomIn">
    <div className="flex flex-col items-center">
      <div className="h-28 w-28 flex flex-col items-center justify-center rounded-full bg-[#5b4f47] shadow-md">
        <h3 className="text-2xl md:text-3xl font-bold text-white">{value}</h3>
      </div>
      <p className="text-sm md:text-base mt-2">{label}</p>
      <p className="text-gray-700 font-medium">{desc}</p>
    </div>
  </AnimateOnScroll>
);

const About = () => {
  return (
    <>
      {/* Hero Banner */}
      <div
        className="relative md:h-64 h-48 w-full flex items-center justify-center bg-cover bg-center"
        style={{ backgroundImage: `url(${stick})` }}
      >
        <div className="absolute inset-0 bg-black/35"></div>
        <div className="relative z-10 text-center text-white">
          <h1 className="text-2xl md:text-3xl font-extrabold uppercase tracking-wider drop-shadow-lg">
            About Us
          </h1>
          <p className="mt-3 text-base md:text-lg tracking-wide">
            <a href="/" className="hover:cursor-pointer">
              Home
            </a>{" "}
            / <span className="text-white">About</span>
          </p>
        </div>
      </div>

      {/* Section Title */}
      <div className="bg-[#f8f7f4] md:pt-12 text-center">
        <AnimateOnScroll>
          <p className="md:p-8 p-6 md:text-xl text-md uppercase">
            Cool and Romantic THE DELICATE FRAGRANCE
          </p>
          <p className="lowercase md:pb-12 pb-6">
            YOU FEEL BETTER WHEN YOU SMELL GOD
          </p>
        </AnimateOnScroll>
      </div>

      {/* Image Grid */}
      <div className="flex justify-center items-center md:min-h-screen bg-[#f8f7f4]">
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 gap-6 w-11/12 max-w-6xl">
          {images.map((img, i) => (
            <ImageCard key={i} src={img.src} title={img.title} />
          ))}
        </div>
      </div>

      {/* About Section */}
      <div className="grid md:grid-cols-2 gap-6 md:m-5 md:pt-12">
        <AnimateOnScroll>
          <div className="p-6 md:p-24">
            <p className="md:text-2xl text-xl font-semibold text-[#5b4f47]">
              YOUR PERFUME, YOUR IDENTITY
            </p>
            <p className="pt-6 text-gray-600 leading-relaxed">
              Duis aute irure dolor in reprehenderit in voluptate velit esse
              cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat
              cupidatat non proident, sunt in culpa qui officia deserunt mollit
              anim id est laborum. Quis nostrud exercitation ullamco laboris
              nisi ut aliquip.
            </p>
            <ul className="mt-6 space-y-4">
              {bullets.map((b, i) => (
                <BulletItem key={i} icon={b.icon} text={b.text} />
              ))}
            </ul>
          </div>
        </AnimateOnScroll>
        <AnimateOnScroll>
          <img
            src={aboutbanner}
            alt="Perfume banner"
            className="md:h-[520px] w-[520px] object-cover"
          />
        </AnimateOnScroll>
      </div>

      {/* Stats Section */}
      <section className="py-16 bg-[#f8f7f4]">
        <div className="max-w-screen-xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {stats.map((s, i) => (
            <StatCard key={i} {...s} />
          ))}
        </div>
      </section>
    </>
  );
};

export default About;
