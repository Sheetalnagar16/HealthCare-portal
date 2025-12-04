export type UserRole = "PATIENT" | "PROVIDER";

export interface User {
  id: string;
  email: string;
  name: string;
  role: UserRole;
  age?: number;
  gender?: string;
  allergies?: string;
  medications?: string;
  consent: boolean;
  created_at: string;
  updated_at: string;
}

export interface WellnessGoal {
  id: string;
  patient_id: string;
  date: string;
  steps: number;
  sleep_hours: number;
  water_glasses: number;
  active_minutes?: number;
  created_at: string;
}

export interface Reminder {
  id: string;
  patient_id: string;
  title: string;
  description: string;
  due_date: string;
  is_completed: boolean;
  created_at: string;
}

export interface PatientDashboard {
  today_goals: WellnessGoal | null;
  reminders: Reminder[];
  health_tip: string;
}

export interface PatientSummary {
  id: string;
  name: string;
  last_goal_date: string;
  last_steps: number;
  last_sleep_hours: number;
  compliance_status: "good" | "warning" | "critical";
}

export interface PatientDetail {
  profile: User;
  recent_goals: WellnessGoal[];
  reminders: Reminder[];
}

export interface HealthInfo {
  id: string;
  title: string;
  description: string;
  category: string;
}

export interface AuthTokens {
  access: string;
  refresh: string;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterData {
  name: string;
  email: string;
  password: string;
  role: UserRole;
  consent: boolean;
}

export interface GoalFormData {
  steps: number;
  sleep_hours: number;
  water_glasses: number;
  active_minutes?: number;
}

export interface ProfileUpdateData {
  name?: string;
  age?: number;
  gender?: string;
  allergies?: string;
  medications?: string;
}
