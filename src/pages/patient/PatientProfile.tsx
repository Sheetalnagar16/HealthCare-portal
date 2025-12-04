import { useEffect, useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { patientApi } from "@/services/api";
import { User, ProfileUpdateData } from "@/types";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "@/hooks/use-toast";
import { User as UserIcon, Save, Mail, Calendar } from "lucide-react";

const PatientProfile = () => {
  const { user: authUser } = useAuth();
  const [profile, setProfile] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);

  const [formData, setFormData] = useState<ProfileUpdateData>({
    name: "",
    age: undefined,
    gender: "",
    allergies: "",
    medications: "",
  });

  useEffect(() => {
    const loadProfile = async () => {
      if (!authUser) return;
      try {
        const data = await patientApi.getProfile(authUser.id);
        setProfile(data);
        setFormData({
          name: data.name,
          age: data.age,
          gender: data.gender ?? "",
          allergies: data.allergies ?? "",
          medications: data.medications ?? "",
        });
      } catch (error) {
        console.error("Failed to load profile:", error);
      } finally {
        setIsLoading(false);
      }
    };
    loadProfile();
  }, [authUser]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!authUser) return;

    setIsSaving(true);
    try {
      const updatedProfile = await patientApi.updateProfile(authUser.id, formData);
      setProfile(updatedProfile);
      toast({
        title: "Profile updated!",
        description: "Your profile has been saved successfully.",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update profile. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSaving(false);
    }
  };

  if (isLoading) {
    return (
      <div className="container py-8">
        <div className="animate-pulse space-y-6">
          <div className="h-8 bg-muted rounded w-48"></div>
          <div className="h-96 bg-muted rounded-xl"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="container py-8 space-y-8 max-w-2xl">
      {/* Header */}
      <div className="animate-fade-in">
        <h1 className="text-3xl font-bold text-foreground">My Profile</h1>
        <p className="text-muted-foreground mt-1">
          Manage your personal information and health details
        </p>
      </div>

      {/* Profile Card */}
      <Card className="animate-slide-up">
        <CardHeader>
          <div className="flex items-center gap-4">
            <div className="p-4 rounded-2xl bg-accent">
              <UserIcon className="h-8 w-8 text-primary" />
            </div>
            <div>
              <CardTitle>{profile?.name}</CardTitle>
              <CardDescription className="flex items-center gap-2 mt-1">
                <Mail className="h-3 w-3" />
                {profile?.email}
              </CardDescription>
              <CardDescription className="flex items-center gap-2 mt-1">
                <Calendar className="h-3 w-3" />
                Member since {new Date(profile?.created_at ?? "").toLocaleDateString("en-US", { month: "long", year: "numeric" })}
              </CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="name">Full Name</Label>
              <Input
                id="name"
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                required
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="age">Age</Label>
                <Input
                  id="age"
                  type="number"
                  min="0"
                  max="150"
                  value={formData.age ?? ""}
                  onChange={(e) => setFormData({ ...formData, age: parseInt(e.target.value) || undefined })}
                  placeholder="Optional"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="gender">Gender</Label>
                <Select 
                  value={formData.gender} 
                  onValueChange={(v) => setFormData({ ...formData, gender: v })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select gender" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Male">Male</SelectItem>
                    <SelectItem value="Female">Female</SelectItem>
                    <SelectItem value="Non-binary">Non-binary</SelectItem>
                    <SelectItem value="Prefer not to say">Prefer not to say</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="allergies">Known Allergies</Label>
              <Textarea
                id="allergies"
                value={formData.allergies}
                onChange={(e) => setFormData({ ...formData, allergies: e.target.value })}
                placeholder="List any known allergies (optional)"
                rows={3}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="medications">Current Medications</Label>
              <Textarea
                id="medications"
                value={formData.medications}
                onChange={(e) => setFormData({ ...formData, medications: e.target.value })}
                placeholder="List current medications (optional)"
                rows={3}
              />
            </div>

            <Button type="submit" className="w-full" size="lg" disabled={isSaving}>
              {isSaving ? (
                <span className="animate-pulse">Saving...</span>
              ) : (
                <>
                  <Save className="h-4 w-4 mr-2" />
                  Save Changes
                </>
              )}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default PatientProfile;
