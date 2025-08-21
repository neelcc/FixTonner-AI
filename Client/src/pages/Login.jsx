import React, { useContext, useState } from "react";
import { Mail, Lock, User } from "lucide-react";
import { AppContext } from "../context/AppContext";
import axios from 'axios'

const AuthPage = () => {
  const [isLogin, setIsLogin] = useState(true);
  const { user , setUser , token , BackendUrl , setToken, isLoggedIn ,setIsLoggedIn } = useContext(AppContext)
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(BackendUrl);
    
    if (isLogin) {
      const { data } = await axios.post(BackendUrl+'user/login',{
        email,
        password
      })
      if(data.success){
        console.log(data.token);
        setUser(data.user)
        setToken(data.token)
        setIsLoggedIn(true)
        localStorage.setItem('token', data.token)
        console.log("Token in localStorage:", localStorage.getItem("token"));
        console.log(token);
        
      }
      console.log("Logging in with:", { email, password });
    } else {
      const { data } = await axios.post(BackendUrl+'user/register',{
        name,
        email,
        password
      })
      
      console.log(data.success);
      
      if(data.success){
        console.log(data.token);
        setUser(data.user)
        setToken(data.token)
        setIsLoggedIn(true)
        localStorage.setItem('token',data.token)
      }
      console.log("Signing up with:", { name, email, password });
      
    }
  };

  return (
    <div className="relative flex items-center justify-center min-h-screen bg-black overflow-hidden">
      {/* Background */}
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

      {/* Auth Card */}
      <div className="relative z-10 w-full max-w-md p-8 bg-white/10 backdrop-blur-lg rounded-2xl shadow-lg border border-gray-700">
        <h2 className="text-2xl font-outfit text-center text-white mb-6">
          {isLogin ? "Welcome Back " : "Create Account "}
        </h2>

        <form className="space-y-4" onSubmit={handleSubmit}>
          {!isLogin && (
            <div className="flex items-center gap-2 bg-gray-900 rounded-xl px-3 py-2">
              <User className="text-gray-400" size={18} />
              <input
                type="text"
                placeholder="Full Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full bg-transparent  text-white outline-none px-2 py-2"
                required
              />
            </div>
          )}

          <div className="flex items-center gap-2 bg-gray-900 rounded-xl px-3 py-2">
            <Mail className="text-gray-400" size={18} />
            <input
              type="email"
              placeholder="Email Address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-transparent text-white outline-none px-2 py-2"
              required
            />
          </div>

          <div className="flex items-center gap-2 bg-gray-900 rounded-xl px-3 py-2">
            <Lock className="text-gray-400" size={18} />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-transparent text-white outline-none px-2 py-2"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-gradient-to-r from-cyan-900 to-pink-900 text-white py-3 rounded-xl font-semibold hover:opacity-90 transition"
          >
            {isLogin ? "Login" : "Sign Up"} 
          </button>
        </form>

        <p className="text-gray-300 text-sm text-center mt-6">
          {isLogin ? "Don’t have an account?" : "Already have an account?"}{" "}
          <button
            onClick={() => setIsLogin(!isLogin)}
            className="text-pink-400 hover:underline font-medium"
          >
            {isLogin ? "Sign Up" : "Login"}
          </button>
        </p>
      </div>
    </div>
  );
};

export default AuthPage;
