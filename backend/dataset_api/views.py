from django.shortcuts import render

from django.http import Http404
from rest_framework import permissions, status
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.authentication import SessionAuthentication

from .models import EstadoAsignatura, Profesor, Asignatura, Horario
from .serializers import EstadoAsignaturaSerializer, ProfesorSerializer, AsignaturaSerializer, HorarioSerializer

from datetime import datetime, timedelta

from django.db.models import Q

# Create your views here.
class ShowAll(APIView):
    permission_classes = (permissions.AllowAny, )
    authentication_classes = (SessionAuthentication, )
    def get(self, request, user_id, format=None):
        estadoAsignatura = EstadoAsignatura.objects.filter(usuario_id=user_id)
        serializer = EstadoAsignaturaSerializer(estadoAsignatura, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

class ShowToday(APIView):
    permission_classes = (permissions.AllowAny, )
    authentication_classes = (SessionAuthentication, )
    def get(self, request, user_id, format=None):
        hoy = datetime.today()
        hoy = hoy.strftime('%d/%m/%Y')
        estadoAsignatura = EstadoAsignatura.objects.filter(fecha__contains=hoy, usuario_id=user_id)
        serializer = EstadoAsignaturaSerializer(estadoAsignatura, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

class ShowWeek(APIView):
    permission_classes = (permissions.AllowAny, )
    authentication_classes = (SessionAuthentication, )
    def get(self, request, user_id, format=None):
        # Obtén la fecha de inicio y fin de la semana actual
        hoy = datetime.now().date()
        inicio_semana = hoy - timedelta(days=hoy.weekday())
        fin_semana = inicio_semana + timedelta(days=6)

        # Convierte las fechas de inicio y fin de la semana en strings en formato d/m/y
        inicio_semana_str = inicio_semana.strftime('%d/%m/%Y')
        fin_semana_str = fin_semana.strftime('%d/%m/%Y')

        estadoAsignatura = EstadoAsignatura.objects.filter(Q(fecha__startswith=inicio_semana_str[:5]) | Q(fecha__endswith=fin_semana_str[3:]),usuario_id=user_id)
        serializer = EstadoAsignaturaSerializer(estadoAsignatura, many=True)
        return Response( serializer.data, status=status.HTTP_200_OK)

class ShowMonth(APIView):
    permission_classes = (permissions.AllowAny, )
    authentication_classes = (SessionAuthentication, )
    def get(self, request, user_id, format=None):
        hoy = datetime.today()
        hoy = hoy.strftime('%m/%Y')
        estadoAsignatura = EstadoAsignatura.objects.filter(fecha__contains=hoy, usuario_id=user_id)
        serializer = EstadoAsignaturaSerializer(estadoAsignatura, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

class UploadRecord(APIView):
    permission_classes = (permissions.AllowAny, )
    authentication_classes = (SessionAuthentication, )
    def post(self, request, format=None):
        serializer = EstadoAsignaturaSerializer(data=request.data)
        if serializer.is_valid(raise_exception=True):
            record = serializer.create(request.data)
            if record:
                return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(status=status.HTTP_400_BAD_REQUEST)

class getProfesores(APIView):
    permission_classes = (permissions.AllowAny, )
    authentication_classes = (SessionAuthentication, )
    def get(self, request, user_id, format=None):
        profesor = Profesor.objects.filter(usuario_id=user_id)
        serializer = ProfesorSerializer(profesor, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

class getProfesorById(APIView):
    permission_classes = (permissions.AllowAny, )
    authentication_classes = (SessionAuthentication, )
    def get(self, request, prof_id, format=None):
        profesor = Profesor.objects.filter(id=prof_id)
        serializer = ProfesorSerializer(profesor, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

class getAsignaturas(APIView):
    permission_classes = (permissions.AllowAny, )
    authentication_classes = (SessionAuthentication, )
    def get(self, request, user_id, format=None):
        asignatura = Asignatura.objects.filter(usuario_id=user_id)
        serializer = AsignaturaSerializer(asignatura, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

class getAsignaturaById(APIView):
    permission_classes = (permissions.AllowAny, )
    authentication_classes = (SessionAuthentication, )
    def get(self, request, asign_id, format=None):
        asignatura = Asignatura.objects.filter(id=asign_id)
        serializer = AsignaturaSerializer(asignatura, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

class getHorario(APIView):
    permission_classes = (permissions.AllowAny, )
    authentication_classes = (SessionAuthentication, )
    def get(self, request, user_id, format=None):
        horario = Horario.objects.filter(usuario_id=user_id)
        serializer = HorarioSerializer(horario, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)