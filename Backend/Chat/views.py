from django.shortcuts import render
from rest_framework.decorators import api_view
from users.models import *
from Booking.models import Bookings
from rest_framework.response import Response
from rest_framework import status
from users.serializers import DoctorlistSerializers,PatientlistSerializers
# Create your views here.

@api_view(['POST'])
def Contacts(request):
    data = request.data
    try:
            pat=Patients.objects.get(id=data['id'])
            doctors = Doctors.objects.filter(bookings__patient_id=data['id']).distinct()
            serializer = DoctorlistSerializers(doctors,many=True)
            print(doctors)
    except:
            doc=Doctors.objects.get(id=data['id'])
            patients = Patients.objects.filter(bookings__doctor_id=data['id']).distinct()
            serializer = PatientlistSerializers(patients,many=True)
            print(patients)
    return Response(serializer.data,status=status.HTTP_200_OK)