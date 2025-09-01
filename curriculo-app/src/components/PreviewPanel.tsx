// src/components/PreviewPanel.tsx
import React from "react";
import type { PersonalData } from "../types/cv.d";

interface PreviewPanelProps {
  personal: PersonalData;
}

/**
 * PreviewPanel
 * - Exibe foto, nome, contatos e resumo profissional
 * - Não toca em skills nem experiences (eles têm seus próprios previews)
 */
export default function PreviewPanel({ personal }: PreviewPanelProps) {
  return (
    <div className="max-w-2xl mx-auto bg-white text-gray-800 font-sans px-6 py-8">
      {/* Cabeçalho: foto e dados pessoais */}
      <div className="flex items-start gap-6 mb-8">
        {personal.photo && (
          <img
            src={personal.photo}
            alt="Foto de perfil"
            className="w-24 h-24 rounded-full object-cover border border-gray-300 mt-4"
            style={{width: 96, height: 96}}
          />
        )}
        <div className="pt-6">
          <h1 className="text-2xl font-bold">
            {personal.name || "Seu nome aqui"}
          </h1>
          <p className="text-sm text-gray-600">
            {personal.email || "email@email.com"} ·{" "}
            {personal.phone || "(99) 99999-9999"}
          </p>
          <p className="text-sm text-gray-600">
            {personal.linkedin || "linkedin.com/in/seu-perfil"}
          </p>
        </div>
      </div>

      {/* Seção: Resumo Profissional */}
      <Section title="Resumo Profissional">
        <p className="text-gray-700 whitespace-pre-line">
          {personal.summary ||
            "Nenhum resumo profissional adicionado ainda."}
        </p>
      </Section>
    </div>
  );
}

function Section({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="mb-8">
      <h2 className="text-lg font-semibold text-blue-700 border-b pb-1 mb-4 uppercase tracking-wide">
        {title}
      </h2>
      {children}
    </div>
  );
}