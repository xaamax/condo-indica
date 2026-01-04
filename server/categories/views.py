from rest_framework.permissions import IsAdminUser, DjangoModelPermissions
from rest_framework import viewsets

from .filters import CategoryFilterClass
from .models import Category
from .serializers import CategorySerializer


class CategoryViewSet(viewsets.ModelViewSet):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer
    rql_filter_class = CategoryFilterClass
    permission_classes = [DjangoModelPermissions, IsAdminUser]
