"use client";

import Link from "next/link";
import { Github, Twitter, Linkedin } from "lucide-react";

export function Footer() {
  return (
    <footer className="w-full bg-white/40 backdrop-blur-md border-t border-gray-200/50 py-12 px-6 pb-28 md:pb-12 relative z-10 transition-all">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
        <div className="flex flex-col items-center md:items-start">
          <Link href="/" className="font-bold text-xl tracking-tight flex items-center mb-2 group">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-blue-600 to-indigo-500 text-white flex items-center justify-center mr-2 font-black shadow-md shadow-blue-500/20 group-hover:scale-105 transition-transform duration-300">
              S
            </div>
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-gray-900 to-gray-600">SkillBarter</span>
          </Link>
          <p className="text-sm text-gray-500 text-center md:text-left font-medium">
            Empowering students to trade knowledge freely.
          </p>
        </div>

        <div className="flex items-center space-x-5">
          <Link href="#" className="p-2 rounded-full text-gray-400 hover:text-blue-600 hover:bg-white hover:shadow-sm transition-all">
            <span className="sr-only">Twitter</span>
            <Twitter size={20} strokeWidth={2.5} />
          </Link>
          <Link href="#" className="p-2 rounded-full text-gray-400 hover:text-gray-900 hover:bg-white hover:shadow-sm transition-all">
            <span className="sr-only">GitHub</span>
            <Github size={20} strokeWidth={2.5} />
          </Link>
          <Link href="#" className="p-2 rounded-full text-gray-400 hover:text-blue-700 hover:bg-white hover:shadow-sm transition-all">
            <span className="sr-only">LinkedIn</span>
            <Linkedin size={20} strokeWidth={2.5} />
          </Link>
        </div>
      </div>
      <div className="max-w-7xl mx-auto mt-10 pt-8 border-t border-gray-200/50 flex flex-col md:flex-row justify-between items-center gap-4 text-xs font-semibold text-gray-400">
        <p>&copy; {new Date().getFullYear()} SkillBarter. All rights reserved.</p>
        <div className="flex space-x-6">
          <Link href="#" className="hover:text-gray-900 transition-colors">Privacy Policy</Link>
          <Link href="#" className="hover:text-gray-900 transition-colors">Terms of Service</Link>
        </div>
      </div>
    </footer>
  );
}
