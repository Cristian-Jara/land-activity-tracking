"use strict";
"use client";
import Map, {
  NavigationControl,
  GeolocateControl,
  Marker,
  Popup,
  Layer,
  Source,
} from "react-map-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import "@mapbox/mapbox-gl-draw/dist/mapbox-gl-draw.css";
import classes from "./page.module.css";
import "@mapbox-controls/tooltip/src/index.css";
import { RequireAuth } from "@/components/common";
import { useCallback, useRef, useState } from "react";
import { DrawControl, HeaderOptions } from "@/components/map";
import { useGetActivitiesQuery } from "@/redux/features/activitiesApiSlice";
import { Button } from "@nextui-org/react";
import { MapRef } from "react-map-gl";
import { useRouter } from "next/navigation";

export default function Activities() {
  const mapboxToken = process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN;
  const mapRef = useRef<MapRef | null>(null);
  const router = useRouter();

  const { data, isFetching } = useGetActivitiesQuery(undefined);
  const [selectedFeature, setSelectedFeature] = useState<Feature | null>(null);
  const [selectedMarker, setSelectedMarker] = useState<Activity | null>(null);

  const onSelectionChange = useCallback((e: { features: Feature[] }) => {
    setSelectedFeature(e.features[0]);
  }, []);

  const handleFlyTo = (activity: Activity) => {
    if (activity.soil_sample) {
      mapRef?.current?.flyTo({
        center: activity.soil_sample.location.coordinates,
        zoom: 15,
      });
    } else {
      mapRef?.current?.flyTo({
        center: activity.fertilization_area.center,
        zoom: 15,
      });
    }
  };

  const zoomToSelectedLoc = (activity: Activity) => {
    setSelectedMarker(activity);
    handleFlyTo(activity);
  };

  const handleFindLayerActivity = (id: string) => {
    zoomToSelectedLoc(
      data?.find((activity: Activity) => activity.id === Number(id))
    );
  };

  return (
    <RequireAuth>
      <main className={classes.mainStyle}>
        <Map
          mapboxAccessToken={mapboxToken}
          ref={mapRef}
          mapStyle="mapbox://styles/mapbox/satellite-v9"
          initialViewState={{
            latitude: -33.45694,
            longitude: -70.64827,
            zoom: 10,
          }}
          maxZoom={20}
          minZoom={3}
          interactiveLayerIds={data?.map(
            (activity: Activity) => `fertilization-area-layer-${activity.id}`
          )}
          onClick={(e) =>
            e &&
            e.features &&
            e.features.length &&
            handleFindLayerActivity(e.features[0].source)
          }
        >
          <HeaderOptions
            selectedFeature={selectedFeature}
            activities={data}
            isFetching={isFetching}
            handleFlyTo={handleFlyTo}
          />
          <GeolocateControl position="top-left" />
          <NavigationControl position="top-left" />
          <DrawControl
            position="top-right"
            displayControlsDefault={false}
            controls={{
              polygon: true,
              point: true,
              trash: true,
            }}
            onSelectionChange={onSelectionChange}
          />
          {data
            ?.filter((activity: Activity) => activity.soil_sample)
            .map((activity: Activity) => (
              <Marker
                key={activity.id}
                latitude={activity.soil_sample.location.coordinates[1]}
                longitude={activity.soil_sample.location.coordinates[0]}
              >
                <Button
                  size="sm"
                  className="cursor-pointer bg-transparent"
                  onClick={() => zoomToSelectedLoc(activity)}
                >
                  <div className="text-3xl">📍</div>
                </Button>
              </Marker>
            ))}
          {data
            ?.filter((activity: Activity) => activity.fertilization_area)
            .map((activity: Activity) => (
              <Source
                id={`${activity.id}`}
                type="geojson"
                data={{
                  type: "Feature",
                  geometry: {
                    type: "Polygon",
                    coordinates: activity.fertilization_area.area.coordinates,
                  },
                  properties: {},
                }}
              >
                <Layer
                  id={`fertilization-area-layer-${activity.id}`}
                  type="fill"
                  paint={{
                    "fill-color": "#088",
                    "fill-opacity": 0.5,
                  }}
                />
              </Source>
            ))}
          {selectedMarker ? (
            <Popup
              offset={25}
              latitude={
                selectedMarker.soil_sample
                  ? selectedMarker.soil_sample.location.coordinates[1]
                  : selectedMarker.fertilization_area.center[1]
              }
              longitude={
                selectedMarker.soil_sample
                  ? selectedMarker.soil_sample.location.coordinates[0]
                  : selectedMarker.fertilization_area.center[0]
              }
              onClose={() => {
                setSelectedMarker(null);
              }}
              closeButton={false}
            >
              <Button
                color="primary"
                onClick={() => router.push(`/activities/${selectedMarker.id}`)}
              >
                Go to activity
              </Button>
            </Popup>
          ) : null}
        </Map>
      </main>
    </RequireAuth>
  );
}
