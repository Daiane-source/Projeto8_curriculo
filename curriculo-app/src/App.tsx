import { useState } from "react";
import AppLayout from "./components/AppLayout";
import FormPanel from "./components/FormPanel";
import SkillsForm from "./components/SkillsForm";
import ExperienceForm from "./components/ExperienceForm";
import ExperienceList from "./components/ExperienceList";

import PreviewPanel from "./components/PreviewPanel";
import SkillsPreview from "./components/SkillsPreview";
import ExperiencePreview from "./components/ExperiencePreview"; // nome exato do arquivo

import type { CVState } from "./types/cv.d";
import type { Experience } from "./types/cv.d";

type Skill = { nome: string; nivel: string; };

const initialState: CVState = {
  personal: { name: "", email: "", phone: "", linkedin: "", summary: "" },
};

export default function App() {
  const [cv, setCv] = useState<CVState>(initialState);
  const [skills, setSkills] = useState<Skill[]>([]);
  const [experiences, setExperiences] = useState<Experience[]>([]);

  const updatePersonal = (partial: Partial<CVState["personal"]>) => {
    setCv(prev => ({ ...prev, personal: { ...prev.personal, ...partial } }));
  };

  const addSkill = (skill: Skill) => setSkills(prev => [...prev, skill]);
  const removeSkill = (i: number) =>
    setSkills(prev => prev.filter((_, idx) => idx !== i));

  const addExperience = (exp: Experience) =>
    setExperiences(prev => [...prev, exp]);
  const removeExperience = (i: number) =>
    setExperiences(prev => prev.filter((_, idx) => idx !== i));

  return (
    <AppLayout>
      {/* ← primeira coluna: todos os formulários */}
      <div>
        <FormPanel personal={cv.personal} updatePersonal={updatePersonal} />
        <SkillsForm
          skills={skills}
          addSkill={addSkill}
          removeSkill={removeSkill}
        />
        <ExperienceForm addExperience={addExperience} />
        <ExperienceList
          experiences={experiences}
          removeExperience={removeExperience}
        />
      </div>

      {/* ← segunda coluna: todo o preview */}
      <div>
        <PreviewPanel cv={cv} />
        <SkillsPreview skills={skills} />
        <ExperiencePreview experiences={experiences} />
      </div>
    </AppLayout>
  );
}