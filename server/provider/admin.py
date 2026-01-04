from django.contrib import admin
from .models import Provider


@admin.register(Provider)
class ProviderAdmin(admin.ModelAdmin):
    list_display = ('phone', 'category', 'description', 'address', 'user')
    list_filter = ('category', 'address', 'user')
    search_fields = ('phone', 'category__name', 'address__address', 'user__username')
