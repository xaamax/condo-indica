from rest_framework.permissions import IsAdminUser, DjangoModelPermissions
from rest_framework import viewsets

from .filters import CondominiumFilterClass
from .models import Condominium, CondominiumResident, CondominiumProvider
from .serializers import CondominiumSerializer, CondominiumResidentSerializer, CondominiumProviderSerializer


class CondominiumViewSet(viewsets.ModelViewSet):
    queryset = Condominium.objects.all()
    serializer_class = CondominiumSerializer
    rql_filter_class = CondominiumFilterClass
    permission_classes = [DjangoModelPermissions, IsAdminUser]


class CondominiumResidentViewSet(viewsets.ModelViewSet):
    queryset = CondominiumResident.objects.all()
    serializer_class = CondominiumResidentSerializer
    permission_classes = [DjangoModelPermissions, IsAdminUser]


class CondominiumProviderViewSet(viewsets.ModelViewSet):
    queryset = CondominiumProvider.objects.all()
    serializer_class = CondominiumProviderSerializer
    permission_classes = [DjangoModelPermissions, IsAdminUser]
