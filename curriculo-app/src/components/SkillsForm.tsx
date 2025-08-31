import React, { useState } from "react";

type Skill = {
  nome: string;
  nivel: string;
};

interface SkillsFormProps {
  skills: Skill[];
  addSkill: (skill: Skill) => void;
  removeSkill: (index: number) => void;
}

export default function SkillsForm({ skills, addSkill, removeSkill }: SkillsFormProps) {
  // Estado temporário para armazenar o que o usuário digitou/selecionou
  const [nome, setNome] = useState("");
  const [nivel, setNivel] = useState("Básico"); // valor inicial do select

  //CAMPO VAZIO
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
    <div>
      <h2>Habilidades</h2>

      {/* Input para o nome da habilidade */}
      <input
        type="text"
        placeholder="Digite uma habilidade"
        value={nome}
        onChange={(e) => setNome(e.target.value)}
      />

      {/* Select para escolher o nível */}
      <select value={nivel} onChange={(e) => setNivel(e.target.value)}>
        <option value="Básico">Básico</option>
        <option value="Intermediário">Intermediário</option>
        <option value="Avançado">Avançado</option>
      </select>

      {/* Botão para adicionar */}
      <button onClick={handleAdd}>Adicionar</button>

      {/* Lista das habilidades já adicionadas */}
      <ul>
        {skills.map((skill, index) => (
          <li key={index}>
            {skill.nome} ({skill.nivel}){" "}
            <button onClick={() => removeSkill(index)}>Excluir</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
