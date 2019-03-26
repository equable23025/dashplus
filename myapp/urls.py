from rest_framework import routers
from myapp.viewsets import changeReqViewSet ,cardRecordViewSet, timeStampViewSet

router = routers.DefaultRouter()
router.register(r'changeReq', changeReqViewSet)
router.register(r'cardRecord', cardRecordViewSet)
router.register(r'timeStamp', timeStampViewSet)

