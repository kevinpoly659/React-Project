from django.shortcuts import render
from rest_framework.decorators import api_view
from users .models import *
from Booking .models import *
from . serializers import *
from users.serializers import PatientlistSerializers,RoleSerializer
from users .serializers import UserSerializer
from django.contrib.auth.models import User
from rest_framework.response import Response
from rest_framework import permissions, status
from Booking .serializers import *
# Create your views here.


@api_view(['POST'])
def Doctorprofile(request):
    
    data = request.data
    doctor = Doctors.objects.get(id=data['id'])
    doctorserializer = DoctorSerializer(doctor)
    user = User.objects.get(id=doctor.user.id)
    userserializer = UserSerializer(user)

    role=Roles.objects.get(id=doctor.role.id)
    roles = Roles.objects.all()
    allRoleserializer = RoleSerializer(roles,many=True)
    roleserializer = RoleSerializer(role)
    print(doctorserializer.data)

    return Response({"doctor":doctorserializer.data,"user":userserializer.data,'role':roleserializer.data,'Roles':allRoleserializer.data},status=status.HTTP_200_OK)

@api_view(['POST'])
def Appointment(request):

    data = request.data
    doctor = Doctors.objects.get(id=data['doctor'])
    bookings = Bookings.objects.filter(doctor=doctor)
    serializer = BookingSerializer(bookings,many=True)

    for i in serializer.data:
        # i['doctor'] = Doctors.objects.get(id=i['doctor']).first_name
        # i['patient'] = Patients.objects.get(id=i['patient']).first_name
        # i['patient_details'] = Patient_details.objects.get(id=i['patient_details']).first_name
        patient = Patients.objects.get(id=i['patient'])
        patientserializer = PatientlistSerializers(patient)
        i['patient'] = patientserializer.data
        details = Patient_details.objects.get(id=i['patient_details'])
        detailserializer = Patient_details_Serializer(details)
        i['patient_details'] = detailserializer.data
        slot = Slot.objects.get(id=i['slot'])
        slotserializer = SlotSerializer(slot)

        if slotserializer.data['availability_day'] == 0:
            slotserializer.data['availability_day'] = 'Monday'
        elif slotserializer.data['availability_day'] == 1:
            slotserializer.data['availability_day'] = 'Tuesday'
        elif slotserializer.data['availability_day'] == 2:
            slotserializer.data['availability_day'] = 'Wednesday'
        elif slotserializer.data['availability_day'] == 3:
            slotserializer.data['availability_day'] = 'Thursday'
        elif slotserializer.data['availability_day'] == 4:
            slotserializer.data['availability_day'] = 'Friday'
        elif slotserializer.data['availability_day'] == 5:
            slotserializer.data['availability_day'] = 'Saturday'

        print(slotserializer.data['availability_day'])
        i['slot'] = slotserializer.data

    return Response(serializer.data,status=status.HTTP_200_OK)

@api_view(['POST'])
def EditDoctor(request):
    data =  request.data
    print(data)
    doctor = Doctors.objects.get(id=data['id'])
    doctor.first_name = data['first_name']
    doctor.last_name = data['last_name']
    doctor.role = Roles.objects.get(id=data['role'])
    user = User.objects.get(username=doctor.user.username)
    user.username = data['username']
    user.email = data['email']
    doctor.save()
    user.save()

    return Response({"message":"Edited User"},status=status.HTTP_200_OK)



@api_view(['GET'])
def Available(request):
    availability = Availability.objects.all()
    serializer = AvailabilitySerializer(availability,many=True)
    for i in serializer.data:
        if i['weekday'] == 0:
            i['weekday'] = 'Monday'
        elif i['weekday'] == 1:
            i['weekday'] = 'Tuesday'
        elif i['weekday'] == 2:
            i['weekday'] = 'Wednesday'
        elif i['weekday'] == 3:
            i['weekday'] = 'Thursday'
        elif i['weekday'] == 4:
            i['weekday'] = 'Friday'
        elif i['weekday'] == 5:
            i['weekday'] = 'Saturday'
    print(serializer.data)
    return Response(serializer.data,status=status.HTTP_200_OK)

@api_view(['POST'])
def Approve(request):
    data = request.data
    print(data)
    booking = Bookings.objects.get(id=data['booking_id'])
    slot = Slot.objects.get(id=booking.slot.id)
    slot.is_booked = not slot.is_booked
    booking.is_approved = not booking.is_approved
    booking.save()
    slot.save()
    print(booking.is_approved)
    print(booking.slot.is_booked)

    return Response(status=status.HTTP_200_OK)

@api_view(['POST'])
def Slots(request):
    data = request.data
    try:
        slot = Slot.objects.filter(doctor = Doctors.objects.get(id=data['id']),availability_day=Availability.objects.get(weekday=data['day']))
        serializer = SlotSerializer(slot,many=True)
        print(data)

        return Response({'Slots':serializer.data},status=status.HTTP_200_OK)
    except:
        return Response({'Slots':None})


@api_view(['POST'])
def ChangeStatus(request):
    data=request.data
    slot = Slot.objects.get(id=data['id'])
    slot.availability = not slot.availability
    slot.save()
    print(slot)
    return Response(status=status.HTTP_200_OK)



# @api_view(['POST'])
# def BookingDetails(request):
#     data = request.data
#     booking = Bookings.objects.get(id=data['id'])
#     patient_details = Patient_details.objects.get(patient_details=booking.patient_details)
#     # bookingserializer = BookingSerializer