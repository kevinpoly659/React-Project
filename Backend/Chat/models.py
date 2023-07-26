from django.db import models
from users.models import Patients,Doctors
# Create your models here.


class Messages:
    patient = models.ForeignKey(Patients,on_delete=models.CASCADE)
    doctor  = models.ForeignKey(Doctors,on_delete=models.CASCADE)
    message = models.TextField(max_length=5000)
    