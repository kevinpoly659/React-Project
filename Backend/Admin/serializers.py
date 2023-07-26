from rest_framework import serializers
from users .models import Patients,Doctors,Roles,Appointments
from django.contrib.auth.models import User
from rest_framework_simplejwt.views import (
    TokenRefreshView,
    TokenVerifyView
)
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView


class DoctorlistSerializers(serializers.ModelSerializer):
    class Meta:
        model=Doctors
        fields = "__all__"


class PatientlistSerializers(serializers.ModelSerializer):
    class Meta:
        model = Patients
        fields = "__all__"

        
class RoleSerializer(serializers.ModelSerializer):
    class Meta:
        model = Roles
        fields = "__all__"


class RoleCreateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Roles
        fields = "__all__"
    
    def create(request,validated_data):
        role=Roles.objects.create(role_name=validated_data['role_name'])
        role.save()
        # role=Roles.objects.get(role_name=validated_data['role_name'])
        return role