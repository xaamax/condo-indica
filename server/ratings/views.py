from rest_framework.permissions import IsAdminUser, DjangoModelPermissions
from rest_framework import viewsets

from .filters import RatingFilterClass
from .models import Rating
from .serializers import RatingSerializer


class RatingViewSet(viewsets.ModelViewSet):
    queryset = Rating.objects.all()
    serializer_class = RatingSerializer
    rql_filter_class = RatingFilterClass
    permission_classes = [DjangoModelPermissions, IsAdminUser]
