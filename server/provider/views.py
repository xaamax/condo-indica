from rest_framework.permissions import IsAdminUser, DjangoModelPermissions
from rest_framework import viewsets

from .filters import ProviderFilterClass
from .models import Provider
from .serializers import ProviderSerializer, ProviderCompactSerializer


class ProviderViewSet(viewsets.ModelViewSet):
    queryset = Provider.objects.all()
    rql_filter_class = ProviderFilterClass
    permission_classes = [DjangoModelPermissions]
    
    def get_serializer_class(self):
        if self.action in ['list', 'retrieve']:
            return ProviderCompactSerializer
        return ProviderSerializer
