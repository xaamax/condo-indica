from rest_framework.permissions import DjangoModelPermissions
from rest_framework import viewsets
from django.db.models import Avg
from django.db.models.functions import Coalesce

from .filters import ProviderFilterClass
from .models import Provider
from .serializers import ProviderSerializer, ProviderCompactSerializer


class ProviderViewSet(viewsets.ModelViewSet):
    queryset = Provider.objects.all()
    rql_filter_class = ProviderFilterClass
    permission_classes = [DjangoModelPermissions]
    
    def get_queryset(self):
        return Provider.objects.annotate(
            reputation=Coalesce(Avg('ratings__stars'), 0.0)
        )
    
    def get_serializer_class(self):
        if self.action in ['list']:
            return ProviderCompactSerializer
        return ProviderSerializer
