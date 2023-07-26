from django.contrib import admin
from django.urls import path, include
from . import views


urlpatterns = [
    path('doctors',views.Doctor_details,name="doctors"),
    path('roles',views.roles,name='roles'),
    path('addroles',views.Add_role,name='addroles'),
    path('admin_patients',views.patient_details,name='admin_patients'),
    path('block_user',views.block_user,name="block_user"),
    
]