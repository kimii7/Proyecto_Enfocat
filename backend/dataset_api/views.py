from django.shortcuts import render

from rest_framework import permissions, status
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.authentication import SessionAuthentication

from .models import EstadoAsignatura, Profesor, Asignatura, Horario
from .serializers import EstadoAsignaturaSerializer, ProfesorSerializer, AsignaturaSerializer, HorarioSerializer

from datetime import datetime, timedelta, date, time

from django.utils import timezone

from django.db.models.functions import ExtractMonth

from django.db.models import Q

import json

from .data.reconocimiento_emociones import ejecutar_script

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
        today_min = datetime.combine(date.today(), time.min)
        today_max = datetime.combine(date.today(), time.max)
        estadoAsignatura = EstadoAsignatura.objects.filter(fecha__range=(today_min, today_max), usuario_id=user_id)
        serializer = EstadoAsignaturaSerializer(estadoAsignatura, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

class ShowWeek(APIView):
    permission_classes = (permissions.AllowAny, )
    authentication_classes = (SessionAuthentication, )
    def get(self, request, user_id, format=None):
        week_start = date.today()
        week_start -= timedelta(days=week_start.weekday())
        week_end = week_start + timedelta(days=7)

        estadoAsignatura = EstadoAsignatura.objects.filter(fecha__gte=week_start,fecha__lt=week_end,usuario_id=user_id)
        serializer = EstadoAsignaturaSerializer(estadoAsignatura, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

class ShowMonth(APIView):
    permission_classes = (permissions.AllowAny, )
    authentication_classes = (SessionAuthentication, )
    def get(self, request, user_id, format=None):
        mes_actual = datetime.now().month

        consulta = '''
            SELECT *
            FROM dataset_api_estadoasignatura
            WHERE EXTRACT(MONTH FROM fecha) = %s
            AND usuario_id = %s
        '''

        estadoAsignatura = EstadoAsignatura.objects.raw(consulta, [mes_actual, user_id])
        serializer = EstadoAsignaturaSerializer(estadoAsignatura, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

class ShowByTeacher(APIView):
    permission_classes = (permissions.AllowAny, )
    authentication_classes = (SessionAuthentication, )
    def get(self, request, *args, format=None):
        user_id = request.GET.get('usuario_id', None)
        prof_id = request.GET.get('profesor_id', None)
        estadoAsignatura = EstadoAsignatura.objects.filter(usuario_id=user_id, profesor_id=prof_id)
        serializer = EstadoAsignaturaSerializer(estadoAsignatura, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

class ShowByAsignment(APIView):
    permission_classes = (permissions.AllowAny, )
    authentication_classes = (SessionAuthentication, )
    def get(self, request, *args, format=None):
        user_id = request.GET.get('usuario_id', None)
        asign_id = request.GET.get('asignatura_id', None)
        estadoAsignatura = EstadoAsignatura.objects.filter(usuario_id=user_id, asignatura_id=asign_id)
        serializer = EstadoAsignaturaSerializer(estadoAsignatura, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

class UploadRecord(APIView):
    permission_classes = (permissions.AllowAny, )
    authentication_classes = (SessionAuthentication, )
    def post(self, request, format=None):
        data = request.data
        emociones_dic = { "felicidad": 0, "tristeza": 0, "odio": 0, "ira": 0, "sorpresa": 0, "neutral": 0}
        
        result = ejecutar_script()
        emociones = json.loads(result)
        
        for diccionario in emociones:
            emocion = diccionario["Emocion"].lower()
            cantidad = diccionario["Cantidad"]
            emociones_dic[emocion] = cantidad
        
        data.update(emociones_dic)

        serializer = EstadoAsignaturaSerializer(data = data)
        if serializer.is_valid(raise_exception=True):
            estado = serializer.create(data)
            if estado:
                return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(status=status.HTTP_400_BAD_REQUEST)

class PostProfesor(APIView):
    permission_classes = (permissions.AllowAny, )
    authentication_classes = (SessionAuthentication, )
    def post(self, request, format=None):
        serializer = ProfesorSerializer(data=request.data)
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

class PostAsignatura(APIView):
    permission_classes = (permissions.AllowAny, )
    authentication_classes = (SessionAuthentication, )
    def post(self, request, format=None):
        serializer = AsignaturaSerializer(data=request.data)
        if serializer.is_valid(raise_exception=True):
            record = serializer.create(request.data)
            if record:
                return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(status=status.HTTP_400_BAD_REQUEST)

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