import { useState } from "react";
import { useCreateMeasurementMutation } from "@/redux/features/activitiesApiSlice";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Input,
  Spacer,
} from "@nextui-org/react";

export default function CreateMeasurementModal({
  isOpen,
  onOpenChange,
  activity,
}: {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  activity: Activity;
}) {
  const [measurement, setMeasurement] = useState<Measurement>({
    value: 0,
    date: "",
  });
  const [createMeasurement, { isLoading }] = useCreateMeasurementMutation();

  const onCreate = () => {
    if (!activity) return;
    if (measurement.date === "") return;
    createMeasurement({
      ...measurement,
      activity: activity.id,
    })
      .unwrap()
      .then(() => {
        setMeasurement({ value: 0, date: "" });
        onOpenChange(false);
      });
  };
  return (
    <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className="flex flex-col gap-1">
              Create new Measurement
            </ModalHeader>
            <ModalBody className="max-h-[400px] overflow-y-auto">
              <Input
                type="number"
                value={measurement.value.toString()}
                onValueChange={(value) => {
                  setMeasurement((prev) => ({ ...prev, value }));
                }}
                label="Value"
                variant="bordered"
                placeholder="Enter the value of the measurement"
              />
              <Spacer y={2} />
              <Input
                value={measurement.date}
                onValueChange={(date) => {
                  setMeasurement((prev) => ({ ...prev, date }));
                }}
                label="Date"
                variant="bordered"
                placeholder="Enter the date of the measurement"
                type="date"
              />
            </ModalBody>
            <ModalFooter>
              <Button
                color="danger"
                variant="light"
                onPress={onClose}
                isDisabled={isLoading}
              >
                Cancel
              </Button>
              <Button color="primary" onPress={onCreate} isDisabled={isLoading}>
                Create
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
}
