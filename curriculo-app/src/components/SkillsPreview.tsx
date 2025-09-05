import Section from "./Section";
import type { Skill } from "../types/cv.d";

interface SkillsPreviewProps {
  skills: Skill[];
}

export default function SkillsPreview({ skills }: SkillsPreviewProps) {
  return (
    <Section title="Idiomas e Habilidades">
      {skills.length === 0 ? (
        <p className="text-muted fst-italic">
          Nenhuma habilidade adicionada ainda.
        </p>
      ) : (
        <ul className="mb-0 ps-3">
          {skills.map((skill, index) => (
            <li key={index} className="text-dark mb-1">
              {skill.nome} — <span className="fst-italic text-muted">{skill.nivel}</span>
            </li>
          ))}
        </ul>
      )}
    </Section>
  );
}