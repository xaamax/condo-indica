from rest_framework import serializers

from .models import Provider

class ProviderCompactSerializer(serializers.ModelSerializer):
    category = serializers.CharField(source='category.name', read_only=True)
    address = serializers.CharField(read_only=True)
    
    class Meta:
        model = Provider
        fields = ['id', 'category', 'phone', 'description', 'address']

class ProviderSerializer(serializers.ModelSerializer):
        
    class Meta:
        model = Provider
        fields = '__all__'
