// API Configuration
// Update this URL to point to your Django backend
export const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:8000";

export const API_ENDPOINTS = {
  // Auth
  register: `${API_BASE_URL}/api/auth/register/`,
  login: `${API_BASE_URL}/api/auth/login/`,
  me: `${API_BASE_URL}/api/auth/me/`,
  
  // Patient
  patientDashboard: `${API_BASE_URL}/api/patient/dashboard/`,
  patientGoals: `${API_BASE_URL}/api/patient/goals/`,
  patientGoalsHistory: `${API_BASE_URL}/api/patient/goals/history/`,
  patientProfile: `${API_BASE_URL}/api/patient/profile/`,
  
  // Provider
  providerPatients: `${API_BASE_URL}/api/provider/patients/`,
  providerPatientDetail: (id: string) => `${API_BASE_URL}/api/provider/patients/${id}/`,
  
  // Public
  healthInfo: `${API_BASE_URL}/api/public/health-info/`,
  privacyPolicy: `${API_BASE_URL}/api/public/privacy-policy/`,
};
