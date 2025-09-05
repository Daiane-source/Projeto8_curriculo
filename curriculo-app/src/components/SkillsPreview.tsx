import Section from "./Section";

type Skill = {
  nome: string;
  nivel: string;
};

interface SkillsPreviewProps {
  skills: Skill[];
}

export default function SkillsPreview({ skills }: SkillsPreviewProps) {
  return (
    <Section title="Idiomas e Habilidades">
      {skills.length === 0 ? (
        <p className="text-muted fst-italic">Nenhuma habilidade adicionada ainda.</p>
      ) : (
        <ul className="list-group">
          {skills.map((skill, index) => (
            <li key={index} className="list-group-item d-flex justify-content-between align-items-center">
              <span>{skill.nome}</span>
              <span className="fst-italic text-muted">{skill.nivel}</span>
            </li>
          ))}
        </ul>
      )}
    </Section>
  );
}