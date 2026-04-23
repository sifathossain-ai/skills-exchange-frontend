"use client";

import { Button } from "@/components/ui/button";
import { Edit, Trash2, CheckCircle, XCircle, MapPin, Award, ShieldCheck, LogOut, Save, X, Loader2 } from "lucide-react";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { LoginModule } from "@/components/auth/LoginModule";
import { RegisterModule } from "@/components/auth/RegisterModule";
import { Input } from "@/components/ui/input";
import { toast } from "react-toastify";
import { MdCancel, MdDeleteOutline } from "react-icons/md";
import { Modal } from "@/components/ui/modal";

export default function Profile() {
  const [isMounted, setIsMounted] = useState(false);
  const [authMode, setAuthMode] = useState<'login' | 'register' | 'authenticated'>('login');
  const [user, setUser] = useState<{ name: string; campusId: string | null } | null>(null);

  const [isEditing, setIsEditing] = useState(false);
  const [tempName, setTempName] = useState("");
  const [tempCampus, setTempCampus] = useState("");

  const [mySkills, setMySkills] = useState<any[]>([]);
  const [isLoadingSkills, setIsLoadingSkills] = useState(true);

  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [skillToDelete, setSkillToDelete] = useState<{ id: string; name: string } | null>(null);

  const [isActionModalOpen, setIsActionModalOpen] = useState(false);
  const [pendingAction, setPendingAction] = useState<{ id: string; name: string; type: 'accept' | 'decline' } | null>(null);
  const [contactNumber, setContactNumber] = useState("");

  const [activeTab, setActiveTab] = useState<'inbox' | 'sent'>('inbox');
  const [tradeRequests, setTradeRequests] = useState<any[]>([]);
  const [sentRequests, setSentRequests] = useState<any[]>([]);
  const [isLoadingRequests, setIsLoadingRequests] = useState(true);

  useEffect(() => {
    setIsMounted(true);
    const token = localStorage.getItem("accessToken");
    const storedUser = localStorage.getItem("user");
    if (token && storedUser) {
      setAuthMode('authenticated');
      try {
        const parsedUser = JSON.parse(storedUser);
        setUser(parsedUser);
        setTempName(parsedUser.name || "");
        setTempCampus(parsedUser.campusId || "");
      } catch (e) { }
    }
  }, []);

  const refreshUser = () => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser);
        setUser(parsedUser);
        setTempName(parsedUser.name || "");
        setTempCampus(parsedUser.campusId || "");
      } catch (e) { }
    }
    setAuthMode('authenticated');
  };

  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    localStorage.removeItem("user");
    setUser(null);
    setAuthMode('login');
  };

  useEffect(() => {
    const fetchMySkills = async () => {
      try {
        const token = localStorage.getItem("accessToken");
        if (!token) return;

        const res = await fetch("http://localhost:3000/skills/my-skills", {
          headers: {
            "Authorization": `Bearer ${token}`,
          },
        });

        if (res.ok) {
          const data = await res.json();
          setMySkills(data);
        }
      } catch (error) {
        console.error("Error fetching skills:", error);
      } finally {
        setIsLoadingSkills(false);
      }
    };

    const fetchIncomingRequests = async () => {
      try {
        const token = localStorage.getItem("accessToken");
        if (!token) return;

        const res = await fetch("http://localhost:3000/exchange-skills/incoming", {
          headers: {
            "Authorization": `Bearer ${token}`,
          },
        });

        if (res.ok) {
          const data = await res.json();
          setTradeRequests(data);
        }
      } catch (error) {
        console.error("Error fetching incoming requests:", error);
      } finally {
        setIsLoadingRequests(false);
      }
    };

    const fetchSentRequests = async () => {
      try {
        const token = localStorage.getItem("accessToken");
        if (!token) return;

        const res = await fetch("http://localhost:3000/exchange-skills/sent", {
          headers: {
            "Authorization": `Bearer ${token}`,
          },
        });

        if (res.ok) {
          const data = await res.json();
          setSentRequests(data);
        }
      } catch (error) {
        console.error("Error fetching sent requests:", error);
      }
    };

    if (authMode === 'authenticated') {
      fetchMySkills();
      fetchIncomingRequests();
      fetchSentRequests();
    }
  }, [authMode]);

  const updateRequestStatus = async (id: string, action: 'accept' | 'decline') => {
    if (action === 'accept' && !contactNumber) {
      toast.error("Please provide a contact number to accept the request");
      return;
    }

    try {
      const token = localStorage.getItem("accessToken");
      if (!token) return;

      const body = action === 'accept' ? JSON.stringify({ contactNumber }) : undefined;

      const res = await fetch(`http://localhost:3000/exchange-skills/${id}/${action}`, {
        method: "PATCH",
        headers: {
          "Authorization": `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body,
      });

      if (res.ok) {
        toast.success(`Request ${action}ed successfully`);
        // Remove the request from the list
        setTradeRequests((prev) => prev.filter((req) => req.id !== id));
        setContactNumber(""); // Clear the input
      } else {
        const errorData = await res.json().catch(() => ({}));
        toast.error(errorData.message || `Failed to ${action} request`);
      }
    } catch (error) {
      console.error(`Error updating request status (${action}):`, error);
      toast.error(`An error occurred while trying to ${action} the request`);
    } finally {
      setIsActionModalOpen(false);
    }
  };

  const handleActionClick = (id: string, name: string, type: 'accept' | 'decline') => {
    setPendingAction({ id, name, type });
    setIsActionModalOpen(true);
  };

  const deleteSkill = (id: string, skillName: string) => {
    setSkillToDelete({ id, name: skillName });
    setIsDeleteModalOpen(true);
  };

  const handleConfirmDelete = async (id: string) => {
    try {
      const token = localStorage.getItem("accessToken");
      if (!token) {
        toast.error("You must be logged in to delete a skill");
        return;
      }

      const res = await fetch(`http://localhost:3000/skills/${id}`, {
        method: "DELETE",
        headers: {
          "Authorization": `Bearer ${token}`,
        },
      });

      if (res.ok) {
        setMySkills((prev) => prev.filter((skill) => skill.id !== id));
        toast.success("Skill deleted successfully");
      } else {
        const errorData = await res.json().catch(() => ({}));
        toast.error(errorData.message || "Failed to delete skill");
      }
    } catch (error) {
      console.error("Error deleting skill:", error);
      toast.error("An error occurred while deleting the skill");
    }
  };


  const handleEdit = () => {
    setTempName(user?.name || "");
    setTempCampus(user?.campusId || "");
    setIsEditing(true);
  };

  const handleSave = () => {
    const updatedUser = { ...user, name: tempName, campusId: tempCampus };
    setUser(updatedUser as any);
    localStorage.setItem("user", JSON.stringify(updatedUser));
    setIsEditing(false);
  };

  const handleCancel = () => {
    setIsEditing(false);
  };

  if (!isMounted) return null;

  if (authMode === 'login') {
    return <LoginModule onLogin={refreshUser} onGoToRegister={() => setAuthMode('register')} />;
  }

  if (authMode === 'register') {
    return <RegisterModule onRegister={refreshUser} onGoToLogin={() => setAuthMode('login')} />;
  }

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
            <div className="w-full h-full rounded-full bg-white flex items-center justify-center text-4xl font-black text-blue-600 uppercase">
              {user?.name ? user.name.charAt(0) : "U"}
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
                  <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">Campus ID</label>
                  <Input
                    value={tempCampus}
                    onChange={(e) => setTempCampus(e.target.value)}
                    className="max-w-md bg-gray-50 border-gray-200 rounded-xl"
                    placeholder="Enter campus ID"
                  />
                </div>
              </div>
            ) : (
              <>
                <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 mb-2">
                  {user?.name || "Student"}
                </h1>
                <div className="flex flex-wrap items-center justify-center md:justify-start gap-4 text-sm font-medium text-gray-500 mb-6">
                  <span className="flex items-center">
                    <MapPin size={16} className="mr-1.5 text-blue-500" />
                    {user?.campusId ? `Campus ID: ${user.campusId}` : "Campus ID: Not Updated"}
                  </span>
                  <span className="flex items-center"><Award size={16} className="mr-1.5 text-orange-500" /> 2 Successful Trades</span>
                </div>
              </>
            )}

            <div className="flex flex-wrap items-center justify-center md:justify-start gap-3 mt-2">
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
                <>
                  <Button
                    onClick={handleEdit}
                    className="bg-gray-900 hover:bg-gray-800 text-white rounded-xl px-8 shadow-md"
                  >
                    <Edit size={18} className="mr-2" /> Edit Profile
                  </Button>
                  <Button
                    variant="outline"
                    onClick={handleLogout}
                    className="rounded-xl px-4 border-red-200 text-red-600 hover:bg-red-50 hover:text-red-700"
                  >
                    <LogOut size={18} className="mr-2" /> Logout
                  </Button>
                </>
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

          {isLoadingSkills ? (
            <div className="flex justify-center p-12">
              <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
            </div>
          ) : mySkills.length === 0 ? (
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
                  className="bg-white rounded-[1rem] border border-gray-100 shadow-sm overflow-hidden hover:shadow-lg transition-all"
                >
                  <div className="p-8 sm:flex items-center justify-between gap-6">
                    <div className="flex-1">
                      <div className="text-[10px] uppercase tracking-widest font-bold text-gray-400 mb-2">Teaching</div>
                      <h3 className="text-2xl font-extrabold text-gray-900 mb-4">{skill.teachingSkill}</h3>
                      <div className="text-[10px] uppercase tracking-widest font-bold text-gray-400 mb-2">Wanted in return</div>
                      <div className="flex flex-wrap gap-2">
                        {skill.wantedSkills?.map((w: string) => (
                          <span key={w} className="px-3 py-1 bg-gray-50 border border-gray-100 rounded-lg text-sm font-semibold text-gray-700">{w}</span>
                        ))}
                      </div>
                    </div>

                    <div className="flex sm:flex-col gap-3 mt-8 sm:mt-0 pt-6 sm:pt-0 border-t sm:border-t-0 sm:border-l border-gray-100 sm:pl-6 min-w-[140px]">
                      <Button variant="outline" className="flex-1 justify-center rounded-xl border-gray-200">
                        <Edit size={16} className="mr-2" /> Edit
                      </Button>
                      <Button onClick={() => deleteSkill(skill.id, skill.teachingSkill)} variant="destructive" className="flex-1 justify-center rounded-xl bg-red-50 text-red-600 hover:bg-red-100 border-none shadow-none">
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
          <div className="flex items-center justify-between px-2">
            <h2 className="text-2xl font-bold text-gray-900">Exchange</h2>
            <div className="flex bg-gray-100 p-1 rounded-xl">
              <button
                onClick={() => setActiveTab('inbox')}
                className={`px-4 py-1.5 rounded-lg text-xs font-bold transition-all ${activeTab === 'inbox'
                  ? "bg-white text-blue-600 shadow-sm"
                  : "text-gray-500 hover:text-gray-700"
                  }`}
              >
                Inbox
              </button>
              <button
                onClick={() => setActiveTab('sent')}
                className={`px-4 py-1.5 rounded-lg text-xs font-bold transition-all ${activeTab === 'sent'
                  ? "bg-white text-blue-600 shadow-sm"
                  : "text-gray-500 hover:text-gray-700"
                  }`}
              >
                My Request
              </button>
            </div>
          </div>

          <div className="space-y-4">
            {isLoadingRequests ? (
              <div className="flex flex-col items-center justify-center py-12 space-y-3">
                <Loader2 className="w-8 h-8 text-blue-600 animate-spin" />
                <p className="text-gray-400 text-sm font-medium">Checking requests...</p>
              </div>
            ) : activeTab === 'inbox' ? (
              tradeRequests.length === 0 ? (
                <p className="text-gray-500 font-medium text-center p-8 bg-white rounded-3xl border border-gray-100">No new incoming requests.</p>
              ) : (
                tradeRequests.map((req, i) => (
                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.1 }}
                    key={req.id}
                    className="bg-white p-6 rounded-[1rem] border border-gray-100 shadow-sm relative overflow-hidden group hover:shadow-md transition-all"
                  >
                    <div className="absolute top-0 left-0 w-1.5 h-full bg-blue-500 group-hover:bg-blue-600 transition-colors"></div>

                    <div className="flex justify-between items-start mb-4">
                      <span className="font-extrabold text-gray-900 text-lg">{req.proposer?.name || "Anonymous"}</span>
                      <span className="text-[10px] uppercase tracking-wider font-bold text-blue-700 bg-blue-50 border border-blue-100 px-2 py-1 rounded-full">New Request</span>
                    </div>

                    <div className="space-y-3 mb-6">
                      <div>
                        <span className="text-xs font-bold text-gray-400 uppercase tracking-wider block mb-1">They Offer</span>
                        <span className="text-sm font-semibold text-gray-800 bg-gray-50 px-3 py-1 rounded-lg inline-block border border-gray-100">{req.skillOffered}</span>
                      </div>
                      <div>
                        <span className="text-xs font-bold text-gray-400 uppercase tracking-wider block mb-1">For Your</span>
                        <span className="text-sm font-medium text-gray-600">{req.post?.teachingSkill}</span>
                      </div>
                    </div>

                    <div className="flex gap-3">
                      <Button
                        onClick={() => handleActionClick(req.id, req.proposer?.name || "Anonymous", 'accept')}
                        className="flex-1 rounded-xl bg-green-500 hover:bg-green-600 text-white shadow-lg shadow-green-500/20"
                      >
                        <CheckCircle size={16} className="mr-1.5" /> Accept
                      </Button>
                      <Button
                        onClick={() => handleActionClick(req.id, req.proposer?.name || "Anonymous", 'decline')}
                        variant="outline"
                        className="flex-1 rounded-xl text-gray-500 hover:text-red-600 hover:bg-red-50 border-gray-200"
                      >
                        <XCircle size={16} className="mr-1.5" /> Decline
                      </Button>
                    </div>
                  </motion.div>
                ))
              )
            ) : (
              sentRequests.length === 0 ? (
                <p className="text-gray-500 font-medium text-center p-8 bg-white rounded-3xl border border-gray-100">You haven't sent any requests yet.</p>
              ) : (
                sentRequests.map((req, i) => (
                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.1 }}
                    key={req.id}
                    className="bg-white p-6 rounded-[1rem] border border-gray-100 shadow-sm relative overflow-hidden group hover:shadow-md transition-all"
                  >
                    <div className={`absolute top-0 left-0 w-1.5 h-full transition-colors ${req.status?.toLowerCase() === 'accepted'
                      ? 'bg-green-500'
                      : (req.status?.toLowerCase() === 'declined' || req.status?.toLowerCase() === 'rejected')
                        ? 'bg-red-500'
                        : 'bg-gray-400'
                      }`}></div>

                    <div className="flex justify-between items-start mb-4">
                      <span className="font-extrabold text-gray-900 text-lg">{req.post?.creator?.name || "Student"}</span>
                      <span className={`text-[10px] uppercase tracking-wider font-bold px-2 py-1 rounded-full border ${req.status?.toLowerCase() === 'accepted'
                        ? 'text-green-700 bg-green-50 border-green-100'
                        : (req.status?.toLowerCase() === 'declined' || req.status?.toLowerCase() === 'rejected')
                          ? 'text-red-700 bg-red-50 border-red-100'
                          : 'text-gray-600 bg-gray-50 border-gray-200'
                        }`}>
                        {req.status}
                      </span>
                    </div>

                    <div className="space-y-3">
                      <div>
                        <span className="text-xs font-bold text-gray-400 uppercase tracking-wider block mb-1">You Offered</span>
                        <span className="text-sm font-semibold text-gray-800 bg-gray-50 px-3 py-1 rounded-lg inline-block border border-gray-100">{req.skillOffered}</span>
                      </div>
                      <div>
                        <span className="text-xs font-bold text-gray-400 uppercase tracking-wider block mb-1">For Their</span>
                        <span className="text-sm font-medium text-gray-600">{req.post?.teachingSkill}</span>
                      </div>
                      {req.status?.toLowerCase() === 'accepted' && req.contactNumber && (
                        <div className="mt-4 pt-4 border-t border-gray-50 flex items-center justify-between">
                          <span className="text-xs font-bold text-blue-600 uppercase tracking-wider">Contact Info</span>
                          <span className="text-sm font-black text-gray-900 bg-blue-50 px-3 py-1 rounded-lg border border-blue-100">{req.contactNumber}</span>
                        </div>
                      )}
                    </div>
                  </motion.div>
                ))
              )
            )}
          </div>
        </div>
      </div>

      {/* Delete Confirmation Modal - Square & Middle Positioned */}
      <Modal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        className="max-w-[420px] p-0 overflow-hidden border-none shadow-[0_20px_50px_rgba(0,0,0,0.2)] rounded-xl md:rounded-[1.5rem] bg-white animate-in zoom-in-95 duration-200"
      >
        <div className="flex flex-col items-center text-center p-4 md:p-6">
          <div className="w-14 h-14 bg-red-50 rounded-[1rem] flex items-center justify-center mb-6 text-red-500 relative">
            <div className="absolute inset-0 bg-red-500/10 rounded-[2rem] animate-ping opacity-20"></div>
            <MdDeleteOutline size={28} className="relative z-10" />
          </div>

          <p className="text-gray-500 mb-4 md:mb-6 leading-relaxed text-lg">
            Are you sure you want to delete <span className="font-extrabold text-gray-900 block mt-1">"{skillToDelete?.name}"</span>?
          </p>

          <div className="flex w-full gap-4">
            <Button
              variant="outline"
              onClick={() => setIsDeleteModalOpen(false)}
              className="flex-1 h-12 rounded-xl font-bold border-gray-200 text-gray-500 hover:bg-gray-50 flex items-center justify-center gap-2 text-base transition-all"
            >
              <MdCancel size={22} />
              Cancel
            </Button>
            <Button
              variant="destructive"
              onClick={() => {
                if (skillToDelete) handleConfirmDelete(skillToDelete.id);
                setIsDeleteModalOpen(false);
              }}
              className="flex-1 h-12 rounded-xl font-black bg-red-600 hover:bg-red-700 text-white shadow-xl shadow-red-200 flex items-center justify-center gap-2 text-base transition-all hover:scale-[1.02] active:scale-95"
            >
              <MdDeleteOutline size={22} />
              Delete
            </Button>
          </div>
        </div>
      </Modal>
      {/* Action Confirmation Modal (Accept/Decline) */}
      <Modal
        isOpen={isActionModalOpen}
        onClose={() => setIsActionModalOpen(false)}
        className="max-w-[420px] p-0 overflow-hidden border-none shadow-[0_20px_50px_rgba(0,0,0,0.2)] rounded-xl md:rounded-[1.5rem] bg-white animate-in zoom-in-95 duration-200"
      >
        <div className="flex flex-col items-center text-center p-4 md:p-6">
          <div className={`w-14 h-14 rounded-[1rem] flex items-center justify-center mb-6 relative ${pendingAction?.type === 'accept' ? 'bg-green-50 text-green-500' : 'bg-red-50 text-red-500'
            }`}>
            <div className={`absolute inset-0 rounded-[2rem] animate-ping opacity-20 ${pendingAction?.type === 'accept' ? 'bg-green-500/10' : 'bg-red-500/10'
              }`}></div>
            {pendingAction?.type === 'accept' ? <CheckCircle size={28} className="relative z-10" /> : <XCircle size={28} className="relative z-10" />}
          </div>

          <p className="text-gray-500 mb-4 md:mb-6 leading-relaxed text-lg">
            Are you sure you want to <span className={`font-black ${pendingAction?.type === 'accept' ? 'text-green-600' : 'text-red-600'}`}>{pendingAction?.type}</span> this exchange request from <span className="font-extrabold text-gray-900 block mt-1">"{pendingAction?.name}"</span>?
          </p>

          {pendingAction?.type === 'accept' && (
            <div className="w-full mb-6 text-left space-y-2">
              <label className="text-xs font-black text-gray-400 uppercase tracking-[0.1em] ml-1">Your Contact Info (WhatsApp/Phone)</label>
              <Input
                value={contactNumber}
                onChange={(e) => setContactNumber(e.target.value)}
                placeholder="e.g. +880 1234 567890"
                className="h-12 rounded-xl border-gray-200 bg-gray-50/50 focus:bg-white transition-all font-bold text-gray-900"
              />
              <p className="text-[10px] text-gray-400 ml-1 italic font-medium">* Shared only with the student after you accept.</p>
            </div>
          )}

          <div className="flex w-full gap-4">
            <Button
              variant="outline"
              onClick={() => setIsActionModalOpen(false)}
              className="flex-1 h-12 rounded-xl font-bold border-gray-200 text-gray-500 hover:bg-gray-50 flex items-center justify-center gap-2 text-base transition-all"
            >
              <MdCancel size={22} />
              Cancel
            </Button>
            <Button
              onClick={() => {
                if (pendingAction) updateRequestStatus(pendingAction.id, pendingAction.type);
              }}
              className={`flex-1 h-12 rounded-xl font-black text-white shadow-xl flex items-center justify-center gap-2 text-base transition-all hover:scale-[1.02] active:scale-95 ${pendingAction?.type === 'accept'
                ? 'bg-green-500 hover:bg-green-600 shadow-green-200'
                : 'bg-red-600 hover:bg-red-700 shadow-red-200'
                }`}
            >
              {pendingAction?.type === 'accept' ? <CheckCircle size={22} /> : <XCircle size={22} />}
              {pendingAction?.type === 'accept' ? 'Accept' : 'Decline'}
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
