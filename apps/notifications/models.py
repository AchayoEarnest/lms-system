from django.db import models
from django.core.mail import send_mail
from apps.core.models import TimeStampedModel
from apps.users.models import CustomUser

class Announcement(TimeStampedModel):
    title = models.CharField(max_length=255)
    content = models.TextField()
    course = models.ForeignKey('courses.Course', on_delete=models.CASCADE, related_name='announcements')
    created_by = models.ForeignKey(CustomUser, on_delete=models.SET_NULL, null=True)
    is_published = models.BooleanField(default=True)
    
    class Meta:
        ordering = ['-created_at']
    
    def __str__(self):
        return self.title

class Notification(TimeStampedModel):
    class Type(models.TextChoices):
        ANNOUNCEMENT = 'announcement', 'Announcement'
        ASSIGNMENT = 'assignment', 'Assignment'
        GRADE = 'grade', 'Grade'
        MESSAGE = 'message', 'Message'
        ENROLLMENT = 'enrollment', 'Enrollment'
    
    user = models.ForeignKey(CustomUser, on_delete=models.CASCADE, related_name='notifications')
    notification_type = models.CharField(max_length=20, choices=Type.choices)
    title = models.CharField(max_length=255)
    message = models.TextField()
    is_read = models.BooleanField(default=False)
    is_email_sent = models.BooleanField(default=False)
    related_course = models.ForeignKey('courses.Course', null=True, blank=True, on_delete=models.SET_NULL)
    
    class Meta:
        ordering = ['-created_at']
        indexes = [
            models.Index(fields=['user', 'is_read']),
        ]
    
    def __str__(self):
        return self.title

class EmailPreference(TimeStampedModel):
    user = models.OneToOneField(CustomUser, on_delete=models.CASCADE, related_name='email_preference')
    announcements = models.BooleanField(default=True)
    assignments = models.BooleanField(default=True)
    grades = models.BooleanField(default=True)
    messages = models.BooleanField(default=True)
    weekly_digest = models.BooleanField(default=False)