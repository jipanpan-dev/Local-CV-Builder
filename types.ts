export interface PersonalData {
  fullName: string;
  photo: string | null;
  tagline: string;
  email: string;
  phone: string;
  website: string;
  location: string;
  bio: string;
  religion: string;
  dob: string;
}

export interface WorkExperience {
  id: string;
  jobTitle: string;
  company: string;
  startDate: string;
  endDate: string;
  isCurrent: boolean;
  description: string;
}

export interface Education {
  id: string;
  degree: string;
  institution: string;
  startDate: string;
  endDate: string;
  description: string;
}

export interface Certificate {
  id: string;
  name: string;
  issuer: string;
  date: string;
}

export interface Hobby {
    id: string;
    name: string;
}

export interface PortfolioItem {
  id: string;
  projectName: string;
  image: string;
  description?: string;
  year?: string;
}

export interface CVData {
  personal: PersonalData;
  experience: WorkExperience[];
  education: Education[];
  certificates: Certificate[];
  hobbies: Hobby[];
  portfolio: PortfolioItem[];
}

export enum Theme {
  MODERN = 'Modern',
  CLASSIC = 'Classic',
  CREATIVE = 'Creative',
  MINIMALIST = 'Minimalist',
  TECHNICAL = 'Technical',
  CORPORATE = 'Corporate',
  ELEGANT = 'Elegant',
  ACADEMIC = 'Academic',
  BOLD = 'Bold',
  GRAPHIC = 'Graphic',
  INFOGRAPHIC = 'Infographic',
  VINTAGE = 'Vintage',
}

export enum PaperSize {
  A4 = 'A4',
  LETTER = 'Letter',
}
