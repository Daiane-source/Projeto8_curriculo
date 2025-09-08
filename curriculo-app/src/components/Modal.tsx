import React from "react";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave?: () => void;
  children: React.ReactNode;
}

export default function Modal({ isOpen, onClose, onSave, children }: ModalProps) {
  if (!isOpen) return null;

  return (
    <div
      className="modal fade show d-block"
      tabIndex={-1}
      role="dialog"
      style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
    >
      <div className="modal-dialog modal-dialog-centered" role="document">
        <div className="modal-content border-0 shadow-lg rounded-4">
          {/* Cabeçalho */}
          <div className="modal-header bg-primary text-white rounded-top-4">
            <h5 className="modal-title fw-bold">Confirmar Ação</h5>
            <button
              type="button"
              className="btn-close btn-close-white"
              aria-label="Close"
              onClick={onClose}
            />
          </div>

          {/* Conteúdo */}
          <div className="modal-body p-4">{children}</div>

          {/* Rodapé com os botões corretos */}
          <div className="modal-footer bg-light rounded-bottom-4">
            <button className="btn btn-danger" onClick={onClose}>
              Cancelar
            </button>
            <button className="btn btn-success" onClick={onSave}>
              Sim, salvar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
