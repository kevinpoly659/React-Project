from django.db import models
from users.models import *
from Doctor.models import *

# Create your models here.
class Patient_details(models.Model):
    first_name = models.CharField(max_length=200)
    last_name = models.CharField(max_length=200)
    gender = models.CharField(max_length=200)
    age = models.IntegerField()
    description = models.TextField(max_length=400)


class Bookings(models.Model):
    patient     = models.ForeignKey(Patients,on_delete=models.CASCADE)
    doctor     = models.ForeignKey(Doctors,on_delete=models.CASCADE)
    slot        = models.ForeignKey(Slot,on_delete=models.CASCADE)
    patient_details = models.ForeignKey(Patient_details,on_delete=models.CASCADE)
    is_approved = models.BooleanField(default=False)

class ConferenceRooms(models.Model):
    patient = models.ForeignKey(Patients,on_delete=models.CASCADE)
    doctor  = models.ForeignKey(Doctors,on_delete=models.CASCADE)
    roomId = models.CharField(max_length=200)