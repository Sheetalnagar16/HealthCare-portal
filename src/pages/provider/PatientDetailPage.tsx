import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { providerApi } from "@/services/api";
import { PatientDetail } from "@/types";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, User, Mail, Calendar, Footprints, Moon, Droplets, Timer, Bell } from "lucide-react";

const PatientDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const [patient, setPatient] = useState<PatientDetail | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadPatient = async () => {
      if (!id) return;
      try {
        const data = await providerApi.getPatientDetail(id);
        setPatient(data);
      } catch (error) {
        console.error("Failed to load patient:", error);
      } finally {
        setIsLoading(false);
      }
    };
    loadPatient();
  }, [id]);

  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString("en-US", {
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

  if (!patient) {
    return (
      <div className="container py-8">
        <div className="text-center py-12">
          <p className="text-muted-foreground">Patient not found</p>
          <Button variant="outline" asChild className="mt-4">
            <Link to="/provider/dashboard">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Dashboard
            </Link>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="container py-8 space-y-8">
      {/* Back Button */}
      <Button variant="ghost" asChild className="animate-fade-in">
        <Link to="/provider/dashboard">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Dashboard
        </Link>
      </Button>

      {/* Patient Header */}
      <Card className="animate-slide-up">
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row md:items-center gap-6">
            <div className="p-4 rounded-2xl bg-accent shrink-0">
              <User className="h-12 w-12 text-primary" />
            </div>
            <div className="flex-1 space-y-2">
              <h1 className="text-2xl font-bold text-foreground">{patient.profile.name}</h1>
              <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                <span className="flex items-center gap-1">
                  <Mail className="h-4 w-4" />
                  {patient.profile.email}
                </span>
                {patient.profile.age && (
                  <span className="flex items-center gap-1">
                    <Calendar className="h-4 w-4" />
                    {patient.profile.age} years old
                  </span>
                )}
                {patient.profile.gender && <span>{patient.profile.gender}</span>}
              </div>
            </div>
          </div>

          {/* Health Details */}
          {(patient.profile.allergies || patient.profile.medications) && (
            <div className="mt-6 pt-6 border-t grid md:grid-cols-2 gap-4">
              {patient.profile.allergies && (
                <div>
                  <p className="text-sm font-medium text-foreground">Known Allergies</p>
                  <p className="text-sm text-muted-foreground mt-1">{patient.profile.allergies}</p>
                </div>
              )}
              {patient.profile.medications && (
                <div>
                  <p className="text-sm font-medium text-foreground">Current Medications</p>
                  <p className="text-sm text-muted-foreground mt-1">{patient.profile.medications}</p>
                </div>
              )}
            </div>
          )}
        </CardContent>
      </Card>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Recent Goals */}
        <Card className="animate-slide-up" style={{ animationDelay: "0.1s" }}>
          <CardHeader>
            <CardTitle>Recent Wellness Goals</CardTitle>
            <CardDescription>Last 7 days of wellness tracking</CardDescription>
          </CardHeader>
          <CardContent>
            {patient.recent_goals.length === 0 ? (
              <p className="text-center py-8 text-muted-foreground">
                No goals logged recently
              </p>
            ) : (
              <div className="space-y-3">
                {patient.recent_goals.map((goal) => (
                  <div key={goal.id} className="p-4 rounded-lg bg-muted/50 border">
                    <p className="font-medium text-foreground mb-2">{formatDate(goal.date)}</p>
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

        {/* Reminders */}
        <Card className="animate-slide-up" style={{ animationDelay: "0.2s" }}>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Bell className="h-5 w-5 text-primary" />
              Reminders
            </CardTitle>
            <CardDescription>Upcoming preventive care reminders</CardDescription>
          </CardHeader>
          <CardContent>
            {patient.reminders.length === 0 ? (
              <p className="text-center py-8 text-muted-foreground">
                No reminders scheduled
              </p>
            ) : (
              <div className="space-y-3">
                {patient.reminders.map((reminder) => (
                  <div
                    key={reminder.id}
                    className={`p-4 rounded-lg border ${
                      reminder.is_completed
                        ? "bg-muted/30 opacity-60"
                        : "bg-muted/50"
                    }`}
                  >
                    <div className="flex items-start justify-between">
                      <div className="space-y-1">
                        <p className="font-medium text-foreground">{reminder.title}</p>
                        <p className="text-sm text-muted-foreground">{reminder.description}</p>
                      </div>
                      <span className="text-xs text-muted-foreground whitespace-nowrap">
                        {formatDate(reminder.due_date)}
                      </span>
                    </div>
                    {reminder.is_completed && (
                      <span className="inline-block mt-2 text-xs text-success">Completed</span>
                    )}
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

export default PatientDetailPage;
