export type RiskLevel = "Critical" | "High" | "Medium" | "Low" | "Safe";
export type ScanStatus = "Blocked" | "Flagged" | "Safe" | "Pending";
export type ScanType = "URL" | "Email" | "Domain" | "Attachment";

export interface ThreatStat {
  id: string;
  label: string;
  value: number | string;
  change: string;
  trend: "up" | "down" | "neutral";
  icon: "shield-alert" | "shield-check" | "scan" | "clock";
  cardClass: string;
  iconClass: string;
}

export interface ScanRecord {
  id: string;
  target: string;
  type: ScanType;
  status: ScanStatus;
  risk: number;
  riskLevel: RiskLevel;
  source: string;
  timestamp: string;
}

export interface ThreatActivityPoint {
  time: string;
  threats: number;
  blocked: number;
  scanned: number;
}

export interface ThreatCategory {
  name: string;
  value: number;
  color: string;
}

export interface ScanVolumePoint {
  day: string;
  urls: number;
  emails: number;
}

export const threatStats: ThreatStat[] = [
  {
    id: "active-threats",
    label: "Active Threats",
    value: 23,
    change: "+4 today",
    trend: "up",
    icon: "shield-alert",
    cardClass: "from-red-500/10 to-red-600/5 border-red-500/15",
    iconClass: "border-red-500/20 bg-red-500/10 text-red-400",
  },
  {
    id: "blocked-today",
    label: "Blocked Today",
    value: 847,
    change: "↑ 12% vs yesterday",
    trend: "up",
    icon: "shield-check",
    cardClass: "from-emerald-500/10 to-emerald-600/5 border-emerald-500/15",
    iconClass: "border-emerald-500/20 bg-emerald-500/10 text-emerald-400",
  },
  {
    id: "scans-today",
    label: "Scans Today",
    value: "12,483",
    change: "↑ 8.2%",
    trend: "up",
    icon: "scan",
    cardClass: "from-cyan-500/10 to-cyan-600/5 border-cyan-500/15",
    iconClass: "border-cyan-500/20 bg-cyan-500/10 text-cyan-400",
  },
  {
    id: "avg-response",
    label: "Avg Response Time",
    value: "1.2s",
    change: "↓ 0.3s improvement",
    trend: "down",
    icon: "clock",
    cardClass: "from-blue-500/10 to-blue-600/5 border-blue-500/15",
    iconClass: "border-blue-500/20 bg-blue-500/10 text-blue-400",
  },
];

export const scanHistory: ScanRecord[] = [
  {
    id: "SCN-2024-8847",
    target: "https://paypa1-secure.com/login/verify",
    type: "URL",
    status: "Blocked",
    risk: 98,
    riskLevel: "Critical",
    source: "Browser Extension",
    timestamp: "2024-06-16 14:32:08",
  },
  {
    id: "SCN-2024-8846",
    target: "ceo@company-secure.net",
    type: "Email",
    status: "Blocked",
    risk: 94,
    riskLevel: "Critical",
    source: "Outlook Plugin",
    timestamp: "2024-06-16 14:28:41",
  },
  {
    id: "SCN-2024-8845",
    target: "https://microsft-update.net/auth",
    type: "URL",
    status: "Blocked",
    risk: 91,
    riskLevel: "High",
    source: "API Gateway",
    timestamp: "2024-06-16 14:15:22",
  },
  {
    id: "SCN-2024-8844",
    target: "invoice_Q2.pdf",
    type: "Attachment",
    status: "Flagged",
    risk: 76,
    riskLevel: "High",
    source: "Email Gateway",
    timestamp: "2024-06-16 13:58:09",
  },
  {
    id: "SCN-2024-8843",
    target: "amazon-prize.claim",
    type: "Domain",
    status: "Blocked",
    risk: 87,
    riskLevel: "High",
    source: "DNS Filter",
    timestamp: "2024-06-16 13:41:55",
  },
  {
    id: "SCN-2024-8842",
    target: "https://github.com/anthropics/claude-code",
    type: "URL",
    status: "Safe",
    risk: 4,
    riskLevel: "Safe",
    source: "Browser Extension",
    timestamp: "2024-06-16 13:22:17",
  },
  {
    id: "SCN-2024-8841",
    target: "support@stripe.com",
    type: "Email",
    status: "Safe",
    risk: 8,
    riskLevel: "Safe",
    source: "Outlook Plugin",
    timestamp: "2024-06-16 12:55:03",
  },
  {
    id: "SCN-2024-8840",
    target: "https://linkedin-msg.io/auth/callback",
    type: "URL",
    status: "Flagged",
    risk: 72,
    riskLevel: "Medium",
    source: "Slack Integration",
    timestamp: "2024-06-16 12:30:44",
  },
];

export const threatActivityData: ThreatActivityPoint[] = [
  { time: "00:00", threats: 12, blocked: 10, scanned: 420 },
  { time: "02:00", threats: 8, blocked: 7, scanned: 310 },
  { time: "04:00", threats: 5, blocked: 5, scanned: 180 },
  { time: "06:00", threats: 15, blocked: 13, scanned: 520 },
  { time: "08:00", threats: 34, blocked: 31, scanned: 890 },
  { time: "10:00", threats: 48, blocked: 44, scanned: 1240 },
  { time: "12:00", threats: 62, blocked: 58, scanned: 1580 },
  { time: "14:00", threats: 55, blocked: 51, scanned: 1420 },
  { time: "16:00", threats: 41, blocked: 38, scanned: 1100 },
  { time: "18:00", threats: 28, blocked: 26, scanned: 780 },
  { time: "20:00", threats: 19, blocked: 17, scanned: 540 },
  { time: "22:00", threats: 14, blocked: 12, scanned: 390 },
];

export const threatCategoryData: ThreatCategory[] = [
  { name: "Credential Harvest", value: 342, color: "#ef4444" },
  { name: "BEC / Impersonation", value: 218, color: "#f97316" },
  { name: "Malware Delivery", value: 156, color: "#eab308" },
  { name: "Brand Spoofing", value: 124, color: "#06b6d4" },
  { name: "Other", value: 87, color: "#6366f1" },
];

export const scanVolumeData: ScanVolumePoint[] = [
  { day: "Mon", urls: 4200, emails: 3100 },
  { day: "Tue", urls: 5100, emails: 3800 },
  { day: "Wed", urls: 4800, emails: 3500 },
  { day: "Thu", urls: 6200, emails: 4100 },
  { day: "Fri", urls: 5900, emails: 3900 },
  { day: "Sat", urls: 2100, emails: 1400 },
  { day: "Sun", urls: 1800, emails: 1200 },
];

export const riskLevelStyles: Record<RiskLevel, string> = {
  Critical: "text-red-400 bg-red-500/10 border-red-500/25",
  High: "text-orange-400 bg-orange-500/10 border-orange-500/25",
  Medium: "text-yellow-400 bg-yellow-500/10 border-yellow-500/25",
  Low: "text-blue-400 bg-blue-500/10 border-blue-500/25",
  Safe: "text-emerald-400 bg-emerald-500/10 border-emerald-500/25",
};

export const statusStyles: Record<ScanStatus, string> = {
  Blocked: "text-red-400 bg-red-500/10 border-red-500/25",
  Flagged: "text-orange-400 bg-orange-500/10 border-orange-500/25",
  Safe: "text-emerald-400 bg-emerald-500/10 border-emerald-500/25",
  Pending: "text-zinc-400 bg-zinc-500/10 border-zinc-500/25",
};

export const copilotSuggestions = [
  "Summarize today's critical threats",
  "Show BEC attack trends this week",
  "Generate incident report for SCN-2024-8847",
  "Block all domains from today's scans",
];
