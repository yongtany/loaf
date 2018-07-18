from django.contrib import admin
from . import models

# Register your models here.

@admin.register(models.Project)
class ProjectAdmin(admin.ModelAdmin):

    list_display_links = (
        'title',
    )

    search_fields = (
        'title',
    )

    list_filter = (
        'title',
        'creator',
    )
    
    list_display = (
        'file',
        'title',
        'creator',
        'created_at',
        'updated_at',
    )

@admin.register(models.Like)
class LikeAdmin(admin.ModelAdmin):
    
    list_display = (
        'creator',
        'project',
        'created_at',
        'updated_at',
    )

@admin.register(models.Comment)
class CommentAdmin(admin.ModelAdmin):
    
    list_display = (
        'message',
        'creator',
        'project',
        'created_at',
        'updated_at',
    )