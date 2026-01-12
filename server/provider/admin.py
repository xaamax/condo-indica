from django.contrib import admin
from .models import Provider


@admin.register(Provider)
class ProviderAdmin(admin.ModelAdmin):
    list_display = ('phone', 'category', 'description', 'address', 'user')
    list_filter = ('category', 'user')
    search_fields = ('phone', 'category__name', 'address', 'user__username')
