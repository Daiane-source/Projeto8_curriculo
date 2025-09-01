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


