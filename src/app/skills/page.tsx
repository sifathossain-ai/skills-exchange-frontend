"use client";

import { useState } from "react";
import { EmptyState } from "@/components/ui/EmptyState";
import { Search, SearchX } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { SkillCard } from "@/components/cards/SkillCard";
import { SkillPost } from "@/types";

import { fakeProducts } from "@/lib/data";

export default function SkillsPage() {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredProducts = fakeProducts.filter((product) =>
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

      {filteredProducts.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {filteredProducts.map((product, index) => (
            <SkillCard key={product.id} post={product} index={index} />
          ))}
        </div>
      ) : (
        <EmptyState
          icon={SearchX}
          title="No skills found"
          description={`We couldn't find any skills matching "${searchTerm}". Try a different term or create a request!`}
          action={<Button className="rounded-full">Request Skill</Button>}
        />
      )}
    </div>
  );
}
