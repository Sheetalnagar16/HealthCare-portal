from datetime import date, timedelta

from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status

from .models import DailyGoal
from .serializers import DailyGoalSerializer


@api_view(["POST"])
def save_daily_goal(request):
    # if date not sent, use today
    req_date = request.data.get("date", str(date.today()))

    goal, created = DailyGoal.objects.get_or_create(date=req_date)
    serializer = DailyGoalSerializer(instance=goal, data=request.data, partial=True)

    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_200_OK)

    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(["GET"])
def recent_goals(request):
    today = date.today()
    week_ago = today - timedelta(days=7)

    goals = DailyGoal.objects.filter(date__gte=week_ago).order_by("-date")
    serializer = DailyGoalSerializer(goals, many=True)
    return Response(serializer.data)
