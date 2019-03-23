from django.contrib import admin
from django.urls import path
from myapp import views
from django.conf.urls import url, include
from django.contrib.auth.models import User
from rest_framework import routers, serializers, viewsets
from myapp.models import changeReq
from django.conf.urls import url, include
from myapp.urls import router
from django.views.generic.base import TemplateView

urlpatterns = [
    path('admin/', admin.site.urls),
    path('home/', views.demoDatabases, name='demoDatabases'),
    path('all-project/',TemplateView.as_view(template_name='all-project.html'), name='all-project'),
    path('project-planning/',views.dataToChart, name='project-planning'),
    path(r'api/', include(router.urls))
]
