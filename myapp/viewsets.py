from rest_framework import viewsets
from .serializers import change_recordSerializer , cardRecordSerializer , timeStampSerializer
from .models import change_record,cardRecord ,timeStamp

class change_recordViewSet(viewsets.ModelViewSet):
    queryset = change_record.objects.all()
    serializer_class = change_recordSerializer

class cardRecordViewSet(viewsets.ModelViewSet):
    queryset = cardRecord.objects.all()
    serializer_class = cardRecordSerializer


class timeStampViewSet(viewsets.ModelViewSet):
    queryset = timeStamp.objects.all()
    serializer_class = timeStampSerializer