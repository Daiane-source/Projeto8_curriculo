import { useState, useCallback } from "react";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";


import AppLayout from "./components/AppLayout";
import FormPanel from "./components/FormPanel";
import SkillsForm from "./components/SkillsForm";
import ExperienceForm from "./components/ExperienceForm";
import ExperienceList from "./components/ExperienceList";

import PreviewPanel from "./components/PreviewPanel";
import SkillsPreview from "./components/SkillsPreview";
import ExperiencePreview from "./components/ExperiencePreview";

import type { CVState, Experience, Skill } from "./types/cv.d";

// estado inicial dos dados pessoais
const initialState: CVState = {
  personal: { name: "", email: "", phone: "", linkedin: "", summary: "" },
};

export default function App() {
  // estados centrais
  const [cv, setCv] = useState<CVState>(initialState);
  const [skills, setSkills] = useState<Skill[]>([]);
  const [experiences, setExperiences] = useState<Experience[]>([]);

  // funções de navbar/footer
  const handleExportPDF = useCallback(() => {
    console.log("Exportar PDF!");
    // aqui use html2pdf, jsPDF, window.print() etc.
  }, []);

  const handleSaveCV = useCallback(() => {
    console.log("Salvar currículo!");
    // aqui salve no backend ou localStorage
  }, []);

  // atualiza dados pessoais
  const updatePersonal = (partial: Partial<CVState["personal"]>) =>
    setCv((prev) => ({
      ...prev,
      personal: { ...prev.personal, ...partial },
    }));

  // insere / remove habilidades
  const addSkill = (skill: Skill) =>
    setSkills((prev) => [...prev, skill]);
  const removeSkill = (i: number) =>
    setSkills((prev) => prev.filter((_, idx) => idx !== i));

  // insere / remove experiências
  const addExperience = (exp: Experience) =>
    setExperiences((prev) => [...prev, exp]);
  const removeExperience = (i: number) =>
    setExperiences((prev) => prev.filter((_, idx) => idx !== i));

  return (
    <AppLayout onExportPDF={handleExportPDF} onSaveCV={handleSaveCV}>
      {/* Coluna 1: formulários */}
      <div>
        <FormPanel
          personal={cv.personal}
          updatePersonal={updatePersonal}
        />

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

      {/* Coluna 2: previews */}
      <div>
        <PreviewPanel cv={cv} />

        <SkillsPreview skills={skills} />

        <ExperiencePreview experiences={experiences} />
      </div>
    </AppLayout>
  );
}