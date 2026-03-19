"use client";

import Link from "next/link";
import { Plus } from "lucide-react";
import { useModal } from "@/context/ModalContext";

export function TopNav() {
  const { openCreatePost } = useModal();

  return (
    <div className="hidden md:flex fixed top-6 w-full z-50 justify-center pointer-events-none px-4">
      <header className="glass pointer-events-auto rounded-full h-16 flex items-center px-6 w-full max-w-5xl transition-all duration-300">
        <div className="flex items-center space-x-6 w-full">
          <Link href="/" className="font-bold text-xl tracking-tight flex items-center group">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-blue-600 to-indigo-500 text-white flex items-center justify-center mr-3 font-black shadow-lg shadow-blue-500/30 group-hover:scale-105 transition-transform duration-300">
              S
            </div>
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-gray-900 to-gray-600">SkillBarter</span>
          </Link>
          <nav className="flex space-x-1 flex-1 px-4 border-l border-gray-200/50">
            <Link href="/" className="px-4 py-2 rounded-full text-sm font-semibold text-gray-700 hover:bg-black/5 hover:text-black transition-all">Home Feed</Link>
            <Link href="/search" className="px-4 py-2 rounded-full text-sm font-semibold text-gray-700 hover:bg-black/5 hover:text-black transition-all">Search Skills</Link>
          </nav>
          <div className="flex items-center space-x-3">
            <button 
              onClick={openCreatePost}
              className="group relative h-10 px-5 inline-flex items-center justify-center rounded-full text-sm font-semibold transition-all bg-gray-900 text-white hover:bg-gray-800 hover:shadow-lg hover:-translate-y-0.5"
            >
              <Plus size={16} className="mr-2 opacity-70 group-hover:opacity-100 transition-opacity" />
              Create Post
            </button>
            <Link href="/profile" className="flex items-center">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-gray-100 to-white flex items-center justify-center overflow-hidden border border-gray-200/50 shadow-sm hover:shadow-md transition-all cursor-pointer">
                <span className="text-sm font-bold text-gray-700">Me</span>
              </div>
            </Link>
          </div>
        </div>
      </header>
    </div>
  );
}
