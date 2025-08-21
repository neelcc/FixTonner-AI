import { Badge } from "lucide-react";
import React from "react";
import { useNavigate } from "react-router-dom";


const Hero = () => {
 const navigate =    useNavigate()
  return (
    <section className="flex flex-col items-center justify-center text-center px-6 md:px-12 min-h-[80vh]">
      <div className="px-5 py-2 mb-2 border rounded-2xl flex items-center justify-center gap-2">
    <Badge size={16} color="pink" className="shrink-0" /> 
    <p className="text-sm leading-none">For Students</p>
    </div>

      <h1 className="text-4xl md:text-6xl font-light tracking-tight max-w-3xl leading-tight">
      Transform Any Text Into the 
     <span className="font-normal"> Perfect Tone </span>
      </h1>
      <p className="mt-6 text-base md:text-lg font-light max-w-xl text-gray-300">
      Type your message and instantly convert it to sound casual, polite, or just the way you want , cooked for every situation
      </p>
      <div className="mt-8">
        <button onClick={()=>{ navigate('/get-started')  }} className="px-6 py-3 text-sm font-light border border-white rounded-lg hover:bg-white hover:text-black transition">
          Try It Now
        </button>
      </div>
    </section>
  );
};

export default Hero;
