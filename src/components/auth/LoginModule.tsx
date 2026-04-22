"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Mail, Lock, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import { toast } from "react-toastify";

interface LoginModuleProps {
  onLogin: () => void;
  onGoToRegister: () => void;
}

export function LoginModule({ onLogin, onGoToRegister }: LoginModuleProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      const response = await fetch("http://localhost:3000/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json().catch(() => null);

      if (!response.ok) {
        throw new Error(data?.message || "Failed to log in.");
      }

      if (data?.accessToken) {
        localStorage.setItem("accessToken", data.accessToken);
        localStorage.setItem("refreshToken", data.refreshToken);
        localStorage.setItem("user", JSON.stringify(data.user));
      }

      toast.success("Welcome back!");
      onLogin();
    } catch (err: any) {
      console.error("Login error:", err);
      toast.error(err.message || "Invalid credentials");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-[70vh] flex items-center justify-center px-4 w-full">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md bg-white rounded-[2rem] p-8 sm:p-10 shadow-2xl shadow-blue-900/10 border border-gray-100 relative overflow-hidden"
      >
        <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-bl from-blue-100 to-transparent rounded-full blur-3xl opacity-60 -z-10"></div>
        
        <div className="mb-10 text-center">
          <div className="w-16 h-16 bg-gradient-to-tr from-blue-600 to-indigo-500 rounded-2xl mx-auto flex items-center justify-center shadow-lg shadow-blue-500/30 mb-6 group transition-all">
            <span className="text-white font-black text-2xl">S</span>
          </div>
          <h2 className="text-3xl font-extrabold text-gray-900 mb-2">Welcome Back</h2>
          <p className="text-gray-500 font-medium">Log in to access your dashboard</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-5">
          <div className="space-y-1.5">
            <label className="text-sm font-bold text-gray-700 px-1">Email Address</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <Mail size={18} className="text-gray-400" />
              </div>
              <input 
                type="email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full pl-11 pr-4 py-3.5 bg-gray-50 border border-gray-200 rounded-xl text-gray-900 focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all font-medium"
                placeholder="you@example.com"
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <div className="flex items-center justify-between px-1">
              <label className="text-sm font-bold text-gray-700">Password</label>
              <a href="#" className="text-xs font-bold text-blue-600 hover:text-blue-700">Forgot?</a>
            </div>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <Lock size={18} className="text-gray-400" />
              </div>
              <input 
                type="password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full pl-11 pr-4 py-3.5 bg-gray-50 border border-gray-200 rounded-xl text-gray-900 focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all font-medium"
                placeholder="••••••••"
              />
            </div>
          </div>

          <Button 
            type="submit" 
            disabled={isLoading || !email || !password}
            className="w-full h-12 bg-gray-900 hover:bg-gray-800 text-white rounded-xl font-bold shadow-md shadow-gray-900/10 flex items-center justify-center mt-2 disabled:opacity-70 disabled:cursor-not-allowed"
          >
            {isLoading ? (
              <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            ) : (
              <>
                Sign In
                <ArrowRight size={18} className="ml-2" />
              </>
            )}
          </Button>
        </form>
        
        <div className="mt-8 pt-6 border-t border-gray-100">
          <p className="text-center text-sm font-medium text-gray-500">
            Don&apos;t have an account?{" "}
            <button 
              type="button"
              onClick={onGoToRegister}
              className="text-blue-600 font-bold hover:underline bg-transparent border-none p-0 cursor-pointer"
            >
              Sign up
            </button>
          </p>
        </div>
      </motion.div>
    </div>
  );
}
