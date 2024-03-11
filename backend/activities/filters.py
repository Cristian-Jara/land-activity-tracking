from .models import Measurement, Activity
from django_filters import FilterSet
from django_filters import DateFromToRangeFilter, ModelChoiceFilter


class MeasurementFilter(FilterSet):
    date = DateFromToRangeFilter()
    activity = ModelChoiceFilter(
        queryset=Activity.objects.all(),
    )

    class Meta:
        model = Measurement
        fields = ['date', 'activity']
