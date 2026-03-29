import { EmptyState } from "@/components/ui/EmptyState";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function SkillsPage() {
  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 mb-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-4">Search Skills</h1>
        <div className="flex space-x-2">
          <Input
            placeholder="What do you want to learn?"
            className="h-12 text-base flex-1"
          />
          <Button className="h-12 px-8">
            <Search size={18} className="mr-2" />
            Find
          </Button>
        </div>
      </div>

      <EmptyState
        icon={Search}
        title="Start exploring"
        description="Enter a skill you want to learn to find students in your area who can teach you."
      />
    </div>
  );
}
