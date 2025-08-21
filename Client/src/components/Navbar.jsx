// Navbar.jsx
import React, { useState } from "react";
import { Menu, X } from "lucide-react"; // hamburger + close icons
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate()

  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <nav className={`w-full flex items-center justify-between py-4 px-6 lg:px-12 relative 
    ${isOpen && "bg-black border-b" } z-91 `}>
      {/* Logo */}
      <div className="text-xl font-light tracking-wide text-white">
        TextAura
      </div>

      <div className="hidden md:flex space-x-10 text-sm font-light text-gray-200">
        <button className="hover:text-white transition">Home</button>
        <button className="hover:text-white transition">Pricing</button>
        <button onClick={()=>{  navigate('/login' ) }} className="hover:text-white transition">Login</button>
      </div>

      <div className="md:hidden">
        <button
          onClick={toggleMenu}
          className="text-gray-200 hover:text-white focus:outline-none"
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {isOpen && (
        <div className="absolute top-16 left-0 w-full bg-black/90 backdrop-blur-md flex flex-col items-center space-y-6 py-8 md:hidden">
          <button
            onClick={toggleMenu}
            className="text-gray-200 hover:text-white transition"
          >
            Home
          </button>
          <button
            onClick={toggleMenu}
            className="text-gray-200 hover:text-white transition"
          >
            Pricing
          </button>
          <button
            onClick={()=>{ toggleMenu(); navigate('/login' ) }}
            className="text-gray-200 hover:text-white transition"
          >
            Login
          </button>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
