import React, { useContext } from "react";
import { AppContext } from "../context/AppContext";

const ToneTags = ({ emoji, label, idx }) => {
  const { activeTags, setActiveTags } = useContext(AppContext);

  const toggleTag = () => {
    if (activeTags.includes(label)) {
      // remove tag if already selected
      setActiveTags(activeTags.filter((tag) => tag !== label));
    } else {
      // add tag if not present
      setActiveTags([...activeTags, label]);
    }
  };

  const isActive = activeTags.includes(label);
  
  return (
    <button
      key={idx}
      onClick={toggleTag}
      className={`px-3 py-2 border flex items-center justify-center rounded-full text-sm gap-2 transition shadow-[6px_6px_19px_-3px_rgba(236,72,153,0.15)]
        ${isActive ? "bg-pink-500 text-white ring-2 ring-purple-300 " : "bg-white text-black"}`}
    >
      <span>{label}</span>
      <span className="shadow-[6px_6px_9px_-6px_rgba(0,0,0,0.7)] rounded-full">
        {emoji}
      </span>
    </button>
  );
};

export default ToneTags;
