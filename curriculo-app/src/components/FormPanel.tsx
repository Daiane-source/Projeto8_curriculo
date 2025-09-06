import type { PersonalData } from "../types/cv.d";
import Section from "./Section";
import { useState } from "react";
import { GoogleGenerativeAI } from "@google/generative-ai";
import LoadingSpinner from "./LoadingSpinner";

type Props = {
  personal: PersonalData;
  updatePersonal: (p: Partial<PersonalData>) => void;
};

export default function FormPanel({ personal, updatePersonal }: Props) {
  const [loadingIA, setLoadingIA] = useState(false);

  async function melhorarResumoComIA(textoAtual: string) {
    try {
      setLoadingIA(true);

      const genAI = new GoogleGenerativeAI(import.meta.env.VITE_GEMINI_API_KEY);
      const model = genAI.getGenerativeModel({ model: "gemini-1.5-pro" });

      const result = await model.generateContent(
        `Melhore este resumo profissional mantendo o tom formal e objetivo:\n\n${textoAtual}`
      );

      const response = await result.response;
      const textoMelhorado = response.text();

      updatePersonal({ summary: textoMelhorado });
    } catch (error) {
      console.error("Erro ao melhorar com IA:", error);
      throw new Error("Não foi possível melhorar o resumo");
    } finally {
      setLoadingIA(false);
    }
  }

  const handleMelhorarIA = async () => {
    if (!personal.summary.trim()) return;

    try {
      await melhorarResumoComIA(personal.summary);
    } catch (error) {
      throw error;
    }
  };

  return (
    <div className="overflow-x-hidden">
      <Section title="Dados Pessoais">
        {/* Nome */}
        <div className="mb-3">
          <label className="form-label">Nome</label>
          <input
            type="text"
            value={personal.name}
            onChange={(e) => updatePersonal({ name: e.target.value })}
            className="form-control"
            placeholder="Seu nome completo"
          />
        </div>

        {/* Foto de Perfil */}
        <div className="mb-3">
          <label className="form-label">Foto de Perfil</label>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => {
              const file = e.target.files?.[0];
              if (file) {
                const reader = new FileReader();
                reader.onloadend = () => {
                  updatePersonal({ photo: reader.result as string });
                };
                reader.readAsDataURL(file);
              }
            }}
            className="form-control"
          />
        </div>

        {/* Contatos */}
        <div className="mb-3">
          <label className="form-label">Email</label>
          <input
            type="email"
            value={personal.email}
            onChange={(e) => updatePersonal({ email: e.target.value })}
            className="form-control"
            placeholder="seu@email.com"
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Telefone</label>
          <input
            type="tel"
            value={personal.phone}
            onChange={(e) => updatePersonal({ phone: e.target.value })}
            className="form-control"
            placeholder="(99) 99999-9999"
          />
        </div>

        <div className="mb-3">
          <label className="form-label">LinkedIn</label>
          <input
            type="url"
            value={personal.linkedin}
            onChange={(e) => updatePersonal({ linkedin: e.target.value })}
            className="form-control"
            placeholder="https://linkedin.com/in/seu-perfil"
          />
        </div>

        {/* Resumo Profissional */}
        <div className="mb-2">
          <label className="form-label">Resumo Profissional</label>
          <textarea
            value={personal.summary}
            onChange={(e) => updatePersonal({ summary: e.target.value })}
            className="form-control"
            rows={5}
            placeholder="Breve resumo da sua experiência e objetivos..."
          />
          <div className="d-flex justify-between align-items-center mt-2">
            <small className="text-muted">
              {personal.summary.length} / 500 caracteres
            </small>
          </div>
        </div>

        {/* Botão IA abaixo e à direita */}
        <div className="d-flex justify-content-end mt-3">
          <button
            onClick={handleMelhorarIA}
            disabled={loadingIA || !personal.summary.trim()}
            className="btn btn-sm text-white d-flex align-items-center gap-2"
            style={{
              backgroundColor: loadingIA
                ? "#6c757d"
                : "rgba(13, 110, 253, 0.9)",
              cursor: loadingIA ? "not-allowed" : "pointer",
              transition: "all 0.3s ease",
              opacity: loadingIA ? 0.7 : 1,
            }}
            onMouseEnter={(e) => {
              if (!loadingIA)
                e.currentTarget.style.backgroundColor = "rgba(13, 110, 253, 1)";
            }}
            onMouseLeave={(e) => {
              if (!loadingIA)
                e.currentTarget.style.backgroundColor =
                  "rgba(13, 110, 253, 0.9)";
            }}
          >
            {loadingIA && <LoadingSpinner size="small" />}
            {loadingIA ? "Processando..." : "Melhorar com IA"}
          </button>
        </div>
      </Section>
    </div>
  );
}
