"use client";

import Link from "next/link";
import { Search, Home, User, Zap } from "lucide-react";
import { useModal } from "@/context/ModalContext";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

export function BottomNav() {
  const { openCreatePost } = useModal();
  const router = useRouter();

  const handleCreatePostClick = () => {
    const token = localStorage.getItem("accessToken");
    if (token && token !== "null" && token !== "undefined") {
      openCreatePost();
    } else {
      toast.error("You must be logged in to create a post");
      router.push("/profile");
    }
  };

  return (
    <div className="fixed bottom-6 left-0 right-0 z-50 flex justify-center px-4 md:hidden pointer-events-none">
      <nav className="glass pointer-events-auto w-full max-w-sm rounded-[2rem] px-2 py-2">
        <div className="flex justify-around items-center">
          <Link href="/" className="flex flex-col items-center justify-center w-14 h-14 rounded-2xl text-gray-500 hover:bg-gray-100/50 hover:text-gray-900 transition-all active:scale-95">
            <Home size={22} strokeWidth={2.5} />
          </Link>
          <Link href="/skills" className="flex flex-col items-center justify-center w-14 h-14 rounded-2xl text-gray-500 hover:bg-gray-100/50 hover:text-gray-900 transition-all active:scale-95">
            <Search size={22} strokeWidth={2.5} />
          </Link>
          
          <div className="relative -top-5">
            <button 
              onClick={handleCreatePostClick}
              className="flex items-center justify-center w-14 h-14 bg-gray-900 text-white rounded-full shadow-lg shadow-gray-900/30 hover:scale-105 active:scale-95 transition-all"
            >
              <Zap size={24} strokeWidth={2.5} className="fill-white/20" />
            </button>
          </div>

          <Link href="/profile" className="flex flex-col items-center justify-center w-14 h-14 rounded-2xl text-gray-500 hover:bg-gray-100/50 hover:text-gray-900 transition-all active:scale-95">
            <User size={22} strokeWidth={2.5} />
          </Link>
        </div>
      </nav>
    </div>
  );
}
