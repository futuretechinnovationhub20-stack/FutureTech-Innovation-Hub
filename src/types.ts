export type AcademicLevel = "BSc" | "MSc" | "PhD" | "Researcher" | "Other";

export interface ResearchArea {
  id: string;
  title: string;
  iconName: string;
  shortDescription: string;
  subtopics: string[];
  targetVenues: string[];
  activeProjectsCount: number;
  badgeColor?: string;
}

export interface ResearchProject {
  id: string;
  title: string;
  domain: string;
  domainCategory: "AI" | "Energy" | "Cybersecurity" | "Smart Grid" | "Material Science" | "Other";
  publicationTarget: string;
  duration: string;
  availablePositions: string;
  status: "Open Positions" | "In Progress" | "Final Review" | "Under Review";
  summary: string;
  objectives: string[];
  prerequisites: string[];
  teamLead: string;
  institutionAffiliation?: string;
  isFeatured?: boolean;
}

export interface IeeeAcceptance {
  id: string;
  conferenceName: string;
  year: number;
  paperTitle: string;
  paperTrack: string;
  status: "Accepted" | "Under Review" | "Published";
  certificateImg: string;
  verificationId: string;
  authorsCount: number;
  abstractSnippet: string;
}

export interface TimelineEvent {
  id: string;
  year: string;
  title: string;
  subtitle: string;
  description: string;
  category: "IEEE Acceptance" | "Global Expansion" | "Key Milestone" | "Research Grant";
  badge: string;
}

export interface CollaboratorRegion {
  id: string;
  name: string;
  coordinates: { x: number; y: number };
  activeResearchers: number;
  activeProjects: number;
  topInstitutions: string[];
}

export interface InquiryFormData {
  fullName: string;
  email: string;
  country: string;
  university: string;
  department: string;
  academicLevel: AcademicLevel;
  researchInterest: string;
  preferredResearchArea: string;
  preferredProjectTitle?: string;
  message: string;
}

export interface WhoCanJoinCardData {
  id: string;
  icon: string;
  title: string;
  subtitle: string;
  description: string;
  benefits: string[];
  ctaLabel: string;
}

export interface StepItem {
  number: string;
  title: string;
  description: string;
  subtext: string;
}
