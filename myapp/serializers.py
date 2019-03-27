from .models import change_record,cardRecord ,timeStamp
from rest_framework import serializers

class change_recordSerializer(serializers.ModelSerializer):
	class Meta:
		model = change_record
		fields = ('amountChange','timestamp')
		#fields = '__all__'

class cardRecordSerializer(serializers.ModelSerializer):
	class Meta:
		model = cardRecord
		fields = '__all__'

class timeStampSerializer(serializers.ModelSerializer):
	class Meta:
		model = timeStamp
		fields = '__all__'