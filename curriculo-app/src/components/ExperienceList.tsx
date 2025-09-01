import type { Experience } from "../types/cv.d";

interface Props {
  experiences: Experience[];
  removeExperience: (index: number) => void;
}
export default function ExperienceList({ experiences, removeExperience }: Props) {
  return (
    <div className="bg-white p-4 rounded-2xl shadow-md">
      <h2 className="text-lg font-semibold mb-2">Experiências Adicionadas</h2>
      <ul className="space-y-2">
        {experiences.map((exp, index) => (
          <li key={index} className="flex justify-between items-center border-b pb-2">
            <span>{exp.empresa} - {exp.cargo}</span>
            <button
              onClick={() => removeExperience(index)}
              className="text-red-500 hover:underline"
            >
              Remover
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
