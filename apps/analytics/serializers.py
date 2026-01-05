from rest_framework import serializers
from .models import CourseAnalytics, LearnerAnalytics

class CourseAnalyticsSerializer(serializers.ModelSerializer):
    class Meta:
        model = CourseAnalytics
        fields = ['total_students', 'completed_students', 'avg_completion_time', 'avg_score', 'engagement_rate', 'date']

class LearnerAnalyticsSerializer(serializers.ModelSerializer):
    student_name = serializers.CharField(source='student.get_full_name', read_only=True)
    
    class Meta:
        model = LearnerAnalytics
        fields = ['student_name', 'total_time_spent', 'courses_completed', 'avg_score', 'total_badges', 'date']