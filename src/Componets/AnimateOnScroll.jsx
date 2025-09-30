import React from "react";
import { useInView } from "react-intersection-observer";

const AnimateOnScroll = ({ children, animation = "animate__fadeInUp", delay = 0 }) => {
  const { ref, inView } = useInView({
    triggerOnce: true, // ek var j animate thashe
    threshold: 0.2,    // 20% section visible thay tyare start
  });

  return (
    <div
      ref={ref}
      className={`opacity-0 ${inView ? `animate__animated ${animation} opacity-100` : ""}`}
      style={{ animationDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
};

export default AnimateOnScroll;
