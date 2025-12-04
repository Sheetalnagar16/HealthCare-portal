import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { publicApi } from "@/services/api";
import { HealthInfo } from "@/types";
import { useAuth } from "@/contexts/AuthContext";
import { 
  Heart, 
  Activity, 
  Moon, 
  Droplets, 
  Shield, 
  Users,
  ArrowRight,
  AlertTriangle
} from "lucide-react";

const HomePage = () => {
  const { isAuthenticated, user } = useAuth();
  const [healthInfo, setHealthInfo] = useState<HealthInfo[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadHealthInfo = async () => {
      try {
        const data = await publicApi.getHealthInfo();
        setHealthInfo(data);
      } catch (error) {
        console.error("Failed to load health info:", error);
      } finally {
        setIsLoading(false);
      }
    };
    loadHealthInfo();
  }, []);

  const getCategoryIcon = (category: string) => {
    switch (category.toLowerCase()) {
      case "lifestyle":
        return Activity;
      case "flu":
        return Shield;
      case "mental health":
        return Heart;
      case "preventive care":
        return Users;
      default:
        return Heart;
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category.toLowerCase()) {
      case "lifestyle":
        return "text-success";
      case "flu":
        return "text-info";
      case "mental health":
        return "text-primary";
      case "preventive care":
        return "text-warning";
      default:
        return "text-primary";
    }
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="gradient-hero py-20 md:py-32">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center animate-fade-in">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent text-accent-foreground text-sm font-medium mb-6">
              <Heart className="h-4 w-4" />
              Your Health, Your Priority
            </div>
            <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-6 leading-tight">
              Take Control of Your{" "}
              <span className="text-primary">Preventive Health</span>
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Track your wellness goals, stay on top of preventive care reminders, 
              and maintain a healthier lifestyle with HealthWell.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              {isAuthenticated ? (
                <Button variant="hero" size="xl" asChild>
                  <Link to={user?.role === "PATIENT" ? "/patient/dashboard" : "/provider/dashboard"}>
                    Go to Dashboard
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
              ) : (
                <>
                  <Button variant="hero" size="xl" asChild>
                    <Link to="/register">
                      Get Started Free
                      <ArrowRight className="ml-2 h-5 w-5" />
                    </Link>
                  </Button>
                  <Button variant="outline" size="xl" asChild>
                    <Link to="/login">Sign In</Link>
                  </Button>
                </>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-background">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-4">
              Everything You Need for Better Health
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Simple, effective tools to help you track and improve your daily wellness
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: Activity,
                title: "Track Daily Goals",
                description: "Log your steps, sleep, water intake, and activity minutes to build healthy habits.",
              },
              {
                icon: Moon,
                title: "Sleep Insights",
                description: "Monitor your sleep patterns and get personalized recommendations for better rest.",
              },
              {
                icon: Droplets,
                title: "Stay Hydrated",
                description: "Set and track your daily water intake goals for optimal hydration.",
              },
            ].map((feature, index) => (
              <Card 
                key={index} 
                className="text-center animate-slide-up" 
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <CardContent className="pt-8 pb-6">
                  <div className="inline-flex p-4 rounded-2xl bg-accent mb-4">
                    <feature.icon className="h-8 w-8 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold text-foreground mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-muted-foreground">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Health Info Section */}
      <section className="py-20 bg-muted/30">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-4">
              Health Tips & Resources
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Stay informed with expert health advice and preventive care tips
            </p>
          </div>

          {isLoading ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1, 2, 3].map((i) => (
                <Card key={i} className="animate-pulse">
                  <CardContent className="p-6">
                    <div className="h-6 bg-muted rounded w-3/4 mb-4"></div>
                    <div className="h-4 bg-muted rounded w-full mb-2"></div>
                    <div className="h-4 bg-muted rounded w-5/6"></div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {healthInfo.map((info, index) => {
                const Icon = getCategoryIcon(info.category);
                const colorClass = getCategoryColor(info.category);

                return (
                  <Card 
                    key={info.id} 
                    className="animate-slide-up"
                    style={{ animationDelay: `${index * 0.05}s` }}
                  >
                    <CardHeader className="pb-3">
                      <div className="flex items-start justify-between">
                        <CardTitle className="text-lg">{info.title}</CardTitle>
                        <div className={`p-2 rounded-lg bg-accent ${colorClass}`}>
                          <Icon className="h-4 w-4" />
                        </div>
                      </div>
                      <span className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                        {info.category}
                      </span>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        {info.description}
                      </p>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          )}
        </div>
      </section>

      {/* Disclaimer Section */}
      <section className="py-12 bg-warning/10 border-y border-warning/20">
        <div className="container">
          <div className="flex items-start gap-4 max-w-3xl mx-auto">
            <div className="p-3 rounded-lg bg-warning/20 text-warning shrink-0">
              <AlertTriangle className="h-6 w-6" />
            </div>
            <div>
              <h3 className="font-semibold text-foreground mb-2">Important Notice</h3>
              <p className="text-sm text-muted-foreground">
                The information provided by HealthWell is for general wellness tracking and 
                educational purposes only. It is not intended to be a substitute for professional 
                medical advice, diagnosis, or treatment. For medical emergencies, please call 911 
                or contact your healthcare provider immediately.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      {!isAuthenticated && (
        <section className="py-20 bg-background">
          <div className="container">
            <div className="max-w-2xl mx-auto text-center">
              <h2 className="text-3xl font-bold text-foreground mb-4">
                Ready to Start Your Wellness Journey?
              </h2>
              <p className="text-muted-foreground mb-8">
                Join thousands of users who are taking control of their preventive health.
              </p>
              <Button variant="hero" size="xl" asChild>
                <Link to="/register">
                  Create Free Account
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
            </div>
          </div>
        </section>
      )}
    </div>
  );
};

export default HomePage;
