from rest_framework import serializers
from users .models import Patients,Doctors,Roles,Appointments
from .models import *
from Booking .models import *
from django.contrib.auth.models import User
from rest_framework_simplejwt.views import (
    TokenRefreshView,
    TokenVerifyView
)
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView



class DoctorSerializer(serializers.ModelSerializer):
    class Meta:
        model=Doctors
        fields = "__all__" 


class AppointmentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Appointments
        fields = "__all__"


class AvailabilitySerializer(serializers.ModelSerializer):
    class Meta:
        model = Availability
        fields = "__all__"


class SlotSerializer(serializers.ModelSerializer):
    class Meta:
        model = Slot
        fields = "__all__"


class BookingSerializer(serializers.ModelSerializer):
    class Meta:
        model = Bookings
        fields = "__all__"