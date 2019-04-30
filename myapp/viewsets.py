from rest_framework import viewsets
from .serializers import change_recordSerializer , card_recordSerializer , time_stampSerializer ,card_effort_recordSerializer , change_effort_recordSerializer
from .models import change_record,card_record ,time_stamp ,card_effort_record ,change_effort_record

class change_recordViewSet(viewsets.ModelViewSet):
    queryset = change_record.objects.all()
    serializer_class = change_recordSerializer

class card_recordViewSet(viewsets.ModelViewSet):
    queryset = card_record.objects.all()
    serializer_class = card_recordSerializer


class time_stampViewSet(viewsets.ModelViewSet):
    queryset = time_stamp.objects.all()
    serializer_class = time_stampSerializer

class card_effort_recordViewSet(viewsets.ModelViewSet):
    queryset = card_effort_record.objects.all()
    serializer_class = card_effort_recordSerializer

class change_effort_recordViewSet(viewsets.ModelViewSet):
    queryset = change_effort_record.objects.all()
    serializer_class = change_effort_recordSerializer