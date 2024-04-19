import React from "react";
import Marquee from "react-easy-marquee";

const Testimonials = () => {
  return (
    <div className="bg-gradient-to-b from-gray-200 to-gray-100 py-20 text-center">
      <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-12 text-blue-900">
        Testimonials
      </h2>
      <div className="flex flex-col md:flex-row justify-center items-center">
        <div className="w-full">
          <Marquee
            duration={10000}
            pauseOnHover={true}
            
            height="250px"
            align="center"
          >
            <div className="w-full mx-10">
              <p className="text-lg md:text-xl text-gray-800 leading-relaxed">
                "Eventify has simplified event management for us. Lorem ipsum
                dolor sit amet, consectetur adipiscing elit."
              </p>
              <p className="font-bold text-blue-900 mt-4">
                - John Doe, Event Organizer
              </p>
            </div>
            <div className="w-full mx-10">
              <p className="text-lg md:text-xl text-gray-800 leading-relaxed">
                "We love using Eventify! It's user-friendly and efficient. Lorem
                ipsum dolor sit amet, consectetur adipiscing elit."
              </p>
              <p className="font-bold text-blue-900 mt-4">
                - Jane Smith, Attendee
              </p>
            </div>
          </Marquee>
        </div>
      </div>
    </div>
  );
};

export default Testimonials;
