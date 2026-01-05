from django.db import models
from django.utils import timezone
import uuid, qrcode, io
from apps.core.models import TimeStampedModel
from apps.users.models import CustomUser

class Badge(TimeStampedModel):
    name = models.CharField(max_length=255)
    description = models.TextField()
    image = models.ImageField(upload_to='badges/')
    criteria = models.CharField(max_length=255)
    
    def __str__(self):
        return self.name

class Certificate(TimeStampedModel):
    student = models.ForeignKey(CustomUser, on_delete=models.CASCADE, related_name='certificates')
    course = models.ForeignKey('courses.Course', on_delete=models.CASCADE)
    certificate_number = models.CharField(max_length=50, unique=True, default=uuid.uuid4)
    issue_date = models.DateTimeField(auto_now_add=True)
    expiry_date = models.DateTimeField(null=True, blank=True)
    qr_code = models.ImageField(upload_to='qr_codes/', blank=True)
    pdf = models.FileField(upload_to='certificates/', blank=True)
    
    class Meta:
        unique_together = ('student', 'course')
    
    def save(self, *args, **kwargs):
        if not self.qr_code:
            qr = qrcode.QRCode(version=1, box_size=10, border=5)
            qr.add_data(f"https://lms.com/verify/{self.certificate_number}")
            qr.make(fit=True)
            img = qr.make_image()
            img_io = io.BytesIO()
            img.save(img_io, 'PNG')
            img_io.seek(0)
            self.qr_code.save(f'qr_{self.certificate_number}.png', img_io)
        super().save(*args, **kwargs)
    
    def __str__(self):
        return f"{self.student.username} - {self.course.title}"

class StudentBadge(TimeStampedModel):
    student = models.ForeignKey(CustomUser, on_delete=models.CASCADE, related_name='badges')
    badge = models.ForeignKey(Badge, on_delete=models.CASCADE)
    earned_at = models.DateTimeField(auto_now_add=True)
    
    class Meta:
        unique_together = ('student', 'badge')
