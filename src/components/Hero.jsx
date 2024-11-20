import React from "react";
import { Button } from "./ui/button";
import { Link } from "react-router-dom";
import Footer from "@/view-trip/components/Footer";

const Hero = () => {
  return (
    <>
      <div className="flex flex-col items-center  gap-9">
        <h1 className="font-extrabold text-[50px] text-center mt-16 lg:w-[600px]">
          <div className="text-[#AA5486]">
            Adventure Awaits! 
          </div>{" "}
          <div>Smart Itineraries:</div>
          Tailored Just for You with AI
        </h1>
        <p className="text-center lg:text-xl text-sm text-gray-500 bg-pink-100 rounded-xl px-6 p-2 shadow-lg mx-3">
          Explore effortlessly with our AI-powered travel itinerary website!
          Tailored to your preferences and schedule, our platform creates
          dynamic, personalized travel plans.
          <p className="text-xs mt-2">
            Say goodbye to hours of research—let our smart itinerary planner
            design your perfect trip in minutes!
          </p>
        </p>
        <img
          src="/travelImage.jpeg"
          className="h-[500px] w-[800px] shadow-lg md:rounded-lg"
        />
        <Link to="/create-trip">
          <Button className="bg-black mb-10">
            {" "}
            Click to begin your journey
          </Button>
        </Link>
      </div>
      <Footer />
    </>
  );
};

export default Hero;
