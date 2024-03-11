"use strict";
"use client";
import {
  ActivityDetailCard,
  ActivityMeasurementsCard,
} from "@/components/activity";
import { RequireAuth } from "@/components/common";
import { useGetActivityQuery } from "@/redux/features/activitiesApiSlice";
import { Spacer, Spinner } from "@nextui-org/react";
import { useParams } from "next/navigation";

export default function Activity() {
  const { activityId } = useParams<{ activityId: string }>();
  const { data: activity, isLoading } = useGetActivityQuery(activityId);
  return (
    <RequireAuth>
      {isLoading ? (
        <Spinner />
      ) : (
        <div className="flex flex-row p-10" style={{ height: "90vh" }}>
          <ActivityDetailCard activity={activity} />
          <Spacer x={5} />
          <ActivityMeasurementsCard
            activity={activity}
            activityId={activityId}
          />
        </div>
      )}
    </RequireAuth>
  );
}
