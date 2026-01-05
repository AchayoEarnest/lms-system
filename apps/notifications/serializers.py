from rest_framework import serializers
from .models import Notification, Announcement, EmailPreference

class NotificationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Notification
        fields = ['id', 'title', 'message', 'notification_type', 'is_read', 'created_at']

class AnnouncementSerializer(serializers.ModelSerializer):
    instructor_name = serializers.CharField(source='created_by.get_full_name', read_only=True)
    
    class Meta:
        model = Announcement
        fields = ['id', 'title', 'content', 'instructor_name', 'created_at', 'is_published']

class EmailPreferenceSerializer(serializers.ModelSerializer):
    class Meta:
        model = EmailPreference
        fields = ['announcements', 'assignments', 'grades', 'messages', 'weekly_digest']


