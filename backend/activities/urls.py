from django.urls import path
from .views import (
    ListActivitiesView,
    RetrieveActivityView,
    CreateActivityView,
    UpdateActivityView,
    ListMeasurementsView,
    RetrieveMeasurementView,
    CreateMeasurementView,
    UpdateMeasurementView,
)

urlpatterns = [
    path('activities/', ListActivitiesView.as_view(), name='activities-list'),
    path('activities/<int:pk>/', RetrieveActivityView.as_view(), name='activities-retrieve'),
    path('activities/create/', CreateActivityView.as_view(), name='activities-create'),
    path('activities/<int:pk>/update/', UpdateActivityView.as_view(), name='activities-update'),
    path('measurements/', ListMeasurementsView.as_view(), name='measurements-list'),
    path('measurements/<int:pk>/', RetrieveMeasurementView.as_view(), name='measurements-retrieve'),
    path('measurements/create/', CreateMeasurementView.as_view(), name='measurements-create'),
    path('measurements/<int:pk>/update/', UpdateMeasurementView.as_view(), name='measurements-update'),
]
