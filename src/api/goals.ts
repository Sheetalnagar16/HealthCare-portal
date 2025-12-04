// src/api/goals.ts
import axios from "axios";

const api = axios.create({
  baseURL: "http://127.0.0.1:8000/api",
});

export const getRecentGoals = () => api.get("/goals/recent");
export const saveDailyGoal = (data) => api.post("/goals", data);
