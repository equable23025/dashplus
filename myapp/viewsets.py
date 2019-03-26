from rest_framework import viewsets
from .serializers import change_recordSerializer , card_recordSerializer , time_stampSerializer
from .models import change_record,card_record ,time_stamp

class change_recordViewSet(viewsets.ModelViewSet):
    queryset = change_record.objects.all()
    serializer_class = change_recordSerializer

class card_recordViewSet(viewsets.ModelViewSet):
    queryset = card_record.objects.all()
    serializer_class = card_recordSerializer


class time_stampViewSet(viewsets.ModelViewSet):
    queryset = time_stamp.objects.all()
    serializer_class = time_stampSerializer