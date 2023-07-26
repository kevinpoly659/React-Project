from rest_framework import serializers
from users .models import Patients,Doctors,Roles,Appointments
from .models import *
from Booking .models import *
from django.contrib.auth.models import User





class Patient_details_Serializer(serializers.ModelSerializer):
    class Meta:
        model = Patient_details
        fields = "__all__"


class BookingSerializer(serializers.ModelSerializer):
    class Meta:
        model = Bookings
        fields = "__all__"


class RoomSerializer(serializers.ModelSerializer):
    class Meta:
        model = ConferenceRooms
        fields = ['roomId']

        