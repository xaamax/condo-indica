from django.contrib import admin
from .models import Condominium, CondominiumResident, CondominiumProvider


@admin.register(Condominium)
class CondominiumAdmin(admin.ModelAdmin):
    list_display = (
        'name',)
    list_filter = ('name',)
    search_fields = ('name',)


@admin.register(CondominiumResident)
class CondominiumResidentAdmin(admin.ModelAdmin):
    list_display = ('user', 'condominium', 'apartment', 'block')
    list_filter = ('user', 'condominium')
    search_fields = ('user', 'condominium')


@admin.register(CondominiumProvider)
class CondominiumProviderAdmin(admin.ModelAdmin):
    list_display = ('provider', 'condominium')
    list_filter = ('provider', 'condominium')
    search_fields = ('provider', 'condominium')
