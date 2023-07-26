from django.db import models
# Create your models here.
class Availability(models.Model):
        WEEKDAY_CHOICES = [
        (0, 'Monday'),
        (1, 'Tuesday'),
        (2, 'Wednesday'),
        (3, 'Thursday'),
        (4, 'Friday'),
        (5, 'Saturday'),
        (6, 'Sunday'),
    ]
        weekday = models.PositiveSmallIntegerField(choices=WEEKDAY_CHOICES)

        # Add more default slots as needed

class Slot(models.Model):
    doctor = models.ForeignKey('users.Doctors',on_delete=models.CASCADE,related_name='slots',default=None)
    time = models.TimeField()
    availability = models.BooleanField(default=True)
    availability_day = models.ForeignKey(Availability, on_delete=models.CASCADE, related_name='slots')
    is_booked = models.BooleanField(default=False)