import { API_ENDPOINTS } from "@/config/api";
import {
  User,
  AuthTokens,
  LoginCredentials,
  RegisterData,
  PatientDashboard,
  WellnessGoal,
  GoalFormData,
  ProfileUpdateData,
  PatientSummary,
  PatientDetail,
  HealthInfo,
} from "@/types";
import {
  mockUsers,
  mockGoals,
  mockReminders,
  mockHealthInfo,
  mockPatientSummaries,
  getRandomHealthTip,
  privacyPolicyText,
} from "./mockData";

// Simulate network delay
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

// Check if we should use mock data (when backend is not available)
const USE_MOCK = true; // Set to false when connecting to real backend

// Helper to get auth header
const getAuthHeader = () => {
  const token = localStorage.getItem("access_token");
  return token ? { Authorization: `Bearer ${token}` } : {};
};

// Generic fetch wrapper
const apiFetch = async <T>(
  url: string,
  options: RequestInit = {}
): Promise<T> => {
  const response = await fetch(url, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...getAuthHeader(),
      ...options.headers,
    },
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({ detail: "An error occurred" }));
    throw new Error(error.detail || "Request failed");
  }

  return response.json();
};

// ============ AUTH API ============

export const authApi = {
  login: async (credentials: LoginCredentials): Promise<{ tokens: AuthTokens; user: User }> => {
    if (USE_MOCK) {
      await delay(500);
      const user = mockUsers.find(u => u.email === credentials.email);
      if (!user || credentials.password !== "demo123") {
        throw new Error("Invalid email or password");
      }
      return {
        tokens: { access: "mock_access_token", refresh: "mock_refresh_token" },
        user,
      };
    }
    
    const tokens = await apiFetch<AuthTokens>(API_ENDPOINTS.login, {
      method: "POST",
      body: JSON.stringify(credentials),
    });
    
    localStorage.setItem("access_token", tokens.access);
    localStorage.setItem("refresh_token", tokens.refresh);
    
    const user = await apiFetch<User>(API_ENDPOINTS.me);
    return { tokens, user };
  },

  register: async (data: RegisterData): Promise<User> => {
    if (USE_MOCK) {
      await delay(500);
      if (mockUsers.some(u => u.email === data.email)) {
        throw new Error("Email already registered");
      }
      if (!data.consent) {
        throw new Error("You must agree to the privacy policy");
      }
      const newUser: User = {
        id: String(mockUsers.length + 1),
        email: data.email,
        name: data.name,
        role: data.role,
        consent: data.consent,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      };
      mockUsers.push(newUser);
      return newUser;
    }
    
    return apiFetch<User>(API_ENDPOINTS.register, {
      method: "POST",
      body: JSON.stringify(data),
    });
  },

  getMe: async (): Promise<User> => {
    if (USE_MOCK) {
      await delay(300);
      const userId = localStorage.getItem("user_id");
      const user = mockUsers.find(u => u.id === userId);
      if (!user) throw new Error("User not found");
      return user;
    }
    
    return apiFetch<User>(API_ENDPOINTS.me);
  },

  logout: () => {
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");
    localStorage.removeItem("user_id");
  },
};

// ============ PATIENT API ============

export const patientApi = {
  getDashboard: async (userId: string): Promise<PatientDashboard> => {
    if (USE_MOCK) {
      await delay(400);
      const today = new Date().toISOString().split("T")[0];
      const todayGoal = mockGoals.find(g => g.patient_id === userId && g.date === today);
      const reminders = mockReminders.filter(r => r.patient_id === userId && !r.is_completed);
      return {
        today_goals: todayGoal || null,
        reminders,
        health_tip: getRandomHealthTip(),
      };
    }
    
    return apiFetch<PatientDashboard>(API_ENDPOINTS.patientDashboard);
  },

  getGoals: async (userId: string): Promise<WellnessGoal[]> => {
    if (USE_MOCK) {
      await delay(300);
      return mockGoals.filter(g => g.patient_id === userId).sort((a, b) => 
        new Date(b.date).getTime() - new Date(a.date).getTime()
      );
    }
    
    return apiFetch<WellnessGoal[]>(API_ENDPOINTS.patientGoals);
  },

  getGoalsHistory: async (userId: string, from: string, to: string): Promise<WellnessGoal[]> => {
    if (USE_MOCK) {
      await delay(300);
      return mockGoals.filter(g => {
        return g.patient_id === userId && g.date >= from && g.date <= to;
      }).sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
    }
    
    return apiFetch<WellnessGoal[]>(
      `${API_ENDPOINTS.patientGoalsHistory}?from=${from}&to=${to}`
    );
  },

  createGoal: async (userId: string, data: GoalFormData): Promise<WellnessGoal> => {
    if (USE_MOCK) {
      await delay(400);
      const today = new Date().toISOString().split("T")[0];
      const existingIndex = mockGoals.findIndex(g => g.patient_id === userId && g.date === today);
      
      const newGoal: WellnessGoal = {
        id: `g${Date.now()}`,
        patient_id: userId,
        date: today,
        steps: data.steps,
        sleep_hours: data.sleep_hours,
        water_glasses: data.water_glasses,
        active_minutes: data.active_minutes,
        created_at: new Date().toISOString(),
      };
      
      if (existingIndex >= 0) {
        mockGoals[existingIndex] = newGoal;
      } else {
        mockGoals.push(newGoal);
      }
      
      return newGoal;
    }
    
    return apiFetch<WellnessGoal>(API_ENDPOINTS.patientGoals, {
      method: "POST",
      body: JSON.stringify(data),
    });
  },

  getProfile: async (userId: string): Promise<User> => {
    if (USE_MOCK) {
      await delay(300);
      const user = mockUsers.find(u => u.id === userId);
      if (!user) throw new Error("User not found");
      return user;
    }
    
    return apiFetch<User>(API_ENDPOINTS.patientProfile);
  },

  updateProfile: async (userId: string, data: ProfileUpdateData): Promise<User> => {
    if (USE_MOCK) {
      await delay(400);
      const userIndex = mockUsers.findIndex(u => u.id === userId);
      if (userIndex < 0) throw new Error("User not found");
      
      mockUsers[userIndex] = {
        ...mockUsers[userIndex],
        ...data,
        updated_at: new Date().toISOString(),
      };
      
      return mockUsers[userIndex];
    }
    
    return apiFetch<User>(API_ENDPOINTS.patientProfile, {
      method: "PUT",
      body: JSON.stringify(data),
    });
  },
};

// ============ PROVIDER API ============

export const providerApi = {
  getPatients: async (): Promise<PatientSummary[]> => {
    if (USE_MOCK) {
      await delay(400);
      return mockPatientSummaries;
    }
    
    return apiFetch<PatientSummary[]>(API_ENDPOINTS.providerPatients);
  },

  getPatientDetail: async (patientId: string): Promise<PatientDetail> => {
    if (USE_MOCK) {
      await delay(400);
      const patient = mockUsers.find(u => u.id === patientId && u.role === "PATIENT");
      if (!patient) throw new Error("Patient not found");
      
      const goals = mockGoals
        .filter(g => g.patient_id === patientId)
        .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
        .slice(0, 7);
      
      const reminders = mockReminders.filter(r => r.patient_id === patientId);
      
      return {
        profile: patient,
        recent_goals: goals,
        reminders,
      };
    }
    
    return apiFetch<PatientDetail>(API_ENDPOINTS.providerPatientDetail(patientId));
  },
};

// ============ PUBLIC API ============

export const publicApi = {
  getHealthInfo: async (): Promise<HealthInfo[]> => {
    if (USE_MOCK) {
      await delay(300);
      return mockHealthInfo;
    }
    
    return apiFetch<HealthInfo[]>(API_ENDPOINTS.healthInfo);
  },

  getPrivacyPolicy: async (): Promise<string> => {
    if (USE_MOCK) {
      await delay(200);
      return privacyPolicyText;
    }
    
    return apiFetch<string>(API_ENDPOINTS.privacyPolicy);
  },
};
