# Generated by Django 4.2.1 on 2023-06-25 16:32

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('Booking', '0004_bookings_patient_details'),
    ]

    operations = [
        migrations.RenameField(
            model_name='patient_details',
            old_name='sex',
            new_name='gender',
        ),
    ]