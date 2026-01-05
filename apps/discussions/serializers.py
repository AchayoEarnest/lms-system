from rest_framework import serializers
from .models import Discussion, Comment

class CommentSerializer(serializers.ModelSerializer):
    author = serializers.CharField(source='created_by.get_full_name', read_only=True)
    replies = serializers.SerializerMethodField()
    
    class Meta:
        model = Comment
        fields = ['id', 'content', 'author', 'likes', 'created_at', 'replies']
    
    def get_replies(self, obj):
        replies = obj.replies.all()
        return CommentSerializer(replies, many=True).data

class DiscussionSerializer(serializers.ModelSerializer):
    author = serializers.CharField(source='created_by.get_full_name', read_only=True)
    comments = CommentSerializer(many=True, read_only=True)
    
    class Meta:
        model = Discussion
        fields = ['id', 'title', 'content', 'author', 'views', 'is_pinned', 'created_at', 'comments']
