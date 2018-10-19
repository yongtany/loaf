from django.contrib import admin
from . import models

# Register your models here.

@admin.register(models.Post)
class PostAdmin(admin.ModelAdmin):

    list_display_links = (
        'title',
    )

    search_fields = (
        'title',
    )

    list_filter = (
        'title',
        'creator'
    )

    list_display = (
        'file',
        'image',
        'title',
        'creator',
        'created_at',
        'updated_at',
    )