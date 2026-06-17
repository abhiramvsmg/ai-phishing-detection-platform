"use client";

import { motion } from "framer-motion";
import {
  AlertTriangle,
  CheckCircle2,
  Clock3,
  Link2,
  Radar,
  ShieldCheck,
  ShieldX,
} from "lucide-react";
import { useMemo, useState } from "react";
import { GlassCard } from "@/components/ui/glass-card";

type Verdict = "Safe" | "Suspicious" | "Malicious";

interface ScanResult {
  url: string;
  hostname: string;
  score: number;
  verdict: Verdict;
  findings: string[];
  scannedAt: string;
}

interface ScanRow {
  id: string;
  url: string;
  score: number;
  verdict: Verdict;
  timestamp: string;
}

const recentScans: ScanRow[] = [
  {
    id: "SCN-48291",
    url: "https://paypa1-verify-account-security.com/login",
    score: 96,
    verdict: "Malicious",
    timestamp: "2 min ago",
  },
  {
    id: "SCN-48290",
    url: "https://accounts.google.com/security",
    score: 4,
    verdict: "Safe",
    timestamp: "8 min ago",
  },
  {
    id: "SCN-48289",
    url: "https://microsoft-identity-validation.net",
    score: 72,
    verdict: "Suspicious",
    timestamp: "14 min ago",
  },
  {
    id: "SCN-48288",
    url: "https://portal.company.com",
    score: 3,
    verdict: "Safe",
    timestamp: "22 min ago",
  },
];

const verdictStyles: Record<Verdict, string> = {
  Safe: "text-emerald-300 bg-emerald-500/10 border-emerald-500/30",
  Suspicious: "text-amber-300 bg-amber-500/10 border-amber-500/30",
  Malicious: "text-red-300 bg-red-500/10 border-red-500/30",
};

function getRiskBarClass(score: number): string {
  if (score >= 85) return "bg-red-500";
  if (score >= 60) return "bg-orange-500";
  if (score >= 35) return "bg-amber-500";
  return "bg-emerald-500";
}

function validateUrl(input: string): { valid: boolean; value?: URL; error?: string } {
  try {
    const parsed = new URL(input.trim());
    if (!["http:", "https:"].includes(parsed.protocol)) {
      return { valid: false, error: "Only HTTP and HTTPS URLs are supported." };
    }
    return { valid: true, value: parsed };
  } catch {
    return {
      valid: false,
      error: "Enter a valid URL, for example https://example.com/login",
    };
  }
}

function analyzeUrl(parsed: URL): ScanResult {
  const host = parsed.hostname.toLowerCase();
  const path = parsed.pathname.toLowerCase();
  let score = 0;
  const findings: string[] = [];

  if (/\d/.test(host)) {
    score += 12;
    findings.push("Hostname contains numeric substitutions often used in impersonation.");
  }

  if (host.split(".").length > 3) {
    score += 10;
    findings.push("Excessive subdomain depth detected.");
  }

  if (/(\.zip|\.click|\.top|\.xyz)$/.test(host)) {
    score += 25;
    findings.push("High-risk top-level domain identified.");
  }

  if (
    /(verify|secure|account|login|auth|update|confirm|wallet|invoice)/.test(path) ||
    /(verify|secure|account|login|auth|update|confirm|wallet|invoice)/.test(host)
  ) {
    score += 22;
    findings.push("Social-engineering keywords detected in URL structure.");
  }

  if (/^\d{1,3}(\.\d{1,3}){3}$/.test(host)) {
    score += 30;
    findings.push("Direct IP target used instead of a trusted hostname.");
  }

  if (parsed.protocol === "http:") {
    score += 20;
    findings.push("Insecure HTTP transport detected.");
  }

  score = Math.min(score, 100);

  if (score === 0) {
    findings.push("No major phishing indicators detected in static URL analysis.");
  }

  const verdict: Verdict =
    score >= 85 ? "Malicious" : score >= 45 ? "Suspicious" : "Safe";

  return {
    url: parsed.toString(),
    hostname: parsed.hostname,
    score,
    verdict,
    findings,
    scannedAt: new Date().toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    }),
  };
}

export function UrlScannerDashboard() {
  const [url, setUrl] = useState("");
  const [error, setError] = useState("");
  const [isScanning, setIsScanning] = useState(false);
  const [result, setResult] = useState<ScanResult | null>(null);

  const statCards = useMemo(
    () => [
      { label: "URLs Scanned Today", value: "12,483", icon: Radar, tone: "text-cyan-300" },
      { label: "Threats Blocked", value: "847", icon: ShieldX, tone: "text-red-300" },
      { label: "Safe URLs", value: "11,559", icon: ShieldCheck, tone: "text-emerald-300" },
      { label: "Avg Scan Time", value: "1.1s", icon: Clock3, tone: "text-blue-300" },
    ],
    [],
  );

  async function handleScan() {
    const validated = validateUrl(url);
    if (!validated.valid || !validated.value) {
      setResult(null);
      setError(validated.error ?? "Invalid URL.");
      return;
    }

    setError("");
    setIsScanning(true);
    await new Promise((resolve) => setTimeout(resolve, 900));
    setResult(analyzeUrl(validated.value));
    setIsScanning(false);
  }

  return (
    <div className="space-y-6">
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {statCards.map((card, i) => (
          <motion.div
            key={card.label}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.07, duration: 0.4 }}
          >
            <GlassCard className="p-4">
              <div className="flex items-center justify-between">
                <p className="text-xs font-medium tracking-wide text-zinc-400 uppercase">
                  {card.label}
                </p>
                <card.icon className={`h-4 w-4 ${card.tone}`} />
              </div>
              <p className="mt-3 text-2xl font-semibold text-white">{card.value}</p>
            </GlassCard>
          </motion.div>
        ))}
      </div>

      <div className="grid gap-4 xl:grid-cols-5">
        <GlassCard className="xl:col-span-3">
          <div className="border-b border-white/[0.06] px-5 py-4">
            <h2 className="text-base font-semibold text-white">Real-time URL Scanner</h2>
            <p className="text-xs text-zinc-500">
              Submit any URL to run instant phishing risk analysis.
            </p>
          </div>
          <div className="space-y-4 px-5 py-5">
            <label htmlFor="url-input" className="block text-xs font-medium text-zinc-400">
              URL to analyze
            </label>
            <div className="flex flex-col gap-2 sm:flex-row">
              <div className="relative flex-1">
                <Link2 className="pointer-events-none absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-zinc-600" />
                <input
                  id="url-input"
                  type="url"
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                  placeholder="https://example.com/login"
                  className="w-full rounded-lg border border-white/[0.08] bg-white/[0.03] py-2.5 pr-3 pl-10 text-sm text-zinc-200 outline-none placeholder:text-zinc-600 focus:border-cyan-500/30 focus:ring-1 focus:ring-cyan-500/25"
                />
              </div>
              <button
                type="button"
                onClick={handleScan}
                disabled={isScanning}
                className="rounded-lg bg-gradient-to-r from-cyan-500 to-blue-600 px-5 py-2.5 text-sm font-semibold text-white transition-opacity disabled:cursor-not-allowed disabled:opacity-60"
              >
                {isScanning ? "Scanning..." : "Scan URL"}
              </button>
            </div>

            {error && (
              <p className="flex items-center gap-2 text-xs text-red-300">
                <AlertTriangle className="h-3.5 w-3.5" />
                {error}
              </p>
            )}

            {result && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-3 rounded-xl border border-white/[0.08] bg-white/[0.02] p-4"
              >
                <div className="flex flex-wrap items-center gap-2">
                  <span
                    className={`inline-flex rounded border px-2 py-0.5 text-xs font-semibold ${verdictStyles[result.verdict]}`}
                  >
                    {result.verdict}
                  </span>
                  <span className="text-xs text-zinc-500">Scanned at {result.scannedAt}</span>
                </div>
                <p className="break-all font-mono text-xs text-zinc-300">{result.url}</p>

                <div className="space-y-1">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-zinc-500">Risk score</span>
                    <span className="font-semibold text-white">{result.score}/100</span>
                  </div>
                  <div className="h-2 overflow-hidden rounded-full bg-white/[0.08]">
                    <div
                      className={`h-full ${getRiskBarClass(result.score)}`}
                      style={{ width: `${result.score}%` }}
                    />
                  </div>
                </div>

                <div>
                  <p className="mb-1 text-xs font-medium text-zinc-400">Detected indicators</p>
                  <ul className="space-y-1">
                    {result.findings.map((finding) => (
                      <li key={finding} className="text-xs text-zinc-300">
                        • {finding}
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            )}
          </div>
        </GlassCard>

        <GlassCard className="xl:col-span-2">
          <div className="border-b border-white/[0.06] px-5 py-4">
            <h2 className="text-base font-semibold text-white">Recommended Actions</h2>
            <p className="text-xs text-zinc-500">
              Operational guidance based on latest scan outcome.
            </p>
          </div>
          <div className="space-y-2 p-5 text-xs text-zinc-300">
            {[
              "Block malicious domains at DNS and secure web gateway layers.",
              "Enable isolation for links flagged as suspicious until triage completes.",
              "Alert affected users if high-risk credential-harvest patterns are detected.",
              "Forward confirmed malicious URLs to SIEM for enrichment and playbook execution.",
            ].map((item) => (
              <p key={item} className="rounded-lg border border-white/[0.06] bg-white/[0.02] p-3">
                {item}
              </p>
            ))}
          </div>
        </GlassCard>
      </div>

      <GlassCard className="overflow-hidden">
        <div className="flex items-center justify-between border-b border-white/[0.06] px-5 py-4">
          <h2 className="text-base font-semibold text-white">Recent URL Scans</h2>
          <span className="text-xs text-zinc-500">Live stream</span>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full min-w-[760px] text-left text-sm">
            <thead>
              <tr className="border-b border-white/[0.06] bg-white/[0.02]">
                {["Scan ID", "URL", "Risk Score", "Verdict", "Timestamp"].map((heading) => (
                  <th
                    key={heading}
                    className="px-5 py-3 text-[11px] font-semibold tracking-wide text-zinc-500 uppercase"
                  >
                    {heading}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {recentScans.map((scan) => (
                <tr
                  key={scan.id}
                  className="border-b border-white/[0.05] text-zinc-300 transition-colors hover:bg-white/[0.02]"
                >
                  <td className="px-5 py-3 font-mono text-xs text-cyan-300">{scan.id}</td>
                  <td className="px-5 py-3 font-mono text-xs">{scan.url}</td>
                  <td className="px-5 py-3 text-xs font-semibold text-white">{scan.score}</td>
                  <td className="px-5 py-3">
                    <span
                      className={`inline-flex rounded border px-2 py-0.5 text-[11px] font-semibold ${verdictStyles[scan.verdict]}`}
                    >
                      {scan.verdict}
                    </span>
                  </td>
                  <td className="px-5 py-3 text-xs text-zinc-500">{scan.timestamp}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </GlassCard>

      <div className="flex items-center gap-2 rounded-lg border border-emerald-500/20 bg-emerald-500/[0.06] px-4 py-3 text-xs text-emerald-300">
        <CheckCircle2 className="h-4 w-4" />
        Scanner engine healthy. Threat signature feed updated 27 seconds ago.
      </div>
    </div>
  );
}
