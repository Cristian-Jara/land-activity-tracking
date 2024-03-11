"use strict";
"use client";
import { Select, SelectSection, SelectItem, Button } from "@nextui-org/react";
import CreateActivityModal from "./CreateActivityModal";
import { useState } from "react";

export default function HeaderOptions({
  selectedFeature,
  activities,
  isFetching,
  handleFlyTo,
}: {
  selectedFeature: Feature | null;
  activities: Activity[];
  isFetching: boolean;
  handleFlyTo: (activity: Activity) => void;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const handleSelectionChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const activity = activities?.find(
      (activity) => activity.id === Number(e.target.value)
    );
    if (activity) {
      handleFlyTo(activity);
    }
  };

  return (
    <div className="absolute bottom-20 left-1">
      <div className="flex">
        <Select
          placeholder="Select a activity"
          className="w-80"
          size="lg"
          onChange={handleSelectionChange}
          isLoading={isFetching}
        >
          <SelectSection title="Activities">
            {activities?.map((activity) => (
              <SelectItem key={`${activity.id}`} value={activity.id}>
                {activity.name}
              </SelectItem>
            ))}
          </SelectSection>
        </Select>
        <Button
          size="lg"
          className="ml-2"
          color="primary"
          isDisabled={!selectedFeature}
          onClick={() => setIsOpen(true)}
        >
          Add
        </Button>
        <CreateActivityModal
          isOpen={isOpen}
          onOpenChange={setIsOpen}
          selectedFeature={selectedFeature}
        />
      </div>
    </div>
  );
}
