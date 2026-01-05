from rest_framework import viewsets, status
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from django.utils import timezone
from datetime import timedelta
from .models import CourseAnalytics, LearnerAnalytics
from .serializers import CourseAnalyticsSerializer, LearnerAnalyticsSerializer
from apps.users.permissions import IsInstructor, IsAdmin
from apps.courses.models import Course, Enrollment

class CourseAnalyticsViewSet(viewsets.ReadOnlyModelViewSet):
    serializer_class = CourseAnalyticsSerializer
    permission_classes = [IsAuthenticated, IsInstructor]
    
    def get_queryset(self):
        return CourseAnalytics.objects.filter(course__instructors=self.request.user).order_by('-date')
    
    @action(detail=False, methods=['get'])
    def course_performance(self, request):
        course_id = request.query_params.get('course_id')
        course = Course.objects.get(id=course_id, instructors=request.user)
        
        analytics = CourseAnalytics.objects.filter(course=course).order_by('-date')[:30]
        serializer = self.get_serializer(analytics, many=True)
        return Response(serializer.data)
    
    @action(detail=False, methods=['get'])
    def student_distribution(self, request):
        course_id = request.query_params.get('course_id')
        enrollments = Enrollment.objects.filter(course_id=course_id).values('status').annotate(count=Count('id'))
        return Response(enrollments)

class LearnerAnalyticsViewSet(viewsets.ReadOnlyModelViewSet):
    serializer_class = LearnerAnalyticsSerializer
    permission_classes = [IsAuthenticated]
    
    @action(detail=False, methods=['get'])
    def my_analytics(self, request):
        today = timezone.now().date()
        analytics = LearnerAnalytics.objects.filter(student=request.user, date=today).first()
        if not analytics:
            analytics = LearnerAnalytics.objects.create(student=request.user, date=today)
        serializer = self.get_serializer(analytics)
        return Response(serializer.data)
    
    @action(detail=False, methods=['get'])
    def progress_report(self, request):
        last_30_days = timezone.now() - timedelta(days=30)
        analytics = LearnerAnalytics.objects.filter(student=request.user, date__gte=last_30_days)
        serializer = self.get_serializer(analytics, many=True)
        return Response(serializer.data)