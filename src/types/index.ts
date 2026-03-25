export interface SkillPost {
  id: string;
  name: string; // User Name
  campusId: string;
  teachingSkill: string;
  wantedSkills: string[];
  thumbnailUrl: string; // Mandatory field
  description?: string; // Additional field suggested by Prompt: 'Description'
}
