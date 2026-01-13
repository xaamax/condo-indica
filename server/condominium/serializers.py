from rest_framework import serializers
from .models import Condominium, CondominiumResident, CondominiumProvider


class CondominiumSerializer(serializers.ModelSerializer):
    class Meta:
        model = Condominium
        fields = '__all__'


class CondominiumResidentSerializer(serializers.ModelSerializer):
    condominium = serializers.StringRelatedField()
    
    class Meta:
        model = CondominiumResident
        fields = '__all__'


class CondominiumProviderSerializer(serializers.ModelSerializer):
    class Meta:
        model = CondominiumProvider
        fields = '__all__'
