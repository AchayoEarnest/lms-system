from django.contrib import admin
from django.urls import path, include
from rest_framework.routers import DefaultRouter
from drf_spectacular.views import SpectacularAPIView, SpectacularSwaggerView
from apps.courses.views import CourseViewSet, EnrollmentViewSet
from apps.notifications.views import NotificationViewSet, AnnouncementViewSet
from apps.payments.views import PaymentViewSet, CouponViewSet
from apps.discussions.views import DiscussionViewSet, CommentViewSet
from apps.certifications.views import CertificateViewSet, BadgeViewSet
from apps.analytics.views import CourseAnalyticsViewSet, LearnerAnalyticsViewSet

router = DefaultRouter()
router.register(r'courses', CourseViewSet, basename='course')
router.register(r'enrollments', EnrollmentViewSet, basename='enrollment')
router.register(r'notifications', NotificationViewSet, basename='notification')
router.register(r'announcements', AnnouncementViewSet, basename='announcement')
router.register(r'payments', PaymentViewSet, basename='payment')
router.register(r'coupons', CouponViewSet, basename='coupon')
router.register(r'discussions', DiscussionViewSet, basename='discussion')
router.register(r'comments', CommentViewSet, basename='comment')
router.register(r'certificates', CertificateViewSet, basename='certificate')
router.register(r'badges', BadgeViewSet, basename='badge')
router.register(r'course-analytics', CourseAnalyticsViewSet, basename='course-analytics')
router.register(r'learner-analytics', LearnerAnalyticsViewSet, basename='learner-analytics')

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/v1/', include(router.urls)),
    path('api/v1/auth/', include('rest_framework.urls')),
    path('api/schema/', SpectacularAPIView.as_view(), name='schema'),
    path('api/docs/', SpectacularSwaggerView.as_view(url_name='schema')),
]