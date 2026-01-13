from rest_framework.permissions import DjangoModelPermissions
from rest_framework.viewsets import ModelViewSet

from .filters import RatingFilterClass
from .models import Rating
from .serializers import RatingSerializer
from condominium.models import CondominiumResident


class RatingViewSet(ModelViewSet):
    queryset = Rating.objects.all()
    serializer_class = RatingSerializer
    rql_filter_class = RatingFilterClass
    permission_classes = [DjangoModelPermissions]
    
    def perform_create(self, serializer):
        resident = CondominiumResident.objects.get(user=self.request.user)
        serializer.save(resident=resident)
