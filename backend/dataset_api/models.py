from django.conf import settings
from django.db import models
from user_api.models import models

from datetime import datetime, timedelta

# Create your models here.
class Profesor(models.Model):
    usuario = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
    )
    nombre = models.CharField(max_length=60)
    apellido = models.CharField(max_length=60)

class Asignatura(models.Model):
    usuario = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
    )
    nombre = models.CharField(max_length=60)

class Horario(models.Model):
    usuario = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
    )
    profesor = models.ForeignKey(Profesor, on_delete=models.CASCADE)
    asignatura = models.ForeignKey(Asignatura, on_delete=models.CASCADE)
    dia = models.IntegerField()
    hora = models.IntegerField()

class EstadoAsignatura(models.Model):
    hoy = datetime.now()
    hoy = hoy + timedelta(hours=2)
    usuario = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
    )
    felicidad = models.IntegerField(default=0)
    tristeza = models.IntegerField(default=0)
    ira = models.IntegerField(default=0)
    odio = models.IntegerField(default=0)
    sorpresa = models.IntegerField(default=0)
    fecha = models.DateTimeField(default=hoy)
    asignatura = models.ForeignKey(Asignatura, on_delete=models.CASCADE)
    profesor = models.ForeignKey(Profesor, on_delete=models.CASCADE)