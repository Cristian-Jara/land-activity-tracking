from rest_framework.serializers import ModelSerializer, SerializerMethodField
from drf_writable_nested.serializers import WritableNestedModelSerializer
from rest_framework.serializers import CharField

from .models import (
    Activity,
    Measurement,
    FertilizationArea,
    SoilSample,
)


class CreateMeasurementSerializer(WritableNestedModelSerializer):
    class Meta:
        model = Measurement
        fields = '__all__'


class CreateNestedMeasurementSerializer(WritableNestedModelSerializer):
    class Meta:
        model = Measurement
        exclude = ['activity']


class RetrieveMeasurementSerializer(ModelSerializer):
    class Meta:
        model = Measurement
        fields = '__all__'


class MeasurementListSerializer(ModelSerializer):
    class Meta:
        model = Measurement
        fields = '__all__'


class UpdateMeasurementSerializer(ModelSerializer):
    class Meta:
        model = Measurement
        fields = '__all__'


class CreateFertilizationAreaSerializer(WritableNestedModelSerializer):
    class Meta:
        model = FertilizationArea
        exclude = ['activity']


class RetrieveFertilizationAreaSerializer(ModelSerializer):

    center = SerializerMethodField()

    def get_center(self, obj):
        return obj.area.centroid.coords

    class Meta:
        model = FertilizationArea
        fields = '__all__'


class FertilizationAreaListSerializer(ModelSerializer):
    class Meta:
        model = FertilizationArea
        fields = '__all__'


class UpdateFertilizationAreaSerializer(ModelSerializer):
    class Meta:
        model = FertilizationArea
        fields = '__all__'


class CreateSoilSampleSerializer(WritableNestedModelSerializer):

    class Meta:
        model = SoilSample
        exclude = ['activity']


class RetrieveSoilSampleSerializer(ModelSerializer):

    class Meta:
        model = SoilSample
        fields = '__all__'


class SoilSampleListSerializer(ModelSerializer):
    class Meta:
        model = SoilSample
        fields = '__all__'


class UpdateSoilSampleSerializer(ModelSerializer):

    class Meta:
        model = SoilSample
        fields = '__all__'


class CreateActivitySerializer(WritableNestedModelSerializer):
    measurement_set = CreateNestedMeasurementSerializer(many=True)
    soil_sample = CreateSoilSampleSerializer(required=False, allow_null=True)
    fertilization_area = CreateFertilizationAreaSerializer(required=False, allow_null=True)

    class Meta:
        model = Activity
        fields = '__all__'


class RetrieveActivitySerializer(ModelSerializer):
    activity_type = SerializerMethodField()
    soil_sample = RetrieveSoilSampleSerializer()
    fertilization_area = RetrieveFertilizationAreaSerializer()

    class Meta:
        model = Activity
        fields = '__all__'

    def get_activity_type(self, obj):
        return obj.activity_type.name


class ActivityListSerializer(ModelSerializer):
    activity_type = SerializerMethodField()
    soil_sample = RetrieveSoilSampleSerializer()
    fertilization_area = RetrieveFertilizationAreaSerializer()

    class Meta:
        model = Activity
        fields = '__all__'

    def get_activity_type(self, obj):
        return obj.activity_type.name


class UpdateActivitySerializer(ModelSerializer):
    measurement_set = CreateNestedMeasurementSerializer(many=True)
    soil_sample = CreateSoilSampleSerializer(default=None)
    fertilization_area = CreateFertilizationAreaSerializer(default=None)

    class Meta:
        model = Activity
        fields = '__all__'
