import { api } from "@/lib/api";
import { ScanResult, RiskLevelApi } from "@/lib/types";
import {
  ScanRecord,
  ThreatStat,
  RiskLevel,
  ScanStatus,
  ScanType,
} from "@/lib/dashboard-data";

/**
 * Bridges the real backend into the existing dashboard component
 * shapes (ScanRecord, ThreatStat) so ScanHistoryTable.tsx and
 * ThreatCards.tsx don't need to change at all.
 *
 * IMPORTANT — what's real vs. mock right now:
 *   - Scan history (target/risk/timestamp): REAL, from
 *     GET /api/v1/dashboard/recent-scans
 *   - "Scans Today" and "Blocked Today" stats: REAL, derived from
 *     GET /api/v1/dashboard/stats (total_scans, phishing_scans)
 *   - "Active Threats" and "Avg Response Time": backend has no
 *     equivalent data yet (no open/unresolved-threat concept, no
 *     response-time tracking) — these two stats stay on the
 *     original mock values in dashboard-data.ts until a teammate
 *     adds that to the API. Don't present these two as real.
 */

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