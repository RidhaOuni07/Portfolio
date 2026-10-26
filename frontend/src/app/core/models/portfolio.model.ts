/**
 * Portfolio data structure loaded from the static JSON asset.
 */

export interface SocialLink {
  label: string;
  url: string;
  icon: string;
}

export interface Highlight {
  value: string;
  label: string;
}

export interface Person {
  name: string;
  title: string;
  tagline: string;
  summary: string;
  email: string;
  phone: string;
  location: string;
  socials: SocialLink[];
  highlights: Highlight[];
}

export interface Experience {
  id: string;
  role: string;
  company: string;
  location: string;
  period: string;
  current: boolean;
  highlights: string[];
  tags: string[];
  repositoryUrl?: string | null;
}

export interface Education {
  id: string;
  degree: string;
  institution: string;
  location: string;
  period: string;
  current: boolean;
  thesis?: string | null;
  highlights: string[];
}

export interface SkillGroup {
  category: string;
  icon: string;
  skills: string[];
}

export interface Project {
  id: string;
  name: string;
  period: string;
  summary: string;
  metric?: string | null;
  highlights: string[];
  tags: string[];
  repositoryUrl?: string | null;
}

export interface Certificate {
  name: string;
  issuer: string;
  url?: string | null;
}

export interface Award {
  title: string;
  issuer: string;
  date: string;
}

export interface Volunteering {
  id: string;
  organization: string;
  role: string;
  location: string;
  period: string;
  highlights: string[];
}

export interface Language {
  name: string;
  level: string;
}

export interface Portfolio {
  person: Person;
  experiences: Experience[];
  education: Education[];
  skillGroups: SkillGroup[];
  projects: Project[];
  certificates: Certificate[];
  awards: Award[];
  volunteering: Volunteering[];
  languages: Language[];
  interests: string[];
}

