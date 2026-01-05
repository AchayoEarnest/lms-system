from rest_framework import serializers
from .models import Payment, Coupon, Invoice

class PaymentSerializer(serializers.ModelSerializer):
    course_title = serializers.CharField(source='course.title', read_only=True)
    
    class Meta:
        model = Payment
        fields = ['id', 'course', 'course_title', 'amount', 'status', 'paid_at']

class CouponSerializer(serializers.ModelSerializer):
    class Meta:
        model = Coupon
        fields = ['id', 'code', 'discount_percent', 'valid_until']

class InvoiceSerializer(serializers.ModelSerializer):
    payment_details = PaymentSerializer(source='payment', read_only=True)
    
    class Meta:
        model = Invoice
        fields = ['id', 'invoice_number', 'payment_details', 'pdf']