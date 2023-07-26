from django.urls import path
from . import views



urlpatterns = [
    path('doctorprofile',views.Doctorprofile,name="doctorprofile"),
    path('appointments',views.Appointment,name="appointments"),
    path('editdoctor',views.EditDoctor,name="editdoctor"),
    path('approve',views.Approve,name="approve"),
    path('slots',views.Slots,name="slots"),
    path('available',views.Available,name="available"),
    path('changestatus',views.ChangeStatus,name="changestatus"),
]