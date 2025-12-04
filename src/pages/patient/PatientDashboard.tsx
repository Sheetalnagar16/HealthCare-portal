import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { patientApi } from "@/services/api";
import { PatientDashboard as DashboardData } from "@/types";
import { Button } from "@/components/ui/button";
import { StatCard } from "@/components/dashboard/StatCard";
import { ReminderCard } from "@/components/dashboard/ReminderCard";
import { HealthTipCard } from "@/components/dashboard/HealthTipCard";
import { Footprints, Moon, Droplets, Timer, Plus, User } from "lucide-react";

const PatientDashboard = () => {
  const { user } = useAuth();
  const [dashboard, setDashboard] = useState<DashboardData | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadDashboard = async () => {
      if (!user) return;
      try {
        const data = await patientApi.getDashboard(user.id);
        setDashboard(data);
      } catch (error) {
        console.error("Failed to load dashboard:", error);
      } finally {
        setIsLoading(false);
      }
    };
    loadDashboard();
  }, [user]);

  if (isLoading) {
    return (
      <div className="container py-8">
        <div className="animate-pulse space-y-6">
          <div className="h-8 bg-muted rounded w-48"></div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="h-32 bg-muted rounded-xl"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  const todayGoals = dashboard?.today_goals;

  return (
    <div className="container py-8 space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 animate-fade-in">
        <div>
          <h1 className="text-3xl font-bold text-foreground">
            Welcome back, {user?.name?.split(" ")[0]}!
          </h1>
          <p className="text-muted-foreground mt-1">
            Here's your wellness overview for today
          </p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline" asChild>
            <Link to="/patient/profile">
              <User className="h-4 w-4 mr-2" />
              Profile
            </Link>
          </Button>
          <Button asChild>
            <Link to="/patient/goals">
              <Plus className="h-4 w-4 mr-2" />
              Log Goals
            </Link>
          </Button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <StatCard
          title="Steps Today"
          value={todayGoals?.steps?.toLocaleString() ?? "—"}
          subtitle="Goal: 10,000"
          icon={Footprints}
          iconColor="text-success"
        />
        <StatCard
          title="Sleep Hours"
          value={todayGoals?.sleep_hours ?? "—"}
          subtitle="Goal: 8 hours"
          icon={Moon}
          iconColor="text-info"
        />
        <StatCard
          title="Water Glasses"
          value={todayGoals?.water_glasses ?? "—"}
          subtitle="Goal: 8 glasses"
          icon={Droplets}
          iconColor="text-primary"
        />
        <StatCard
          title="Active Minutes"
          value={todayGoals?.active_minutes ?? "—"}
          subtitle="Goal: 30 min"
          icon={Timer}
          iconColor="text-warning"
        />
      </div>

      {/* Not logged notice */}
      {!todayGoals && (
        <div className="p-6 rounded-xl bg-accent/50 border border-primary/20 text-center animate-slide-up">
          <p className="text-foreground font-medium mb-2">You haven't logged today's goals yet</p>
          <p className="text-sm text-muted-foreground mb-4">
            Track your progress to build healthy habits
          </p>
          <Button asChild>
            <Link to="/patient/goals">
              <Plus className="h-4 w-4 mr-2" />
              Log Today's Goals
            </Link>
          </Button>
        </div>
      )}

      {/* Bottom Grid */}
      <div className="grid md:grid-cols-2 gap-6">
        <ReminderCard reminders={dashboard?.reminders ?? []} />
        <HealthTipCard tip={dashboard?.health_tip ?? ""} />
      </div>
    </div>
  );
};

export default PatientDashboard;
