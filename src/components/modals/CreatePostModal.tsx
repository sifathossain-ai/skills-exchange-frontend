"use client";

import React, { useState } from "react";
import { Modal } from "@/components/ui/modal";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useModal } from "@/context/ModalContext";
import { X, Plus, Image as ImageIcon } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export function CreatePostModal() {
  const { isCreatePostOpen, closeCreatePost } = useModal();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    teachingSkill: "",
    thumbnailUrl: "",
    wantedSkills: [] as string[],
    description: "",
  });
  const [tagInput, setTagInput] = useState("");

  const handleBack = () => setStep((s) => Math.max(s - 1, 1));

  const handleAddTag = () => {
    if (tagInput.trim() && !formData.wantedSkills.includes(tagInput.trim())) {
      setFormData({
        ...formData,
        wantedSkills: [...formData.wantedSkills, tagInput.trim()],
      });
      setTagInput("");
    }
  };

  const handleRemoveTag = (tagToRemove: string) => {
    setFormData({
      ...formData,
      wantedSkills: formData.wantedSkills.filter((tag) => tag !== tagToRemove),
    });
  };

  const handleSubmit = () => {
    // API integration will go here
    console.log("Submitting:", formData);
    closeCreatePost();
    setTimeout(() => {
      setStep(1);
      setFormData({
        teachingSkill: "",
        thumbnailUrl: "",
        wantedSkills: [],
        description: "",
      });
    }, 300);
  };

  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 20 : -20,
      opacity: 0,
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1,
    },
    exit: (direction: number) => ({
      zIndex: 0,
      x: direction < 0 ? 20 : -20,
      opacity: 0,
    }),
  };

  return (
    <Modal
      isOpen={isCreatePostOpen}
      onClose={closeCreatePost}
      className="max-w-xl overflow-hidden rounded-2xl p-0 border border-white/20 shadow-2xl"
    >
      <div className="bg-gradient-to-br from-blue-600 to-indigo-700 p-6 text-white relative overflow-hidden">
        <div className="relative z-10">
          <div className="inline-flex items-center space-x-1.5 bg-white/20 backdrop-blur-md px-2.5 py-1 rounded-full text-xs font-semibold mb-3 border border-white/10">
            <span>New Exchange</span>
          </div>
          <h2 className="text-2xl font-black tracking-tight mb-1">
            Create Skill Post
          </h2>
          <p className="text-blue-100/80 text-sm">
            Offer your knowledge. Get what you need.
          </p>
        </div>
        <div className="absolute -top-10 -right-10 w-40 h-40 bg-white opacity-5 rounded-full blur-2xl"></div>
      </div>

      <div className="px-8 pt-6 pb-2">
        <div className="flex bg-gray-100 h-1.5 rounded-full overflow-hidden mb-6">
          <motion.div
            className="bg-blue-600 h-full"
            initial={{ width: "33%" }}
            animate={{ width: `${(step / 3) * 100}%` }}
            transition={{ duration: 0.3 }}
          ></motion.div>
        </div>
      </div>

      <div className="p-8 pt-0 min-h-[280px] relative">
        <AnimatePresence mode="wait" custom={1}>
          {step === 1 && (
            <motion.div
              key="step1"
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.3 }}
              className="space-y-5"
            >
              <div>
                <label className="block text-sm font-bold text-gray-900 mb-2">
                  What are you teaching?
                </label>
                <Input
                  className="h-12 border-gray-200 focus:border-blue-500 bg-gray-50/50 hover:bg-gray-50 focus:bg-white transition-colors"
                  placeholder="e.g. Advanced React & Next.js"
                  value={formData.teachingSkill}
                  onChange={(e) =>
                    setFormData({ ...formData, teachingSkill: e.target.value })
                  }
                />
              </div>
              <div>
                <label className="block text-sm font-bold text-gray-900 mb-2">
                  Thumbnail URL
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <ImageIcon size={18} className="text-gray-400" />
                  </div>
                  <Input
                    className="pl-10 h-12 border-gray-200 focus:border-blue-500 bg-gray-50/50 hover:bg-gray-50 focus:bg-white transition-colors"
                    placeholder="https://i.ibb.co.com/wFk2zGyp/3.jpg"
                    value={formData.thumbnailUrl}
                    onChange={(e) =>
                      setFormData({ ...formData, thumbnailUrl: e.target.value })
                    }
                  />
                </div>
              </div>
            </motion.div>
          )}

          {step === 2 && (
            <motion.div
              key="step2"
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.3 }}
              className="space-y-5"
            >
              <div>
                <label className="block text-sm font-bold text-gray-900 mb-2">
                  What skills do you want in return?
                </label>
                <div className="flex space-x-2">
                  <Input
                    className="h-12 border-gray-200 focus:border-blue-500 bg-gray-50/50 focus:bg-white"
                    placeholder="e.g. UI/UX Design"
                    value={tagInput}
                    onChange={(e) => setTagInput(e.target.value)}
                    onKeyDown={(e) =>
                      e.key === "Enter" && (e.preventDefault(), handleAddTag())
                    }
                  />
                  <Button
                    type="button"
                    onClick={handleAddTag}
                    className="h-12 w-12 shrink-0 bg-gray-900 hover:bg-gray-800 text-white rounded-xl shadow-lg shadow-gray-900/20 transition-all"
                  >
                    <Plus size={20} />
                  </Button>
                </div>

                <div className="flex flex-wrap gap-2 mt-4 p-4 bg-gray-50/80 rounded-xl min-h-[80px] border border-gray-100 shadow-inner">
                  {formData.wantedSkills.length === 0 && (
                    <span className="text-sm text-gray-400 flex items-center w-full justify-center">
                      Add tags above
                    </span>
                  )}
                  {formData.wantedSkills.map((skill) => (
                    <motion.span
                      initial={{ scale: 0.8, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      key={skill}
                      className="inline-flex items-center px-3 py-1.5 rounded-lg text-xs font-bold bg-blue-100 text-blue-800 border border-blue-200 shadow-sm"
                    >
                      {skill}
                      <button
                        type="button"
                        onClick={() => handleRemoveTag(skill)}
                        className="ml-2 hover:bg-blue-200 rounded-full p-0.5 transition-colors"
                      >
                        <X size={14} />
                      </button>
                    </motion.span>
                  ))}
                </div>
              </div>
            </motion.div>
          )}

          {step === 3 && (
            <motion.div
              key="step3"
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.3 }}
              className="space-y-5"
            >
              <div>
                <label className="block text-sm font-bold text-gray-900 mb-2">
                  Description
                </label>
                <textarea
                  className="flex min-h-[140px] w-full rounded-xl border border-gray-200 bg-gray-50/50 hover:bg-gray-50 focus:bg-white px-4 py-3 text-sm ring-offset-white placeholder:text-gray-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 transition-colors resize-none"
                  placeholder="Describe your barter offer in detail. What exactly will you teach? What exactly do you expect from the other person?"
                  value={formData.description}
                  onChange={(e) =>
                    setFormData({ ...formData, description: e.target.value })
                  }
                />
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="flex justify-between mt-8 pt-4">
          <Button
            variant="ghost"
            onClick={step === 1 ? closeCreatePost : handleBack}
            className="text-gray-500 hover:text-gray-900 hover:bg-gray-100 rounded-xl"
          >
            {step === 1 ? "Cancel" : "Back"}
          </Button>

          <Button
            onClick={step === 3 ? handleSubmit : () => setStep((s) => s + 1)}
            className="bg-blue-600 hover:bg-blue-700 text-white rounded-xl px-8 shadow-lg shadow-blue-600/30 transition-all hover:-translate-y-0.5"
          >
            {step === 3 ? "Post Skill" : "Next Step"}
          </Button>
        </div>
      </div>
    </Modal>
  );
}
