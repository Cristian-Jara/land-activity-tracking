from rest_framework.generics import (
    ListAPIView,
    RetrieveAPIView,
    CreateAPIView,
    UpdateAPIView,
)
from rest_framework import status
from rest_framework.response import Response
from .models import Activity, Measurement, ActivityType
from .serializers import (
    CreateActivitySerializer,
    ActivityListSerializer,
    RetrieveActivitySerializer,
    UpdateActivitySerializer,
    CreateMeasurementSerializer,
    MeasurementListSerializer,
    RetrieveMeasurementSerializer,
    UpdateMeasurementSerializer,
)
from .filters import MeasurementFilter


class ListActivitiesView(ListAPIView):
    queryset = Activity.objects.all()
    serializer_class = ActivityListSerializer


class RetrieveActivityView(RetrieveAPIView):
    queryset = Activity.objects.all()
    serializer_class = RetrieveActivitySerializer


class CreateActivityView(CreateAPIView):
    serializer_class = CreateActivitySerializer

    def create(self, request, *args, **kwargs):
        activity_type = request.data.get('type')
        if not ActivityType.objects.filter(name=activity_type).exists():
            return Response(
                {'activity_type': 'Activity type does not exist'},
                status=status.HTTP_400_BAD_REQUEST,
            )
        request.data['activity_type'] = ActivityType.objects.get(name=activity_type).id
        return super().create(request, *args, **kwargs)


class UpdateActivityView(UpdateAPIView):
    queryset = Activity.objects.all()
    serializer_class = UpdateActivitySerializer


class ListMeasurementsView(ListAPIView):
    queryset = Measurement.objects.all()
    serializer_class = MeasurementListSerializer
    filterset_class = MeasurementFilter


class RetrieveMeasurementView(RetrieveAPIView):
    queryset = Measurement.objects.all()
    serializer_class = RetrieveMeasurementSerializer


class CreateMeasurementView(CreateAPIView):
    serializer_class = CreateMeasurementSerializer


class UpdateMeasurementView(UpdateAPIView):
    queryset = Measurement.objects.all()
    serializer_class = UpdateMeasurementSerializer
