from django.urls import path
from .views import *
from . import views


urlpatterns = [
    path('register',RegisterPatientView.as_view()),
    path('login',RetrievePatientView.as_view()),
    path('register_doc',RegisterDoctorView.as_view()),
    path('login_doc',RetrieveDoctorView.as_view()),
    path('admin',RetrieveAdminView.as_view()),
    # path('doctors_details',views.doctor_details,name='doctors_details'),
    # path('roles',views.roles,name='roles'),
    # path('admin_patients',views.patient_details,name='admin_patients'),
    # path('block_user',views.block_user,name="block_user"),
    path('apply',views.Apply,name="apply"),
    path('patient',views.Patient,name="patient"),
    path('editpatient',view=EditPatient,name="editpatient"),
]