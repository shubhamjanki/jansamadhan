export type ScreenTab = 'home' | 'challenges' | 'submit-problem' | 'state-heatmap' | 'innovation-impact-graph' | 'projects' | 'problem-dossier' | 'process-flow';

export type UserRole = 'Citizen' | 'Dept. Officer' | 'Institution PI';

export type Language = 'en' | 'hi';

export interface Challenge {
  id: string;
  title: string;
  category: string;
  district: string;
  summary: string;
  matchedLab: string;
  matchedLabDepartment?: string;
  sponsoringBody: string;
  grantPool: string;
  reportsCount: number;
  slaDaysRemaining?: number;
  status: 'Reported' | 'AI Classified' | 'Dept Validated' | 'Institution Matched' | 'Proposal Submit' | 'Prototype Dev' | 'Field Pilot' | 'State Deploy';
  severity: 'Critical' | 'High' | 'Moderate' | 'Low';
  aiMatchScore: number;
  fullDescription?: string;
  coordinates?: string;
}

export interface QueueItem {
  id: string;
  refCode: string;
  title: string;
  summary: string;
  severity: 'Critical' | 'High' | 'Moderate';
  citizenReportsCount: number;
  matchedInstitution: string;
  department: string;
  aiFitScore: number;
  status: 'pending' | 'approved' | 'merged';
}

export interface DistrictStat {
  name: string;
  rank: number;
  alerts: number;
  severityLevel: number;
  status: 'Critical' | 'High' | 'Moderate' | 'Normal';
  activeClusters: number;
  criticalHotzones: number;
  slaRate: number;
  anchorLab: string;
  activeGrants: number;
  blocksCount: number;
  lat: number;
  lng: number;
  solvedCount: number;
  turnaroundDays: number;
}

export interface SectorVolume {
  sector: string;
  reports: number;
  percentage: number;
  verifiedChallenges: number;
  activeProjects: number;
  barWidthPercent: number;
  colorClass: string;
}

export interface InstitutionSLA {
  code: string;
  name: string;
  grantsCount: number;
  deptsCount: number;
  slaDays: number;
  quartileStatus: 'Top Quartile' | 'Target SLA' | 'Review Flag';
  badgeColor: string;
}

export interface NotificationItem {
  id: string;
  title: string;
  description: string;
  timeAgo: string;
  severity: 'urgent' | 'info' | 'success';
  read: boolean;
}

export interface UniversityRankItem {
  rank: number;
  name: string;
  shortCode: string;
  location: string;
  logoBadge: string;
  solvedCount: number;
  activeCount: number;
  slaRate: number;
  avgTurnaroundDays: number;
  satisfactionRating: number;
  topDomains: string[];
  flagshipSolution: string;
  grantWon: string;
}

export interface AwardedInstitute {
  id: string;
  awardTitle: string;
  awardYear: string;
  category: string;
  instituteName: string;
  instituteCode: string;
  solutionName: string;
  citation: string;
  impactMetrics: {
    livesBenefited: string;
    districtsDeployed: number;
    grantAmount: string;
  };
  trophyIcon: string;
  badgeBg: string;
}

export interface PublicFeedbackItem {
  id: string;
  citizenName: string;
  villageOrWard: string;
  district: string;
  date: string;
  rating: number;
  category: string;
  solvedProblemTitle: string;
  solvingInstitute: string;
  comment: string;
  verifiedCitizen: boolean;
  upvotesCount: number;
}

