
from rest_framework import serializers
from .models import Patients,Doctors
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

class PatientSerializers(serializers.ModelSerializer):

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
        doctor = Doctors.objects.create(user=user1)
        doctor.save()

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
        fields = ['user']
