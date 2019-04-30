from .models import change_record,card_record ,time_stamp ,card_effort_record ,change_effort_record
from rest_framework import serializers

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
		
class card_effort_recordSerializer(serializers.ModelSerializer):
	class Meta:
		model = card_effort_record
		fields = '__all__'

class change_effort_recordSerializer(serializers.ModelSerializer):
	class Meta:
		model = change_effort_record
		fields = ('amount_change','timestamp','username','board')