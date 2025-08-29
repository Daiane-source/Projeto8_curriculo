// Dados pessoais do currículo
export interface PersonalData {
  name: string; // Nome completo do usuário
  email: string; // E-mail de contato
  phone: string; // Telefone
  linkedin: string; // Link do perfil no LinkedIn
  summary: string; // Resumo profissional
}

// Estado principal do currículo
// Podemos adicionar mais seções depois (habilidades, experiências etc.)
export interface CVState {
  personal: PersonalData; // Dados pessoais
}
