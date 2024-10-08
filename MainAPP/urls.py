from django.urls import path
from . import views

urlpatterns = [
    # TODO: Add URL patterns for the MainAPP
    path('', views.welcome, name='welcome'),
    path('login', views.login, name='login'),
    # path('logout', views.logout, name='logout'),
    path('register', views.register, name='register'),
    path('index', views.index, name='index'),
    path('monitor', views.monitor, name='monitor'),
    path('alert', views.alert, name='alert'),
    path('get-anomaly-logs', views.get_anomaly_logs, name='get-anomaly-logs'),
    path('about', views.about, name='about'),
]
