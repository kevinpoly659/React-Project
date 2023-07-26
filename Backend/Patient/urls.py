from django.urls import path
from .views import *
from . import views



urlpatterns = [
    path('changeprofilepic',views.Changeprofilepic,name="changeprofilepic"),
    path('details',views.Details,name="details"),
    path('appointment',views.Appointment,name="appointment"),
    path('filterdoctor',views.Filter_Doctor,name="filterdoctor"),


]