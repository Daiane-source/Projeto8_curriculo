import React, { useState } from "react";
import AppLayout from "./components/AppLayout";
import FormPanel from "./components/FormPanel";
import PreviewPanel from "./components/PreviewPanel";
import type { CVState } from "./types/cv.d";

/**
 * Estado inicial: começa tudo vazio.
 */
const initialState: CVState = {
  personal: { name: "", email: "", phone: "", linkedin: "", summary: "" },
};

export default function App() {
  // Estado central do currículo
  const [cv, setCv] = useState<CVState>(initialState);

  // Atualiza apenas os dados pessoais
  const updatePersonal = (partial: Partial<CVState["personal"]>) => {
    setCv((prev) => ({ ...prev, personal: { ...prev.personal, ...partial } }));
  };

  return (
    // AppLayout = duas colunas (Form e Preview)
    <AppLayout>
      <FormPanel personal={cv.personal} updatePersonal={updatePersonal} />
      <PreviewPanel cv={cv} />
    </AppLayout>
  );
}
