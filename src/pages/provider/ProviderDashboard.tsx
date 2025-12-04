import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { providerApi } from "@/services/api";
import { PatientSummary } from "@/types";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, Eye, CheckCircle, AlertTriangle, AlertCircle } from "lucide-react";

const ProviderDashboard = () => {
  const { user } = useAuth();
  const [patients, setPatients] = useState<PatientSummary[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadPatients = async () => {
      try {
        const data = await providerApi.getPatients();
        setPatients(data);
      } catch (error) {
        console.error("Failed to load patients:", error);
      } finally {
        setIsLoading(false);
      }
    };
    loadPatients();
  }, []);

  const getComplianceIcon = (status: string) => {
    switch (status) {
      case "good":
        return <CheckCircle className="h-5 w-5 text-success" />;
      case "warning":
        return <AlertTriangle className="h-5 w-5 text-warning" />;
      case "critical":
        return <AlertCircle className="h-5 w-5 text-destructive" />;
      default:
        return null;
    }
  };

  const getComplianceLabel = (status: string) => {
    switch (status) {
      case "good":
        return "Good";
      case "warning":
        return "Needs Attention";
      case "critical":
        return "Critical";
      default:
        return "Unknown";
    }
  };

  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
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
        <h1 className="text-3xl font-bold text-foreground">Provider Dashboard</h1>
        <p className="text-muted-foreground mt-1">
          Welcome back, {user?.name}. Monitor your patients' wellness progress.
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="animate-scale-in">
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-xl bg-accent">
                <Users className="h-6 w-6 text-primary" />
              </div>
              <div>
                <p className="text-2xl font-bold text-foreground">{patients.length}</p>
                <p className="text-sm text-muted-foreground">Total Patients</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="animate-scale-in" style={{ animationDelay: "0.1s" }}>
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-xl bg-success/10">
                <CheckCircle className="h-6 w-6 text-success" />
              </div>
              <div>
                <p className="text-2xl font-bold text-foreground">
                  {patients.filter((p) => p.compliance_status === "good").length}
                </p>
                <p className="text-sm text-muted-foreground">Good Compliance</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="animate-scale-in" style={{ animationDelay: "0.2s" }}>
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-xl bg-warning/10">
                <AlertTriangle className="h-6 w-6 text-warning" />
              </div>
              <div>
                <p className="text-2xl font-bold text-foreground">
                  {patients.filter((p) => p.compliance_status !== "good").length}
                </p>
                <p className="text-sm text-muted-foreground">Needs Attention</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Patients Table */}
      <Card className="animate-slide-up" style={{ animationDelay: "0.2s" }}>
        <CardHeader>
          <CardTitle>Patient Overview</CardTitle>
          <CardDescription>
            View all patients and their recent wellness metrics
          </CardDescription>
        </CardHeader>
        <CardContent>
          {patients.length === 0 ? (
            <div className="text-center py-12 text-muted-foreground">
              <Users className="h-12 w-12 mx-auto mb-4 opacity-50" />
              <p>No patients assigned yet</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-3 px-4 font-medium text-muted-foreground">Patient</th>
                    <th className="text-left py-3 px-4 font-medium text-muted-foreground">Last Active</th>
                    <th className="text-left py-3 px-4 font-medium text-muted-foreground">Steps</th>
                    <th className="text-left py-3 px-4 font-medium text-muted-foreground">Sleep</th>
                    <th className="text-left py-3 px-4 font-medium text-muted-foreground">Compliance</th>
                    <th className="text-right py-3 px-4 font-medium text-muted-foreground">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {patients.map((patient) => (
                    <tr key={patient.id} className="border-b hover:bg-muted/50 transition-colors">
                      <td className="py-4 px-4">
                        <p className="font-medium text-foreground">{patient.name}</p>
                      </td>
                      <td className="py-4 px-4 text-sm text-muted-foreground">
                        {formatDate(patient.last_goal_date)}
                      </td>
                      <td className="py-4 px-4 text-sm text-muted-foreground">
                        {patient.last_steps.toLocaleString()}
                      </td>
                      <td className="py-4 px-4 text-sm text-muted-foreground">
                        {patient.last_sleep_hours}h
                      </td>
                      <td className="py-4 px-4">
                        <div className="flex items-center gap-2">
                          {getComplianceIcon(patient.compliance_status)}
                          <span className="text-sm">{getComplianceLabel(patient.compliance_status)}</span>
                        </div>
                      </td>
                      <td className="py-4 px-4 text-right">
                        <Button variant="outline" size="sm" asChild>
                          <Link to={`/provider/patient/${patient.id}`}>
                            <Eye className="h-4 w-4 mr-1" />
                            View
                          </Link>
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default ProviderDashboard;
