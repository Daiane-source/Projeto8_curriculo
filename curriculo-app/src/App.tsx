import { useState, useCallback } from "react";
import { ToastContainer, toast } from "react-toastify";

import html2canvas from "html2canvas";
import jsPDF from "jspdf";

import AppLayout from "./components/AppLayout";
import FormPanel from "./components/FormPanel";
import SkillsForm from "./components/SkillsForm";
import ExperienceForm from "./components/ExperienceForm";
import ExperienceList from "./components/ExperienceList";
import PreviewPanel from "./components/PreviewPanel";
import Toast from "./components/Toast";
import SkeletonScreen from "./components/SkeletonScreen";

import type { CVState, Skill, Experience } from "./types/cv.d";

// Estado inicial
const initialState: CVState = {
  personal: { name: "", email: "", phone: "", linkedin: "", summary: "" },
};

export default function App() {
  const [cv, setCv] = useState<CVState>(initialState);
  const [skills, setSkills] = useState<Skill[]>([]);
  const [experiences, setExperiences] = useState<Experience[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [toast, setToast] = useState<{
    show: boolean;
    message: string;
    type: "success" | "error" | "info";
  }>({
    show: false,
    message: "",
    type: "info",
  });

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

  const showToast = (
    message: string,
    type: "success" | "error" | "info" = "info"
  ) => {
    setToast({ show: true, message, type });
  };

  const hideToast = () => {
    setToast({ show: false, message: "", type: "info" });
  };

  const updatePersonal = (partial: Partial<CVState["personal"]>) =>
    setCv((prev) => ({
      ...prev,
      personal: { ...prev.personal, ...partial },
    }));

  const saveSkill = () => {
    if (!draftSkill.nome.trim()) return;
    setSkills((prev) => [...prev, draftSkill]);
    setDraftSkill({ nome: "", nivel: "Básico" });
    showToast("Habilidade adicionada com sucesso!", "success");
  };

  const removeSkill = (i: number) => {
    setSkills((prev) => prev.filter((_, idx) => idx !== i));
    showToast("Habilidade removida", "info");
  };

  const saveExperience = () => {
    if (!draftExp.empresa.trim()) return;
    setExperiences((prev) => [...prev, draftExp]);
    setDraftExp({ empresa: "", cargo: "", inicio: "", fim: "", descricao: "" });
    showToast("Experiência adicionada com sucesso!", "success");
  };

  const removeExperience = (i: number) => {
    setExperiences((prev) => prev.filter((_, idx) => idx !== i));
    showToast("Experiência removida", "info");
  };

  const handleExportPDF = useCallback(async () => {
    setIsLoading(true);
    showToast("Gerando PDF...", "info");

    try {
      const pdfContent = document.getElementById("pdfContent");
      if (!pdfContent) return;

      const origH = pdfContent.style.height;
      const origO = pdfContent.style.overflowY;
      pdfContent.style.height = `${pdfContent.scrollHeight}px`;
      pdfContent.style.overflowY = "visible";

      await new Promise((resolve) => setTimeout(resolve, 500)); // Pequeno delay para renderização

      const canvas = await html2canvas(pdfContent, { scale: 2 });
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

      showToast("PDF exportado com sucesso!", "success");
    } catch (error) {
      console.error("Erro ao exportar PDF:", error);
      showToast("Erro ao exportar PDF", "error");
    } finally {
      setIsLoading(false);
      const pdfContent = document.getElementById("pdfContent");
      if (pdfContent) {
        pdfContent.style.height = "";
        pdfContent.style.overflowY = "";
      }
    }
  }, []);

  const handleSaveCV = useCallback(() => {
    try {
      const data = { personal: cv.personal, skills, experiences };
      localStorage.setItem("meuCurriculo", JSON.stringify(data));
      showToast("Currículo salvo localmente!", "success");
    } catch (error) {
      showToast("Erro ao salvar currículo", "error");
    }
  }, [cv, skills, experiences]);

  const previewSkills = draftSkill.nome ? [...skills, draftSkill] : skills;
  const previewExperiences = draftExp.empresa
    ? [...experiences, draftExp]
    : experiences;

  return (
    <>
      <ToastContainer position="top-right" autoClose={4000} />

      {toast.show && (
        <Toast message={toast.message} type={toast.type} onClose={hideToast} />
      )}

      {isLoading && (
        <div className="loading-overlay">
          <div className="loading-content">
            <SkeletonScreen type="button" width="120px" height="40px" />
            <p>Processando...</p>
          </div>
        </div>
      )}

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

        {/* Coluna 2: preview completo dentro da borda */}
        <div id="pdfContent">
          <PreviewPanel
            personal={cv.personal}
            skills={previewSkills}
            experiences={previewExperiences}
          />
        </div>
      </AppLayout>

      <style>{`
        .loading-overlay {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(255, 255, 255, 0.9);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 9999;
        }
        
        .loading-content {
          text-align: center;
        }
        
        .loading-content p {
          margin-top: 1rem;
          color: #666;
        }
      `}</style>
    </>
  );
}
