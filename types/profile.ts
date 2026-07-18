export interface ProfileBasics {
  name: string;
  headline: string;
  currentRole: string;
  location: string;
  photo: string;
  about: string;
  topSkills: string[];
}

export interface FeaturedItem {
  type: "post" | "link";
  title: string;
  description?: string;
  url?: string;
  reactions?: number;
  comments?: number;
  hashtags?: string[];
  links?: { demo?: string; source?: string };
}

export interface ExperienceRole {
  title: string;
  startDate: string;
  endDate: string;
  duration?: string;
  skills?: string[];
}

export interface ExperienceItem {
  company: string;
  title?: string;
  employmentType?: string;
  startDate?: string;
  endDate?: string;
  duration?: string;
  totalDuration?: string;
  skills?: string[];
  roles?: ExperienceRole[];
}

export interface EducationItem {
  institution: string;
  degree: string;
  startDate: string;
  endDate: string;
  grade?: string;
  skills?: string[];
}

export interface ProfileProject {
  name: string;
  startDate?: string;
  endDate?: string;
  associatedWith?: string;
  description: string;
  features?: string[];
  technology?: Record<string, unknown>;
  skills?: string[];
  source?: string;
}

export interface Certification {
  name: string;
  issuer: string;
  issued?: string;
  credentialId?: string;
  skills?: string[];
}

export interface Profile {
  basics: ProfileBasics;
  featured: FeaturedItem[];
  experience: ExperienceItem[];
  education: EducationItem[];
  projects: ProfileProject[];
  skills: string[];
  certifications: Certification[];
  achievements: string[];
}