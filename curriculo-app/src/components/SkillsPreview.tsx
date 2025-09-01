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
        <p className="text-gray-500 italic">Nenhuma habilidade adicionada ainda.</p>
      ) : (
        <ul className="list-disc list-inside space-y-1 text-gray-700">
          {skills.map((skill, index) => (
            <li key={index}>
              {skill.nome} — <span className="italic">{skill.nivel}</span>
            </li>
          ))}
        </ul>
      )}
    </Section>
  );
}