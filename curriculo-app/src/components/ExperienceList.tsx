import type { Experience } from "../types/cv.d";

interface Props {
  experiences: Experience[];
  removeExperience: (index: number) => void;
}

export default function ExperienceList({ experiences, removeExperience }: Props) {
  return (
    <div className="bg-white p-4 rounded shadow-sm mb-4">
      <h2 className="h5 fw-semibold mb-3">Experiências Adicionadas</h2>

      {experiences.length === 0 ? (
        <p className="text-muted fst-italic">Nenhuma experiência adicionada ainda.</p>
      ) : (
        <ul className="list-group">
          {experiences.map((exp, index) => (
            <li
              key={index}
              className="list-group-item d-flex justify-content-between align-items-start"
            >
              <div>
                <div className="fw-semibold">{exp.empresa} — {exp.cargo}</div>
                <div className="text-muted small">
                  {exp.inicio} – {exp.fim || "Atual"}
                </div>
              </div>
              <button
                onClick={() => removeExperience(index)}
                className="btn btn-sm btn-outline-danger"
              >
                Remover
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}