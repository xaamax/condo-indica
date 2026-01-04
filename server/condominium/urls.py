from django.urls import path, include
from rest_framework.routers import DefaultRouter

from .views import CondominiumViewSet, CondominiumResidentViewSet, CondominiumProviderViewSet

router = DefaultRouter()
router.register('condominiuns', CondominiumViewSet)
router.register('condominium-residents', CondominiumResidentViewSet)
router.register('condominium-providers', CondominiumProviderViewSet)

urlpatterns = [
    path('', include(router.urls))
]
