from django.contrib import admin
from .models import Rating


@admin.register(Rating)
class RatingAdmin(admin.ModelAdmin):
    list_display = ('stars', 'provider', 'comment', 'resident')
    list_filter = ('provider', 'resident')
    search_fields = ('stars', 'comment')
