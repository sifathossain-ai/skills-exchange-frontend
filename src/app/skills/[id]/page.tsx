"use client";

import { useParams, useRouter } from "next/navigation";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import {
  ArrowLeft,
  MapPin,
  ArrowRightLeft,
  Calendar,

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
    const fetchSkill = async () => {
      try {
        setIsLoading(true);
        const token = localStorage.getItem("accessToken");
        const headers: HeadersInit = {};
        if (token) {
          headers["Authorization"] = `Bearer ${token}`;
        }

        const res = await fetch(`http://localhost:3000/skills/${id}`, {
          headers,
        });

        if (res.ok) {
          const data = await res.json();
          setSkill(data);
        }
      } catch (error) {
        console.error("Error fetching skill details:", error);
      } finally {
        setIsLoading(false);
      }
    };

    if (id) {
      fetchSkill();
    }
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
          className="relative aspect-square lg:aspect-auto md:h-[450px] rounded-xl md:rounded-[1.5rem] overflow-hidden shadow-xl ring-1 ring-black/5"
        >
          <Image
            src={skill.skillImage}
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
          className="space-y-8"
        >
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2 text-blue-600 font-bold text-sm uppercase tracking-widest">
                <span>{skill.category}</span>
              </div>
              <div className="flex items-center space-x-1.5 text-gray-400 text-xs font-semibold">
                <Calendar size={14} />
                <span>{new Date(skill.createdDate).toLocaleDateString()}</span>
              </div>
            </div>
            <h1 className="text-2xl md:text-4xl font-black text-gray-900 leading-tight">
              {skill.teachingSkill}
            </h1>

            <p className="md:text-lg text-gray-600 leading-relaxed">
              {skill.description || "I can teach you modern development in exchange for some solid design help or other technical skills. Let's connect and build something amazing together."}
            </p>
          </div>

          <div className="space-y-4 pt-8 border-t border-gray-100">
            <h3 className="text-sm uppercase tracking-[0.2em] font-black text-blue-600">In Exchange For</h3>
            <div className="flex flex-wrap gap-3">
              {skill.wantedSkills.map((s, i) => (
                <div
                  key={i}
                  className="md:px-6 md:py-3 px-3 py-1 rounded-md md:rounded-xl bg-gray-50 border border-gray-100 text-gray-900 font-bold text-base shadow-sm hover:border-blue-200 hover:bg-blue-50 transition-all cursor-default"
                >
                  {s}
                </div>
              ))}
            </div>
          </div>

          <div className="pt-10 flex items-center justify-between">
            <div className="flex items-center space-x-2 md:space-x-4">
              <div className="md:w-14 md:h-14 w-10 h-10 rounded-full bg-gradient-to-tr from-blue-600 to-indigo-600 flex items-center justify-center text-white md:text-xl font-black shadow-lg">
                {(skill.creator.name || "S").charAt(0)}
              </div>
              <div>
                <div className="text-xs font-semibold text-gray-400 uppercase tracking-widest mb-0.5">Created By</div>
                <div className="md:text-lg font-black text-gray-900">{skill.creator.name || "Student"}</div>
              </div>
            </div>

            <div className="flex items-center space-x-3 bg-blue-600 hover:bg-blue-700 text-white px-2 py-2 md:px-6 md:py-3 rounded-md md:rounded-xl font-black md:text-lg shadow-xl shadow-blue-200 transition-all cursor-pointer group">
              <ArrowRightLeft size={20} className="group-hover:rotate-180 transition-transform duration-500" />
              <span>Exchange</span>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
