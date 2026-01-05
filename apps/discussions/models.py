from django.db import models
from apps.core.models import TimeStampedModel
from apps.users.models import CustomUser

class Discussion(TimeStampedModel):
    title = models.CharField(max_length=255)
    content = models.TextField()
    course = models.ForeignKey('courses.Course', on_delete=models.CASCADE, related_name='discussions')
    created_by = models.ForeignKey(CustomUser, on_delete=models.CASCADE)
    is_pinned = models.BooleanField(default=False)
    views = models.IntegerField(default=0)
    
    class Meta:
        ordering = ['-is_pinned', '-created_at']
        indexes = [
            models.Index(fields=['course', 'created_at']),
        ]
    
    def __str__(self):
        return self.title

class Comment(TimeStampedModel):
    discussion = models.ForeignKey(Discussion, on_delete=models.CASCADE, related_name='comments')
    content = models.TextField()
    created_by = models.ForeignKey(CustomUser, on_delete=models.CASCADE)
    parent = models.ForeignKey('self', null=True, blank=True, on_delete=models.CASCADE, related_name='replies')
    likes = models.IntegerField(default=0)
    
    class Meta:
        ordering = ['created_at']
    
    def __str__(self):
        return f"{self.created_by.username} - {self.discussion.title}"

class CommentLike(TimeStampedModel):
    comment = models.ForeignKey(Comment, on_delete=models.CASCADE, related_name='liked_by')
    user = models.ForeignKey(CustomUser, on_delete=models.CASCADE)
    
    class Meta:
        unique_together = ('comment', 'user')