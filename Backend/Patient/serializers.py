from Doctor.models import *
from rest_framework import serializers
from users.models import *

class DoctorSerializer(serializers.ModelSerializer):
    class Meta:
        model = Doctors
        fields = "__all__"

class SlotSerializer(serializers.ModelSerializer):
    class Meta:
        model = Slot
        fields = "__all__"
        
class RoleSerializer(serializers.ModelSerializer):
    class Meta:
        model = Roles
        fields = "__all__"