import React, { useState } from "react";
import type { Skill } from "../types/cv.d";
import Section from "./Section";

interface SkillsFormProps {
  skills: Skill[];
  addSkill: (skill: Skill) => void;
  removeSkill: (index: number) => void;
}

export default function SkillsForm({
  skills,
  addSkill,
  removeSkill,
}: SkillsFormProps) {
  const [nome, setNome] = useState("");
  const [nivel, setNivel] = useState("Básico");

  const handleAdd = () => {
    if (nome.trim() === "") {
      alert("⚠️ O campo de habilidade não pode estar vazio!");
      return;
    }
    addSkill({ nome, nivel });
    setNome("");
    setNivel("Básico");
  };

  return (
    <div className="overflow-x-hidden">
      <Section title="Habilidades">
      <div className="space-y-4">
        <input
          type="text"
          placeholder="Digite uma habilidade"
          value={nome}
          onChange={(e) => setNome(e.target.value)}
          className="w-full border rounded p-2"
        />
        <select
          value={nivel}
          onChange={(e) => setNivel(e.target.value)}
          className="w-full border rounded p-2"
        >
          <option value="Básico">Básico</option>
          <option value="Intermediário">Intermediário</option>
          <option value="Avançado">Avançado</option>
        </select>
        <button
          onClick={handleAdd}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
        >
          Adicionar
        </button>

        <ul className="space-y-2">
          {skills.map((skill, index) => (
            <li
              key={index}
              className="flex justify-between items-center border-b pb-1"
            >
              <span>
                {skill.nome} — <em>{skill.nivel}</em>
              </span>
              <button
                onClick={() => removeSkill(index)}
                className="text-red-500 hover:underline"
              >
                Excluir
              </button>
            </li>
          ))}
        </ul>
      </div>
    </Section>
    </div>
  );
}