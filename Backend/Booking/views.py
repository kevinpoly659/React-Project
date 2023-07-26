from django.shortcuts import render
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import permissions, status
from .models import *
from .serializers import RoomSerializer
from users.models import *
import razorpay
# Create your views here.



@api_view(['POST'])
def Apply(request):
    data = request.data
    print(data)
    doc = data['Doctor']
    pat = data['Patient']
    slot_id = data['Slot']
    patient = Patients.objects.get(id=pat)
    doctor = Doctors.objects.get(id=doc['id'])
    slot = Slot.objects.get(id=slot_id['id'])
    slot.is_booked = True
    patient_details = Patient_details.objects.create(first_name=data['First_name'],last_name=data['Last_name'],age=data['Age'],gender=data['Gender'],description=data['Condition'])
    patient_details.save()
    booking = Bookings.objects.create(doctor=doctor,patient=patient,slot=slot,patient_details=patient_details)
    booking.save()
    roomId = patient.first_name + "" + doctor.first_name
    try:
        room=ConferenceRooms.objects.get(patient=patient,doctor=doctor)
    except:
        room = ConferenceRooms.objects.create(patient=patient,doctor=doctor,roomId=roomId)
        room.save()

    return Response(status=status.HTTP_200_OK)

@api_view(['POST'])
def Room(request):
    data = request.data
    
    print(data)

    doctor = Doctors.objects.get(id=data['doctor'])
    patient = Patients.objects.get(id=data['patient'])
    room = ConferenceRooms.objects.get(patient=patient,doctor=doctor)
    roomId = room.roomId
    serializer = RoomSerializer(room)
    print(serializer)



    return Response(serializer.data['roomId'],status=status.HTTP_200_OK)



def create(request):
    client = razorpay.Client(auth=('rzp_test_GvgWclBbIZzq5L', 'dgLtjZqq44a63Xwfeyj76k4R'))
    
    # Create the Razorpay order
    data = {
        'amount': 25000,  # The amount in paise or the smallest currency unit
        'currency': 'INR',  # The currency code
        'payment_capture': 1  # Automatically capture payments
    }
    
    order = client.order.create(data=data)
    
    # Retrieve the order ID
    order_id = order['id']
    
    return order_id


@api_view(['GET'])
def create_payment(request):
    amount = 25000  # Example amount (in paise)
    
    order_id = create(amount)
    
    return Response({'order_id': order_id})
    