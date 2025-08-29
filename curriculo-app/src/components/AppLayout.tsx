import React from "react";

interface Props {
  children: React.ReactNode;
}

/**
 * AppLayout:
 * - Divide a tela em duas colunas lado a lado (desktop)
 * - Cada coluna tem scroll independente
 */
export default function AppLayout({ children }: Props) {
  const [form, preview] = React.Children.toArray(children);

  return (
    <div className="w-screen h-screen grid grid-cols-2">
      {/* Coluna esquerda (formulário) */}
      <div className="overflow-y-auto border-r bg-gray-50 p-6">{form}</div>

      {/* Coluna direita (preview) */}
      <div className="overflow-y-auto bg-white p-6">{preview}</div>
    </div>
  );
}
