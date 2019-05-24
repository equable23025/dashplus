from rest_framework import routers
from myapp.viewsets import change_recordViewSet ,card_recordViewSet, time_stampViewSet , card_effort_recordViewSet , change_effort_recordViewSet , time_stamp_movementViewSet,card_movement_recordViewSet,change_movement_recordViewSet , card_storypointViewSet
from myapp.filters import change_record_filterApiView , change_effort_record_filterApiView , change_movement_record_filterApiView , card_storypoint_filterApiView


router = routers.DefaultRouter()
router.register(r'time_stamp', time_stampViewSet)
router.register(r'card_record', card_recordViewSet)
router.register(r'change_record', change_record_filterApiView)
router.register(r'card_effort_record', card_effort_recordViewSet)
router.register(r'change_effort_record', change_effort_record_filterApiView)

# movement
router.register(r'time_stamp_movement', time_stamp_movementViewSet)
router.register(r'card_movement_record', card_movement_recordViewSet)
router.register(r'change_movement_record', change_movement_record_filterApiView)

# show_storypoint -> run after fetch movement
router.register(r'card_storypoint', card_storypoint_filterApiView)

