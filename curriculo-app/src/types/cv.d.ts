export interface PersonalData {
  name: string;
  email: string;
  phone: string;
  linkedin: string;
  summary: string;
  photo?: string;
}

export interface CVState {
  personal: PersonalData;
}


export interface Experience {
  empresa: string;
  cargo: string;
  inicio: string;
  fim: string;
  descricao: string;
}

export interface Skill {
  nome: string;
  nivel: string;
}
