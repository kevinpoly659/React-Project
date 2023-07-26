from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import permissions, status
from django.contrib.auth import authenticate
from django.contrib.auth.models import User
from .models import *
from rest_framework.authtoken.models import Token
from .serializers import *
from rest_framework.decorators import api_view
# Create your views here.


class RegisterPatientView(APIView):
    def post(self,request):
        data=request.data
        print(data)

        serializer = UserCreateSerializer(data=data)

        if not serializer.is_valid():
            return Response(serializer.errors,status=status.HTTP_400_BAD_REQUEST)
        

        patients = serializer.create(serializer.validated_data)
        if patients is not None:
            patient = Patients.objects.create(user=patients,first_name=data['first_name'],last_name=data['last_name'])
            patient.save()
            patients = UserSerializer(patients)

            return Response(patients.data, status=status.HTTP_201_CREATED)
        else:
            return Response(patients.data, status=status.HTTP_400_BAD_REQUEST)


    
class RegisterDoctorView(APIView):
    def post(self,request):
        data=request.data
        serializer = UserCreateSerializer(data=data)
        
        if not serializer.is_valid():
            return Response(serializer.errors,status=status.HTTP_400_BAD_REQUEST)

        doctors = serializer.create(serializer.validated_data)
        availabilities=Availability.objects.all()
        if doctors is not None:
            doctor = Doctors.objects.create(user=doctors,first_name=data['first_name'],last_name=data['last_name'])
            doctors = UserSerializer(doctors)

            for availability in availabilities:
                Slot.objects.create(doctor=doctor,time='09:00', availability=True, availability_day=availability)
                Slot.objects.create(doctor=doctor,time='10:00', availability=True, availability_day=availability)
                Slot.objects.create(doctor=doctor,time='11:00', availability=True, availability_day=availability)
                Slot.objects.create(doctor=doctor,time='12:00', availability=True, availability_day=availability)
                Slot.objects.create(doctor=doctor,time='13:00', availability=True, availability_day=availability)
                Slot.objects.create(doctor=doctor,time='14:00', availability=True, availability_day=availability)

            doctor.save()
            return Response(doctors.data, status=status.HTTP_201_CREATED)
        else:
            return Response(doctors.data, status=status.HTTP_417_EXPECTATION_FAILED)

class RetrievePatientView(APIView):
    def post(self,request):
        data=request.data
        print(data)
        serializer = UserSerializer(data=data)
        if not serializer.is_valid():
            return Response(serializer.errors,status=status.HTTP_400_BAD_REQUEST)
        
        # user = serializer.login(serializer.validated_data)

        # user = PatientSerializers(user)
        # print("kev")
        # if user:
        #     return Response({'message': 'Login successful'}, status=status.HTTP_200_OK)
        # else:
        #     return Response({'message': 'Invalid credentials'}, status=status.HTTP_401_UNAUTHORIZED)
        username = serializer.validated_data['username']
        password = serializer.validated_data['password']
        # Authenticate the user
        user = User.objects.get(username=username)
        try:
            patient = Patients.objects.get(user=user)
            print(patient.id)
            if Patients.objects.get(user=user):
        # token = MyTokenObtainPairView.get_token(user)
                if user and user.check_password(password):
                    token, _ = Token.objects.get_or_create(user=user)
                    respons = {'token':token.key,
                               'id':patient.id}
                    return Response(respons, status=status.HTTP_200_OK)
                else:
                    return Response({'message': 'Invalid credentials'}, status=status.HTTP_401_UNAUTHORIZED)
        except:
            return Response({'message':'Invalid Option or the user is blocked'},status=status.HTTP_403_FORBIDDEN)
        
class RetrieveDoctorView(APIView):
    def post(self,request):
        data=request.data
        print(data)
        serializer = UserSerializer(data=data)
        if not serializer.is_valid():
            return Response(serializer.errors,status=status.HTTP_400_BAD_REQUEST)
        
        # user = serializer.login(serializer.validated_data)

        # user = PatientSerializers(user)
        # print("kev")
        # if user:
        #     return Response({'message': 'Login successful'}, status=status.HTTP_200_OK)
        # else:
        #     return Response({'message': 'Invalid credentials'}, status=status.HTTP_401_UNAUTHORIZED)
        username = serializer.validated_data['username']
        password = serializer.validated_data['password']
        # Authenticate the user
        user = authenticate(username=username,password=password)
        # token = MyTokenObtainPairView.get_token(user)
        try:
            doc = Doctors.objects.get(user=user)
            if Doctors.objects.get(user=user):
        # token = MyTokenObtainPairView.get_token(user)
                if user and user.check_password(password) and user.is_active:
                    token, _ = Token.objects.get_or_create(user=user)
                    print(doc)

                    return Response({'token': token.key,'id': doc.id}, status=status.HTTP_200_OK)
                else:
                    return Response({'message': 'Invalid credentials'}, status=status.HTTP_401_UNAUTHORIZED)
        except:
            return Response({'message':'Invalid Option or the user is blocked'},status=status.HTTP_403_FORBIDDEN)
        
class RetrieveAdminView(APIView):
    def post(self,request):
        data=request.data
        print(data)
        serializer = AdminSerializers(data=data)
        if not serializer.is_valid():
            return Response(serializer.errors,status=status.HTTP_400_BAD_REQUEST)
        
        # user = serializer.login(serializer.validated_data)

        # user = PatientSerializers(user)
        # print("kev")
        # if user:
        #     return Response({'message': 'Login successful'}, status=status.HTTP_200_OK)
        # else:
        #     return Response({'message': 'Invalid credentials'}, status=status.HTTP_401_UNAUTHORIZED)
        username = serializer.validated_data['username']
        password = serializer.validated_data['password']
        # Authenticate the user
        user = User.objects.get(username=username)
        # token = MyTokenObtainPairView.get_token(user)
        try:
            if user.is_staff == True:
        # token = MyTokenObtainPairView.get_token(user)
                if user and user.check_password(password):
                    token, _ = Token.objects.get_or_create(user=user)
                    return Response({'token': token.key}, status=status.HTTP_200_OK)
                else:
                    return Response({'message': 'Invalid credentials'}, status=status.HTTP_401_UNAUTHORIZED)
            else:
                return Response({'message':'Not an Admin'},status=status.HTTP_403_FORBIDDEN)
        except:
            return Response({'message':'Invalid Option'},status=status.HTTP_403_FORBIDDEN)
        

# @api_view(['GET'])
# def doctor_details(request):
#     doctors = Doctors.objects.all()
#     roles= Roles.objects.all()
#     # doctor_list=[]
#     # for i in doctors:
#     #     doctor_list.append(i.user)
#     serializer=DoctorlistSerializers(doctors,many=True)
#     # print(doctors)
#     for j in roles:
#         for i in serializer.data:
#             if i['role'] == j.id:
#                 i['role'] = j.role_name
#     # for i,j in serializer.data:
#     print(serializer.data)
#     #     j+=doctor_list[i]
#     return Response(serializer.data)

@api_view(['GET'])
def roles(request):
    roles = Roles.objects.all()
    serializers = RoleSerializer(roles,many=True)

    return Response(serializers.data)

@api_view(['GET'])
def patient_details(request):
    patients = Patients.objects.all()
    patient_list=[]
    for i in patients:
        patient_list.append(i.user)
    serializer=UserSerializer(patient_list,many=True)
    return Response(serializer.data)

@api_view(['POST'])
def block_user(request):
    data = request.data
    print(data)
    user = User.objects.get(id=data['id'])
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
    user.save()
    return Response({'message':"Okay"},status=status.HTTP_200_OK)

@api_view(['POST'])
def Apply(request):
    data = request.data
    print(data)
    doctor = Doctors.objects.get(id=data['doctor'])
    patient = Patients.objects.get(id=data['patient'])
    Appointment = Appointments.objects.create(patient = patient,doctors=doctor)
    Appointment.save()
    return Response({'message':'Okay'},status=status.HTTP_200_OK)


@api_view(['POST'])
def Patient(request):

    data = request.data
    id=data['user']
    patient = Patients.objects.get(id=id)
    serializer=PatientlistSerializers(patient)
    user = User.objects.get(id=patient.user.id)
    userserializer = UserSerializer(user)

    # print(serializer.data)
    # serializer = PatientSerializers(data=data)
    # if not serializer.is_valid():
    #     return Response(serializer.errors,status=status.HTTP_400_BAD_REQUEST)

    # print(serializer.validated_data)



    return Response({'patient':serializer.data,'user':userserializer.data},status=status.HTTP_200_OK)


@api_view(['POST'])
def EditPatient(request):

    data =  request.data
    patient = Patients.objects.get(id=data['id'])
    patient.first_name = data['first_name']
    patient.last_name = data['last_name']
    user = User.objects.get(username=patient.user.username)
    user.username = data['username']
    user.email = data['email']
    patient.save()
    user.save()

    return Response({"message":"Edited User"},status=status.HTTP_200_OK)