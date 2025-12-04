import { User, WellnessGoal, Reminder, HealthInfo, PatientSummary } from "@/types";

// Mock Users
export const mockUsers: User[] = [
  {
    id: "1",
    email: "patient@demo.com",
    name: "Sarah Johnson",
    role: "PATIENT",
    age: 32,
    gender: "Female",
    allergies: "Penicillin",
    medications: "None",
    consent: true,
    created_at: "2024-01-15T10:00:00Z",
    updated_at: "2024-01-15T10:00:00Z",
  },
  {
    id: "2",
    email: "provider@demo.com",
    name: "Dr. Michael Chen",
    role: "PROVIDER",
    consent: true,
    created_at: "2024-01-10T08:00:00Z",
    updated_at: "2024-01-10T08:00:00Z",
  },
  {
    id: "3",
    email: "john@demo.com",
    name: "John Smith",
    role: "PATIENT",
    age: 45,
    gender: "Male",
    allergies: "None",
    medications: "Metformin",
    consent: true,
    created_at: "2024-02-01T10:00:00Z",
    updated_at: "2024-02-01T10:00:00Z",
  },
];

// Mock Wellness Goals
export const mockGoals: WellnessGoal[] = [
  {
    id: "g1",
    patient_id: "1",
    date: new Date().toISOString().split("T")[0],
    steps: 8500,
    sleep_hours: 7.5,
    water_glasses: 8,
    active_minutes: 45,
    created_at: new Date().toISOString(),
  },
  {
    id: "g2",
    patient_id: "1",
    date: new Date(Date.now() - 86400000).toISOString().split("T")[0],
    steps: 10200,
    sleep_hours: 8,
    water_glasses: 10,
    active_minutes: 60,
    created_at: new Date(Date.now() - 86400000).toISOString(),
  },
  {
    id: "g3",
    patient_id: "1",
    date: new Date(Date.now() - 172800000).toISOString().split("T")[0],
    steps: 6000,
    sleep_hours: 6,
    water_glasses: 6,
    active_minutes: 30,
    created_at: new Date(Date.now() - 172800000).toISOString(),
  },
  {
    id: "g4",
    patient_id: "3",
    date: new Date().toISOString().split("T")[0],
    steps: 5000,
    sleep_hours: 6,
    water_glasses: 5,
    active_minutes: 20,
    created_at: new Date().toISOString(),
  },
];

// Mock Reminders
export const mockReminders: Reminder[] = [
  {
    id: "r1",
    patient_id: "1",
    title: "Annual Physical Exam",
    description: "Schedule your yearly check-up with Dr. Chen",
    due_date: new Date(Date.now() + 604800000).toISOString().split("T")[0],
    is_completed: false,
    created_at: new Date().toISOString(),
  },
  {
    id: "r2",
    patient_id: "1",
    title: "Flu Vaccination",
    description: "Get your seasonal flu shot",
    due_date: new Date(Date.now() + 1209600000).toISOString().split("T")[0],
    is_completed: false,
    created_at: new Date().toISOString(),
  },
  {
    id: "r3",
    patient_id: "1",
    title: "Blood Pressure Check",
    description: "Monthly blood pressure monitoring",
    due_date: new Date(Date.now() + 259200000).toISOString().split("T")[0],
    is_completed: false,
    created_at: new Date().toISOString(),
  },
  {
    id: "r4",
    patient_id: "3",
    title: "Diabetes Screening",
    description: "Quarterly HbA1c test",
    due_date: new Date(Date.now() + 864000000).toISOString().split("T")[0],
    is_completed: false,
    created_at: new Date().toISOString(),
  },
];

// Mock Health Info
export const mockHealthInfo: HealthInfo[] = [
  {
    id: "h1",
    title: "Stay Active Daily",
    description: "Aim for at least 30 minutes of moderate exercise each day. Walking, swimming, or cycling are excellent choices for maintaining cardiovascular health.",
    category: "lifestyle",
  },
  {
    id: "h2",
    title: "Get Your Flu Shot",
    description: "Annual flu vaccination is recommended for everyone 6 months and older. It's the best protection against seasonal influenza.",
    category: "flu",
  },
  {
    id: "h3",
    title: "Prioritize Sleep",
    description: "Adults need 7-9 hours of quality sleep per night. Good sleep improves immune function, memory, and overall well-being.",
    category: "lifestyle",
  },
  {
    id: "h4",
    title: "Mental Health Matters",
    description: "Take time for self-care activities. Practice mindfulness, stay connected with loved ones, and don't hesitate to seek professional help when needed.",
    category: "mental health",
  },
  {
    id: "h5",
    title: "Stay Hydrated",
    description: "Drink at least 8 glasses of water daily. Proper hydration supports digestion, skin health, and cognitive function.",
    category: "lifestyle",
  },
  {
    id: "h6",
    title: "Regular Health Screenings",
    description: "Schedule regular check-ups and age-appropriate screenings. Early detection is key to preventing serious health conditions.",
    category: "preventive care",
  },
];

// Mock Patient Summaries for Provider Dashboard
export const mockPatientSummaries: PatientSummary[] = [
  {
    id: "1",
    name: "Sarah Johnson",
    last_goal_date: new Date().toISOString().split("T")[0],
    last_steps: 8500,
    last_sleep_hours: 7.5,
    compliance_status: "good",
  },
  {
    id: "3",
    name: "John Smith",
    last_goal_date: new Date().toISOString().split("T")[0],
    last_steps: 5000,
    last_sleep_hours: 6,
    compliance_status: "warning",
  },
];

// Health Tips
export const healthTips = [
  "Take a 5-minute stretch break every hour to improve circulation and reduce muscle tension.",
  "Try to include a variety of colorful vegetables in your meals for optimal nutrition.",
  "Practice deep breathing exercises for 5 minutes daily to reduce stress levels.",
  "Set a consistent bedtime and wake-up time to improve your sleep quality.",
  "Replace one sugary drink with water today for better hydration and health.",
];

export const getRandomHealthTip = () => {
  return healthTips[Math.floor(Math.random() * healthTips.length)];
};

export const privacyPolicyText = `
# Privacy Policy

Last updated: December 2024

## Introduction

HealthWell ("we", "our", or "us") is committed to protecting your personal information and your right to privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our preventive healthcare and wellness portal.

## Information We Collect

We collect information that you provide directly to us, including:
- Personal identification information (name, email address, age, gender)
- Health-related information (wellness goals, medications, allergies)
- Usage data and preferences

## How We Use Your Information

We use the information we collect to:
- Provide and maintain our wellness tracking services
- Personalize your experience and health recommendations
- Communicate with you about your health goals and reminders
- Improve our services and develop new features

## Data Security

We implement appropriate technical and organizational security measures to protect your personal information. However, no method of transmission over the Internet is 100% secure.

## Your Rights

You have the right to:
- Access your personal data
- Correct inaccurate data
- Request deletion of your data
- Withdraw consent at any time

## Contact Us

If you have questions about this Privacy Policy, please contact us at privacy@healthwell.com.
`;
