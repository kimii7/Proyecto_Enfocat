from django.conf import settings
from django.db import models
from user_api.models import models

# Create your models here.
class Placeholder(models.Model):
    usuario = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
    )
    contentos = models.IntegerField(default=0)
    desanimados = models.IntegerField(default=0)
    fecha = models.DateTimeField(auto_now_add=True)
    hora = models.TimeField(auto_now_add=True)
    asignatura = models.CharField(max_length=60)
    profesor = models.CharField(max_length=60)