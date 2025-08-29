import React from "react";
import type { PersonalData } from "../types/cv.d";

/**
 * Formulário controlado: edita os dados e chama updatePersonal
 * para atualizar o estado central no App.tsx.
 *
 * Este componente recebe os dados pessoais para exibir nos campos
 * e uma função para atualizar esses dados no componente pai.
 */
type Props = {
  personal: PersonalData;
  updatePersonal: (p: Partial<PersonalData>) => void;
};

export default function FormPanel({ personal, updatePersonal }: Props) {
  return (
    <div className="max-w-md mx-auto">
      <h2 className="text-xl font-semibold mb-4">Dados Pessoais</h2>

      {/* Campo de entrada para o nome.
          O valor (value) do input é diretamente lido do estado 'personal.name'.
          Quando o valor muda (onChange), a função 'updatePersonal' é chamada
          para atualizar o estado no componente pai, passando apenas a propriedade 'name'. */}
      <label className="block mb-3">
        <span className="text-sm">Nome</span>
        <input
          type="text"
          value={personal.name}
          onChange={(e) => updatePersonal({ name: e.target.value })}
          className="mt-1 block w-full border rounded p-2"
        />
      </label>

      {/* Campo de entrada para o email.
          Funciona de forma similar ao campo de nome, lendo o valor
          de 'personal.email' e atualizando-o no componente pai. */}
      <label className="block mb-3">
        <span className="text-sm">Email</span>
        <input
          type="email"
          value={personal.email}
          onChange={(e) => updatePersonal({ email: e.target.value })}
          className="mt-1 block w-full border rounded p-2"
        />
      </label>

      {/* Campo de entrada para o telefone. */}
      <label className="block mb-3">
        <span className="text-sm">Telefone</span>
        <input
          type="text"
          value={personal.phone}
          onChange={(e) => updatePersonal({ phone: e.target.value })}
          className="mt-1 block w-full border rounded p-2"
        />
      </label>

      {/* Campo de entrada para o LinkedIn. */}
      <label className="block mb-3">
        <span className="text-sm">LinkedIn</span>
        <input
          type="text"
          value={personal.linkedin}
          onChange={(e) => updatePersonal({ linkedin: e.target.value })}
          className="mt-1 block w-full border rounded p-2"
        />
      </label>

      {/* Campo de entrada de área de texto para o resumo.
          O uso de 'textarea' permite múltiplas linhas. */}
      <label className="block mb-3">
        <span className="text-sm">Resumo</span>
        <textarea
          value={personal.summary}
          onChange={(e) => updatePersonal({ summary: e.target.value })}
          className="mt-1 block w-full border rounded p-2 min-h-[80px]"
        />
      </label>
    </div>
  );
}
