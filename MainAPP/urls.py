from django.urls import path
from . import views

urlpatterns = [
    # TODO: Add URL patterns for the MainAPP
    path('', views.index, name='index'),
]
