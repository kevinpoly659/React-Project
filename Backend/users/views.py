from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import permissions, status
from django.contrib.auth import authenticate
from django.contrib.auth.models import User
from .models import Patients,Doctors
from rest_framework.authtoken.models import Token
from .serializers import PatientCreateSerializer,PatientSerializers,MyTokenObtainPairSerializer,DoctorCreateSerializer,DoctorSerializers,AdminSerializers,DoctorlistSerializers
from rest_framework.decorators import api_view
# Create your views here.


class RegisterPatientView(APIView):
    def post(self,request):
        data=request.data


        serializer = PatientCreateSerializer(data=data)

        if not serializer.is_valid():
            return Response(serializer.errors,status=status.HTTP_400_BAD_REQUEST)
        

        patients = serializer.create(serializer.validated_data)

        patients = PatientCreateSerializer(patients)

        return Response(patients.data, status=status.HTTP_201_CREATED)
    
class RegisterDoctorView(APIView):
    def post(self,request):
        data=request.data
        serializer = DoctorCreateSerializer(data=data)
        
        if not serializer.is_valid():
            return Response(serializer.errors,status=status.HTTP_400_BAD_REQUEST)

        doctors = serializer.create(serializer.validated_data)
        doctors = DoctorSerializers(doctors)

        return Response(doctors.data, status=status.HTTP_201_CREATED)

class RetrievePatientView(APIView):
    def post(self,request):
        data=request.data
        print(data)
        serializer = PatientSerializers(data=data)
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
            if Patients.objects.get(user=user):
        # token = MyTokenObtainPairView.get_token(user)
                if user and user.check_password(password):
                    token, _ = Token.objects.get_or_create(user=user)
                    return Response({'token': token.key}, status=status.HTTP_200_OK)
                else:
                    return Response({'message': 'Invalid credentials'}, status=status.HTTP_401_UNAUTHORIZED)
        except:
            return Response({'message':'Invalid Option'},status=status.HTTP_403_FORBIDDEN)
        
class RetrieveDoctorView(APIView):
    def post(self,request):
        data=request.data
        print(data)
        serializer = DoctorSerializers(data=data)
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
            if Doctors.objects.get(user=user):
        # token = MyTokenObtainPairView.get_token(user)
                if user and user.check_password(password):
                    token, _ = Token.objects.get_or_create(user=user)
                    return Response({'token': token.key}, status=status.HTTP_200_OK)
                else:
                    return Response({'message': 'Invalid credentials'}, status=status.HTTP_401_UNAUTHORIZED)
        except:
            return Response({'message':'Invalid Option'},status=status.HTTP_403_FORBIDDEN)
        
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
        

@api_view(['GET'])
def doctor_details(request):
    doctors = Doctors.objects.all()
    doctor_list=[]
    for i in doctors:
        doctor_list.append(i.user)
    serializer=DoctorSerializers(doctor_list,many=True)
    return Response(serializer.data)

@api_view(['GET'])
def patient_details(request):
    patients = Patients.objects.all()
    patient_list=[]
    for i in patients:
        patient_list.append(i.user)
    serializer=PatientSerializers(patient_list,many=True)
    return Response(serializer.data)
