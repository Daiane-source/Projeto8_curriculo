// src/App.tsx
import React, { useState, useCallback } from "react";
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

import type { CVState, Skill, Experience } from "./types/cv.d";

// Estado inicial dos dados pessoais
const initialState: CVState = {
  personal: { name: "", email: "", phone: "", linkedin: "", summary: "" },
};

export default function App() {
  // 1) Estados centrais
  const [cv, setCv] = useState<CVState>(initialState);
  const [skills, setSkills] = useState<Skill[]>([]);
  const [experiences, setExperiences] = useState<Experience[]>([]);

  // 2) Estados de rascunho para preview instantâneo
  const [draftSkill, setDraftSkill] = useState<Skill>({
    nome: "",
    nivel: "Básico",
  });
  const [draftExp, setDraftExp] = useState<Experience>({
    empresa: "",
    cargo: "",
    inicio: "",
    fim: "",
    descricao: "",
  });

  // 3) Funções de update
  const updatePersonal = (partial: Partial<CVState["personal"]>) =>
    setCv((prev) => ({
      ...prev,
      personal: { ...prev.personal, ...partial },
    }));

  // 4) Adicionar / remover efetivamente nos arrays “salvos”
  const saveSkill = () => {
    if (!draftSkill.nome.trim()) return;
    setSkills((prev) => [...prev, draftSkill]);
    setDraftSkill({ nome: "", nivel: "Básico" });
  };
  const removeSkill = (i: number) =>
    setSkills((prev) => prev.filter((_, idx) => idx !== i));

  const saveExperience = () => {
    if (!draftExp.empresa.trim()) return;
    setExperiences((prev) => [...prev, draftExp]);
    setDraftExp({ empresa: "", cargo: "", inicio: "", fim: "", descricao: "" });
  };
  const removeExperience = (i: number) =>
    setExperiences((prev) => prev.filter((_, idx) => idx !== i));

  // 5) Exportar PDF (mesma lógica de antes)
  const handleExportPDF = useCallback(() => {
    const pdfContent = document.getElementById("pdfContent");
    if (!pdfContent) return;

    const origH = pdfContent.style.height;
    const origO = pdfContent.style.overflowY;
    pdfContent.style.height = `${pdfContent.scrollHeight}px`;
    pdfContent.style.overflowY = "visible";

    html2canvas(pdfContent, { scale: 2 })
      .then((canvas) => {
        const imgData = canvas.toDataURL("image/png");
        const pdf = new jsPDF({
          orientation: "portrait",
          unit: "pt",
          format: "a4",
        });
        const w = pdf.internal.pageSize.getWidth();
        const h = (canvas.height * w) / canvas.width;
        pdf.addImage(imgData, "PNG", 0, 0, w, h);
        pdf.save("curriculo.pdf");
      })
      .finally(() => {
        pdfContent.style.height = origH;
        pdfContent.style.overflowY = origO;
      });
  }, []);

  // 6) Salvar no LocalStorage
  const handleSaveCV = useCallback(() => {
    const data = { personal: cv.personal, skills, experiences };
    localStorage.setItem("meuCurriculo", JSON.stringify(data));
    alert("Currículo salvo localmente!");
  }, [cv, skills, experiences]);

  // 7) Mescla “salvo” + “rascunho” para preview instantâneo
  const previewSkills = draftSkill.nome ? [...skills, draftSkill] : skills;
  const previewExperiences = draftExp.empresa
    ? [...experiences, draftExp]
    : experiences;

  return (
    <AppLayout onExportPDF={handleExportPDF} onSaveCV={handleSaveCV}>
      {/* Coluna 1: formulários */}
      <div>
        <FormPanel personal={cv.personal} updatePersonal={updatePersonal} />

        <SkillsForm
          skills={skills}
          draft={draftSkill}
          setDraft={setDraftSkill}
          save={saveSkill}
          removeSkill={removeSkill}
        />

        <ExperienceForm
          draft={draftExp}
          setDraft={setDraftExp}
          save={saveExperience}
        />

        <ExperienceList
          experiences={experiences}
          removeExperience={removeExperience}
        />
      </div>

      {/* Coluna 2: preview em tempo real */}
      <div id="pdfContent" className="space-y-6">
        <PreviewPanel personal={cv.personal} />
        <SkillsPreview skills={previewSkills} />
        <ExperiencePreview experiences={previewExperiences} />
      </div>
    </AppLayout>
  );
}
