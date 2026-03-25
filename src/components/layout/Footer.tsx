"use client";

import { Mail, Phone, Facebook, MessageCircle } from "lucide-react";

export function Footer() {
  return (
    <footer className="w-full bg-white border-t border-gray-200 mt-12 pb-24 md:pb-0 relative z-10 font-sans">
      <div className="max-w-7xl mx-auto py-12 px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center md:items-start gap-12 text-center md:text-left">
          
          {/* Left Side: Newsletter */}
          <div className="flex flex-col items-center md:items-start w-full md:w-1/2">
            <h3 className="flex items-center text-sm font-bold text-gray-900 uppercase tracking-widest mb-4">
              <Mail className="w-5 h-5 mr-3 text-blue-600" strokeWidth={2.5} />
              Get Special Discounts In Your Inbox
            </h3>
            <div className="flex w-full max-w-md shadow-sm rounded overflow-hidden border border-gray-300">
              <input 
                type="email" 
                placeholder="Enter email to get offers, discounts etc." 
                className="flex-grow px-4 py-3 bg-gray-50 text-gray-900 focus:outline-none focus:bg-white transition-colors"
                aria-label="Email address"
              />
              <button 
                type="button" 
                className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-3 transition-colors"
              >
                Subscribe
              </button>
            </div>
          </div>

          {/* Right Side: Contact Info */}
          <div className="flex flex-col items-center md:items-end w-full md:w-1/2 md:text-right">
             <h3 className="flex items-center text-sm font-bold text-gray-900 uppercase tracking-widest mb-3">
              <Phone className="w-5 h-5 mr-3 text-blue-600" strokeWidth={2.5} />
              For Any Help You May Call Us At
            </h3>
            <p className="text-2xl font-extrabold text-blue-600 mb-1">
              +8809638129458
            </p>
            <p className="text-sm text-gray-500 mb-4 font-medium">
              Open 24 Hours a Day / 7 Days a week
            </p>
            <div className="flex space-x-3">
              <a href="#" className="flex items-center bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold px-5 py-2.5 rounded-full transition-colors shadow-sm">
                <Facebook className="w-4 h-4 mr-2" />
                Facebook
              </a>
              <a href="#" className="flex items-center bg-green-500 hover:bg-green-600 text-white text-sm font-semibold px-5 py-2.5 rounded-full transition-colors shadow-sm">
                <MessageCircle className="w-4 h-4 mr-2" />
                WhatsApp
              </a>
            </div>
          </div>
          
        </div>
      </div>

      {/* Bottom Bar Container */}
      <div className="w-full bg-gray-100 border-t border-gray-200 py-6 px-4 text-center text-gray-500 text-sm">
        <p className="mb-2 font-medium leading-relaxed">SkillBarter is your trusted platform for Smart Learning, Skill Exchange, and Student Mentorship.</p>
        <p className="font-semibold text-gray-700">Copyright &copy; {new Date().getFullYear()} SkillBarter. All Right Reserved</p>
      </div>
    </footer>
  );
}
