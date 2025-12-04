import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Lightbulb } from "lucide-react";

interface HealthTipCardProps {
  tip: string;
}

export const HealthTipCard = ({ tip }: HealthTipCardProps) => {
  return (
    <Card className="gradient-card border-primary/20 animate-slide-up" style={{ animationDelay: "0.3s" }}>
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2 text-lg">
          <div className="p-2 rounded-lg bg-primary/10">
            <Lightbulb className="h-5 w-5 text-primary" />
          </div>
          Health Tip of the Day
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-muted-foreground leading-relaxed">{tip}</p>
      </CardContent>
    </Card>
  );
};
