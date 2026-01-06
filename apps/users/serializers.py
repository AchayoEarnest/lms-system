from rest_framework import serializers
from django.contrib.auth import authenticate
from .models import CustomUser, Institution

class CustomUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = CustomUser
        fields = ['id', 'username', 'email', 'first_name', 'last_name', 'role', 'status', 'bio', 'avatar', 'phone']
        read_only_fields = ['id']

class InstitutionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Institution
        fields = ['id', 'name', 'slug', 'description', 'logo', 'admin']
