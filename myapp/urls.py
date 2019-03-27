from rest_framework import routers
from myapp.viewsets import change_recordViewSet ,card_recordViewSet, time_stampViewSet

router = routers.DefaultRouter()
router.register(r'time_stamp', time_stampViewSet)
router.register(r'card_record', card_recordViewSet)
router.register(r'change_record', change_recordViewSet)

