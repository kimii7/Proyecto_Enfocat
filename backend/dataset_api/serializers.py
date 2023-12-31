from .models import EstadoAsignatura, Profesor, Asignatura
from rest_framework import serializers

class EstadoAsignaturaSerializer(serializers.ModelSerializer):
    class Meta:
        model = EstadoAsignatura
        fields = ['usuario_id','asignatura_id','profesor_id','fecha','ira','odio','tristeza','felicidad','sorpresa', 'neutral']

class ProfesorSerializer(serializers.ModelSerializer):
    class Meta:
        model = Profesor
        fields = ['id','usuario_id','nombre','apellido']

class AsignaturaSerializer(serializers.ModelSerializer):
    class Meta:
        model = Asignatura
        fields = ['id', 'usuario_id', 'nombre']