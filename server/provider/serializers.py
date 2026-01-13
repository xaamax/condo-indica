from rest_framework import serializers
from categories.serializers import CategorySerializer

from .models import Provider

class ProviderCompactSerializer(serializers.ModelSerializer):
    category = serializers.CharField(source='category.name', read_only=True)
    reputation = serializers.FloatField(read_only=True)
    
    class Meta:
        model = Provider
        fields = ['id', 'name', 'category', 'phone', 'description', 'address', 'reputation']

class ProviderSerializer(serializers.ModelSerializer):
    category = CategorySerializer(read_only=True)
        
    class Meta:
        model = Provider
        fields = '__all__'
