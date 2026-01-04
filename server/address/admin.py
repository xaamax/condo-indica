from django.contrib import admin
from .models import Address


@admin.register(Address)
class AddressAdmin(admin.ModelAdmin):
    list_display = ('cep', 'street', 'number', 'neighborhood', 'city', 'state')
    list_filter = ('cep', 'street', 'city', 'state')
    search_fields = ('cep', 'street', 'city', 'state')
