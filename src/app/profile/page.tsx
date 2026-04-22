"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Edit, Trash2, CheckCircle, XCircle, MapPin, Award, ShieldCheck, Save, X } from "lucide-react";
import { motion } from "framer-motion";

export default function Profile() {
  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState("Rahim Ali");
  const [campus, setCampus] = useState("North South University");
  const [tempName, setTempName] = useState("Rahim Ali");
  const [tempCampus, setTempCampus] = useState("North South University");

  const handleEdit = () => {
    setTempName(name);
    setTempCampus(campus);
    setIsEditing(true);
  };

  const handleSave = () => {
    setName(tempName);
    setCampus(tempCampus);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setIsEditing(false);
  };

  const mySkills = [
    {
      id: "1",
      teaching: "Advanced React & Next.js",
      wanted: ["UI/UX Design", "Figma"],
    }
  ];

  const tradeRequests = [
    {
      id: "req1",
      from: "Sajid Hasan",
      offering: "UI/UX Design Mentorship",
      forSkill: "Advanced React & Next.js",
      status: "pending"
    }
  ];

  return (
    <div className="space-y-10 max-w-6xl mx-auto px-4 sm:px-0">

      {/* Premium Profile Header */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="relative bg-white rounded-[1rem] p-8 sm:p-12 shadow-xl shadow-blue-900/5 border border-gray-100 overflow-hidden"
      >
        <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-bl from-blue-100 to-transparent rounded-full blur-3xl opacity-50 -z-10"></div>

        <div className="flex flex-col md:flex-row items-center md:items-start gap-8 z-10 relative">
          <div className="w-32 h-32 rounded-full bg-gradient-to-tr from-blue-600 to-indigo-500 p-1 shadow-lg shadow-blue-500/20">
            <div className="w-full h-full rounded-full bg-white flex items-center justify-center text-4xl font-black text-blue-600">
              R
            </div>
          </div>

          <div className="flex-1 text-center md:text-left">
            <div className="inline-flex items-center space-x-1.5 bg-green-50 text-green-700 px-3 py-1 rounded-full text-xs font-bold mb-3 border border-green-200">
              <ShieldCheck size={14} />
              <span>Verified Student</span>
            </div>
            {isEditing ? (
              <div className="space-y-4 mb-6">
                <div>
                  <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">Full Name</label>
                  <Input
                    value={tempName}
                    onChange={(e) => setTempName(e.target.value)}
                    className="max-w-md bg-gray-50 border-gray-200 rounded-xl"
                    placeholder="Enter your name"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">Campus Name</label>
                  <Input
                    value={tempCampus}
                    onChange={(e) => setTempCampus(e.target.value)}
                    className="max-w-md bg-gray-50 border-gray-200 rounded-xl"
                    placeholder="Enter campus name"
                  />
                </div>
              </div>
            ) : (
              <>
                <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 mb-2">{name}</h1>
                <div className="flex flex-wrap items-center justify-center md:justify-start gap-4 text-sm font-medium text-gray-500 mb-6">
                  <span className="flex items-center"><MapPin size={16} className="mr-1.5 text-blue-500" /> {campus}</span>
                  <span className="flex items-center"><Award size={16} className="mr-1.5 text-orange-500" /> 2 Successful Trades</span>
                </div>
              </>
            )}

            <div className="flex flex-wrap items-center justify-center md:justify-start gap-3">
              {isEditing ? (
                <>
                  <Button
                    onClick={handleSave}
                    className="bg-blue-600 hover:bg-blue-700 text-white rounded-xl px-8 shadow-md"
                  >
                    <Save size={18} className="mr-2" /> Save Changes
                  </Button>
                  <Button
                    onClick={handleCancel}
                    variant="outline"
                    className="bg-white hover:bg-gray-50 text-gray-700 rounded-xl px-8 shadow-sm border-gray-200"
                  >
                    <X size={18} className="mr-2" /> Cancel
                  </Button>
                </>
              ) : (
                <Button
                  onClick={handleEdit}
                  className="bg-gray-900 hover:bg-gray-800 text-white rounded-xl px-8 shadow-md"
                >
                  <Edit size={18} className="mr-2" /> Edit Profile
                </Button>
              )}
            </div>
          </div>
        </div>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">

        {/* Left Column: My Skills */}
        <div className="lg:col-span-2 space-y-6">
          <div className="flex items-center justify-between px-2">
            <h2 className="text-2xl font-bold text-gray-900">My Active Posts</h2>
          </div>

          {mySkills.length === 0 ? (
            <div className="text-center p-12 bg-white rounded-[2rem] border border-dashed border-gray-200 shadow-sm">
              <p className="text-gray-500 font-medium tracking-wide">You haven&apos;t posted any skills yet.</p>
            </div>
          ) : (
            <div className="space-y-6">
              {mySkills.map((skill, i) => (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                  key={skill.id}
                  className="bg-white rounded-[2rem] border border-gray-100 shadow-sm overflow-hidden hover:shadow-lg transition-all"
                >
                  <div className="p-8 sm:flex items-center justify-between gap-6">
                    <div className="flex-1">
                      <div className="text-[10px] uppercase tracking-widest font-bold text-gray-400 mb-2">Teaching</div>
                      <h3 className="text-2xl font-extrabold text-gray-900 mb-4">{skill.teaching}</h3>
                      <div className="text-[10px] uppercase tracking-widest font-bold text-gray-400 mb-2">Wanted in return</div>
                      <div className="flex flex-wrap gap-2">
                        {skill.wanted.map(w => (
                          <span key={w} className="px-3 py-1 bg-gray-50 border border-gray-100 rounded-lg text-sm font-semibold text-gray-700">{w}</span>
                        ))}
                      </div>
                    </div>

                    <div className="flex sm:flex-col gap-3 mt-8 sm:mt-0 pt-6 sm:pt-0 border-t sm:border-t-0 sm:border-l border-gray-100 sm:pl-6 min-w-[140px]">
                      <Button variant="outline" className="flex-1 justify-center rounded-xl border-gray-200">
                        <Edit size={16} className="mr-2" /> Edit
                      </Button>
                      <Button variant="destructive" className="flex-1 justify-center rounded-xl bg-red-50 text-red-600 hover:bg-red-100 border-none shadow-none">
                        <Trash2 size={16} className="mr-2" /> Delete
                      </Button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>

        {/* Right Column: Trade Requests */}
        <div className="space-y-6">
          <h2 className="text-2xl font-bold text-gray-900 px-2">Inbox</h2>

          <div className="space-y-4">
            {tradeRequests.length === 0 ? (
              <p className="text-gray-500 font-medium text-center p-8 bg-white rounded-3xl border border-gray-100">No new requests.</p>
            ) : (
              tradeRequests.map((req, i) => (
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.1 }}
                  key={req.id}
                  className="bg-white p-6 rounded-[2rem] border border-gray-100 shadow-sm relative overflow-hidden group hover:shadow-md transition-all"
                >
                  <div className="absolute top-0 left-0 w-1.5 h-full bg-blue-500 group-hover:bg-blue-600 transition-colors"></div>

                  <div className="flex justify-between items-start mb-4">
                    <span className="font-extrabold text-gray-900 text-lg">{req.from}</span>
                    <span className="text-[10px] uppercase tracking-wider font-bold text-blue-700 bg-blue-50 border border-blue-100 px-2 py-1 rounded-full">New Request</span>
                  </div>

                  <div className="space-y-3 mb-6">
                    <div>
                      <span className="text-xs font-bold text-gray-400 uppercase tracking-wider block mb-1">They Offer</span>
                      <span className="text-sm font-semibold text-gray-800 bg-gray-50 px-3 py-1 rounded-lg inline-block border border-gray-100">{req.offering}</span>
                    </div>
                    <div>
                      <span className="text-xs font-bold text-gray-400 uppercase tracking-wider block mb-1">For Your</span>
                      <span className="text-sm font-medium text-gray-600">{req.forSkill}</span>
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <Button className="flex-1 rounded-xl bg-green-500 hover:bg-green-600 text-white shadow-lg shadow-green-500/20">
                      <CheckCircle size={16} className="mr-1.5" /> Accept
                    </Button>
                    <Button variant="outline" className="flex-1 rounded-xl text-gray-500 hover:text-red-600 hover:bg-red-50 border-gray-200">
                      <XCircle size={16} className="mr-1.5" /> Decline
                    </Button>
                  </div>
                </motion.div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
