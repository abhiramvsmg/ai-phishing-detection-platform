import { api } from "@/lib/api";
import { ScanResult, RiskLevelApi } from "@/lib/types";
import {
  ScanRecord,
  ThreatStat,
  RiskLevel,
  ScanStatus,
  ScanType,
} from "@/lib/dashboard-data";

const riskLevelMap: Record<RiskLevelApi, RiskLevel> = {
  LOW: "Safe",
  MEDIUM: "Medium",
  HIGH: "High",
  CRITICAL: "Critical",
};

const scanTypeMap: Record<string, ScanType> = {
  URL: "URL",
  EMAIL: "Email",
  TEXT: "Domain",
};

function toScanStatus(result: ScanResult): ScanStatus {
  if (result.result === "PHISHING") return "Blocked";
  if (result.risk_level === "MEDIUM" || result.risk_level === "HIGH") return "Flagged";
  return "Safe";
}

function toScanRecord(result: ScanResult): ScanRecord {
  return {
    id: `SCN-${result.id}`,
    target: result.content,
    type: scanTypeMap[result.scan_type] ?? "URL",
    status: toScanStatus(result),
    risk: result.risk_score,
    riskLevel: riskLevelMap[result.risk_level],
    source: "PhishGuard scan",
    timestamp: new Date(result.created_at).toLocaleString(),
  };
}

export async function fetchScanHistory(): Promise<ScanRecord[]> {
  const results = await api.dashboard.recentScans();
  return results.map(toScanRecord);
}

export async function fetchRealThreatStats(): Promise<Pick<ThreatStat, "id" | "value">[]> {
  const stats = await api.dashboard.stats();
  return [
    { id: "scans-today", value: stats.total_scans },
    { id: "blocked-today", value: stats.phishing_scans },
  ];
}