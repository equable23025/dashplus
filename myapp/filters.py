# from django.contrib.auth.models import User
import django_filters
from .models import change_record,card_record ,time_stamp ,card_effort_record ,change_effort_record
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework import serializers
from rest_framework import viewsets


class change_recordSerializer(serializers.ModelSerializer):
	class Meta:
		model = change_record
		fields = ('amount_change','timestamp','username','board')

class change_record_filterApiView(viewsets.ModelViewSet):
    queryset = change_record.objects.all()
    serializer_class = change_recordSerializer
    filter_backends = (DjangoFilterBackend, )
    # filter_fields = ('username','board')
    filter_fields = '__all__'

class change_effort_recordSerializer(serializers.ModelSerializer):
	class Meta:
		model = change_effort_record
		fields = ('amount_change','timestamp','username','board')

class change_effort_record_filterApiView(viewsets.ModelViewSet):
    queryset = change_record.objects.all()
    serializer_class = change_recordSerializer
    filter_backends = (DjangoFilterBackend, )
    filter_fields = '__all__'