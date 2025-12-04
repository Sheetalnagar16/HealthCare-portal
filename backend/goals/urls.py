from django.urls import path
from . import views

urlpatterns = [
    path("goals", views.save_daily_goal, name="save-daily-goal"),
    path("goals/recent", views.recent_goals, name="recent-goals"),
]
