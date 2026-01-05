from celery import shared_task
from django.utils import timezone
from datetime import timedelta
from .models import CourseAnalytics, LearnerAnalytics
from apps.courses.models import Enrollment, Course

@shared_task
def generate_daily_reports():
    courses = Course.objects.filter(status='published')
    for course in courses:
        enrollments = Enrollment.objects.filter(course=course)
        completed = enrollments.filter(status='completed').count()
        total = enrollments.count()
        
        CourseAnalytics.objects.create(
            course=course,
            total_students=total,
            completed_students=completed,
            avg_score=enrollments.aggregate(models.Avg('progress_percentage'))['progress_percentage__avg'] or 0,
        )
