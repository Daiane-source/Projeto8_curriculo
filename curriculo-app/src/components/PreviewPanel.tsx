import React from "react";
import type { PersonalData, Skill, Experience } from "../types/cv.d";
import Section from "./Section";

interface PreviewPanelProps {
  personal: PersonalData;
  skills: Skill[];
  experiences: Experience[];
}

export default function PreviewPanel({ personal, skills, experiences }: PreviewPanelProps) {
  return (
    <div className="container bg-white p-5 border rounded shadow-sm" style={{ maxWidth: "800px" }}>
      {/* Cabeçalho: Foto + Dados Pessoais */}
      <div className="d-flex align-items-start mb-4">
        {personal.photo && (
          <img
            src={personal.photo}
            alt="Foto de perfil"
            className="rounded-circle border me-4"
            style={{ width: "96px", height: "96px", objectFit: "cover" }}
          />
        )}
        <div>
          <h1 className="h4 fw-bold mb-1">{personal.name || "Seu nome aqui"}</h1>
          <p className="mb-0 text-muted">
            {personal.email || "email@email.com"} · {personal.phone || "(99) 99999-9999"}
          </p>
          <p className="mb-0 text-muted">
            {personal.linkedin || "linkedin.com/in/seu-perfil"}
          </p>
        </div>
      </div>

      {/* Resumo Profissional */}
      <Section title="Resumo Profissional">
        <p className="text-dark" style={{ whiteSpace: "pre-line" }}>
          {personal.summary || "Nenhum resumo profissional adicionado ainda."}
        </p>
      </Section>

      {/* Idiomas e Habilidades */}
      <Section title="Idiomas e Habilidades">
        {skills.length === 0 ? (
          <p className="text-muted fst-italic">Nenhuma habilidade adicionada ainda.</p>
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

      {/* Experiências */}
      <Section title="Experiências">
        {experiences.length === 0 ? (
          <p className="text-muted fst-italic">Nenhuma experiência adicionada ainda.</p>
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
    </div>
  );
}