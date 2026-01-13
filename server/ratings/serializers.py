from rest_framework import serializers
from provider.serializers import ProviderSerializer
from condominium.serializers import CondominiumResidentSerializer

from .models import Rating


class RatingSerializer(serializers.ModelSerializer):
    provider = ProviderSerializer(read_only=True)
    resident = CondominiumResidentSerializer(read_only=True)
    
    class Meta:
        model = Rating
        fields = ['id','stars','comment','provider','resident']
