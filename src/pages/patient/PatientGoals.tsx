import { useEffect, useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { WellnessGoal, GoalFormData } from "@/types";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { toast } from "@/hooks/use-toast";
import { Footprints, Moon, Droplets, Timer, Save, History } from "lucide-react";

// ⭐ use our Django API helpers instead of patientApi
import { getRecentGoals, saveDailyGoal } from "@/api/goals";


const PatientGoals = () => {
  const { user } = useAuth();

  const [goals, setGoals] = useState<WellnessGoal[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);

  // Form state
  const [formData, setFormData] = useState<GoalFormData>({
    steps: 0,
    sleep_hours: 0,
    water_glasses: 0,
    active_minutes: 0,
  });

  // 🔁 Load last 7 days from Django when page mounts
  useEffect(() => {
    const loadGoals = async () => {
      if (!user) {
        setIsLoading(false);
        return;
      }

      try {
        const res = await getRecentGoals();
        const data = res.data;
        setGoals(data);

        // Pre-fill today’s form if today already exists
        const today = new Date();
        const todayStr = today.toISOString().split("T")[0];
        const todayGoal = data.find((g) => g.date === todayStr);

        if (todayGoal) {
          setFormData({
            steps: todayGoal.steps,
            sleep_hours: todayGoal.sleep_hours,
            water_glasses: todayGoal.water_glasses,
            active_minutes: todayGoal.active_minutes ?? 0,
          });
        }
      } catch (error) {
        console.error("Failed to load goals:", error);
      } finally {
        setIsLoading(false);
      }
    };

    loadGoals();
  }, [user]);

  // 💾 Save today's goals to Django
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;

    setIsSaving(true);

    try {
      const todayStr = new Date().toISOString().split("T")[0];

      const res = await saveDailyGoal({
        date: todayStr,
        ...formData,
      });

      const newGoal = res.data;

      // Update local list: replace today's goal if exists, else prepend
      setGoals((prev) => {
        const filtered = prev.filter((g) => g.date !== todayStr);
        return [newGoal, ...filtered].sort(
          (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
        );
      });

      toast({
        title: "Goals saved!",
        description: "Your wellness goals for today have been recorded.",
      });
    } catch (error) {
      console.error(error);
      toast({
        title: "Error",
        description: "Failed to save goals. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSaving(false);
    }
  };

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const goalDate = new Date(dateStr);
    goalDate.setHours(0, 0, 0, 0);

    if (goalDate.getTime() === today.getTime()) {
      return "Today";
    }

    const yesterday = new Date(today.getTime() - 24 * 60 * 60 * 1000);
    if (goalDate.getTime() === yesterday.getTime()) {
      return "Yesterday";
    }

    return date.toLocaleDateString("en-US", {
      weekday: "short",
      month: "short",
      day: "numeric",
    });
  };

  if (isLoading) {
    return (
      <div className="container py-8">
        <div className="animate-pulse space-y-6">
          <div className="h-8 bg-muted rounded w-48"></div>
          <div className="h-64 bg-muted rounded-xl"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="container py-8 space-y-8">
      {/* Header */}
      <div className="animate-fade-in">
        <h1 className="text-3xl font-bold text-foreground">Wellness Goals</h1>
        <p className="text-muted-foreground mt-1">
          Log your daily wellness activities and track your progress
        </p>
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        {/* Log Form */}
        <Card className="animate-slide-up">
          <CardHeader>
            <CardTitle>Log Today&apos;s Goals</CardTitle>
            <CardDescription>
              Record your wellness activities for{" "}
              {new Date().toLocaleDateString("en-US", {
                weekday: "long",
                month: "long",
                day: "numeric",
              })}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="steps" className="flex items-center gap-2">
                  <Footprints className="h-4 w-4 text-success" />
                  Steps
                </Label>
                <Input
                  id="steps"
                  type="number"
                  min="0"
                  max="100000"
                  value={formData.steps}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      steps: parseInt(e.target.value) || 0,
                    })
                  }
                  placeholder="0"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="sleep" className="flex items-center gap-2">
                  <Moon className="h-4 w-4 text-info" />
                  Sleep Hours
                </Label>
                <Input
                  id="sleep"
                  type="number"
                  min="0"
                  max="24"
                  step="0.5"
                  value={formData.sleep_hours}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      sleep_hours: parseFloat(e.target.value) || 0,
                    })
                  }
                  placeholder="0"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="water" className="flex items-center gap-2">
                  <Droplets className="h-4 w-4 text-primary" />
                  Water Glasses
                </Label>
                <Input
                  id="water"
                  type="number"
                  min="0"
                  max="50"
                  value={formData.water_glasses}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      water_glasses: parseInt(e.target.value) || 0,
                    })
                  }
                  placeholder="0"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="active" className="flex items-center gap-2">
                  <Timer className="h-4 w-4 text-warning" />
                  Active Minutes
                </Label>
                <Input
                  id="active"
                  type="number"
                  min="0"
                  max="1440"
                  value={formData.active_minutes}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      active_minutes: parseInt(e.target.value) || 0,
                    })
                  }
                  placeholder="0"
                />
              </div>

              <Button type="submit" className="w-full" size="lg" disabled={isSaving}>
                {isSaving ? (
                  <span className="animate-pulse">Saving...</span>
                ) : (
                  <>
                    <Save className="h-4 w-4 mr-2" />
                    Save Goals
                  </>
                )}
              </Button>
            </form>
          </CardContent>
        </Card>

        {/* History */}
        <Card className="animate-slide-up" style={{ animationDelay: "0.1s" }}>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <History className="h-5 w-5 text-primary" />
              Recent History
            </CardTitle>
            <CardDescription>Your wellness log for the past 7 days</CardDescription>
          </CardHeader>
          <CardContent>
            {goals.length === 0 ? (
              <div className="text-center py-8 text-muted-foreground">
                <p>No goals logged yet</p>
                <p className="text-sm">Start tracking your wellness today!</p>
              </div>
            ) : (
              <div className="space-y-3">
                {goals.map((goal) => (
                  <div
                    key={goal.id}
                    className="p-4 rounded-lg bg-muted/50 border hover:bg-muted/70 transition-colors"
                  >
                    <p className="font-medium text-foreground mb-2">
                      {formatDate(goal.date)}
                    </p>
                    <div className="grid grid-cols-2 gap-2 text-sm">
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <Footprints className="h-3 w-3 text-success" />
                        {goal.steps.toLocaleString()} steps
                      </div>
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <Moon className="h-3 w-3 text-info" />
                        {goal.sleep_hours}h sleep
                      </div>
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <Droplets className="h-3 w-3 text-primary" />
                        {goal.water_glasses} glasses
                      </div>
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <Timer className="h-3 w-3 text-warning" />
                        {goal.active_minutes ?? 0} min active
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default PatientGoals;
