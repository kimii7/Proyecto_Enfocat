from django.shortcuts import render

from django.http import Http404
from rest_framework import permissions, status
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.authentication import SessionAuthentication

from .models import Placeholder
from .serializers import PlaceholderSerializer

from datetime import datetime, timedelta

# Create your views here.
class ShowAll(APIView):
    permission_classes = (permissions.AllowAny, )
    authentication_classes = (SessionAuthentication, )
    def get(self, request, user_id, format=None):
        placeholder = Placeholder.objects.filter(usuario_id=user_id)
        serializer = PlaceholderSerializer(placeholder, many=True)
        return Response(serializer.data)

#TODO: comprobar que funcionan los filtrados de dias en la api
class ShowToday(APIView):
    permission_classes = (permissions.AllowAny, )
    authentication_classes = (SessionAuthentication, )
    def get(self, request, user_id, format=None):
        hoy = datetime.today()
        hoy = hoy.strftime('%Y-%m-%d')
        placeholder = Placeholder.objects.filter(fecha__contains=hoy, usuario_id=user_id)
        serializer = PlaceholderSerializer(placeholder, many=True)
        return Response(serializer.data)

class ShowWeek(APIView):
    def get(self, request, format=None):
        hoy = datetime.today()
        dias_desde_lunes = (hoy.weekday() - 0) % 7  # 0 representa el lunes
        lunes = hoy - timedelta(days=dias_desde_lunes)
        domingo = lunes + timedelta(days=6)

        placeholder = Placeholder.objects.filter(date__range=[lunes, domingo])
        serializer = PlaceholderSerializer(placeholder, many=True)
        return Response(serializer.data)

class ShowMonth(APIView):
    def get(self, request, format=None):
        mes = datetime.now().month
        placeholder = Placeholder.objects.filter(date__month=mes)
        serializer = PlaceholderSerializer(placeholder, many=True)
        return Response(serializer.data)
    
class UploadRecord(APIView):
    permission_classes = (permissions.AllowAny, )
    authentication_classes = (SessionAuthentication, )
    def post(self, request, format=None):
        serializer = PlaceholderSerializer(data=request.data)
        if serializer.is_valid(raise_exception=True):
            record = serializer.create(request.data)
            if record:
                return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(status=status.HTTP_400_BAD_REQUEST)