from django.db import models

# Create your models here.
class Placeholder(models.Model):
    estado = models.BooleanField()
    hora = models.DateTimeField(auto_now=False, auto_now_add=False)
    asignatura = models.CharField(max_length=60)
    profesor = models.CharField(max_length=60)