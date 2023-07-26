from django.shortcuts import render
from rest_framework.decorators import api_view
from users .models import *
from rest_framework.response import Response
from .serializers import *
from users .serializers import UserSerializer
from rest_framework import permissions, status

# Create your views here.
@api_view(['GET'])
def Doctor_details(request):
    doctors = Doctors.objects.all()
    roles= Roles.objects.all()
    # doctor_list=[]
    # for i in doctors:
    #     doctor_list.append(i.user)
    serializer=DoctorlistSerializers(doctors,many=True)
    # print(doctors)
    for j in roles:
        for i in serializer.data:
            if i['role'] == j.id:
                i['role'] = j.role_name
    # for i,j in serializer.data:
    print(serializer.data)
    #     j+=doctor_list[i]
    return Response(serializer.data)


@api_view(['GET'])
def roles(request):
    roles = Roles.objects.all()
    serializers = RoleSerializer(roles,many=True)

    return Response(serializers.data)


@api_view(['POST'])
def Add_role(request):
    data = request.data
    serializer = RoleCreateSerializer(data=data)
    if not serializer.is_valid():
        return Response(serializer.errors,status=status.HTTP_400_BAD_REQUEST)
    print(serializer.validated_data['role_name'])
    role=serializer.create(serializer.validated_data)
    if role is not None:
        return Response(status=status.HTTP_200_OK)
    else:
        return Response(status=status.HTTP_400_BAD_REQUEST)


@api_view(['GET'])
def patient_details(request):
    patients = Patients.objects.all()
    serializer = PatientlistSerializers(patients,many=True)

    
    return Response(serializer.data)

@api_view(['POST'])
def block_user(request):
    data = request.data
    print(data)
    user = User.objects.get(id=data['id'])
    try:
        doctors = Doctors.objects.get(user=user)
        if doctors.is_active == True:  
            doctors.is_active=False
            user.is_active=False
        else:
            doctors.is_active=True
            user.is_active=True
        print(user.is_active)
        print(doctors.is_active)
        doctors.save()
    except:
        patients = Patients.objects.get(user=user)
        if patients.is_active == True:  
            patients.is_active=False
            user.is_active=False
        else:
            patients.is_active=True
            user.is_active=True
        print(user.is_active)
        print(patients.is_active)
        patients.save()
    user.save()
    return Response({'message':"Okay"},status=status.HTTP_200_OK)