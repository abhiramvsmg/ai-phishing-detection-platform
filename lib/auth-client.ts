import { api } from "@/lib/api";

export type AuthUser = {
  id: string;
  fullName: string;
  email: string;
  company: string;
  role: string;
  password?: string;
};

export type AuthSession = {
  userId: string;
  fullName: string;
  email: string;
  company: string;
  role: string;
};

const USERS_KEY = "sentinel.users";
const SESSION_KEY = "sentinel.session";
const AUTH_EVENT = "sentinel.auth-change";

const normalizeEmail = (email: string) => email.trim().toLowerCase();

let cachedSessionRaw: string | null = null;
let cachedSession: AuthSession | null = null;

const demoUser: AuthUser = {
  id: "demo-admin",
  fullName: "Security Admin",
  email: "admin@sentinel.test",
  company: "Enterprise",
  role: "ADMIN",
  password: "Password123",
};

const canUseStorage = () => typeof window !== "undefined" && Boolean(window.localStorage);

const readUsers = (): AuthUser[] => {
  if (!canUseStorage()) {
    return [];
  }

  const savedUsers = window.localStorage.getItem(USERS_KEY);

  if (!savedUsers) {
    window.localStorage.setItem(USERS_KEY, JSON.stringify([demoUser]));
    return [demoUser];
  }

  try {
    const users = JSON.parse(savedUsers) as AuthUser[];
    const hasDemoUser = users.some((user) => normalizeEmail(user.email) === demoUser.email);

    if (hasDemoUser) {
      return users;
    }

    const nextUsers = [demoUser, ...users];
    window.localStorage.setItem(USERS_KEY, JSON.stringify(nextUsers));
    return nextUsers;
  } catch {
    window.localStorage.setItem(USERS_KEY, JSON.stringify([demoUser]));
    return [demoUser];
  }
};

const writeUsers = (users: AuthUser[]) => {
  window.localStorage.setItem(USERS_KEY, JSON.stringify(users));
};

const notifyAuthChange = () => {
  window.dispatchEvent(new Event(AUTH_EVENT));
};

const setCachedSession = (session: AuthSession | null) => {
  cachedSession = session;
  cachedSessionRaw = session ? JSON.stringify(session) : null;
};

const createSession = (user: AuthUser): AuthSession => {
  const session = {
    userId: user.id,
    fullName: user.fullName,
    email: normalizeEmail(user.email),
    company: user.company,
    role: user.role,
  };

  setCachedSession(session);
  window.localStorage.setItem(SESSION_KEY, cachedSessionRaw ?? "");
  notifyAuthChange();
  return session;
};

export const getSession = (): AuthSession | null => {
  if (!canUseStorage()) {
    return null;
  }

  const savedSession = window.localStorage.getItem(SESSION_KEY);

  if (savedSession === cachedSessionRaw) {
    return cachedSession;
  }

  if (!savedSession) {
    setCachedSession(null);
    return null;
  }

  try {
    cachedSession = JSON.parse(savedSession) as AuthSession;
    cachedSessionRaw = savedSession;
    return cachedSession;
  } catch {
    setCachedSession(null);
    return null;
  }
};

export const registerUser = async (details: {
  fullName: string;
  email: string;
  company: string;
  password: string;
}) => {
  const email = normalizeEmail(details.email);

  try {
    await api.auth.register({
      name: details.fullName.trim(),
      email,
      password: details.password,
    });
  } catch (err) {
    return {
      ok: false,
      message: err instanceof Error ? err.message : "Could not create account.",
    };
  }

  let role = "USER";
  let fullName = details.fullName.trim();
  let userId = email;

  try {
    await api.auth.login({ email, password: details.password });
    const profile = await api.users.me();
    role = profile.role;
    fullName = profile.name;
    userId = String(profile.id);
  } catch {
    // Registered but auto-login failed - not fatal
  }

  const user: AuthUser = {
    id: userId,
    fullName,
    email,
    company: details.company.trim(),
    role,
    password: details.password,
  };

  const users = readUsers();
  writeUsers([...users, user]);
  createSession(user);

  return { ok: true, message: "Account created." };
};

export const signInUser = async (email: string, password: string) => {
  try {
    await api.auth.login({ email, password });
  } catch (err) {
    return {
      ok: false,
      message: err instanceof Error ? err.message : "Email or password is incorrect.",
    };
  }

  let role = "USER";
  let fullName = email.split("@")[0];
  let userId = email;

  try {
    const profile = await api.users.me();
    role = profile.role;
    fullName = profile.name;
    userId = String(profile.id);
  } catch (err) {
    console.error("Failed to load user profile", err);
  }

  const user: AuthUser = {
    id: userId,
    fullName,
    email,
    company: "",
    role,
    password,
  };
  createSession(user);

  return { ok: true, message: "Signed in." };
};

export const signOutUser = () => {
  if (canUseStorage()) {
    setCachedSession(null);
    window.localStorage.removeItem(SESSION_KEY);
    notifyAuthChange();
  }
};

export const subscribeToAuth = (onStoreChange: () => void) => {
  if (!canUseStorage()) {
    return () => {};
  }

  const handleStorage = (event: StorageEvent) => {
    if (event.key === SESSION_KEY || event.key === USERS_KEY) {
      onStoreChange();
    }
  };

  window.addEventListener(AUTH_EVENT, onStoreChange);
  window.addEventListener("storage", handleStorage);

  return () => {
    window.removeEventListener(AUTH_EVENT, onStoreChange);
    window.removeEventListener("storage", handleStorage);
  };
};