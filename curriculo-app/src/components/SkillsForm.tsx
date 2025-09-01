
import type { SkillsFormProps } from "../types/cv.d";

export default function SkillsForm({
  skills,
  draft,
  setDraft,
  save,
  removeSkill,
}: SkillsFormProps) {
  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Habilidades</h2>

      <input
        type="text"
        value={draft.nome}
        onChange={(e) => setDraft({ ...draft, nome: e.target.value })}
        placeholder="Digite uma habilidade"
        className="w-full border rounded p-2 mb-2"
      />

      <select
        value={draft.nivel}
        onChange={(e) => setDraft({ ...draft, nivel: e.target.value })}
        className="w-full border rounded p-2 mb-2"
      >
        <option>Básico</option>
        <option>Intermediário</option>
        <option>Avançado</option>
      </select>

      <button
        onClick={save}
        className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded mb-4"
      >
        Adicionar
      </button>

      <ul className="space-y-2">
        {skills.map((s, i) => (
          <li
            key={i}
            className="flex justify-between items-center border-b pb-1"
          >
            <span>
              {s.nome} — <em>{s.nivel}</em>
            </span>
            <button
              onClick={() => removeSkill(i)}
              className="text-red-500 hover:underline"
            >
              Excluir
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}