from rest_framework.permissions import IsAdminUser, DjangoModelPermissions
from rest_framework import viewsets

from .filters import AddressFilterClass
from .models import Address
from .serializers import AddressSerializer


class AddressViewSet(viewsets.ModelViewSet):
    queryset = Address.objects.all()
    serializer_class = AddressSerializer
    rql_filter_class = AddressFilterClass
    permission_classes = [DjangoModelPermissions, IsAdminUser]
