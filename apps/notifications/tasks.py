from celery import shared_task
from django.core.mail import send_mail
from django.template.loader import render_to_string
from .models import Notification, EmailPreference

@shared_task
def send_pending_notifications():
    notifications = Notification.objects.filter(is_email_sent=False)
    for notif in notifications:
        try:
            preferences = EmailPreference.objects.get(user=notif.user)
            can_send = {
                'announcement': preferences.announcements,
                'assignment': preferences.assignments,
                'grade': preferences.grades,
                'message': preferences.messages,
            }.get(notif.notification_type, False)
            
            if can_send:
                html_message = render_to_string('email/notification.html', {'notification': notif})
                send_mail(
                    notif.title,
                    notif.message,
                    'noreply@lms.com',
                    [notif.user.email],
                    html_message=html_message,
                )
                notif.is_email_sent = True
                notif.save()
        except Exception as e:
            print(f"Error sending notification {notif.id}: {str(e)}")