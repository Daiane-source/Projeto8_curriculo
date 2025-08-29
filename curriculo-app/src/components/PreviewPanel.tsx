import React from "react";
import type { CVState } from "../types/cv.d";

interface PreviewPanelProps {
  cv: CVState;
}

/**
 * PreviewPanel:
 * - Exibe os dados pessoais em tempo real
 */
export default function PreviewPanel({ cv }: PreviewPanelProps) {
  const { personal } = cv;

  return (
    <div className="space-y-4">
      <h1 className="text-3xl font-bold">
        {personal.name || <span className="text-gray-400">Seu nome aqui</span>}
      </h1>

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

      <div>
        <h2 className="text-lg font-semibold">Resumo</h2>
        <p className="text-gray-700 whitespace-pre-line">
          {personal.summary || (
            <span className="text-gray-400">
              Escreva aqui um resumo profissional
            </span>
          )}
        </p>
      </div>
    </div>
  );
}
