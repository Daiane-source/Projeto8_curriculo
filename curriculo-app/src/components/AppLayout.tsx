import React from "react";

/**
 * AppLayout:
 * - Cria duas colunas lado a lado
 * - Uma p/ Formulário e outra p/ Preview
 * - Cada coluna tem seu próprio scroll
 */

interface Props {
  children: React.ReactNode;
}

export default function AppLayout({ children }: Props) {
  // Divide os filhos em dois: [FormPanel, PreviewPanel]
  return (
    <div className="h-screen grid grid-cols-2">
      {React.Children.map(children, (child, index) => (
        <div
          key={index}
          className={`overflow-y-auto ${index === 0 ? "border-r" : ""}`}
        >
          {child}
        </div>
      ))}
    </div>
  );
}
