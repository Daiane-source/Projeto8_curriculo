import { useState } from "react";
import AppLayout from "./components/AppLayout";
import FormPanel from "./components/FormPanel";
import PreviewPanel from "./components/PreviewPanel";
import SkillsForm from "./components/SkillsForm";
import SkillsPreview from "./components/SkillsPreview";
import type { CVState } from "./types/cv.d";
import type { Experience } from "./types/cv.d";
import ExperienceForm from "./components/ExperienceForm";
import ExperienceList from "./components/ExperienceList";
import ExperiencePreview from "./components/ExperienciePreview";

// Definição do tipo de habilidade
type Skill = {
  nome: string;
  nivel: string;
};

// Estado inicial
const initialState: CVState = {
  personal: { name: "", email: "", phone: "", linkedin: "", summary: "" },
};

const [experiences, setExperiences] = useState<Experience[]>([]);

const addExperience = (exp: Experience) => {
  setExperiences((prev) => [...prev, exp]);
};

const removeExperience = (index: number) => {
  setExperiences((prev) => prev.filter((_, i) => i !== index));
};
export default function App() {
  // Estado central do currículo
  const [cv, setCv] = useState<CVState>(initialState);

  // Estado só para habilidades
  const [skills, setSkills] = useState<Skill[]>([]);

  // Atualiza apenas os dados pessoais
  const updatePersonal = (partial: Partial<CVState["personal"]>) => {
    setCv((prev) => ({ ...prev, personal: { ...prev.personal, ...partial } }));
  };

  // Adiciona uma habilidade
  const addSkill = (skill: Skill) => {
    setSkills((prev) => [...prev, skill]);
  };

  // Remove uma habilidade
  const removeSkill = (index: number) => {
    setSkills((prev) => prev.filter((_, i) => i !== index));
  };

  return (
    <>
      <AppLayout>
        <div>
          <FormPanel personal={cv.personal} updatePersonal={updatePersonal} />
          <SkillsForm
            skills={skills}
            addSkill={addSkill}
            removeSkill={removeSkill}
          />
        </div>
        <div>
          <PreviewPanel cv={cv} />
          <SkillsPreview skills={skills} />
        </div>
      </AppLayout>

      <ExperienceForm addExperience={addExperience} />
      <ExperienceList
        experiences={experiences}
        removeExperience={removeExperience}
      />
      <ExperiencePreview experiences={experiences} />
    </>
  );
}
