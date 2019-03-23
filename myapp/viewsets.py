from rest_framework import viewsets
from .serializers import changeReqSerializer , cardRecordSerializer , timeStampSerializer
from .models import changeReq,cardRecord ,timeStamp

class changeReqViewSet(viewsets.ModelViewSet):
    queryset = changeReq.objects.all()
    serializer_class = changeReqSerializer

class cardRecordViewSet(viewsets.ModelViewSet):
    queryset = cardRecord.objects.all()
    serializer_class = cardRecordSerializer


class timeStampViewSet(viewsets.ModelViewSet):
    queryset = timeStamp.objects.all()
    serializer_class = timeStampSerializer