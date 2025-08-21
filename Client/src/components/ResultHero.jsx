import React, { useContext, useState } from "react";
import { motion } from "framer-motion";
import { SendHorizontal, Tags } from "lucide-react";
import ToneTags from "./ToneTags";
import { AppContext } from "../context/AppContext";

const ResultHero = () => {
  const { tags, setTags, input_text, setInput_text } = useContext(AppContext);
  const [isLoading, setIsLoading] = useState(false);
  const { activeTags , setActiveTags } = useContext(AppContext)
  
  const handleSubmit = (e) => { 
    e.preventDefault();
    if (!input_text.trim()) return;
    console.log("Submitted:", input_text);
  };
  console.log(activeTags);
  
  const handleInput = (e) => {
    setInput_text(e.target.value);
  };

  return (
    <section className="min-h-screen flex flex-col items-center justify-center px-6 text-center text-white relative z-10">
      <div className="flex flex-col items-center bg-gray-300/10 px-8 shadow-lg py-12 rounded-md">
        {/* Headline */}
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-3xl md:text-5xl font-light mb-4"
        >
          Hey Neel! <br />
          <span className="font-normal">Let’s transform your words</span>
        </motion.h1>

        {/* Subheadline */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="text-gray-300 text-base md:text-lg max-w-xl mb-8"
        >
          Convert your message into the perfect tone with just one click.
        </motion.p>
      
        {/* Tone Tags */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 0.6 }}
          className="flex flex-wrap gap-3 justify-center mt-1 mb-6"
        >
            <ToneTags emoji="💼" label="Professional" idx="1"  />
            <ToneTags emoji="🤝" label="Friendly" idx="2" />
            <ToneTags emoji="😎" label="Casual"  idx="3" />
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
      </div>
    </section>
  );
};

export default ResultHero;
