"use strict";
"use client";
import { Card, CardBody, CardHeader, Divider, Spacer } from "@nextui-org/react";
import { Map, Marker, Source, Layer } from "react-map-gl";

export default function ActivityDetailCard({
  activity,
}: {
  activity: Activity;
}) {
  const mapboxToken = process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN;
  return (
    <div className="w-2/5">
      <Card className="h-full">
        <CardHeader>Activity Details</CardHeader>
        <Divider />
        <CardBody>
          <Spacer y={5} />
          <p>Activity ID: {activity?.id}</p>
          <Spacer y={5} />
          <p>Activity Name: {activity?.name}</p>
          <Spacer y={5} />
          <p>Activity Type: {activity?.activity_type}</p>
          <Spacer y={5} />
          <Map
            mapboxAccessToken={mapboxToken}
            mapStyle="mapbox://styles/mapbox/satellite-v9"
            initialViewState={{
              latitude:
                activity?.soil_sample?.location.coordinates[1] ||
                activity?.fertilization_area?.center[1],
              longitude:
                activity?.soil_sample?.location.coordinates[0] ||
                activity?.fertilization_area?.center[0],
              zoom: 11,
            }}
            maxZoom={20}
            minZoom={3}
            style={{ width: 590, height: 250 }}
          >
            {activity?.soil_sample && (
              <Marker
                key={activity.id}
                latitude={activity.soil_sample.location.coordinates[1]}
                longitude={activity.soil_sample.location.coordinates[0]}
              >
                <div className="text-3xl">📍</div>
              </Marker>
            )}
            {activity?.fertilization_area && (
              <Source
                key={activity.id}
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
            )}
          </Map>
        </CardBody>
      </Card>
    </div>
  );
}
