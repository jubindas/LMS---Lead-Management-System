import { useState } from "react";

import { FcGoogle } from "react-icons/fc";

import {
  AiOutlineEye,
  AiOutlineEyeInvisible,
  AiOutlineUser,
} from "react-icons/ai";

import { Link } from "react-router-dom";

export default function LogIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Logging in with:", { email, password });
  };

  const handleGoogleLogin = () => {
    console.log("Login with Google");
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center bg-cover bg-center"
      style={{
        backgroundImage: `url(https://i.pinimg.com/1200x/f7/78/72/f7787278fc0735a45841c8de45b95b0b.jpg)`,
      }}
    >
      <div className="bg-zinc-900/80 backdrop-blur-md p-8 rounded-2xl shadow-lg w-full max-w-md text-white">
        <h2 className="text-3xl font-bold text-center mb-6 bg-gradient-to-r from-blue-500 to-blue-400 bg-clip-text text-transparent">
          Welcome Back
        </h2>

        <form onSubmit={handleLogin} className="space-y-4">
          <div className="flex flex-col relative">
            <label className="mb-1 text-sm">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="px-3 py-2 rounded-lg bg-zinc-700 text-white border border-zinc-600 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all pr-10"
            />
            <AiOutlineUser
              className="absolute right-3 top-[36px] text-gray-400"
              size={20}
            />
          </div>

          <div className="flex flex-col relative">
            <label className="mb-1 text-sm">Password</label>
            <input
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="px-3 py-2 rounded-lg bg-zinc-700 text-white border border-zinc-600 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all pr-10"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-[36px] text-gray-400 hover:text-white transition"
            >
              {showPassword ? (
                <AiOutlineEye size={20} />
              ) : (
                <AiOutlineEyeInvisible size={20} />
              )}
            </button>
          </div>

          <button
            type="submit"
            className="w-full mt-4 bg-gradient-to-r from-blue-600 to-blue-400 py-2 rounded-lg font-semibold text-white hover:opacity-90 transition"
          >
            Login
          </button>
        </form>

        <div className="flex items-center my-4">
          <hr className="flex-1 border-zinc-600" />
          <span className="px-2 text-sm text-zinc-400">or</span>
          <hr className="flex-1 border-zinc-600" />
        </div>

        <button
          onClick={handleGoogleLogin}
          className="w-full flex items-center justify-center gap-2 border border-blue-600 rounded-lg py-2 bg-blue-900/30 hover:bg-blue-900 transition"
        >
          <FcGoogle size={24} />
          <span className="font-medium text-white">Continue with Google</span>
        </button>

        <p className="mt-6 text-center text-sm text-zinc-400">
          Don’t have an account?{" "}
          <Link to="/signup" className="text-blue-400 hover:underline">
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  );
}
