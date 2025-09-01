import React from "react";
import type { Experience } from "../types/cv.d";
import Section from "./Section";

interface Props {
  experiences: Experience[];
}

export default function ExperiencePreview({ experiences }: Props) {
  return (
    <Section title="Experiências Adicionadas">
      {experiences.length === 0 ? (
        <p className="text-gray-500 italic">
          Nenhuma experiência adicionada ainda.
        </p>
      ) : (
        experiences.map((exp, i) => (
          <div key={i} className="mb-4">
            <h3 className="text-lg font-semibold">
              {exp.cargo} – {exp.empresa}
            </h3>
            <p className="text-sm text-gray-600">
              {exp.inicio} – {exp.fim}
            </p>
            <p className="text-gray-700">{exp.descricao}</p>
          </div>
        ))
      )}
    </Section>
  );
}