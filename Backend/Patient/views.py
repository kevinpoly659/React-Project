from django.shortcuts import render
from . serializers import *
from rest_framework.decorators import api_view
from users.models import *
from rest_framework.response import Response
from rest_framework import permissions, status
from Booking.models import *
from Booking.serializers import BookingSerializer,Patient_details_Serializer



@api_view(['POST'])
def Changeprofilepic(request):
    data = request.data
    
    print(data)
    # patients = Patients.objects.get(id=data['id'])

    # patients.profile = data['profile']
    

    # patients.save()

    return Response(status=status.HTTP_200_OK)
    

@api_view(['POST'])
def Details(request):
    data = request.data
    print(data)
    doctor = Doctors.objects.get(id=data['id'])
    slots = Slot.objects.filter(doctor=doctor)
    doctorserializer = DoctorSerializer(doctor)
    
    role = Roles.objects.get(id=doctorserializer.data['role'])
    role_serializer = RoleSerializer(role)
    # print(role_serializer.data)
    # doctorserializer.data['role']=role_serializer.data['role_name']
    # print(doctorserializer.data)
    slotserializer = SlotSerializer(slots,many=True)

    return Response({'doctor':doctorserializer.data,'slots':slotserializer.data,'role_name':role_serializer.data},status=status.HTTP_200_OK)



@api_view(['POST'])
def Appointment(request):
    data=request.data
    patient = Patients.objects.get(id=data['id'])
    bookings = Bookings.objects.filter(patient=patient)
    print(bookings)

    serializers = BookingSerializer(bookings,many=True)

    for i in serializers.data:
        doctor = Doctors.objects.get(id=i['doctor'])
        doctorserializer = DoctorSerializer(doctor)
        role = Roles.objects.get(id=doctorserializer.data['role'])
        roleserializer = RoleSerializer(role)
        print(roleserializer.data)
        doctorserializer.data['role'] = roleserializer.data
        i['doctor'] = doctorserializer.data

        patient_details = Patient_details.objects.get(id=i['patient_details'])
        patientserializer = Patient_details_Serializer(patient_details)
        i['patient_details'] = patientserializer.data    

        slot = Slot.objects.get(id=i['slot'])
        slotserializer = SlotSerializer(slot)
        i['slot'] = slotserializer.data    

    return Response(serializers.data,status=status.HTTP_200_OK)

@api_view(['POST'])
def Filter_Doctor(request):
    data=request.data
    print(data)
    role = Roles.objects.get(role_name=data['role'])
    doctors = Doctors.objects.filter(role=role)
    serializer = DoctorSerializer(doctors,many=True)
    for i in serializer.data:
        i['role']=role.role_name
    print(doctors)
    return Response({'doctors':serializer.data},status=status.HTTP_200_OK)