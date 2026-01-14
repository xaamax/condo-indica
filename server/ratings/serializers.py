from rest_framework import serializers
from condominium.serializers import CondominiumResidentSerializer

from .models import Rating

class RatingCompactSerializer(serializers.ModelSerializer):
    provider = serializers.CharField(source='provider.name', read_only=True)
    category = serializers.CharField(source='provider.category.name', read_only=True)
    resident = CondominiumResidentSerializer(read_only=True)
    
    class Meta:
        model = Rating
        fields = ['id','stars','comment','provider','category','resident']


class RatingSerializer(serializers.ModelSerializer):
    resident = CondominiumResidentSerializer(read_only=True)
    
    class Meta:
        model = Rating
        fields = '__all__'
