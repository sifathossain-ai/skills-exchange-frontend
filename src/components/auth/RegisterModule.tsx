"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Mail, Lock, ArrowRight, User, Building, AlertCircle } from "lucide-react";
import { motion } from "framer-motion";
import { toast } from "react-toastify";

interface RegisterModuleProps {
  onRegister: () => void;
  onGoToLogin: () => void;
}

export function RegisterModule({ onRegister, onGoToLogin }: RegisterModuleProps) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [campusId, setCampusId] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!name.trim()) {
      setError("Name must be a string");
      return;
    }
    if (!email.trim() || !email.includes("@")) {
      setError("Provide a valid email address");
      return;
    }
    if (password.length < 6) {
      setError("Password must be at least 6 characters long");
      return;
    }

    setIsLoading(true);
    try {
      const response = await fetch("http://localhost:3000/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          email,
          password,
          campusId: campusId.trim() ? campusId : undefined,
        }),
      });

      console.log(response);
      const data = await response.json().catch(() => null);

      if (!response.ok) {
        throw new Error(data?.message || "Failed to register. Please try again.");
      }

      toast.success("Account created successfully!");
      onRegister();
    } catch (err: any) {
      console.error("Register error:", err);
      setError(err.message || "An error occurred during registration");
      toast.error(err.message || "Registration failed");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-[70vh] flex items-center justify-center px-4 w-full py-10">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md bg-white rounded-[2rem] p-8 sm:p-10 shadow-2xl shadow-green-900/10 border border-gray-100 relative overflow-hidden"
      >
        <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-bl from-green-100 to-transparent rounded-full blur-3xl opacity-60 -z-10"></div>

        <div className="mb-8 text-center">
          <div className="w-16 h-16 bg-gradient-to-tr from-green-600 to-teal-500 rounded-2xl mx-auto flex items-center justify-center shadow-lg shadow-green-500/30 mb-6 group transition-all">
            <User size={32} className="text-white" strokeWidth={2.5} />
          </div>
          <h2 className="text-3xl font-extrabold text-gray-900 mb-2">Create Account</h2>
          <p className="text-gray-500 font-medium">Join the platform to start trading skills</p>
        </div>

        {error && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="mb-6 p-3 bg-red-50 border border-red-100 rounded-xl flex items-center text-red-600 space-x-2 text-sm font-semibold"
          >
            <AlertCircle size={16} />
            <span>{error}</span>
          </motion.div>
        )}

        <form onSubmit={handleRegister} className="space-y-4">
          <div className="space-y-1.5">
            <label className="text-sm font-bold text-gray-700 px-1">Full Name</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <User size={18} className="text-gray-400" />
              </div>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className="w-full pl-11 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-gray-900 focus:ring-2 focus:ring-green-500/20 focus:border-green-500 transition-all font-medium"
                placeholder="John Doe"
              />
            </div>
          </div>

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
                className="w-full pl-11 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-gray-900 focus:ring-2 focus:ring-green-500/20 focus:border-green-500 transition-all font-medium"
                placeholder="you@example.com"
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-sm font-bold text-gray-700 px-1">Password</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <Lock size={18} className="text-gray-400" />
              </div>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                minLength={6}
                className="w-full pl-11 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-gray-900 focus:ring-2 focus:ring-green-500/20 focus:border-green-500 transition-all font-medium"
                placeholder="Min. 6 characters"
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-sm font-bold text-gray-700 px-1">Campus ID <span className="text-gray-400 font-normal">(Optional)</span></label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <Building size={18} className="text-gray-400" />
              </div>
              <input
                type="text"
                value={campusId}
                onChange={(e) => setCampusId(e.target.value)}
                className="w-full pl-11 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-gray-900 focus:ring-2 focus:ring-green-500/20 focus:border-green-500 transition-all font-medium"
                placeholder="e.g. 2010123"
              />
            </div>
          </div>

          <Button
            type="submit"
            disabled={isLoading || !name || !email || password.length < 6}
            className="w-full h-12 bg-gray-900 hover:bg-gray-800 text-white rounded-xl font-bold shadow-md shadow-gray-900/10 flex items-center justify-center mt-4 disabled:opacity-70 disabled:cursor-not-allowed"
          >
            {isLoading ? (
              <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            ) : (
              <>
                Create Account
                <ArrowRight size={18} className="ml-2" />
              </>
            )}
          </Button>
        </form>

        <div className="mt-8 pt-6 border-t border-gray-100">
          <p className="text-center text-sm font-medium text-gray-500">
            Already have an account?{" "}
            <button
              type="button"
              onClick={onGoToLogin}
              className="text-green-600 font-bold hover:underline bg-transparent border-none p-0 cursor-pointer"
            >
              Log in
            </button>
          </p>
        </div>
      </motion.div>
    </div>
  );
}
