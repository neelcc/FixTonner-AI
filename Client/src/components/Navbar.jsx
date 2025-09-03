// Navbar.jsx
import React, { useContext, useState } from "react";
import { Menu, X } from "lucide-react"; // hamburger + close icons
import { useNavigate } from "react-router-dom";
import { AppContext } from "../context/AppContext";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { user , setUser, logout } = useContext(AppContext)
  const navigate = useNavigate()  

  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <nav className={`w-full flex items-center justify-between py-4 px-6 lg:px-12 relative z-90
    ${isOpen && "bg-black border-b" }`}>
      {/* Logo */}
      <div onClick={()=>{ navigate('/') }} className=" cursor-pointer text-xl font-light tracking-wide text-white">
        MssgAura
      </div>
      { !user ? 
      <div className="hidden md:flex space-x-10 text-sm font-light text-gray-200">
        <button onClick={()=>{navigate('/')}} className="hover:text-white transition">Home</button>
        <button className="hover:text-white transition">Pricing</button>
        <button onClick={()=>{  navigate('/login' ) }} className="hover:text-white transition">Login</button>
      </div> : 
      <div className="md:flex  items-center justify-center hidden  space-x-10 text-sm font-light text-gray-200">
      <button className="hover:text-white transition">Pricing</button>
      <button onClick={logout} className="hover:text-white transition">Logout</button>
      <button className=" text-center relative flex items-center gap-2 px-4 py-1 rounded-full bg-fuchsia-900/40 text-white font-medium text-sm shadow-lg hover:opacity-90 transition">
      Credits : {user.credits}
      </button>
    </div>
    }
      <div className="md:hidden flex flex-col gap-2 items-center justify-center   ">
        <button
          onClick={toggleMenu}
          className="text-gray-200 hover:text-white focus:outline-none"
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {isOpen && (
        <div className=" flex flex-col  top-16 left-0 w-full bg-black backdrop-blur-md  items-center space-y-6 py-8 md:hidden">
          <button
            onClick={()=>{ toggleMenu(); navigate('/') }}
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
