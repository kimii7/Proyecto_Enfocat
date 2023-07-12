from django.shortcuts import render

from django.http import Http404
from rest_framework import status
from rest_framework.views import APIView
from rest_framework.response import Response

from .models import Placeholder
from .serializers import PlaceholderSerializer

from datetime import datetime, timedelta

# Create your views here.
class ShowAll(APIView):
    def get(self, request, format=None):
        placeholder = Placeholder.objects.all()
        serializer = PlaceholderSerializer(placeholder, many=True)
        return(serializer.data)

#TODO: comprobar que funcionan los filtrados de dias en la api
class ShowToday(APIView):
    def get(self, request, format=None):
        hoy = datetime.today()
        placeholder = Placeholder.objects.filter(created_at__date=hoy)
        serializer = PlaceholderSerializer(placeholder, many=True)
        return(serializer.data)

class ShowWeek(APIView):
    def get(self, request, format=None):
        hoy = datetime.today()
        dias_desde_lunes = (hoy.weekday() - 0) % 7  # 0 representa el lunes
        lunes = hoy - timedelta(days=dias_desde_lunes)
        domingo = lunes + timedelta(days=6)

        placeholder = Placeholder.objects.filter(date__range=[lunes, domingo])
        serializer = PlaceholderSerializer(placeholder, many=True)
        return(serializer.data)

class ShowMonth(APIView):
    def get(self, request, format=None):
        mes = datetime.now().month
        placeholder = Placeholder.objects.filter(date__month=mes)
        serializer = PlaceholderSerializer(placeholder, many=True)
        return(serializer.data)