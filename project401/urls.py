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
path('project-planning/',views.dataToChart, name='project-planning'),
path(r'api/', include(router.urls)),
path('login/',views.login, name='login'),
path('regis/',user_views.register, name='register'),
# url(r'get-token/(?P<token_id>\w+)/$',TemplateView.as_view(template_name='get-token.html'), name='get-token'),
# url(r'^\#\w+\=(P<token>\w+)',views.get_token, name='get_token'),
# url(r'get-token/#(?:token)\=([\w]+?))[1]',views.get_token, name='get_token'),
# url(r'get-token/(?P<string>[\w\-]+)/$',views.get_token, name='get_token'),
# url(r'get-token\#token(?P<token>[\w\-]+)/$',views.get_token, name='get_token'),
# url(r'(?P<token>[\w\-]*)',views.get_token, name='get_token'),
url('addboard/',views.addboard, name='addboard'),
url(r'^logout/', views.logout, name = 'logout'),
# url(r'^filter/$', views.filter, name='filter'),
# url(r'<token:slug>',views.get_token, name='get_token'),
# url(r'?\#token(?P<token>\w+))',views.get_token, name='get_token'),

]
