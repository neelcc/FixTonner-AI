import React, { useContext } from "react";
import { Copy } from "lucide-react";
import { AppContext } from "../context/AppContext";
import { useNavigate } from "react-router-dom";

const Output = () => {
    const navigate = useNavigate()
    const { output_text, isResultLoaded , errorMessage } = useContext(AppContext)

    const handleCopyClick = async () => {
        try {
            await window.navigator.clipboard.writeText(output_text);
            alert("Copied to clipboard!");
        } catch (err) {
            console.error(
                "Unable to copy to clipboard.",
                err
            );
            alert("Copy to clipboard failed.");
        }
    }
  return (

    <>
     <div
        className="absolute inset-0 z-0"
        style={{
          background: `
            radial-gradient(ellipse 120% 80% at 70% 20%, rgba(255, 20, 147, 0.15), transparent 50%),
            radial-gradient(ellipse 100% 60% at 30% 10%, rgba(0, 255, 255, 0.12), transparent 60%),
            radial-gradient(ellipse 90% 70% at 50% 0%, rgba(138, 43, 226, 0.18), transparent 65%),
            radial-gradient(ellipse 110% 50% at 80% 30%, rgba(255, 215, 0, 0.08), transparent 40%),
            #000000
          `,
        }}
      />

    <div
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: `
            linear-gradient(to right, #1f2937 1px, transparent 1px),
            linear-gradient(to bottom, #1f2937 1px, transparent 1px)
          `,
          backgroundSize: "20px 30px",
          WebkitMaskImage:
            "radial-gradient(ellipse 70% 60% at 50% 0%, #000 60%, transparent 100%)",
          maskImage:
            "radial-gradient(ellipse 70% 60% at 50% 0%, #000 60%, transparent 100%)",
        }}
      />
     { output_text ? 
      <section className="min-h-screen flex flex-col items-center justify-center px-6 text-center text-white relative z-10" >
     <div className="flex flex-col items-center justify-center text-center  bg-gray-300/10 px-8 shadow-lg py-12 rounded-md "> 
      <h1 className="text-3xl md:text-5xl font-medium mb-4 text-white">
        All Fixed, Just for You! 
      </h1>

      <p className="text-gray-300 text-base md:text-lg max-w-2xl mb-8">
        Sounds much better now, clearer, smoother, and ready to share.
      </p>

      <div className="relative bg-red-50 border border-red-200 px-6 py-4 rounded-xl shadow-md max-w-3xl w-full text-left">
        <button
          onClick={handleCopyClick}
          className="absolute top-3 right-3 text-red-600 hover:text-red-800 transition"
          aria-label="Copy text"
        >
          <Copy size={18} />
        </button>

        <p className="text-red-900 text-sm md:text-base leading-relaxed pr-8">
        {output_text}
        </p>
      </div>
      <p className=" mt-2 " >Want to <span onClick={()=>{ navigate('/get-started') }} className=" text-blue-400 cursor-pointer " >Generate</span> more ? </p>
    </div>
    </section > : 
    <section className="min-h-screen flex flex-col items-center justify-center px-6 text-center text-white relative z-10" >
     <div className="flex flex-col items-center justify-center text-center  bg-gray-300/10 px-8 shadow-lg py-12 rounded-md ">
      <h1 className=" font-bold text-3xl mb-2 " >Issue From Developer!</h1>
      <p className=" text-sm mb-3 " > Developer is broke , that's why you can't enter more prompts! </p>
     <p className=" text-red-300 " >{errorMessage}</p>
     <p className=" mt-2 " >Want to go <span onClick={()=>{ navigate('/') }} className=" text-blue-400 cursor-pointer " >Home</span> ? </p>
     </div>
    </section>
    }
 </>
  );
};

export default Output;
