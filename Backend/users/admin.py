from django.contrib import admin
from .models import Patients,Doctors,Roles,Appointments

# Register your models here.

admin.site.register(Patients)
admin.site.register(Doctors)
admin.site.register(Roles)
admin.site.register(Appointments)
