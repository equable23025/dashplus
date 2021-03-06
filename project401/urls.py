from django.contrib import admin
from django.urls import path
from myapp import views
from django.conf.urls import url, include
from django.contrib.auth.models import User
from rest_framework import routers, serializers, viewsets
from myapp.models import change_record
from django.conf.urls import url, include
from myapp.urls import router
from django.views.generic.base import TemplateView
from myapp import views as user_views
urlpatterns = [
path('admin/', admin.site.urls),
path('home/', views.home_to_register, name='home_to_register'),
path('all-project/',TemplateView.as_view(template_name='all-project.html'), name='all-project'),
path('scope-change/',views.dataToChart, name='scope-change'),
path('effort-change/',views.dataEffortToChart, name='effort-change'),
path('movement-change/',views.dataMovementToChart, name='movement-change'),
path(r'api/', include(router.urls)),
path('login/',views.login, name='login'),
path('regis/',user_views.register, name='register'),
url('^forgetpassword/', views.forgetpassword, name = 'forgetpassword'),
url('addboard/',views.addboard, name='addboard'),
url('^logout/', views.logout, name = 'logout'),
url('introduction/',views.introduction, name='introduction'),

]
