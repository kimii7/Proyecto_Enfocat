from django.urls import path
from . import views

urlpatterns = [
    path('post/record', views.UploadRecord.as_view()),
    path('showAllRecords/<int:user_id>', views.ShowAll.as_view()),
    path('showTodayRecords/<int:user_id>', views.ShowToday.as_view()),
    path('showMonthRecords/<int:user_id>', views.ShowMonth.as_view()),
    path('showWeekRecords/<int:user_id>', views.ShowWeek.as_view()),
    path('showByTeacher', views.ShowByTeacher.as_view()),
    path('showByAsignatura', views.ShowByAsignment.as_view()),
    path('profesores/<int:user_id>', views.getProfesores.as_view()),
    path('profesor/<int:prof_id>', views.getProfesorById.as_view()),
    path('asignaturas/<int:user_id>', views.getAsignaturas.as_view()),
    path('asignatura/<int:asign_id>', views.getAsignaturaById.as_view()),
    path('horario/<int:user_id>', views.getHorario.as_view()),
]