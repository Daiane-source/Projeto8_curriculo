import React from "react";
import type { ExperienceFormProps } from "../types/cv.d";

export default function ExperienceForm({
  draft,
  setDraft,
  save,
}: ExperienceFormProps) {
  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Experiência</h2>

      <input
        type="text"
        value={draft.empresa}
        onChange={(e) => setDraft({ ...draft, empresa: e.target.value })}
        placeholder="Empresa"
        className="w-full border rounded p-2 mb-2"
      />

      <input
        type="text"
        value={draft.cargo}
        onChange={(e) => setDraft({ ...draft, cargo: e.target.value })}
        placeholder="Cargo"
        className="w-full border rounded p-2 mb-2"
      />

      <div className="flex space-x-2 mb-2">
        <input
          type="month"
          value={draft.inicio}
          onChange={(e) => setDraft({ ...draft, inicio: e.target.value })}
          className="w-1/2 border rounded p-2"
        />
        <input
          type="month"
          value={draft.fim}
          onChange={(e) => setDraft({ ...draft, fim: e.target.value })}
          className="w-1/2 border rounded p-2"
        />
      </div>

      <textarea
        value={draft.descricao}
        onChange={(e) => setDraft({ ...draft, descricao: e.target.value })}
        placeholder="Descrição"
        rows={3}
        className="w-full border rounded p-2 mb-4"
      />

      <button
        onClick={save}
        className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
      >
        Adicionar
      </button>
    </div>
  );
}