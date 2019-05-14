# from django.contrib.auth.models import User
import django_filters
from .models import change_record,card_record ,time_stamp ,card_effort_record ,change_effort_record,time_stamp_movement , card_movement_record, change_movement_record
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
    queryset = change_effort_record.objects.all()
    serializer_class = change_recordSerializer
    filter_backends = (DjangoFilterBackend, )
    filter_fields = '__all__'

class change_movement_recordSerializer(serializers.ModelSerializer):
    class Meta:
        model = change_movement_record
        # fields = '__all__'
        fields = ('username','board','planning_doing','planning_testing','planning_done','doing_planning','doing_testing','doing_done','testing_planning','testing_doing','testing_done','done_planning','done_doing','done_testing','timestamp')

class change_movement_record_filterApiView(viewsets.ModelViewSet):
    queryset = change_movement_record.objects.all()
    serializer_class = change_movement_recordSerializer
    filter_backends = (DjangoFilterBackend, )
    filter_fields = '__all__'