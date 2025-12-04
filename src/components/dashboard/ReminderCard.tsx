import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Reminder } from "@/types";
import { Calendar, Bell } from "lucide-react";

interface ReminderCardProps {
  reminders: Reminder[];
}

export const ReminderCard = ({ reminders }: ReminderCardProps) => {
  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString("en-US", { month: "short", day: "numeric" });
  };

  const getDaysUntil = (dateStr: string) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const dueDate = new Date(dateStr);
    const diffTime = dueDate.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  return (
    <Card className="animate-slide-up" style={{ animationDelay: "0.2s" }}>
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2 text-lg">
          <Bell className="h-5 w-5 text-primary" />
          Upcoming Reminders
        </CardTitle>
      </CardHeader>
      <CardContent>
        {reminders.length === 0 ? (
          <p className="text-sm text-muted-foreground text-center py-4">
            No upcoming reminders
          </p>
        ) : (
          <div className="space-y-3">
            {reminders.map((reminder) => {
              const daysUntil = getDaysUntil(reminder.due_date);
              const isUrgent = daysUntil <= 3;

              return (
                <div
                  key={reminder.id}
                  className={`p-4 rounded-lg border transition-colors ${
                    isUrgent ? "bg-warning/10 border-warning/30" : "bg-muted/50"
                  }`}
                >
                  <div className="flex items-start justify-between">
                    <div className="space-y-1">
                      <p className="font-medium text-foreground">{reminder.title}</p>
                      <p className="text-sm text-muted-foreground">
                        {reminder.description}
                      </p>
                    </div>
                    <div className="flex items-center gap-1 text-xs text-muted-foreground">
                      <Calendar className="h-3 w-3" />
                      {formatDate(reminder.due_date)}
                    </div>
                  </div>
                  {isUrgent && (
                    <p className="mt-2 text-xs font-medium text-warning">
                      Due in {daysUntil} day{daysUntil !== 1 ? "s" : ""}
                    </p>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </CardContent>
    </Card>
  );
};
