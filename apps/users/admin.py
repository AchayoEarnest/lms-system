from django.contrib import admin
from django.contrib.auth.admin import UserAdmin as BaseUserAdmin
from .models import CustomUser, Institution

@admin.register(CustomUser)
class CustomUserAdmin(BaseUserAdmin):
    """Admin interface for CustomUser model"""
    
    list_display = ('username', 'email', 'first_name', 'last_name', 'role', 'status', 'created_at')
    list_filter = ('role', 'status', 'created_at', 'is_staff', 'is_active')
    search_fields = ('username', 'email', 'first_name', 'last_name', 'phone')
    
    fieldsets = BaseUserAdmin.fieldsets + (
        ('Custom User Fields', {
            'fields': ('role', 'status', 'phone', 'bio', 'avatar', 'institution')
        }),
        ('Timestamps', {
            'fields': ('created_at', 'updated_at'),
            'classes': ('collapse',)
        }),
    )
    
    readonly_fields = ('created_at', 'updated_at')
    
    ordering = ('-created_at',)


@admin.register(Institution)
class InstitutionAdmin(admin.ModelAdmin):
    """Admin interface for Institution model"""
    
    list_display = ('name', 'admin', 'created_at')
    list_filter = ('created_at',)
    search_fields = ('name', 'description')
    
    fieldsets = (
        ('Basic Information', {
            'fields': ('name', 'slug', 'description')
        }),
        ('Institution Admin', {
            'fields': ('admin',)
        }),
        ('Media', {
            'fields': ('logo',)
        }),
        ('Timestamps', {
            'fields': ('created_at', 'updated_at'),
            'classes': ('collapse',)
        }),
    )
    
    readonly_fields = ('created_at', 'updated_at')
    prepopulated_fields = {'slug': ('name',)}
    
    ordering = ('-created_at',)