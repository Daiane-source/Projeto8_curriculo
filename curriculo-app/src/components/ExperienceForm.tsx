import React, { useState } from "react";
import type { ExperienceFormProps } from "../types/cv.d";
import { GoogleGenerativeAI } from "@google/generative-ai";
import LoadingSpinner from "./LoadingSpinner";

export default function ExperienceForm({
  draft,
  setDraft,
  save,
}: ExperienceFormProps) {
  const [loadingIA, setLoadingIA] = useState(false);

  async function melhorarDescricaoComIA(textoAtual: string) {
    try {
      setLoadingIA(true);

      const genAI = new GoogleGenerativeAI(import.meta.env.VITE_GEMINI_API_KEY);
      const model = genAI.getGenerativeModel({ model: "gemini-1.5-pro" });

      const result = await model.generateContent(
        `Melhore esta descrição de experiência profissional mantendo o tom formal e objetivo:\n\n${textoAtual}`
      );

      const response = await result.response;
      const textoMelhorado = response.text();

      setDraft({ ...draft, descricao: textoMelhorado });
    } catch (error) {
      console.error("Erro ao melhorar com IA:", error);
      throw new Error("Não foi possível melhorar a descrição");
    } finally {
      setLoadingIA(false);
    }
  }

  const handleMelhorarIA = async () => {
    if (!draft.descricao.trim()) return;

    try {
      await melhorarDescricaoComIA(draft.descricao);
    } catch (error) {
      // O erro será tratado pelo componente pai se necessário
      throw error;
    }
  };

  return (
    <div>
      <h2 className="h5 fw-semibold mb-4">Experiência</h2>

      {/* Empresa */}
      <div className="mb-3">
        <label className="form-label">Empresa</label>
        <input
          type="text"
          value={draft.empresa}
          onChange={(e) => setDraft({ ...draft, empresa: e.target.value })}
          placeholder="Nome da empresa"
          className="form-control"
        />
      </div>

      {/* Cargo */}
      <div className="mb-3">
        <label className="form-label">Cargo</label>
        <input
          type="text"
          value={draft.cargo}
          onChange={(e) => setDraft({ ...draft, cargo: e.target.value })}
          placeholder="Cargo ocupado"
          className="form-control"
        />
      </div>

      {/* Período */}
      <div className="row mb-3">
        <div className="col">
          <label className="form-label">Início</label>
          <input
            type="month"
            value={draft.inicio}
            onChange={(e) => setDraft({ ...draft, inicio: e.target.value })}
            className="form-control"
          />
        </div>
        <div className="col">
          <label className="form-label">Fim</label>
          <input
            type="month"
            value={draft.fim}
            onChange={(e) => setDraft({ ...draft, fim: e.target.value })}
            className="form-control"
          />
        </div>
      </div>

      {/* Descrição */}
      <div className="mb-2">
        <label className="form-label">Descrição</label>
        <textarea
          value={draft.descricao}
          onChange={(e) => setDraft({ ...draft, descricao: e.target.value })}
          placeholder="Descreva suas atividades e conquistas"
          rows={3}
          className="form-control"
        />
      </div>

      {/* Botão IA abaixo da descrição */}
      <div className="d-flex justify-content-end mb-4 gap-2">
        <button
          onClick={handleMelhorarIA}
          disabled={loadingIA || !draft.descricao.trim()}
          className="btn btn-sm text-white d-flex align-items-center gap-2"
          style={{
            backgroundColor: loadingIA ? "#6c757d" : "rgba(13, 110, 253, 0.9)",
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
              e.currentTarget.style.backgroundColor = "rgba(13, 110, 253, 0.9)";
          }}
        >
          {loadingIA && <LoadingSpinner size="small" />}
          {loadingIA ? "Processando..." : "Melhorar com IA"}
        </button>

        {/* Botão Adicionar */}
        <button
          onClick={save}
          className="btn btn-sm text-white"
          style={{
            backgroundColor: "rgba(25, 135, 84, 0.9)",
            cursor: "pointer",
            transition: "background-color 0.3s ease",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = "rgba(25, 135, 84, 1)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = "rgba(25, 135, 84, 0.9)";
          }}
        >
          Adicionar
        </button>
      </div>
    </div>
  );
}
