"use client";

import { useState, useEffect } from "react";
import { EmptyState } from "@/components/ui/EmptyState";
import { Search, SearchX, Loader2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { SkillCard } from "@/components/cards/SkillCard";
import { SkillPost } from "@/types";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { useModal } from "@/context/ModalContext";

export default function SkillsPage() {
  const router = useRouter();
  const { openCreatePost } = useModal();
  const [searchTerm, setSearchTerm] = useState("");
  const [skills, setSkills] = useState<SkillPost[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const handleCreateClick = () => {
    const token = localStorage.getItem("accessToken");
    if (token) {
      openCreatePost();
    } else {
      toast.error("You must be logged in to create a post");
      router.push("/profile");
    }
  };

  useEffect(() => {
    const fetchSkills = async () => {
      try {
        setIsLoading(true);
        const token = localStorage.getItem("accessToken");
        const hasToken = token && token !== "null" && token !== "undefined";

        const response = await fetch("http://localhost:3000/skills/all", {
          ...(hasToken ? { headers: { "Authorization": `Bearer ${token}` } } : {})
        });

        if (response.ok) {
          const data = await response.json();
          setSkills(data);
          console.log(data);
        }
      } catch (error) {
        console.error("Error fetching skills:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchSkills();
  }, []);

  const filteredProducts = skills.filter((product) =>
    product.teachingSkill.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="mx-auto space-y-6">
      <div className="max-w-3xl mx-auto bg-white p-6 rounded-2xl shadow-sm border border-gray-100 mb-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-4">Search Skills</h1>
        <div className="flex space-x-2">
          <Input
            placeholder="What do you want to learn?"
            className="h-12 text-base flex-1"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <Button className="h-12 px-8">
            <Search size={18} className="mr-2" />
            Find
          </Button>
        </div>
      </div>

      {isLoading ? (
        <div className="flex flex-col items-center justify-center py-20 space-y-4">
          <Loader2 className="w-10 h-10 text-blue-600 animate-spin" />
          <p className="text-gray-500 font-medium animate-pulse">Loading amazing skills...</p>
        </div>
      ) : filteredProducts.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {filteredProducts.map((product, index) => (
            <SkillCard key={product.id} post={product} index={index} />
          ))}
        </div>
      ) : (
        <EmptyState
          icon={SearchX}
          title="No skills found"
          description={searchTerm ? `We couldn't find any skills matching "${searchTerm}". Try a different term or create a request!` : "There are no skills available at the moment."}
          action={<Button onClick={handleCreateClick} className="rounded-full">Request Skill</Button>}
        />
      )}
    </div>
  );
}
