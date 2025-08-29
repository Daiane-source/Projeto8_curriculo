import React from "react";

/**
 * AppLayout:
 * - Cria duas colunas lado a lado
 * - Uma p/ Formulário e outra p/ Preview
 * - Cada coluna tem seu próprio scroll
 */
export default function AppLayout({ children }: { children: React.ReactNode }) {
  // Divide os filhos em dois: [FormPanel, PreviewPanel]
  return (
    <div className="grid grid-cols-2 h-screen">
      {/* Coluna esquerda (formulário) */}
      <div className="overflow-y-auto p-6 bg-gray-50 border-r">
        {children[0]}
      </div>

      {/* Coluna direita (preview) */}
      <div className="overflow-y-auto p-6 bg-white">{children[1]}</div>
    </div>
  );
}
