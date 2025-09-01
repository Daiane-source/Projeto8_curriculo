import React from "react";

interface Props {
  children: React.ReactNode;
  onExportPDF?: () => void;
  onSaveCV?: () => void;
}

export default function AppLayout({
  children,
  onExportPDF,
  onSaveCV,
}: Props) {
  return (
    <div className="flex flex-col h-screen">

      {/* NAVBAR */}
      <nav className="bg-white border-b">
        <div className="max-w-6xl mx-auto px-4 py-3 flex justify-end">
          <button
            onClick={onExportPDF}
            className="bg-red-600 text-white px-4 py-2 rounded shadow hover:bg-red-700 transition cursor-pointer"
          >
            Exportar PDF
          </button>
        </div>
      </nav>

      {/* CONTEÚDO PRINCIPAL */}
      <div className="flex-1 grid grid-cols-2 overflow-x-hidden">

        {React.Children.map(children, (child, index) => (
          <div
            key={index}
            className={`
              h-full 
              overflow-y-auto overflow-x-hidden 
              bg-white
              ${index === 0 ? "border-r border-gray-300" : ""}
              py-6
            `}
          >
            <div className="max-w-md w-full mx-auto px-4 md:px-6 space-y-6">
              {child}
            </div>
          </div>
        ))}

      </div>

      {/* FOOTER */}
      <footer className="bg-white border-t">
        <div className="max-w-6xl mx-auto px-4 py-3 flex justify-end">
          <button
            onClick={onSaveCV}
            className="bg-green-600 text-white px-4 py-2 rounded shadow hover:bg-green-700 transition cursor-pointer"
          >
            Salvar Currículo
          </button>
        </div>
      </footer>

    </div>
  );
}