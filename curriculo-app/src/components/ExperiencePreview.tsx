import React from "react";
import type { Experience } from "../types/cv.d";
import Section from "./Section";

interface Props {
  experiences: Experience[];
}

export default function ExperiencePreview({ experiences }: Props) {
  return (
    <Section title="Experiências">
      {experiences.length === 0 ? (
        <p className="text-muted fst-italic">
          Nenhuma experiência adicionada ainda.
        </p>
      ) : (
        experiences.map((exp, i) => (
          <div key={i} className="mb-4">
            <h3 className="h6 fw-semibold mb-1 text-dark">
              {exp.cargo} — {exp.empresa}
            </h3>
            <p className="text-muted small mb-1">
              {exp.inicio} – {exp.fim || "Atual"}
            </p>
            <p className="text-dark mb-0" style={{ whiteSpace: "pre-line" }}>
              {exp.descricao}
            </p>
          </div>
        ))
      )}
    </Section>
  );
}