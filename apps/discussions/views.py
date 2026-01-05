from rest_framework import viewsets, status
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from .models import Discussion, Comment, CommentLike
from .serializers import DiscussionSerializer, CommentSerializer
from apps.users.permissions import IsOwnerOrReadOnly

class DiscussionViewSet(viewsets.ModelViewSet):
    serializer_class = DiscussionSerializer
    permission_classes = [IsAuthenticated]
    
    def get_queryset(self):
        course_id = self.request.query_params.get('course_id')
        if course_id:
            return Discussion.objects.filter(course_id=course_id)
        return Discussion.objects.all()
    
    def perform_create(self, serializer):
        serializer.save(created_by=self.request.user)
    
    @action(detail=True, methods=['post'])
    def increment_views(self, request, pk=None):
        discussion = self.get_object()
        discussion.views += 1
        discussion.save()
        return Response({'views': discussion.views})

class CommentViewSet(viewsets.ModelViewSet):
    serializer_class = CommentSerializer
    permission_classes = [IsAuthenticated, IsOwnerOrReadOnly]
    
    def get_queryset(self):
        discussion_id = self.request.query_params.get('discussion_id')
        if discussion_id:
            return Comment.objects.filter(discussion_id=discussion_id, parent__isnull=True)
        return Comment.objects.all()
    
    def perform_create(self, serializer):
        serializer.save(created_by=self.request.user)
    
    @action(detail=True, methods=['post'])
    def like(self, request, pk=None):
        comment = self.get_object()
        like, created = CommentLike.objects.get_or_create(comment=comment, user=request.user)
        if created:
            comment.likes += 1
            comment.save()
            return Response({'status': 'liked'}, status=status.HTTP_201_CREATED)
        return Response({'status': 'already liked'})
