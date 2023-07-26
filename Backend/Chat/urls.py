from django.urls import path
from . import views
from . import consumers

urlpatterns =[
    path('contacts',views.Contacts,name="contacts"),

]


