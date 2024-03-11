from django.test import TestCase
from django.urls import reverse
from users.models import User
from rest_framework.test import APIClient
from .models import Activity, ActivityType


class ActivityViewTests(TestCase):
    def setUp(self):
        self.client = APIClient()
        self.user = User.objects.create(
            first_name='testuser', email="testuser@test.com", password='testpassword')
        self.client.force_authenticate(user=self.user)

    def test_create_point_activity(self):
        url = reverse('activities-create')
        data = {
            'name': 'Test Activity',
            'type': 'Soil Sample',
            'measurement_set': [{
                'date': '2021-01-01',
                'value': 10,
            }],
            'soil_sample': {
                'location': {
                    'type': 'Point',
                    'coordinates': [0, 0],
                },
            },
        }
        response = self.client.post(url, data, format='json')
        self.assertEqual(response.status_code, 201)
        self.assertEqual(response.data['activity_type'], ActivityType.soil.id)

    def test_create_polygon_activity(self):
        url = reverse('activities-create')
        data = {
            'name': 'Test Activity',
            'type': 'Fertilization Area',
            'measurement_set': [{
                'date': '2021-01-01',
                'value': 10,
            }],
            'fertilization_area': {
                'area': {
                    'type': 'Polygon',
                    'coordinates': [
                        [[0, 0], [0, 1], [1, 1], [1, 0], [0, 0]],
                    ],
                },
            },
        }
        response = self.client.post(url, data, format='json')
        self.assertEqual(response.status_code, 201)
        self.assertEqual(response.data['activity_type'], ActivityType.fertilization.id)

    def test_retrieve_activity(self):
        activity = Activity.objects.create(
            name='Test Activity', activity_type=ActivityType.soil)
        url = reverse('activities-retrieve', kwargs={'pk': activity.pk})
        response = self.client.get(url)
        self.assertEqual(response.status_code, 200)

    def test_activity_list(self):
        url = reverse('activities-list')
        response = self.client.get(url)
        self.assertEqual(response.status_code, 200)


class MeasurementViewTests(TestCase):
    def setUp(self):
        self.client = APIClient()
        self.user = User.objects.create(
            first_name='testuser', email="testuser@test.com", password='testpassword')
        self.client.force_authenticate(user=self.user)

    def test_create_measurement(self):
        activity = Activity.objects.create(
            name='Test Activity', activity_type=ActivityType.soil)
        url = reverse('measurements-create')
        data = {
            'activity': activity.pk,
            'value': 10,
            'date': '2021-01-01',
        }
        response = self.client.post(url, data, format='json')
        self.assertEqual(response.status_code, 201)
        self.assertEqual(activity.measurement_set.count(), 1)

    def test_measurement_list(self):
        url = reverse('measurements-list')
        response = self.client.get(url)
        self.assertEqual(response.status_code, 200)
        self.assertEqual(len(response.data), 0)
