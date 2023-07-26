from django.db import models
from django.contrib.auth.models import User,AbstractUser,UserManager
from Doctor.models import *

# from .models import DoctorQualification
# Create your models here.


# class CustomUser(AbstractUser):

#     username = None
#     email = models.EmailField(max_length=200,unique=True)
    
#     USERNAME_FIELD= 'email'
#     REQUIRED_FIELDS = []

#     objects = UserManager()

class Patients(models.Model):
    user = models.ForeignKey(User,on_delete=models.CASCADE)
    first_name = models.CharField(max_length=200,blank=True)
    last_name = models.CharField(max_length=200,blank=True)
    profile = models.ImageField(upload_to="images/",default=None)
    is_active = models.BooleanField(default=True)
    def __str__(self):
        return self.user.username

class Roles(models.Model):
    role_name = models.CharField(max_length=200,null=True)
    
    def __str__(self) -> str:
        return self.role_name

class Doctors(models.Model):
    user = models.ForeignKey(User,on_delete=models.CASCADE)
    role = models.ForeignKey(Roles,on_delete=models.CASCADE,null=True)
    first_name = models.CharField(max_length=200,blank=True)
    last_name = models.CharField(max_length=200,blank=True)
    profile = models.ImageField(upload_to="images/doc/",default=None)
    is_active = models.BooleanField(default=True)
    availabilities = models.ManyToManyField(Availability)

    def create_default_slots(self):
            # Create default slots for specific times on this availability date
        for availability in self.availabilities.all():
            Slot.objects.create(time='09:00', availability=True, availability_day=availability)
            Slot.objects.create(time='10:00', availability=True, availability_day=availability)
            Slot.objects.create(time='11:00', availability=True, availability_day=availability)
            Slot.objects.create(time='12:00', availability=True, availability_day=availability)
            Slot.objects.create(time='13:00', availability=True, availability_day=availability)
            Slot.objects.create(time='14:00', availability=True, availability_day=availability)

    # Qualification = models.OneToOneField(DoctorQualification,on_delete=models.CASCADE)

    def __str__(self):
        return self.user.username


class Appointments(models.Model):
    patient = models.ForeignKey(Patients, on_delete=models.CASCADE)
    doctors = models.ForeignKey(Doctors,on_delete=models.CASCADE)


# class DoctorQualification(models.Model):
#     details = models.TextField(max_length=400,blank=True)