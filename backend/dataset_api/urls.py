from django.urls import path
from . import views

urlpatterns = [
    path('post/record', views.UploadRecord.as_view()),
    path('showAllRecords/<int:user_id>', views.ShowAll.as_view()),
    path('showTodayRecords/<int:user_id>', views.ShowToday.as_view())
]