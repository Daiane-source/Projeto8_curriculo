import { useState, useCallback } from "react";
import { ToastContainer } from "react-toastify";

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

// 🔹 Importando os novos componentes
import Modal from "./components/Modal";


import type { CVState, Skill, Experience } from "./types/cv.d";



// Estado inicial do CV
const initialState: CVState = {
  personal: { name: "", email: "", phone: "", linkedin: "", summary: "" },
};

export default function App() {
  // Estados principais do currículo
  const [cv, setCv] = useState<CVState>(initialState);
  const [skills, setSkills] = useState<Skill[]>([]);
  const [experiences, setExperiences] = useState<Experience[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  // Estado para mensagens (toasts)
  const [toast, setToast] = useState<{
    show: boolean;
    message: string;
    type: "success" | "error" | "info";
  }>({
    show: false,
    message: "",
    type: "info",
  });

  // Estado para abrir/fechar o modal de confirmação
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Estados temporários para rascunho de skills e experiências
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

  // Funções auxiliares de toast
  const showToast = (
    message: string,
    type: "success" | "error" | "info" = "info"
  ) => {
    setToast({ show: true, message, type });
  };

  const hideToast = () => {
    setToast({ show: false, message: "", type: "info" });
  };

  // Atualizar dados pessoais
  const updatePersonal = (partial: Partial<CVState["personal"]>) =>
    setCv((prev) => ({
      ...prev,
      personal: { ...prev.personal, ...partial },
    }));

  // Salvar habilidade
  const saveSkill = () => {
    if (!draftSkill.nome.trim()) return;
    setSkills((prev) => [...prev, draftSkill]);
    setDraftSkill({ nome: "", nivel: "Básico" });
    showToast("Habilidade adicionada com sucesso!", "success");
  };

  // Remover habilidade
  const removeSkill = (i: number) => {
    setSkills((prev) => prev.filter((_, idx) => idx !== i));
    showToast("Habilidade removida", "info");
  };

  // Salvar experiência
  const saveExperience = () => {
    if (!draftExp.empresa.trim()) return;
    setExperiences((prev) => [...prev, draftExp]);
    setDraftExp({ empresa: "", cargo: "", inicio: "", fim: "", descricao: "" });
    showToast("Experiência adicionada com sucesso!", "success");
  };

  // Remover experiência
  const removeExperience = (i: number) => {
    setExperiences((prev) => prev.filter((_, idx) => idx !== i));
    showToast("Experiência removida", "info");
  };

  // Exportar currículo para PDF
  const handleExportPDF = useCallback(async () => {
    setIsLoading(true);
    showToast("Gerando PDF...", "info");

    try {
      const pdfContent = document.getElementById("pdfContent");
      if (!pdfContent) return;

      // Ajustando altura e overflow para captura
      const origH = pdfContent.style.height;
      const origO = pdfContent.style.overflowY;
      pdfContent.style.height = `${pdfContent.scrollHeight}px`;
      pdfContent.style.overflowY = "visible";

      await new Promise((resolve) => setTimeout(resolve, 500)); // Delay para renderizar

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

  // Salvar currículo no LocalStorage
  const handleSaveCV = useCallback(() => {
    try {
      const data = { personal: cv.personal, skills, experiences };
      localStorage.setItem("meuCurriculo", JSON.stringify(data));
      showToast("Currículo salvo localmente!", "success");
    } catch (error) {
      showToast("Erro ao salvar currículo", "error");
    }
  }, [cv, skills, experiences]);

  // Preview em tempo real (inclui rascunhos)
  const previewSkills = draftSkill.nome ? [...skills, draftSkill] : skills;
  const previewExperiences = draftExp.empresa
    ? [...experiences, draftExp]
    : experiences;

  return (
    <>
      {/* Container de notificações */}
      <ToastContainer position="top-right" autoClose={4000} />

      {/* Toast customizado */}
      {toast.show && (
        <Toast message={toast.message} type={toast.type} onClose={hideToast} />
      )}

      {/* Tela de carregamento (quando gera PDF) */}
      {isLoading && (
        <div className="loading-overlay">
          <div className="loading-content">
            <SkeletonScreen type="button" width="120px" height="40px" />
            <p>Processando...</p>
          </div>
        </div>
      )}

      {/* Layout principal */}
      <AppLayout 
        onExportPDF={handleExportPDF} 
        onSaveCV={() => setIsModalOpen(true)} // 🔹 agora abre o modal em vez de salvar direto
      >
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

        {/* Coluna 2: preview completo */}
        <div id="pdfContent">
          <PreviewPanel
            personal={cv.personal}
            skills={previewSkills}
            experiences={previewExperiences}
          />
        </div>
      </AppLayout>

      {/* 🔹 Modal de Confirmação para salvar o CV */}
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <h2 className="text-lg font-semibold mb-4">Confirmar Ação</h2>
        <p>Tem certeza que deseja salvar este currículo?</p>
           
      </Modal>

      {/* Estilos para tela de carregamento */}
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
