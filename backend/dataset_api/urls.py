from django.urls import path
from . import views

urlpatterns = [
    path('placeholder', views.ShowAll.as_view()),
]