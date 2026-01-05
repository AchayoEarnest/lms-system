from django.contrib import admin
from django.urls import path, include
from django.conf import settings
from django.conf.urls.static import static
from rest_framework.routers import DefaultRouter
from drf_spectacular.views import SpectacularAPIView, SpectacularSwaggerView

# Import ViewSets
from apps.core.views import CategoryViewSet
from apps.users.views import CustomUserViewSet, InstitutionViewSet
from apps.courses.views import CourseViewSet, EnrollmentViewSet, ModuleViewSet, LessonViewSet, LessonProgressViewSet

# Create router
router = DefaultRouter()
router.register(r'categories', CategoryViewSet, basename='category')
router.register(r'users', CustomUserViewSet, basename='user')
router.register(r'institutions', InstitutionViewSet, basename='institution')
router.register(r'courses', CourseViewSet, basename='course')
router.register(r'enrollments', EnrollmentViewSet, basename='enrollment')
router.register(r'modules', ModuleViewSet, basename='module')
router.register(r'lessons', LessonViewSet, basename='lesson')
router.register(r'lesson-progress', LessonProgressViewSet, basename='lesson-progress')

# URL patterns
urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/v1/', include(router.urls)),
    path('api/v1/auth/', include('rest_framework.urls')),
    path('api/schema/', SpectacularAPIView.as_view(), name='schema'),
    path('api/docs/', SpectacularSwaggerView.as_view(url_name='schema')),
]

# Serve media files in development
if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
    urlpatterns += static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)