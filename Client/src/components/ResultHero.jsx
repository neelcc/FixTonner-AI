import React, { useContext, useState } from "react";
import { SendHorizontal } from "lucide-react";
import { motion } from "framer-motion";
import ToneTags from "./ToneTags";
import { AppContext } from "../context/AppContext";
import { useNavigate } from "react-router-dom";

const SkeletonLoader = () => {
  return (
    <div className="w-full max-w-2xl flex flex-col items-center animate-pulse">
      {/* Skeleton for Heading */}
      <div className="h-8 md:h-12 w-64 bg-gray-700/40 rounded-lg mb-4"></div>

      {/* Skeleton for Subheading */}
      <div className="h-4 w-80 bg-gray-700/40 rounded-md mb-6"></div>

      {/* Skeleton for Tone Tags */}
      <div className="flex flex-wrap gap-3 justify-center mt-1 mb-6">
        {Array(6)
          .fill(0)
          .map((_, i) => (
            <div
              key={i}
              className="h-10 w-28 bg-gray-700/40 rounded-full"
            ></div>
          ))}
      </div>

      {/* Skeleton for Input */}
      <div className="w-full max-w-2xl  px-2 flex items-center bg-gray-700/40 rounded-xl h-12  "></div>
    </div>
  );
};

const ResultHero = () => {
  const navigate = useNavigate()
  const {
    tags,
    setTags,
    input_text,
    setInput_text,
    isLoggedIn,
    user,
    promptResult,
    output_text,
    isResultLoaded,
    setIsResultLoaded,
    activeTags,
    setActiveTags,
    credits
  } = useContext(AppContext);

  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if(user==null){
       alert("Pls login bro!")
       navigate('/login')
    }

    if(credits<1 && user!=null ){
      return alert("No more credits left!")
    }

    if (!input_text.trim()) return;
    console.log("Submitted:", input_text);
    setInput_text("")
    setActiveTags([])
    await promptResult();
  };

  const handleInput = (e) => {
    setInput_text(e.target.value);
  };

  return (
    <section className="min-h-screen flex flex-col items-center justify-center px-6 text-center text-white relative z-1">
      <div className="flex flex-col items-center bg-gray-300/10 px-8 shadow-lg py-12 rounded-md ">
        {/* Show Skeleton if Loading */}
        {isResultLoaded ? (
          <SkeletonLoader />
        ) : (
          <>
            <motion.h1
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-3xl md:text-5xl font-light mb-4"
            >
              {!user ? "Hey User!" : `Hey ${user.name}`}
              <br />  
              <span className="font-normal mt-4 ">
                {!user
                  ? "Oops, looks like you forgot to login"
                  : "Let’s transform your words"}
              </span>
            </motion.h1>

            {/* Subheadline */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.6 }}
              className="text-gray-300 text-base md:text-lg max-w-xl mb-8"
            >
              { !user ? "Go and login first!" : "Convert your message into the perfect tone with just one click."}
            </motion.p>

            {/* Tone Tags */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7, duration: 0.6 }}
              className="flex flex-wrap gap-3 justify-center mt-1 mb-6"
            >
              <ToneTags emoji="💼" label="Professional" idx="1" />
              <ToneTags emoji="🤝" label="Friendly" idx="2" />
              <ToneTags emoji="😎" label="Casual" idx="3" />
              <ToneTags emoji="🎩" label="Formal" idx="4" />
              <ToneTags emoji="😂" label="Humorous" idx="5" />
              <ToneTags emoji="🧠" label="Polite" idx="6" />
            </motion.div>

            {/* Prompt Input */}
            <motion.form
              onSubmit={handleSubmit}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.6 }}
              className="w-full max-w-2xl mt-2 border px-2 flex items-center bg-white rounded-xl"
            >
              <input
                type="text"
                placeholder="Type 'send notes', 'assignment completed', 'when is holiday?' "
                className="w-full px-1 py-3 outline-none text-black rounded-xl"
                onChange={handleInput}
                value={input_text}
              />
              <button
                type="submit"
                className="p-2 rounded-full hover:bg-gray-200 transition"
              >
                <SendHorizontal color="black" />
              </button>
            </motion.form>
          </>
        )}
      </div>
    </section>
  );
};

export default ResultHero;
