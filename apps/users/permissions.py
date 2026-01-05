from rest_framework.permissions import BasePermission, SAFE_METHODS

class IsAdmin(BasePermission):
    def has_permission(self, request, view):
        return request.user and request.user.is_staff

class IsInstructor(BasePermission):
    def has_permission(self, request, view):
        return request.user and request.user.role in ['instructor', 'admin', 'super_admin']

class IsStudent(BasePermission):
    def has_permission(self, request, view):
        return request.user and request.user.role == 'student'

class IsSuperAdmin(BasePermission):
    def has_permission(self, request, view):
        return request.user and request.user.role == 'super_admin'

class IsOwnerOrReadOnly(BasePermission):
    def has_object_permission(self, request, view, obj):
        if request.method in SAFE_METHODS:
            return True
        return obj.user == request.user or request.user.is_staff

class IsEnrolled(BasePermission):
    def has_object_permission(self, request, view, obj):
        from apps.courses.models import Enrollment
        return Enrollment.objects.filter(student=request.user, course=obj).exists()

class IsInstructorOfCourse(BasePermission):
    def has_object_permission(self, request, view, obj):
        return obj.instructors.filter(id=request.user.id).exists() or request.user.is_staff