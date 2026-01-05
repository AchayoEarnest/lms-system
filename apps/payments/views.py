import stripe
from rest_framework import viewsets, status
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from django.conf import settings
from .models import Payment, Coupon, Invoice
from .serializers import PaymentSerializer, CouponSerializer
from apps.courses.models import Course, Enrollment

stripe.api_key = settings.STRIPE_SECRET_KEY

class PaymentViewSet(viewsets.ModelViewSet):
    serializer_class = PaymentSerializer
    permission_classes = [IsAuthenticated]
    
    def get_queryset(self):
        return Payment.objects.filter(student=self.request.user)
    
    @action(detail=False, methods=['post'])
    def create_payment_intent(self, request):
        course_id = request.data.get('course_id')
        coupon_code = request.data.get('coupon_code')
        
        try:
            course = Course.objects.get(id=course_id)
            amount = int(course.price * 100)
            
            if coupon_code:
                coupon = Coupon.objects.get(code=coupon_code, is_active=True)
                if coupon.discount_percent:
                    amount = int(amount * (1 - coupon.discount_percent / 100))
            
            intent = stripe.PaymentIntent.create(
                amount=amount,
                currency='usd',
                metadata={'course_id': course_id, 'student_id': request.user.id}
            )
            
            return Response({'client_secret': intent.client_secret})
        except Course.DoesNotExist:
            return Response({'error': 'Course not found'}, status=status.HTTP_404_NOT_FOUND)
        except Coupon.DoesNotExist:
            return Response({'error': 'Invalid coupon'}, status=status.HTTP_400_BAD_REQUEST)
    
    @action(detail=False, methods=['post'])
    def confirm_payment(self, request):
        payment_intent_id = request.data.get('payment_intent_id')
        course_id = request.data.get('course_id')
        
        try:
            intent = stripe.PaymentIntent.retrieve(payment_intent_id)
            if intent.status == 'succeeded':
                payment = Payment.objects.create(
                    student=request.user,
                    course_id=course_id,
                    amount=intent.amount / 100,
                    stripe_payment_intent=payment_intent_id,
                    status='completed',
                )
                Enrollment.objects.get_or_create(student=request.user, course_id=course_id)
                return Response({'message': 'Payment successful'}, status=status.HTTP_201_CREATED)
            return Response({'error': 'Payment not completed'}, status=status.HTTP_400_BAD_REQUEST)
        except Exception as e:
            return Response({'error': str(e)}, status=status.HTTP_400_BAD_REQUEST)

class CouponViewSet(viewsets.ReadOnlyModelViewSet):
    serializer_class = CouponSerializer
    permission_classes = [IsAuthenticated]
    
    def get_queryset(self):
        return Coupon.objects.filter(is_active=True)