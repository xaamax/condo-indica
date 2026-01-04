from rest_framework.permissions import IsAdminUser, DjangoModelPermissions
from rest_framework import viewsets

from .filters import ProviderFilterClass
from .models import Provider
from .serializers import ProviderSerializer


class ProviderViewSet(viewsets.ModelViewSet):
    queryset = Provider.objects.all()
    serializer_class = ProviderSerializer
    rql_filter_class = ProviderFilterClass
    permission_classes = [DjangoModelPermissions, IsAdminUser]
