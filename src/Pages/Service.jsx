import React from "react";
import stick from "../assets/stick.jpg";
import service from "../assets/service.png";
import servicepoint from "../assets/servicepoint.png";
import { FaMusic, FaGlasses } from "react-icons/fa6";
import "animate.css";
import AnimateOnScroll from "../Componets/AnimateOnScroll"

const Service = () => {
  const features = ["Fresh Florals", "Sensual Scents", "Heaven Scent", "Spiritual Scents"];

  const fragranceList = [
    {
      icon: <FaGlasses className="text-lg" />,
      title: "A fragrance that makes you go crazy",
      desc: `Shoes really are a never-ending product... very interesting facts about your feet and footwear.`,
    },
    {
      icon: <FaMusic className="text-lg" />,
      title: "A perfume that makes you marvellous",
      desc: `Our ethnic look by wears are beautiful... crafted with rayon fabric that keeps you at ease.`,
    },
  ];

  const services = [
    {
      number: "01.",
      title: "Visit Store",
      desc: "Offers outstanding unique shopping experience. Visit online today enjoy collections.",
    },
    {
      number: "02.",
      title: "Add To Cart",
      desc: "Add your cart with trending collection stylish hair wigs. Start your makeover today.",
    },
    {
      number: "03.",
      title: "Gift Cards",
      desc: "Shop now and collect your exciting gifts. Perfect gift for you and loved ones.",
    },
    {
      number: "04.",
      title: "Unique Shop",
      desc: "Relax and enjoy your collection! We believe everyone deserves to be beautiful.",
    },
  ];

  return (
    <>
      {/* Header Section */}
      <div
        className="relative md:h-64 h-48 flex items-center justify-center bg-cover bg-center"
        style={{ backgroundImage: `url(${stick})` }}
      >
        <div className="absolute inset-0 bg-black/35"></div>
        <div className="relative z-10 text-center text-white">
          <h1 className="text-2xl md:text-3xl font-extrabold uppercase tracking-wider drop-shadow-lg">
            Services
          </h1>
          <p className="mt-3 text-base md:text-lg tracking-wide">
            <a href="/" className="hover:cursor-pointer">Home</a> /{" "}
            <span className="text-white">Service</span>
          </p>
        </div>
      </div>

      {/* Intro Section */}
      <AnimateOnScroll animation="animate__fadeInUp">
        <div className="md:m-20 m-4 md:p-12 grid md:grid-cols-2 gap-10 items-center">
          <div className="relative">
            <img src={service} alt="Service" className="w-full h-96 object-cover shadow-lg" />
            <div className="absolute inset-0 bg-black/20"></div>
          </div>
          <div className="space-y-6">
            <h2 className="text-2xl md:text-3xl font-bold text-[#5b4f47] leading-snug">
              Making hearts come <br /> close to each other
            </h2>
            <p className="text-gray-600 leading-relaxed">
              Phasellus ullamcorper sem ac sagittis mollis. Aenean sit amet ex quis nisi gravida fermentum.
            </p>
            <ul className="space-y-3">
              {features.map((item, i) => (
                <li key={i} className="flex items-center space-x-3">
                  <span className="h-3 w-3 bg-[#5b4f47] rounded-full"></span>
                  <span className="text-gray-700">{item}</span>
                </li>
              ))}
            </ul>
            <button className="mt-4 px-6 py-3 bg-[#5b4f47] text-white shadow-md hover:bg-[#4a3f38] transition">
              Explore More
            </button>
          </div>
        </div>
      </AnimateOnScroll>

      {/* Fragrance Section */}
      <AnimateOnScroll animation="animate__fadeInUp" delay={200}>
        <div className="bg-[#f8f7f4] py-12">
          <p className="text-center md:text-2xl text-xl font-semibold uppercase text-[#5b4f47] mb-10">
            The Traditional Fragrance
          </p>
          <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 px-6 md:p-24">
            {fragranceList.map((item, i) => (
              <div key={i} className="grid md:grid-cols-6 gap-6 items-start">
                <div className="col-span-1 flex justify-center">
                  <div className="h-12 w-12 flex items-center justify-center rounded-full bg-[#5b4f47]/10 text-[#5b4f47] shadow">
                    {item.icon}
                  </div>
                </div>
                <div className="col-span-5 space-y-2">
                  <h3 className="text-lg md:text-xl font-bold text-[#5b4f47]">{item.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </AnimateOnScroll>

      {/* Services Section */}
      <AnimateOnScroll animation="animate__fadeInUp" delay={400}>
        <div className="py-16">
          <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center px-6 p-20">
            <div>
              <h2 className="text-2xl md:text-3xl font-bold text-[#5b4f47] mb-6">Our Services</h2>
              <p className="text-gray-600 mb-8 leading-relaxed">
                Axeo as a fashion brand, is breaking new ground and creating intelligent apparel that is anti-stain,
                anti-odour and cooler! We celebrate those special products that were made for worldwide customers.
              </p>
             <AnimateOnScroll animation="animate__fadeInUp" delay={600}>
               <div className="grid md:grid-cols-2 gap-8">
                {services.map((item, i) => (
                  <div key={i} className="flex items-start space-x-4">
                    <span className="text-[#5b4f47] font-bold text-lg">{item.number}</span>
                    <div>
                      <h4 className="font-semibold text-[#5b4f47]">{item.title}</h4>
                      <p className="text-gray-600 text-sm">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
             </AnimateOnScroll>
            </div>
            <div className="flex justify-center">
              <img
                src={servicepoint}
                alt="Services"
                className="shadow-lg object-cover w-full h-[450px]"
              />
            </div>
          </div>
        </div>
      </AnimateOnScroll>
    </>
  );
};

export default Service;
