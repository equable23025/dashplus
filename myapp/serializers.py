from .models import change_record,card_record , time_stamp , card_effort_record , change_effort_record ,time_stamp_movement , card_movement_record, change_movement_record , card_storypoint
from rest_framework import serializers
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework import viewsets
# from rest_framework.filters import OrderingFilter

class change_recordSerializer(serializers.ModelSerializer):
	class Meta:
		model = change_record
		fields = ('amount_change','timestamp','username','board')
		# fields = '__all__'

class card_recordSerializer(serializers.ModelSerializer):
	class Meta:
		model = card_record
		fields = '__all__'

class time_stampSerializer(serializers.ModelSerializer):
	class Meta:
		model = time_stamp
		fields = '__all__'

#effort 
class card_effort_recordSerializer(serializers.ModelSerializer):
	class Meta:
		model = card_effort_record
		fields = '__all__'

class change_effort_recordSerializer(serializers.ModelSerializer):
	class Meta:
		model = change_effort_record
		fields = ('amount_change','timestamp','username','board')

# movement
class time_stamp_movementSerializer(serializers.ModelSerializer):
	class Meta:
		model = time_stamp_movement
		fields = '__all__'

class card_movement_recordSerializer(serializers.ModelSerializer):
	class Meta:
		model = card_movement_record
		fields = '__all__'

class change_movement_recordSerializer(serializers.ModelSerializer):
	class Meta:
		model = change_movement_record
		# fields = '__all__'
		fields = ('username','board','planning_doing','planning_testing','planning_done','doing_planning','doing_testing','doing_done','testing_planning','testing_doing','testing_done','done_planning','done_doing','done_testing','timestamp')

class card_storypointSerializer(serializers.ModelSerializer):
	class Meta:
		model = card_storypoint
		fields = ('username','board','card_name','storypoint','timestamp')

