import React from "react";

/**
 * AppLayout:
 * - Cria duas colunas lado a lado
 * - Uma p/ Formulário e outra p/ Preview
 * - Cada coluna tem seu próprio scroll
 */
export default function AppLayout({ children }: { children: React.ReactNode }) {
  // Divide os filhos em dois: [FormPanel, PreviewPanel]
  const [form, preview] = React.Children.toArray(children);

  return (
    // h-screen → altura total da tela
    // overflow-hidden → evita scroll na página inteira
    <div className="h-screen w-full overflow-hidden">
      {/* grid-cols-2 → duas colunas iguais */}
      <div className="grid grid-cols-2 h-full">
        {/* Coluna Esquerda: formulário */}
        <aside className="overflow-auto border-r p-6">{form}</aside>
        {/* Coluna Direita: preview */}
        <main className="overflow-auto p-6">{preview}</main>
      </div>
    </div>
  );
}
