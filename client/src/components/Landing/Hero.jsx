import React from "react";

const Hero = () => {
  return (
    <div className="bg-gradient-to-b from-blue-500 to-blue-400 py-20 text-white text-center">
      <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
        Welcome to Eventify
      </h1>
      <p className="text-lg md:text-xl lg:text-2xl mb-8">
        Your all-in-one platform for seamless event planning and management
      </p>
      <div className="flex flex-col md:flex-row justify-center items-center">
        <button
          className="bg-white text-blue-500 py-3 px-6 mt-6 md:mr-4 rounded-lg hover:bg-blue-100 hover:text-blue-600 transition duration-300 ease-in-out shadow-lg focus:outline-none"
          onClick={() => {
            window.location.href = "/register";
          }}
        >
          Get Started
        </button>
        <button className="bg-transparent text-white border-2 border-white py-3 px-6 mt-6 md:ml-4 rounded-lg hover:bg-white hover:text-blue-500 transition duration-300 ease-in-out shadow-lg focus:outline-none">
          Learn More
        </button>
      </div>
    </div>
  );
};

export default Hero;
