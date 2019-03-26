from rest_framework import routers
from myapp.viewsets import change_recordViewSet ,cardRecordViewSet, timeStampViewSet

router = routers.DefaultRouter()
router.register(r'timeStamp', timeStampViewSet)
router.register(r'cardRecord', cardRecordViewSet)
router.register(r'change_record', change_recordViewSet)

