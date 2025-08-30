import React from "react";

type Skill = {
  nome: string;
  nivel: string;
};

interface SkillsPreviewProps {
  skills: Skill[];
}

export default function SkillsPreview({ skills }: SkillsPreviewProps) {
  return (
    <div>
      <h2>Habilidades</h2>
      {skills.length === 0 ? (
        <p>Nenhuma habilidade adicionada ainda.</p>
      ) : (
        <ul>
          {skills.map((skill, index) => (
            <li key={index}>
              {skill.nome} ({skill.nivel})
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
