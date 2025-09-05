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
      <h2 className="h5 fw-semibold mb-4">Habilidades</h2>

      {/* Campo de nome da habilidade */}
      <div className="mb-3">
        <label className="form-label">Nome da habilidade</label>
        <input
          type="text"
          value={draft.nome}
          onChange={(e) => setDraft({ ...draft, nome: e.target.value })}
          placeholder="Ex: Comunicação, JavaScript..."
          className="form-control"
        />
      </div>

      {/* Nível da habilidade */}
      <div className="mb-3">
        <label className="form-label">Nível</label>
        <select
          value={draft.nivel}
          onChange={(e) => setDraft({ ...draft, nivel: e.target.value })}
          className="form-select"
        >
          <option>Básico</option>
          <option>Intermediário</option>
          <option>Avançado</option>
        </select>
      </div>

      {/* Botão Adicionar */}
      <div className="d-flex justify-content-end mb-4">
        <button
          onClick={save}
          className="btn btn-sm text-white"
          style={{
            backgroundColor: "rgba(13, 110, 253, 0.9)",
            cursor: "pointer",
            transition: "background-color 0.3s ease",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = "rgba(13, 110, 253, 1)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = "rgba(13, 110, 253, 0.9)";
          }}
        >
          Adicionar
        </button>
      </div>

      {/* Lista de habilidades adicionadas */}
      <ul className="list-group">
        {skills.map((s, i) => (
          <li key={i} className="list-group-item d-flex justify-content-between align-items-center">
            <span>
              {s.nome} — <em>{s.nivel}</em>
            </span>
            <button
              onClick={() => removeSkill(i)}
              className="btn btn-sm btn-outline-danger"
            >
              Excluir
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}