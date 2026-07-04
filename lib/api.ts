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

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL ?? "http://127.0.0.1:8001";

const TOKEN_KEY = "phishguard_token";

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
  auth?: boolean;
}

async function request<T>(path: string, options: RequestOptions = {}): Promise<T> {
  const { method = "GET", body, auth = false } = options;

  const headers: Record<string, string> = {
    "Content-Type": "application/json",
  };

  if (auth) {
    const token = tokenStore.get();
    if (!token) {
      throw new ApiError("Not authenticated - no token found", 401);
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
      // response wasn't JSON - keep statusText
    }
    throw new ApiError(
      typeof detail === "string" ? detail : JSON.stringify(detail),
      res.status
    );
  }

  const text = await res.text();
  return text ? JSON.parse(text) : (undefined as T);
}

export interface ReportRecord {
  id: number;
  report_type: string;
  created_at: string;
  user_id: number;
  scan_id: number;
  details: string;
}

export interface AdminUser {
  id: number;
  name: string;
  email: string;
  role: string;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

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

    scanText: (data: { text: string }) =>
      request<ScanResult>("/api/v1/scans/text", {
        method: "POST",
        body: data,
        auth: true,
      }),

    explain: (scanId: number) =>
      request<{ threats: string[]; summary: string }>(`/api/v1/scans/${scanId}/explain`, {
        auth: true,
      }),
  },

  users: {
    me: () =>
      request<{ id: number; name: string; email: string; role: string }>("/api/v1/users/me", {
        auth: true,
      }),
  },

  reports: {
    generate: (scanId: number) =>
      request<ReportRecord>(`/api/v1/reports/generate/${scanId}`, {
        method: "POST",
        auth: true,
      }),

    list: () =>
      request<ReportRecord[]>("/api/v1/reports", { auth: true }),

    exportPdf: async (reportId: number) => {
      const token = tokenStore.get();
      const res = await fetch(`${API_BASE_URL}/api/v1/reports/export/pdf/${reportId}`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (!res.ok) throw new Error("Failed to export PDF");
      return res.blob();
    },

    exportCsv: async (reportId: number) => {
      const token = tokenStore.get();
      const res = await fetch(`${API_BASE_URL}/api/v1/reports/export/csv/${reportId}`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (!res.ok) throw new Error("Failed to export CSV");
      return res.blob();
    },
  },

  admin: {
    listUsers: () =>
      request<AdminUser[]>("/api/v1/admin/users", { auth: true }),
    listScans: () =>
      request<ScanResult[]>("/api/v1/admin/scans", { auth: true }),
    listReports: () =>
      request<ReportRecord[]>("/api/v1/admin/reports", { auth: true }),
    listActivities: () =>
      request<any[]>("/api/v1/admin/activities", { auth: true }),
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

  copilot: {
    chat: (message: string, history: { role: "user" | "assistant"; text: string }[]) =>
      request<{ response: string }>("/api/v1/copilot/chat", {
        method: "POST",
        body: { message, history },
        auth: true,
      }),
  },
};