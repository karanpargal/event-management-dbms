import React from "react";
import Features from "../../components/Landing/Features";
import Footer from "../../components/Landing/Footer";
import Hero from "../../components/Landing/Hero";
import Testimonials from "../../components/Landing/Testimonials";

const Landing = () => {
  return (
    <div className="w-full">
      <Hero />
      <Features />
      <Testimonials />
      <Footer />
    </div>
  );
};

export default Landing;
