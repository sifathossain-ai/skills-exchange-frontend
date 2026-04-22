"use client";

import Image from "next/image";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { MapPin, ArrowRightLeft, Sparkles } from "lucide-react";
import { SkillPost } from "@/types";
import { motion } from "framer-motion";

import Link from "next/link";

interface SkillCardProps {
  post: SkillPost;
  index?: number;
}

export function SkillCard({ post, index = 0 }: SkillCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.4, delay: index * 0.1, ease: "easeOut" }}
      className="break-inside-avoid mb-6"
    >
      <Link href={`/details/${post.id}`}>
        <Card className="overflow-hidden border-0 shadow-sm bg-white hover:shadow-xl transition-all duration-500 group cursor-pointer relative top-0 hover:-top-2">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-50/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none z-0"></div>

          <div className="relative w-full aspect-[4/3] overflow-hidden">
            <div className="absolute inset-0 bg-gray-900/10 z-10 group-hover:bg-transparent transition-colors duration-500"></div>
            <Image
              src={post.thumbnailUrl}
              alt={`${post.teachingSkill} thumbnail`}
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-105"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
            <div className="absolute top-4 left-4 z-20">
              <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-white/90 backdrop-blur-md text-gray-900 shadow-sm">
                <MapPin size={12} className="mr-1 text-primary" />
                {post.campusId}
              </span>
            </div>
          </div>

          <CardContent className="px-4 py-2 relative z-10">

            <div className="space-y-5">
              <div>
                <div className="flex items-center text-[11px] uppercase tracking-wider font-extrabold text-blue-600 mb-1">
                  I will teach
                </div>
                <h3 className="text-base font-bold text-gray-900 leading-tight group-hover:text-blue-600 transition-colors">
                  {post.teachingSkill}
                </h3>
              </div>

              <div className="pt-3 border-t border-gray-100/80">
                <div className="flex items-center text-[11px] uppercase tracking-wider font-extrabold text-indigo-500 mb-2.5">
                  <ArrowRightLeft size={12} className="mr-1.5" />
                  In exchange for
                </div>
                <div className="flex flex-wrap gap-2">
                  {post.wantedSkills.map((skill, idx) => (
                    <span
                      key={idx}
                      className="inline-flex items-center px-3 py-1 rounded-lg text-xs font-semibold bg-gray-50 border border-gray-100/80 text-gray-700 shadow-sm transition-all group-hover:border-indigo-100 group-hover:bg-indigo-50/50"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </CardContent>

          <CardFooter className="px-4 py-3 bg-gray-50/30 border-t border-gray-50 flex items-center justify-between relative z-10">
            <div className="flex items-center space-x-3">
              <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-blue-100 to-indigo-100 flex items-center justify-center text-blue-700 font-black text-sm shadow-inner ring-1 ring-black/5">
                {post.name.charAt(0)}
              </div>
              <span className="text-sm font-bold text-gray-900">{post.name}</span>
            </div>
            <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center shadow-sm border border-gray-100 text-gray-400 group-hover:text-primary group-hover:border-primary/20 group-hover:shadow-md transition-all">
              <ArrowRightLeft size={14} />
            </div>
          </CardFooter>
        </Card>
      </Link>
    </motion.div>
  );
}
