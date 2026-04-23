export interface SkillPost {
  id: string;
  teachingSkill: string;
  skillImage: string;
  wantedSkills: string[];
  description: string;
  category: string;
  isActive: boolean;
  name?: string; // Optional if not returned in /all
  campusId?: string; // Optional if not returned in /all
  creator?: {
    name: string;
  };
  createdDate: string;
  updatedDate: string;
}
