from rest_framework import viewsets, status
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from .models import Certificate, Badge, StudentBadge
from .serializers import CertificateSerializer, BadgeSerializer, StudentBadgeSerializer
from apps.courses.models import Enrollment

class CertificateViewSet(viewsets.ReadOnlyModelViewSet):
    serializer_class = CertificateSerializer
    permission_classes = [IsAuthenticated]
    
    def get_queryset(self):
        return Certificate.objects.filter(student=self.request.user)
    
    @action(detail=False, methods=['get'])
    def verify(self, request):
        cert_number = request.query_params.get('number')
        try:
            cert = Certificate.objects.get(certificate_number=cert_number)
            serializer = self.get_serializer(cert)
            return Response(serializer.data)
        except Certificate.DoesNotExist:
            return Response({'error': 'Certificate not found'}, status=status.HTTP_404_NOT_FOUND)

class BadgeViewSet(viewsets.ReadOnlyModelViewSet):
    serializer_class = BadgeSerializer
    queryset = Badge.objects.all()
    permission_classes = [IsAuthenticated]

class StudentBadgeViewSet(viewsets.ReadOnlyModelViewSet):
    serializer_class = StudentBadgeSerializer
    permission_classes = [IsAuthenticated]
    
    def get_queryset(self):
        return StudentBadge.objects.filter(student=self.request.user)
