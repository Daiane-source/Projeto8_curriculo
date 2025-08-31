// components/ExperienceForm.jsx
import { useState } from "react";

export default function ExperienceForm({ addExperience }) {
  const [empresa, setEmpresa] = useState("");
  const [cargo, setCargo] = useState("");
  const [inicio, setInicio] = useState("");
  const [fim, setFim] = useState("");
  const [descricao, setDescricao] = useState("");
  const [atual, setAtual] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validação: início deve ser menor que fim
    if (!atual && new Date(inicio) > new Date(fim)) {
      alert("A data de início deve ser anterior à data de término.");
      return;
    }

    addExperience({ empresa, cargo, inicio, fim: atual ? "Atual" : fim, descricao });

    // Resetar campos
    setEmpresa("");
    setCargo("");
    setInicio("");
    setFim("");
    setDescricao("");
    setAtual(false);
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-4 rounded-2xl shadow-md space-y-3">
      <input
        type="text"
        placeholder="Empresa"
        value={empresa}
        onChange={(e) => setEmpresa(e.target.value)}
        className="w-full border p-2 rounded"
        required
      />
      <input
        type="text"
        placeholder="Cargo"
        value={cargo}
        onChange={(e) => setCargo(e.target.value)}
        className="w-full border p-2 rounded"
        required
      />
      <div className="flex gap-2">
        <input
          type="month"
          value={inicio}
          onChange={(e) => setInicio(e.target.value)}
          className="border p-2 rounded w-1/2"
          required
        />
        {!atual && (
          <input
            type="month"
            value={fim}
            onChange={(e) => setFim(e.target.value)}
            className="border p-2 rounded w-1/2"
          />
        )}
      </div>
      <label className="flex items-center gap-2">
        <input type="checkbox" checked={atual} onChange={() => setAtual(!atual)} />
        Trabalho Atual
      </label>
      <textarea
        placeholder="Descrição"
        value={descricao}
        onChange={(e) => setDescricao(e.target.value)}
        className="w-full border p-2 rounded"
      />
      <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded-lg shadow">
        Adicionar
      </button>
    </form>
  );
}
