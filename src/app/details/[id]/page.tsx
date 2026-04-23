"use client";

import { useParams, useRouter } from "next/navigation";
import { fakeProducts } from "@/lib/data";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { 
  ArrowLeft, 
  MapPin, 
  ArrowRightLeft, 
  User, 
  MessageCircle, 
  Calendar, 
  Share2, 
  Bookmark,
  ShieldCheck,
  Star,
  Sparkles
} from "lucide-react";
import { motion } from "framer-motion";

import { useState, useEffect } from "react";
import { SkillPost } from "@/types";

export default function SkillDetailPage() {
  const { id } = useParams();
  const router = useRouter();
  
  const [skill, setSkill] = useState<SkillPost | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // In a real scenario, we would fetch from the backend
    // const fetchSkill = async () => {
    //   try {
    //     const res = await fetch(`http://localhost:3001/details/${id}`);
    //     const data = await res.json();
    //     setSkill(data);
    //   } catch (error) {
    //     console.error(error);
    //   } finally {
    //     setIsLoading(false);
    //   }
    // };
    // fetchSkill();

    // For now, using fake data as requested
    const foundSkill = fakeProducts.find((p) => p.id === id);
    setSkill(foundSkill || null);
    setIsLoading(false);
  }, [id]);

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh]">
        <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
        <p className="mt-4 text-gray-500 font-medium">Loading skill details...</p>
      </div>
    );
  }

  if (!skill) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] space-y-4">
        <h1 className="text-2xl font-bold text-gray-900">Skill not found</h1>
        <Button onClick={() => router.back()}>Go Back</Button>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      {/* Back Button */}
      <motion.button
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        onClick={() => router.back()}
        className="flex items-center text-gray-500 hover:text-blue-600 transition-colors mb-12 group"
      >
        <div className="p-2 rounded-full bg-gray-100 group-hover:bg-blue-50 mr-3 transition-colors">
          <ArrowLeft size={18} />
        </div>
        <span className="font-medium">Back to all skills</span>
      </motion.button>

      <div className="grid grid-cols-1 lg:grid-cols-[3fr_2fr] gap-16 items-start">
        {/* Left Side: Only Image */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative aspect-square lg:aspect-auto lg:h-[600px] rounded-[2.5rem] overflow-hidden shadow-2xl ring-1 ring-black/5"
        >
          <Image
            src={skill.thumbnailUrl}
            alt={skill.teachingSkill}
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-tr from-black/20 to-transparent"></div>
        </motion.div>

        {/* Right Side: Only Context */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          className="space-y-10"
        >
          <div className="space-y-6">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 leading-tight">
              {skill.teachingSkill}
            </h1>
            
            <p className="text-xl text-gray-600 leading-relaxed">
              {skill.description || "I can teach you modern development in exchange for some solid design help or other technical skills. Let's connect and build something amazing together."}
            </p>
          </div>

          <div className="space-y-4 pt-8 border-t border-gray-100">
            <h3 className="text-sm uppercase tracking-[0.2em] font-black text-blue-600">In Exchange For</h3>
            <div className="flex flex-wrap gap-3">
              {skill.wantedSkills.map((s, i) => (
                <div 
                  key={i}
                  className="px-6 py-3 rounded-2xl bg-gray-50 border border-gray-100 text-gray-900 font-bold text-base shadow-sm hover:border-blue-200 hover:bg-blue-50 transition-all cursor-default"
                >
                  {s}
                </div>
              ))}
            </div>
          </div>

          <div className="pt-10 flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="w-14 h-14 rounded-full bg-gradient-to-tr from-blue-600 to-indigo-600 flex items-center justify-center text-white text-xl font-black shadow-lg">
                {skill.name.charAt(0)}
              </div>
              <div>
                <div className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-0.5">Created By</div>
                <div className="text-xl font-black text-gray-900">{skill.name}</div>
              </div>
            </div>

            <div className="flex items-center space-x-3 bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-2xl font-black text-lg shadow-xl shadow-blue-200 transition-all cursor-pointer group">
              <ArrowRightLeft size={20} className="group-hover:rotate-180 transition-transform duration-500" />
              <span>Exchange</span>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
