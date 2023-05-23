from django.urls import path
from .views import *
from . import views


urlpatterns = [
    path('register',RegisterPatientView.as_view()),
    path('login',RetrievePatientView.as_view()),
    path('register_doc',RegisterDoctorView.as_view()),
    path('login_doc',RetrieveDoctorView.as_view()),
    path('admin',RetrieveAdminView.as_view()),
    path('admin_doctors',views.doctor_details,name='admin_doctors'),
    path('admin_patients',views.patient_details,name='admin_patients'),

]