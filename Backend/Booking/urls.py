from django.urls import path
from .views import *
from . import views



urlpatterns = [
    path('apply',views.Apply,name="apply"),
    path('confirm',views.create_payment,name='confirm'),
    path('room',views.Room,name="room"),
]