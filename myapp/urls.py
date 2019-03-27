from rest_framework import routers
from myapp.viewsets import change_recordViewSet ,cardRecordViewSet, timeStampViewSet

router = routers.DefaultRouter()
<<<<<<< HEAD
router.register(r'changeReq', changeReqViewSet)
router.register(r'cardRecord', cardRecordViewSet)
router.register(r'timeStamp', timeStampViewSet)
=======
router.register(r'timeStamp', timeStampViewSet)
router.register(r'cardRecord', cardRecordViewSet)
router.register(r'change_record', change_recordViewSet)
>>>>>>> 888030045ce31ddf5dea86dce10bf59904c75a3c

