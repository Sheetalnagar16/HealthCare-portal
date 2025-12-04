from rest_framework import serializers
from .models import DailyGoal

class DailyGoalSerializer(serializers.ModelSerializer):
    class Meta:
        model = DailyGoal
        fields = "__all__"
