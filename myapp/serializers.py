from .models import changeReq,cardRecord ,timeStamp
from rest_framework import serializers

class changeReqSerializer(serializers.ModelSerializer):
	class Meta:
		model = changeReq
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