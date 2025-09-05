import React from "react";

interface Props {
  children: React.ReactNode;
  onExportPDF?: () => void;
  onSaveCV?: () => void;
}

export default function AppLayout({ children, onExportPDF, onSaveCV }: Props) {
  return (
    <div className="d-flex flex-column vh-100">
      {/* NAVBAR */}
      <nav className="navbar navbar-dark bg-primary shadow-sm">
        <div className="container-fluid d-flex justify-content-end">
          <button
            onClick={onExportPDF}
            className="btn btn-sm btn-danger text-white shadow"
            style={{
              transition: "background-color 0.3s ease",
              cursor: "pointer",
            }}
          >
            Exportar PDF
          </button>
        </div>
      </nav>

      {/* CONTEÚDO PRINCIPAL */}
      <div className="flex-grow-1 container-fluid px-0 h-100">
        <div className="row h-100 g-0">
          {/* Coluna 1: Formulários */}
          <div
            className="col-12 col-md-6 h-100 overflow-auto border-end bg-white"
            style={{
              padding: "1.5rem",
              scrollBehavior: "smooth",
            }}
          >
            <div className="mx-auto" style={{ maxWidth: "640px", minHeight: "120vh" }}>
              {children[0]}
            </div>
          </div>

          {/* Coluna 2: Preview */}
          <div
            className="col-12 col-md-6 h-100 overflow-auto bg-white"
            style={{
              padding: "1.5rem",
              scrollBehavior: "smooth",
            }}
          >
            <div className="mx-auto" style={{ maxWidth: "640px", minHeight: "120vh" }}>
              {children[1]}
            </div>
          </div>
        </div>
      </div>

      {/* FOOTER */}
      <footer className="bg-primary text-white py-3 shadow-sm">
        <div className="container-fluid d-flex justify-content-end">
          <button
            onClick={onSaveCV}
            className="btn btn-sm btn-success text-white shadow"
            style={{
              transition: "background-color 0.3s ease",
              cursor: "pointer",
            }}
          >
            Salvar Currículo
          </button>
        </div>
      </footer>
    </div>
  );
}