/**
 * Types mirroring the real FastAPI backend response shapes.
 * Verified directly against /docs (Swagger) responses — keep
 * these in sync if a teammate changes a router's response_model.
 */

export type RiskLevelApi = "LOW" | "MEDIUM" | "HIGH" | "CRITICAL";
export type ScanResultApi = "SAFE" | "PHISHING";
export type ScanTypeApi = "URL" | "EMAIL" | "TEXT";

export interface RegisterRequest {
  name: string;
  email: string;
  password: string;
}

export interface RegisterResponse {
  message: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse {
  access_token: string;
  token_type: "bearer";
}

export interface ScanRequest {
  url: string;
}

export interface ScanResult {
  id: number;
  scan_type: ScanTypeApi;
  content: string;
  result: ScanResultApi;
  risk_score: number;
  risk_level: RiskLevelApi;
  created_at: string;
  user_id?: number;
  updated_at?: string;
}

export interface DashboardStats {
  total_scans: number;
  safe_scans: number;
  phishing_scans: number;
  high_risk_scans: number;
}

export interface RiskDistribution {
  LOW: number;
  MEDIUM: number;
  HIGH: number;
  CRITICAL: number;
}

export class ApiError extends Error {
  status: number;
  constructor(message: string, status: number) {
    super(message);
    this.status = status;
    this.name = "ApiError";
  }
}