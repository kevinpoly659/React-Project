
from rest_framework import serializers
from .models import Patients,Doctors,Roles,Appointments
from django.contrib.auth.models import User
from rest_framework_simplejwt.views import (
    TokenRefreshView,
    TokenVerifyView
)
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView

class PatientCreateSerializer(serializers.ModelSerializer):
    
    class Meta:
        model=User
        fields = ('id','username','email','password')


    def create(self,validated_data):

        user=User.objects.create_user(
            username = validated_data['username'],
            email = validated_data['email'],
            password = validated_data['password'],
        )
        user.save()
        user1=User.objects.get(username=validated_data['username'])
        patient = Patients.objects.create(user=user1)
        patient.save()

        return user1

class UserCreateSerializer(serializers.ModelSerializer):
    
    class Meta:
        model=User
        fields = ('id','username','email','password')


    def create(self,validated_data):
        if validated_data['password']:
            user=User.objects.create_user(
                username = validated_data['username'],
                email = validated_data['email'],
                password = validated_data['password'],
            )
            user.save()
            user1=User.objects.get(username=validated_data['username'])


            return user1
        else: 
            return None

class UserSerializer(serializers.ModelSerializer):

    class Meta:
        model  = User
        fields = ('id','username','email','password')

    # def login(self,validated_data):
    #     user = User.objects.get(username=validated_data['username'])
    #     if user.check_password(validated_data['password']):
    #         return user
    #     else:
    #         return None
    
    username = serializers.CharField()
    password = serializers.CharField()


class PatientSerializers(serializers.ModelSerializer):

    class Meta:
        model  = Patients
        fields = "__all__"

    # def login(self,validated_data):
    #     user = User.objects.get(username=validated_data['username'])
    #     if user.check_password(validated_data['password']):
    #         return user
    #     else:
    #         return None
    



class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)

        # Add custom claims
        token['username'] = user.username
        token['is_active'] = user.is_active
        # ...

        return token

class DoctorCreateSerializer(serializers.ModelSerializer):
    
    class Meta:
        model=User
        fields = ('id','username','email','password')


    def create(self,validated_data):

        user=User.objects.create_user(
            username = validated_data['username'],
            email = validated_data['email'],
            password = validated_data['password'],
        )
        user.save()
        user1=User.objects.get(username=validated_data['username'])


        return user1

class DoctorSerializers(serializers.ModelSerializer):

    class Meta:
        model  = User
        fields = ('id','username','email','password')

    # def login(self,validated_data):
    #     user = User.objects.get(username=validated_data['username'])
    #     if user.check_password(validated_data['password']):
    #         return user
    #     else:
    #         return None
    username = serializers.CharField()
    password = serializers.CharField()


class AdminSerializers(serializers.ModelSerializer):

    class Meta:
        model  = User
        fields = ('id','username','email','password')

    # def login(self,validated_data):
    #     user = User.objects.get(username=validated_data['username'])
    #     if user.check_password(validated_data['password']):
    #         return user
    #     else:
    #         return None
    username = serializers.CharField()
    password = serializers.CharField()


class DoctorlistSerializers(serializers.ModelSerializer):
    class Meta:
        model = Doctors
        fields = "__all__"

class PatientlistSerializers(serializers.ModelSerializer):
    class Meta:
        model = Patients
        fields = "__all__"

class RoleSerializer(serializers.ModelSerializer):
    class Meta:
        model = Roles
        fields = "__all__"
    
    role_name = serializers.CharField()


class ApplicationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Appointments
        fields = "__all__"
    def create(self, validated_data):
        Appointment = Appointments.objects.create(patient = validated_data['patient'],doctors=validated_data['doctor'])
        Appointment.save()
        return super().create(validated_data)