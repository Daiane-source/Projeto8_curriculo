import type { Dispatch, SetStateAction } from "react"

export interface PersonalData {
  name: string;
  email: string;
  phone: string;
  linkedin: string;
  summary: string;
  photo?: string;
}

export interface CVState {
  personal: PersonalData;
}


export interface Experience {
  empresa: string;
  cargo: string;
  inicio: string;
  fim: string;
  descricao: string;
}

export interface Skill {
  nome: string;
  nivel: string;
}

export interface SkillsFormProps {
  skills: Skill[];                                 
  draft: Skill;                                    
  setDraft: Dispatch<SetStateAction<Skill>>;       
  save: () => void;                               
  removeSkill: (index: number) => void;            
}


export interface ExperienceFormProps {
  draft: Experience;
  setDraft: Dispatch<SetStateAction<Experience>>;
  save: () => void;
}
