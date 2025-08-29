import React from "react";
import type { CVState } from "../types/cv.d";

/**
 * PreviewPanel:
 * - Recebe o estado do currículo (cv)
 * - Exibe os dados na tela
 */
export default function PreviewPanel({ cv }: { cv: CVState }) {
  const { personal } = cv; // Desestrutura os dados pessoais

  return (
    <div className="max-w-xl mx-auto bg-white shadow rounded p-6">
      {/* Nome */}
      <h1 className="text-2xl font-bold mb-2">{personal.name || "Seu nome"}</h1>

      {/* Contato: mostra apenas se tiver valor */}
      <p className="text-sm text-gray-600">
        {personal.email && <span>{personal.email} • </span>}
        {personal.phone && <span>{personal.phone} • </span>}
        {personal.linkedin && <span>{personal.linkedin}</span>}
      </p>

      {/* Resumo profissional */}
      <p className="mt-4">{personal.summary || "Resumo aparecerá aqui."}</p>
    </div>
  );
}
