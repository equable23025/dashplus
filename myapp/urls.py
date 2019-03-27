from rest_framework import routers
from myapp.viewsets import change_recordViewSet ,card_recordViewSet, time_stampViewSet

router = routers.DefaultRouter()
<<<<<<< HEAD
router.register(r'time_stamp', time_stampViewSet)
router.register(r'card_record', card_recordViewSet)
=======
<<<<<<< HEAD
router.register(r'changeReq', changeReqViewSet)
router.register(r'cardRecord', cardRecordViewSet)
router.register(r'timeStamp', timeStampViewSet)
=======
router.register(r'timeStamp', timeStampViewSet)
router.register(r'cardRecord', cardRecordViewSet)
>>>>>>> ajax
router.register(r'change_record', change_recordViewSet)
>>>>>>> 888030045ce31ddf5dea86dce10bf59904c75a3c

