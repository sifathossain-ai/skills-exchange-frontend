"use client";

import { SkillPost } from "@/types";
import { SkillCard } from "@/components/cards/SkillCard";
import { EmptyState } from "@/components/ui/EmptyState";
import { SearchX, Star, ChevronDown, ArrowRight, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import Link from "next/link";

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
    thumbnailUrl: "https://images.unsplash.com/photo-1513258496099-48168024aec0?q=80&w=800&auto=format&fit=crop",
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
    thumbnailUrl: "https://images.unsplash.com/photo-1626785774573-4b799315345d?q=80&w=800&auto=format&fit=crop",
    description: "I am a fine arts student. I can teach you photoshop if you have an acoustic guitar and can teach me to play.",
  },
  {
    id: "5",
    name: "Jihad Rahman",
    campusId: "AUST-ME",
    teachingSkill: "AutoCAD & 3D Modeling",
    wantedSkills: ["Calculus II", "Physics"],
    thumbnailUrl: "https://images.unsplash.com/photo-1525909002-1b05e0c869d8?q=80&w=800&auto=format&fit=crop",
    description: "Willing to do mechanical drafting tutoring for serious math/physics guidance before midterms.",
  },
  {
    id: "6",
    name: "Nusrat Jahan",
    campusId: "EWU-BBA",
    teachingSkill: "Accounting Principles",
    wantedSkills: ["Public Speaking"],
    thumbnailUrl: "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?q=80&w=800&auto=format&fit=crop",
  },
  {
    id: "7",
    name: "Tariq Mahmud",
    campusId: "UIU-CSE",
    teachingSkill: "Data Structures in C++",
    wantedSkills: ["Photography", "Lightroom"],
    thumbnailUrl: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=800&auto=format&fit=crop",
    description: "If you have a DSLR and can teach me the basics, I will get you through your C++ course smoothly.",
  },
];

export default function Home() {
  const hasPosts = mockPosts.length > 0;

  return (
    <div className="space-y-12">
      {/* Premium Hero Section */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="relative overflow-hidden rounded-[2.5rem] bg-white border border-gray-100 px-6 py-20 sm:px-12 sm:py-28 text-center shadow-sm"
      >
        <div className="absolute inset-0 z-0 bg-white">
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#e5e7eb_1px,transparent_1px),linear-gradient(to_bottom,#e5e7eb_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_80%_80%_at_50%_0%,#000_20%,transparent_100%)] opacity-80"></div>
        </div>

        <div className="relative z-10 max-w-3xl mx-auto flex flex-col items-center">
          <div className="inline-flex items-center space-x-2 bg-gray-50 border border-gray-200 px-4 py-1.5 rounded-full text-gray-800 text-sm font-semibold mb-8">
            <span>Join the Community</span>
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-gray-900 tracking-tight mb-6 leading-tight">
            Learn New Skills by<br className="hidden sm:block" /> Trading Your Expertise
          </h1>

          <p className="text-lg text-gray-500 mb-10 max-w-2xl leading-relaxed">
            SkillExchange connects you with people who want to learn what you know, and teach what you want to learn. Exchange skills, earn badges, and grow together.
          </p>

          <div className="flex sm:flex-row flex-col gap-4 mb-10 w-full sm:w-auto justify-center items-center">
            <Button size="lg" className="bg-gray-900 text-white hover:bg-gray-800 font-semibold rounded-full px-8 h-12 shadow-md w-full sm:w-auto transition-all">
              Start Exchanging <ArrowRight size={18} className="ml-2" />
            </Button>
            <Link href="/skills">
              <Button size="lg" variant="outline" className="border-gray-200 text-gray-700 bg-white hover:bg-gray-50 font-semibold rounded-full px-8 h-12 w-full sm:w-auto shadow-sm">
                Browse Skills
              </Button>
            </Link>
          </div>

          <div className="flex flex-wrap justify-center gap-x-6 gap-y-3 text-sm text-gray-500 font-medium">
            <span className="flex items-center"><Check size={16} className="mr-1.5 text-gray-900" /> Free to join</span>
            <span className="flex items-center"><Check size={16} className="mr-1.5 text-gray-900" /> No subscriptions</span>
            <span className="flex items-center"><Check size={16} className="mr-1.5 text-gray-900" /> Real connections</span>
          </div>
        </div>
      </motion.section>

      {/* How It Works Section */}
      <section className="py-16 relative">
        <div className="text-center mb-16">
          <div className="inline-block px-4 py-1.5 rounded-full bg-gray-100 text-gray-800 text-xs font-bold uppercase tracking-wider mb-6">How It Works</div>
          <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-4">Start Exchanging in 3 Easy Steps</h2>
          <p className="text-gray-500 max-w-xl mx-auto">Join our community and begin your learning journey in minutes.</p>
        </div>

        <div className="max-w-5xl mx-auto relative z-10">
          {/* Subtle Grid Background */}
          <div className="absolute inset-0 z-[-1] opacity-50 bg-[linear-gradient(to_right,#f0f0f0_1px,transparent_1px),linear-gradient(to_bottom,#f0f0f0_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)]"></div>

          {/* Connecting Line (Desktop) */}
          <div className="hidden md:block absolute top-[48px] left-[15%] right-[15%] h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent z-0"></div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center relative z-10">
            {/* Step 1 */}
            <div className="flex flex-col items-center">
              <div className="w-24 h-24 rounded-full bg-gradient-to-b from-gray-700 to-gray-400 text-white flex items-center justify-center text-2xl font-bold shadow-xl shadow-gray-900/10 mb-6 border-4 border-white relative">
                <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-black/40 to-transparent"></div>
                <span className="relative z-10 drop-shadow-md">01</span>
              </div>
              <h3 className="text-xl font-extrabold text-gray-900 mb-3">Create Your Profile</h3>
              <p className="text-gray-500 text-sm leading-relaxed px-4">Sign up with secure authentication and list the skills you have and want to learn.</p>
            </div>
            {/* Step 2 */}
            <div className="flex flex-col items-center">
              <div className="w-24 h-24 rounded-full bg-gradient-to-b from-gray-700 to-gray-400 text-white flex items-center justify-center text-2xl font-bold shadow-xl shadow-gray-900/10 mb-6 border-4 border-white relative">
                <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-black/40 to-transparent"></div>
                <span className="relative z-10 drop-shadow-md">02</span>
              </div>
              <h3 className="text-xl font-extrabold text-gray-900 mb-3">Find & Connect</h3>
              <p className="text-gray-500 text-sm leading-relaxed px-4">Browse skills, send exchange requests, and chat in real-time with potential partners.</p>
            </div>
            {/* Step 3 */}
            <div className="flex flex-col items-center">
              <div className="w-24 h-24 rounded-full bg-gradient-to-b from-gray-700 to-gray-400 text-white flex items-center justify-center text-2xl font-bold shadow-xl shadow-gray-900/10 mb-6 border-4 border-white relative">
                <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-black/40 to-transparent"></div>
                <span className="relative z-10 drop-shadow-md">03</span>
              </div>
              <h3 className="text-xl font-extrabold text-gray-900 mb-3">Learn & Earn</h3>
              <p className="text-gray-500 text-sm leading-relaxed px-4">Complete skill exchanges, earn badges, and collect certifications as you grow.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Feed Controls */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 px-2">
        <div className="flex items-center space-x-3">
          <div>
            <h2 className="text-2xl font-bold tracking-tight text-gray-900 flex items-center">
              Trending Exchanges
            </h2>
          </div>
        </div>

      </div>

      {hasPosts ? (
        <div className="space-y-12">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {mockPosts.slice(0, 8).map((post, i) => (
              <SkillCard key={post.id} post={post} index={i} />
            ))}
          </div>

          <Link href="/skills">
            <div className="flex justify-center mt-8 pb-4">
              <Button size="lg" className="rounded-full px-12 font-semibold shadow-md border border-gray-200">
                See more
              </Button>
            </div>

          </Link>

        </div>
      ) : (
        <EmptyState
          icon={SearchX}
          title="No skills found"
          description="There are currently no skill exchange posts available in your area. Be the first to post!"
          action={<Button className="rounded-full">Create a Post</Button>}
        />
      )}

      {/* Reviews Section */}
      <section className="py-20 mt-16 mb-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-4">Loved by Learners Everywhere</h2>
          <p className="text-gray-500 max-w-2xl mx-auto">See what our community members have to say about their skill exchange experiences.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {/* Card 1 */}
          <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between">
            <div>
              <div className="flex space-x-1 mb-6">
                {[1, 2, 3, 4, 5].map(star => <Star key={star} size={18} className="fill-gray-900 text-gray-900" />)}
              </div>
              <p className="text-gray-600 mb-8 leading-relaxed">
                &quot;I learned Spanish in exchange for teaching web development. The real-time chat made coordination so easy, and I earned my first certification!&quot;
              </p>
            </div>
            <div>
              <h4 className="font-bold text-gray-900">Sarah Chen</h4>
              <p className="text-sm text-gray-500">Software Developer</p>
            </div>
          </div>

          {/* Card 2 */}
          <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between">
            <div>
              <div className="flex space-x-1 mb-6">
                {[1, 2, 3, 4, 5].map(star => <Star key={star} size={18} className="fill-gray-900 text-gray-900" />)}
              </div>
              <p className="text-gray-600 mb-8 leading-relaxed">
                &quot;SkillExchange connected me with a graphic designer who taught me Figma. In return, I helped them with Python. Win-win!&quot;
              </p>
            </div>
            <div>
              <h4 className="font-bold text-gray-900">Michael Torres</h4>
              <p className="text-sm text-gray-500">Data Analyst</p>
            </div>
          </div>

          {/* Card 3 */}
          <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between">
            <div>
              <div className="flex space-x-1 mb-6">
                {[1, 2, 3, 4, 5].map(star => <Star key={star} size={18} className="fill-gray-900 text-gray-900" />)}
              </div>
              <p className="text-gray-600 mb-8 leading-relaxed">
                &quot;The badge system kept me motivated. I&apos;ve completed 12 exchanges and earned badges for each. It&apos;s addictive in the best way!&quot;
              </p>
            </div>
            <div>
              <h4 className="font-bold text-gray-900">Emma Wilson</h4>
              <p className="text-sm text-gray-500">Marketing Manager</p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 mb-16 max-w-3xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-4">Frequently Asked Questions</h2>
          <p className="text-gray-500 text-lg">Find answers to common questions about our platform.</p>
        </div>

        <div className="space-y-2">
          {[
            { q: "How does the 14-day free trial work?", a: "You can sign up and use all premium features completely free for 14 days. No credit card is required. At the end of the trial, you can choose to continue offering your skills for free." },
            { q: "Can I change plans later?", a: "Yes, you can upgrade, downgrade, or cancel your account at any time safely from your profile settings." },
            { q: "Is there a limit to how many users I can add?", a: "There is no limit. You can connect and securely barter your skills with as many students as you'd like across universities." },
            { q: "Do you offer discounts for nonprofits or educational institutions?", a: "Yes, we actively partner with educational institutions to provide special access. Please contact our support team for details." },
            { q: "How secure is my data?", a: "We use industry-standard encryption protocols. Your student IDs and personal chat data are stored securely on compliance-certified servers." }
          ].map((item, idx) => (
            <details key={idx} className="group border-b border-gray-100/80">
              <summary className="flex justify-between items-center font-semibold cursor-pointer list-none py-5 text-gray-900 transition-colors hover:text-blue-600 [&::-webkit-details-marker]:hidden">
                <span className="text-[1.05rem]">{item.q}</span>
                <span className="transition duration-300 group-open:rotate-180">
                  <ChevronDown size={20} className="text-gray-400" />
                </span>
              </summary>
              <div className="text-gray-500 pt-1 pb-6 leading-relaxed">
                {item.a}
              </div>
            </details>
          ))}
        </div>
      </section>
    </div>
  );
}
