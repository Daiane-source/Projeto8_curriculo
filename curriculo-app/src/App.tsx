import { useState, useCallback, useRef } from "react";
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

  // exportar PDF
  const handleExportPDF = useCallback(() => {
    console.log(">> handleExportPDF chamado");
    const element = document.getElementById("pdfContent");
    if (!element) {
      console.error("Elemento #pdfContent não encontrado");
      return;
    }

    html2canvas(element, { scale: 2 })
      .then((canvas) => {
        const imgData = canvas.toDataURL("image/png");
        const pdf = new jsPDF({
          orientation: "portrait",
          unit: "pt",
          format: "a4",
        });

        const pdfWidth = pdf.internal.pageSize.getWidth();
        const pdfHeight = (canvas.height * pdfWidth) / canvas.width;

        pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
        pdf.save("curriculo.pdf");
        console.log("PDF gerado e baixado");
      })
      .catch((err) => {
        console.error("Erro ao capturar PDF:", err);
      });
  }, []);

  // salvar no localStorage
  const handleSaveCV = useCallback(() => {
    console.log(">> handleSaveCV chamado");
    const data = {
      personal: cv.personal,
      skills,
      experiences,
    };
    localStorage.setItem("meuCurriculo", JSON.stringify(data));
    console.log("LocalStorage setado:", localStorage.getItem("meuCurriculo"));
    alert("Currículo salvo localmente!");
  }, [cv, skills, experiences]);

  // atualiza dados pessoais
  const updatePersonal = (partial: Partial<CVState["personal"]>) =>
    setCv((prev) => ({
      ...prev,
      personal: { ...prev.personal, ...partial },
    }));

  // insere / remove habilidades
  const addSkill = (skill: Skill) => setSkills((prev) => [...prev, skill]);
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

      {/* Coluna 2: previews */}
      <div id="pdfContent">
        <PreviewPanel cv={cv} />

        <SkillsPreview skills={skills} />

        <ExperiencePreview experiences={experiences} />
      </div>
    </AppLayout>
  );
}
