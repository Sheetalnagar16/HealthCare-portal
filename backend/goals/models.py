from django.db import models

class DailyGoal(models.Model):
    date = models.DateField()
    steps = models.IntegerField(default=0)
    sleep_hours = models.FloatField(default=0)
    water_glasses = models.IntegerField(default=0)
    active_minutes = models.IntegerField(default=0)

    class Meta:
        unique_together = ("date",)  # one row per day (for now single user)

    def __str__(self):
        return f"{self.date} - {self.steps} steps"
