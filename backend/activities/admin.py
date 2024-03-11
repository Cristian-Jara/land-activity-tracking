from django.contrib import admin

from .models import Activity, ActivityType, Measurement, FertilizationArea, SoilSample


@admin.register(Activity)
class ActivityAdmin(admin.ModelAdmin):
    list_display = ('name', 'activity_type')
    search_fields = ('name', 'activity_type__name')
    list_filter = ('activity_type',)
    fieldsets = (
        (None, {'fields': ('name', 'activity_type')}),
    )


@admin.register(ActivityType)
class ActivityTypeAdmin(admin.ModelAdmin):
    list_display = ('name',)
    search_fields = ('name',)
    fieldsets = (
        (None, {'fields': ('name',)}),
    )


@admin.register(Measurement)
class MeasurementAdmin(admin.ModelAdmin):
    list_display = ('date', 'activity', 'value')
    search_fields = ('date', 'activity__name', 'value')
    list_filter = ('activity',)
    fieldsets = (
        (None, {'fields': ('date', 'activity', 'value')}),
    )


@admin.register(FertilizationArea)
class FertilizationAreaAdmin(admin.ModelAdmin):
    list_display = ('activity',)
    search_fields = ('activity__name',)
    fieldsets = (
        (None, {'fields': ('activity', 'area')}),
    )


@admin.register(SoilSample)
class SoilSampleAdmin(admin.ModelAdmin):
    list_display = ('activity',)
    search_fields = ('activity__name',)
    fieldsets = (
        (None, {'fields': ('activity', 'location')}),
    )
