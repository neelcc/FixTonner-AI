// src/components/Background.jsx
import React from "react";

const Background = ({ children }) => {
  return (
    <div className="min-h-screen w-full relative bg-black text-white overflow-hidden">
      {/* Prismatic Aurora Burst */}
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
        {/* Top Fade Grid Pattern */}
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
      {/* Content */}
      <div className="relative z-10">{children}</div>
    </div>
  );
};

export default Background;
