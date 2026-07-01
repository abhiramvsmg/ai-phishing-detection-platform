import {
  RegisterRequest,
  RegisterResponse,
  LoginRequest,
  LoginResponse,
  ScanRequest,
  ScanResult,
  DashboardStats,
  RiskDistribution,
  ApiError,
} from "@/lib/types";

/**
 * Base URL for the FastAPI backend.
 *
 * IMPORTANT: this is 8001, not 8000 — Splunk's daemon (splunkd)
 * occupies port 8000 on this machine, so the backend is run with
 * `uvicorn main:app --reload --port 8001`. If a teammate's machine
 * doesn't have that conflict, they'd run on 8000 and need to
 * override this via NEXT_PUBLIC_API_BASE_URL in .env.local instead
 * of changing this file.
 */
const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL ?? "http://127.0.0.1:8001";

const TOKEN_KEY = "phishguard_token";

/**
 * Token storage. Plain localStorage for now — fine for local dev
 * and a student project. If this ships to real users, move to an
 * httpOnly cookie set by a Next.js route handler instead, since
 * localStorage tokens are readable by any script on the page (XSS
 * risk).
 */
export const tokenStore = {
  get(): string | null {
    if (typeof window === "undefined") return null;
    return localStorage.getItem(TOKEN_KEY);
  },
  set(token: string) {
    localStorage.setItem(TOKEN_KEY, token);
  },
  clear() {
    localStorage.removeItem(TOKEN_KEY);
  },
};

interface RequestOptions {
  method?: "GET" | "POST" | "PUT" | "DELETE";
  body?: unknown;
  auth?: boolean; // attach Authorization header if true
}

async function request<T>(path: string, options: RequestOptions = {}): Promise<T> {
  const { method = "GET", body, auth = false } = options;

  const headers: Record<string, string> = {
    "Content-Type": "application/json",
  };

  if (auth) {
    const token = tokenStore.get();
    if (!token) {
      throw new ApiError("Not authenticated — no token found", 401);
    }
    headers["Authorization"] = `Bearer ${token}`;
  }

  let res: Response;
  try {
    res = await fetch(`${API_BASE_URL}${path}`, {
      method,
      headers,
      body: body ? JSON.stringify(body) : undefined,
    });
  } catch {
    // fetch itself throws on network failure (server down, CORS
    // block before any response, etc.) — distinguish this from a
    // normal HTTP error status below.
    throw new ApiError(
      "Could not reach the server. Is the backend running on " + API_BASE_URL + "?",
      0
    );
  }

  if (!res.ok) {
    let detail = res.statusText;
    try {
      const errBody = await res.json();
      detail = errBody.detail ?? detail;
    } catch {
      // response wasn't JSON — keep statusText
    }
    throw new ApiError(
      typeof detail === "string" ? detail : JSON.stringify(detail),
      res.status
    );
  }

  // Some endpoints (e.g. register) return 201 with a small body;
  // guard against an empty body breaking .json()
  const text = await res.text();
  return text ? JSON.parse(text) : (undefined as T);
}

/**
 * All methods here are verified directly against the backend's
 * live Swagger /docs responses, not assumed from the README.
 */
export const api = {
  auth: {
    register: (data: RegisterRequest) =>
      request<RegisterResponse>("/api/v1/auth/register", {
        method: "POST",
        body: data,
      }),

    login: async (data: LoginRequest) => {
      const result = await request<LoginResponse>("/api/v1/auth/login", {
        method: "POST",
        body: data,
      });
      tokenStore.set(result.access_token);
      return result;
    },

    logout: () => {
      tokenStore.clear();
    },
  },

  scans: {
    scanUrl: (data: ScanRequest) =>
      request<ScanResult>("/api/v1/scans/url", {
        method: "POST",
        body: data,
        auth: true,
      }),

    scanEmail: (data: { email_text: string }) =>
      request<ScanResult>("/api/v1/scans/email", {
        method: "POST",
        body: data,
        auth: true,
      }),
  },

  dashboard: {
    stats: () =>
      request<DashboardStats>("/api/v1/dashboard/stats", { auth: true }),

    recentScans: () =>
      request<ScanResult[]>("/api/v1/dashboard/recent-scans", { auth: true }),

    riskDistribution: () =>
      request<RiskDistribution>("/api/v1/dashboard/risk-distribution", {
        auth: true,
      }),
  },
};
