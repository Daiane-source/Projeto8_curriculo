import React from "react";
import type { PersonalData } from "../types/cv.d";
import Section from "./Section";

type Props = {
  personal: PersonalData;
  updatePersonal: (p: Partial<PersonalData>) => void;
};

export default function FormPanel({ personal, updatePersonal }: Props) {
  return (
    <div className="overflow-x-hidden">
      <Section title="Dados Pessoais">
      {/* Nome */}
      <div>
        <label className="block text-sm font-medium mb-1">Nome</label>
        <input
          type="text"
          value={personal.name}
          onChange={(e) => updatePersonal({ name: e.target.value })}
          className="w-full border rounded p-2"
          placeholder="Seu nome completo"
        />
      </div>

      {/* Foto de Perfil */}
      <div>
        <label className="block text-sm font-medium mb-1">Foto de Perfil</label>
        <input
          type="file"
          accept="image/*"
          onChange={(e) => {
            const file = e.target.files?.[0];
            if (file) {
              const reader = new FileReader();
              reader.onloadend = () => {
                updatePersonal({ photo: reader.result as string });
              };
              reader.readAsDataURL(file);
            }
          }}
          className="w-full border rounded p-2"
        />
      </div>

      {/* Contatos */}
      <div>
        <label className="block text-sm font-medium mb-1">Email</label>
        <input
          type="email"
          value={personal.email}
          onChange={(e) => updatePersonal({ email: e.target.value })}
          className="w-full border rounded p-2"
          placeholder="seu@email.com"
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">Telefone</label>
        <input
          type="tel"
          value={personal.phone}
          onChange={(e) => updatePersonal({ phone: e.target.value })}
          className="w-full border rounded p-2"
          placeholder="(99) 99999-9999"
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">LinkedIn</label>
        <input
          type="url"
          value={personal.linkedin}
          onChange={(e) => updatePersonal({ linkedin: e.target.value })}
          className="w-full border rounded p-2"
          placeholder="https://linkedin.com/in/seu-perfil"
        />
      </div>

      {/* Resumo Profissional */}
      <div>
        <label className="block text-sm font-medium mb-1">Resumo</label>
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
    </Section>
    </div>
  );
}