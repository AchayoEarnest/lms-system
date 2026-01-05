from rest_framework import serializers
from .models import Certificate, Badge, StudentBadge

class CertificateSerializer(serializers.ModelSerializer):
    course_title = serializers.CharField(source='course.title', read_only=True)
    
    class Meta:
        model = Certificate
        fields = ['id', 'certificate_number', 'course_title', 'issue_date', 'expiry_date', 'qr_code']

class BadgeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Badge
        fields = ['id', 'name', 'description', 'image', 'criteria']

class StudentBadgeSerializer(serializers.ModelSerializer):
    badge = BadgeSerializer(read_only=True)
    
    class Meta:
        model = StudentBadge
        fields = ['id', 'badge', 'earned_at']