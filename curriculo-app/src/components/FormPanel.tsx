import React from "react";
import type { PersonalData } from "../types/cv.d";

type Props = {
  personal: PersonalData;
  updatePersonal: (p: Partial<PersonalData>) => void;
};

/**
 * FormPanel: formulário de dados pessoais
 */
export default function FormPanel({ personal, updatePersonal }: Props) {
  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold mb-4">Dados Pessoais</h2>

      {/* Nome */}
      <div>
        <label className="block text-sm font-medium">Nome</label>
        <input
          type="text"
          value={personal.name}
          onChange={(e) => updatePersonal({ name: e.target.value })}
          className="w-full border rounded p-2"
          placeholder="Seu nome completo"
        />
      </div>

      {/* Email */}
      <div>
        <label className="block text-sm font-medium">Email</label>
        <input
          type="email"
          value={personal.email}
          onChange={(e) => updatePersonal({ email: e.target.value })}
          className="w-full border rounded p-2"
          placeholder="seu@email.com"
        />
      </div>

      {/* Telefone */}
      <div>
        <label className="block text-sm font-medium">Telefone</label>
        <input
          type="tel"
          value={personal.phone}
          onChange={(e) => updatePersonal({ phone: e.target.value })}
          className="w-full border rounded p-2"
          placeholder="(99) 99999-9999"
        />
      </div>

      {/* LinkedIn */}
      <div>
        <label className="block text-sm font-medium">LinkedIn</label>
        <input
          type="url"
          value={personal.linkedin}
          onChange={(e) => updatePersonal({ linkedin: e.target.value })}
          className="w-full border rounded p-2"
          placeholder="https://linkedin.com/in/seu-perfil"
        />
      </div>

      {/* Resumo */}
      <div>
        <label className="block text-sm font-medium">Resumo</label>
        <textarea
          value={personal.summary}
          onChange={(e) => updatePersonal({ summary: e.target.value })}
          className="w-full border rounded p-2"
          rows={5}
          placeholder="Breve resumo da sua experiência e objetivos..."
        />
        <p className="text-xs text-gray-500 mt-1">
          {personal.summary.length} / 500 caracteres
        </p>
      </div>
    </div>
  );
}
