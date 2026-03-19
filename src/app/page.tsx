"use client";

import { SkillPost } from "@/types";
import { SkillCard } from "@/components/cards/SkillCard";
import { EmptyState } from "@/components/ui/EmptyState";
import { SearchX, Filter, Sparkles, TrendingUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

// Mock Data for initial UI
const mockPosts: SkillPost[] = [
  {
    id: "1",
    name: "Rahim Ali",
    campusId: "NSU-2023",
    teachingSkill: "Advanced React & Next.js",
    wantedSkills: ["UI/UX Design", "Figma"],
    thumbnailUrl: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?q=80&w=800&auto=format&fit=crop",
    description: "I can teach you modern frontend development in exchange for some solid design help for my startup idea.",
  },
  {
    id: "2",
    name: "Fatima Begum",
    campusId: "BRACU-01",
    teachingSkill: "IELTS Preparation (Band 8)",
    wantedSkills: ["Python Programming", "Data Sci"],
    description: "Looking for someone to teach me basic Python in exchange for spoken English and IELTS tips.",
  },
  {
    id: "3",
    name: "Sajid Hasan",
    campusId: "IUB-CS",
    teachingSkill: "Digital Marketing & SEO",
    wantedSkills: ["Video Editing", "Premiere Pro"],
    thumbnailUrl: "https://images.unsplash.com/photo-1432888498266-38ffec3eaf0a?q=80&w=800&auto=format&fit=crop",
  },
  {
    id: "4",
    name: "Anika Tabassum",
    campusId: "DU-12",
    teachingSkill: "Graphic Design Basics",
    wantedSkills: ["Guitar Lessons"],
    description: "I am a fine arts student. I can teach you photoshop if you have an acoustic guitar and can teach me to play.",
  }
];

export default function Home() {
  const hasPosts = mockPosts.length > 0;

  return (
    <div className="space-y-12">
      {/* Premium Hero Section */}
      <motion.section 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="relative overflow-hidden rounded-[2.5rem] bg-gray-900 px-6 py-16 sm:px-12 sm:py-24 text-center shadow-2xl shadow-gray-900/20"
      >
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-y-0 left-0 w-1/2 bg-gradient-to-r from-blue-600/30 to-transparent mix-blend-overlay"></div>
          <div className="absolute top-0 right-0 w-1/2 h-1/2 bg-gradient-to-bl from-purple-500/20 to-transparent mix-blend-overlay"></div>
          {/* Subtle noise pattern */}
          <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: "url('https://grainy-gradients.vercel.app/noise.svg')" }}></div>
        </div>

        <div className="relative z-10 max-w-2xl mx-auto flex flex-col items-center">
          <div className="inline-flex items-center space-x-2 bg-white/10 backdrop-blur-md px-3 py-1 rounded-full text-white/90 text-sm font-medium mb-6 border border-white/10">
            <Sparkles size={16} className="text-yellow-400" />
            <span>The premier student barter network</span>
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight mb-6 leading-tight">
            Exchange Skills.<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-300">Empower Your Campus.</span>
          </h1>
          <p className="text-lg text-gray-300 mb-8 max-w-xl">
            Don&apos;t pay for tutors. Trade what you already know for what you urgently need to learn. Connect with students locally.
          </p>
          <div className="flex sm:flex-row flex-col gap-4">
            <Button size="lg" className="bg-white text-gray-900 hover:bg-gray-100 font-semibold rounded-full px-8 h-12 shadow-[0_0_20px_rgba(255,255,255,0.3)]">
              Explore Matches
            </Button>
            <Button size="lg" variant="outline" className="border-white/20 hover:bg-white/10 text-white font-semibold rounded-full px-8 h-12 glass">
              How it works
            </Button>
          </div>
        </div>
      </motion.section>

      {/* Feed Controls */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 px-2">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600">
            <TrendingUp size={20} />
          </div>
          <div>
            <h2 className="text-2xl font-bold tracking-tight text-gray-900 flex items-center">
              Trending Exchanges
            </h2>
            <p className="text-gray-500 text-sm mt-0.5">Most requested skills in your area right now.</p>
          </div>
        </div>
        <div className="flex items-center gap-2 self-end sm:self-auto">
          <Button variant="outline" size="sm" className="hidden sm:flex rounded-full px-5 font-medium border-gray-200 shadow-sm hover:shadow-md transition-all">
            <Filter size={16} className="mr-2" />
            Filter by Campus
          </Button>
        </div>
      </div>

      {hasPosts ? (
        <div className="columns-1 sm:columns-2 lg:columns-3 gap-6 space-y-6 pb-20">
          {mockPosts.map((post, i) => (
            <SkillCard key={post.id} post={post} index={i} />
          ))}
        </div>
      ) : (
        <EmptyState 
          icon={SearchX} 
          title="No skills found" 
          description="There are currently no skill exchange posts available in your area. Be the first to post!"
          action={<Button className="rounded-full">Create a Post</Button>}
        />
      )}
    </div>
  );
}
