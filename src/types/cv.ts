export interface ExperienceItem {
  id: string;
  position: string;
  company: string;
  location: string;
  startDate: string;
  endDate: string;
  current?: boolean;
  responsibilities: string[];
}

export interface EducationItem {
  id: string;
  school: string;
  degree: string;
  fieldOfStudy: string;
  specialization?: string;
  thesisTitle?: string;
  startDate: string;
  endDate: string;
}

export interface LanguageItem {
  id: string;
  language: string;
  level: string;
  description?: string;
}

export interface CVData {
  personalInfo: {
    fullName: string;
    title: string;
    email: string;
    phone: string;
    location: string;
    birthDate: string;
    showBirthDate: boolean;
    maritalStatus: string;
    showMaritalStatus: boolean;
    drivingLicense: string;
    photoUrl: string;
    showPhoto: boolean;
  };
  summary: string;
  experience: ExperienceItem[];
  education: EducationItem[];
  skills: {
    management: string[];
    technical: string[];
  };
  languages: LanguageItem[];
  softSkills: string[];
  interests: string[];
  gdprClause: string;
  includeFutureRecruitment: boolean;
}

export type TemplateStyle = 'executive' | 'classic' | 'modern';

export type ColorTheme = 'navy' | 'slate' | 'emerald' | 'burgundy' | 'blue';

export interface ThemeConfig {
  name: string;
  primary: string;
  primaryLight: string;
  primaryDark: string;
  accentBg: string;
  border: string;
  textPrimary: string;
  badgeBg: string;
  badgeText: string;
}
