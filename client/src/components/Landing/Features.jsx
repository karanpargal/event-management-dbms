import React from "react";
import Card from "../shared/Card";

const Features = () => {
  return (
    <div className="py-20 text-center flex flex-col justify-center items-center">
      <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-12 text-blue-900">
        Features
      </h2>
      <div className="grid grid-cols-3 gap-6 w-4/5 place-items-center">
        <Card
          title="Effortless Planning"
          description="Easily create and manage events with our intuitive planning tools. Spend less time organizing and more time enjoying your event."
        />
        <Card
          title="Streamlined Registration"
          description="Seamlessly register attendees, track RSVPs, and manage guest lists. Our registration system takes the hassle out of event sign-ups."
        />
        <Card
          title="Interactive Experience"
          description="Engage your audience with interactive features like live polls, Q&A sessions, and networking opportunities. Make your event memorable for all attendees."
        />
      </div>
    </div>
  );
};

export default Features;
