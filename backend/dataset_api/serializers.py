from .models import Placeholder
from rest_framework import serializers

class PlaceholderSerializer(serializers.ModelSerializer):
    class Meta:
        model = Placeholder
        fields = ['id', 'estado', 'hora', 'asignatura', 'profesor']