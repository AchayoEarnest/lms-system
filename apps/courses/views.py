from rest_framework import viewsets, status
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from django_filters.rest_framework import DjangoFilterBackend
from .models import Course, Enrollment, Module, Lesson, LessonProgress
from .serializers import CourseSerializer, EnrollmentSerializer, ModuleSerializer, LessonSerializer, LessonProgressSerializer


class CourseViewSet(viewsets.ModelViewSet):
    queryset = Course.objects.filter(status='published')
    serializer_class = CourseSerializer
    filter_backends = [DjangoFilterBackend]
    filterset_fields = ['category', 'visibility']
    search_fields = ['title', 'description']
    ordering_fields = ['created_at', 'price']
    
    @action(detail=True, methods=['post'], permission_classes=[IsAuthenticated])
    def enroll(self, request, pk=None):
        """Enroll a student in a course"""
        course = self.get_object()
        enrollment, created = Enrollment.objects.get_or_create(
            student=request.user,
            course=course,
            defaults={'status': 'active'}
        )
        if created:
            return Response({'message': 'Successfully enrolled'}, status=status.HTTP_201_CREATED)
        return Response({'message': 'Already enrolled'}, status=status.HTTP_200_OK)
    
    @action(detail=True, methods=['get'], permission_classes=[IsAuthenticated])
    def my_progress(self, request, pk=None):
        """Get student's progress in a course"""
        course = self.get_object()
        try:
            enrollment = Enrollment.objects.get(student=request.user, course=course)
            serializer = EnrollmentSerializer(enrollment)
            return Response(serializer.data)
        except Enrollment.DoesNotExist:
            return Response({'error': 'Not enrolled in this course'}, status=status.HTTP_404_NOT_FOUND)


class EnrollmentViewSet(viewsets.ModelViewSet):
    serializer_class = EnrollmentSerializer
    permission_classes = [IsAuthenticated]
    
    def get_queryset(self):
        """Return enrollments for the current user"""
        return Enrollment.objects.filter(student=self.request.user)
    
    @action(detail=False, methods=['get'])
    def active_enrollments(self, request):
        """Get all active enrollments"""
        enrollments = Enrollment.objects.filter(student=request.user, status='active')
        serializer = self.get_serializer(enrollments, many=True)
        return Response(serializer.data)
    
    @action(detail=False, methods=['get'])
    def completed_enrollments(self, request):
        """Get all completed enrollments"""
        enrollments = Enrollment.objects.filter(student=request.user, status='completed')
        serializer = self.get_serializer(enrollments, many=True)
        return Response(serializer.data)


class ModuleViewSet(viewsets.ModelViewSet):
    serializer_class = ModuleSerializer
    permission_classes = [IsAuthenticated]
    
    def get_queryset(self):
        """Return modules for courses the user is enrolled in"""
        from django.db.models import Q
        enrolled_courses = Enrollment.objects.filter(student=self.request.user).values_list('course_id', flat=True)
        return Module.objects.filter(course_id__in=enrolled_courses)


class LessonViewSet(viewsets.ModelViewSet):
    serializer_class = LessonSerializer
    permission_classes = [IsAuthenticated]
    
    def get_queryset(self):
        """Return lessons for modules in courses the user is enrolled in"""
        from django.db.models import Q
        enrolled_courses = Enrollment.objects.filter(student=self.request.user).values_list('course_id', flat=True)
        return Lesson.objects.filter(module__course_id__in=enrolled_courses)


class LessonProgressViewSet(viewsets.ModelViewSet):
    serializer_class = LessonProgressSerializer
    permission_classes = [IsAuthenticated]
    
    def get_queryset(self):
        """Return progress for current user"""
        return LessonProgress.objects.filter(student=self.request.user)
    
    def perform_create(self, serializer):
        """Create progress record for current user"""
        serializer.save(student=self.request.user)
    
    @action(detail=False, methods=['post'])
    def mark_complete(self, request):
        """Mark a lesson as complete"""
        lesson_id = request.data.get('lesson_id')
        time_spent = request.data.get('time_spent_minutes', 0)
        
        try:
            lesson = Lesson.objects.get(id=lesson_id)
            progress, created = LessonProgress.objects.update_or_create(
                student=request.user,
                lesson=lesson,
                defaults={
                    'is_completed': True,
                    'time_spent_minutes': time_spent,
                    'progress_percentage': 100,
                }
            )
            serializer = self.get_serializer(progress)
            return Response(serializer.data, status=status.HTTP_200_OK)
        except Lesson.DoesNotExist:
            return Response({'error': 'Lesson not found'}, status=status.HTTP_404_NOT_FOUND)
    
    @action(detail=False, methods=['post'])
    def update_progress(self, request):
        """Update lesson progress"""
        lesson_id = request.data.get('lesson_id')
        progress_percentage = request.data.get('progress_percentage', 0)
        time_spent = request.data.get('time_spent_minutes', 0)
        
        try:
            lesson = Lesson.objects.get(id=lesson_id)
            progress, created = LessonProgress.objects.update_or_create(
                student=request.user,
                lesson=lesson,
                defaults={
                    'progress_percentage': progress_percentage,
                    'time_spent_minutes': time_spent,
                }
            )
            serializer = self.get_serializer(progress)
            return Response(serializer.data, status=status.HTTP_200_OK)
        except Lesson.DoesNotExist:
            return Response({'error': 'Lesson not found'}, status=status.HTTP_404_NOT_FOUND)

