"""
URL configuration for IntelliOps project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/4.2/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import include, path
from django.urls import re_path as url
from django.conf import settings
from django.views.static import serve
from MainAPP.views import page_not_found


urlpatterns = [
    # Serve static files during development
    #   (When in production, comment the line below and use a web server like Nginx or Apache)
    url(r"^static/(?P<path>.*)$", serve, {"document_root": settings.STATICFILES_DIRS[0]}, name='static'),
    path('admin/', admin.site.urls),
    path('', include('MainAPP.urls')),  # MainAPP
]

handler404 = page_not_found  # Custom 404 error handler
