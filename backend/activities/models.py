from typing import Iterable
from django.contrib.gis.db import models
from django.utils.functional import classproperty


class ActivityType(models.Model):
    name = models.CharField(max_length=50)

    def __str__(self):
        return self.name

    class NKS:
        SOIL = 'Soil Sample'
        FERT = 'Fertilization Area'

    @classproperty
    def soil(cls):
        return cls.objects.get(name=cls.NKS.SOIL)

    @classproperty
    def fertilization(cls):
        return cls.objects.get(name=cls.NKS.FERT)

    class Meta:
        verbose_name = 'Activity Type'
        verbose_name_plural = 'Activity Types'


class Activity(models.Model):
    name = models.CharField(
        max_length=255,
        help_text='Name of the activity',
        blank=True,
    )
    activity_type = models.ForeignKey(
        ActivityType,
        related_name='activities',
        on_delete=models.PROTECT,
    )

    def __str__(self):
        return f'{self.activity_type} - {self.name}'

    class Meta:
        verbose_name = 'Activity'
        verbose_name_plural = 'Activities'


class Measurement(models.Model):
    date = models.DateField(
        help_text='Date of the measurement',
    )
    activity = models.ForeignKey('Activity', on_delete=models.CASCADE)
    value = models.FloatField()

    class Meta:
        verbose_name = 'Measurement'
        verbose_name_plural = 'Measurements'


class FertilizationArea(models.Model):
    activity = models.OneToOneField(
        Activity,
        on_delete=models.CASCADE,
        related_name='fertilization_area',
        null=True,
        blank=True,
    )
    area = models.PolygonField()

    class Meta:
        verbose_name = 'Fertilization Area'
        verbose_name_plural = 'Fertilization Areas'


class SoilSample(models.Model):
    activity = models.OneToOneField(
        Activity,
        on_delete=models.CASCADE,
        related_name='soil_sample',
        null=True,
        blank=True,
    )
    location = models.PointField(
        geography=True,
        help_text='Location of the soil sample',
        null=True,
    )

    class Meta:
        verbose_name = 'Soil Sample'
        verbose_name_plural = 'Soil Samples'
