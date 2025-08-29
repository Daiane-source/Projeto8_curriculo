import React from "react";
import type { CVState } from "../types/cv.d";

interface PreviewPanelProps {
  cv: CVState;
}
/**
 * PreviewPanel:
 * - Recebe o estado do currículo (cv)
 * - Exibe os dados na tela
 */
export default function PreviewPanel({ cv }: PreviewPanelProps) {
  const { personal } = cv; // Desestrutura os dados pessoais

  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold">
        {personal.name || <span className="text-gray-400">Seu nome aqui</span>}
      </h1>

      {/* Contato: mostra apenas se tiver valor */}
      <p className="text-gray-700">
        {personal.email || (
          <span className="text-gray-400">email@email.com</span>
        )}{" "}
        ·{" "}
        {personal.phone || (
          <span className="text-gray-400">(99) 99999-9999</span>
        )}
      </p>

      <p className="text-blue-600">
        {personal.linkedin || (
          <span className="text-gray-400">linkedin.com/in/seu-perfil</span>
        )}
      </p>

      {/* Resumo profissional */}
      <div className="mt-4">
        <h2 className="text-lg font-semibold">Resumo</h2>
        <p className="text-gray-700 whitespace-pre-line">
          {personal.summary || (
            <span className="text-gray-400">
              Escreva aqui um resumo profissional.
            </span>
          )}
        </p>
      </div>
    </div>
  );
}
