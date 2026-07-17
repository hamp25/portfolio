export interface NavItem {
  label: string;
  href: string;
}

export interface Skill {
  name: string;
  level?: number;
}

export interface SkillCategory {
  name: string;
  icon: string;
  skills: Skill[];
  color: string;
}

export interface Experience {
  role: string;
  company: string;
  period: string;
  type: string;
  description: string;
  responsibilities: string[];
  color: string;
}

export interface Project {
  title: string;
  description: string;
  techs: string[];
  liveUrl?: string;
  githubUrl?: string;
  color: string;
  gradient: string;
  codeSnippet?: {
    filename: string;
    lines: string[];
  };
  codeFiles?: {
    filename: string;
    lines: string[];
  }[];
}

export interface Blob {
  id: number;
  width: number;
  height: number;
  x: number;
  y: number;
  color: string;
  duration: number;
  delay: number;
  blur: number;
  opacity: number;
}
