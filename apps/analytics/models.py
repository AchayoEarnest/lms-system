from django.db import models
from apps.core.models import TimeStampedModel
from apps.users.models import CustomUser

class UserActivity(TimeStampedModel):
    user = models.ForeignKey(CustomUser, on_delete=models.CASCADE, related_name='activities')
    activity_type = models.CharField(max_length=50)
    course = models.ForeignKey('courses.Course', on_delete=models.CASCADE, null=True, blank=True)
    description = models.TextField()
    
    class Meta:
        indexes = [
            models.Index(fields=['user', 'created_at']),
            models.Index(fields=['activity_type']),
        ]

class CourseAnalytics(TimeStampedModel):
    course = models.ForeignKey('courses.Course', on_delete=models.CASCADE, related_name='analytics')
    total_students = models.IntegerField(default=0)
    completed_students = models.IntegerField(default=0)
    avg_completion_time = models.IntegerField(default=0)
    avg_score = models.FloatField(default=0)
    engagement_rate = models.FloatField(default=0)
    date = models.DateField(auto_now_add=True)
    
    class Meta:
        unique_together = ('course', 'date')

class LearnerAnalytics(TimeStampedModel):
    student = models.ForeignKey(CustomUser, on_delete=models.CASCADE, related_name='learning_analytics')
    total_time_spent = models.IntegerField(default=0)
    courses_completed = models.IntegerField(default=0)
    avg_score = models.FloatField(default=0)
    total_badges = models.IntegerField(default=0)
    date = models.DateField(auto_now_add=True)