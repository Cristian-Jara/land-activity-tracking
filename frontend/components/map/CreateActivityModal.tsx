import { useEffect, useState } from "react";
import { useCreateActivityMutation } from "@/redux/features/activitiesApiSlice";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Input,
  Spacer,
  Divider,
} from "@nextui-org/react";
import { useRouter } from "next/navigation";

export default function CreateActivityModal({
  isOpen,
  onOpenChange,
  selectedFeature,
}: {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  selectedFeature: Feature | null;
}) {
  const router = useRouter();
  const [name, setName] = useState("");
  const [type, setType] = useState("");
  const [measurements, setMeasurements] = useState<Measurement[]>([]);
  const [createActivity, { isLoading }] = useCreateActivityMutation();

  useEffect(() => {
    if (selectedFeature) {
      setType(
        selectedFeature.geometry.type === "Point"
          ? "Soil Sample"
          : "Fertilization Area"
      );
    }
  }, [selectedFeature]);

  const onCreate = () => {
    if (selectedFeature) {
      createActivity({
        name,
        type,
        measurement_set: measurements,
        fertilization_area:
          selectedFeature.geometry.type === "Polygon"
            ? {
                area: selectedFeature.geometry,
              }
            : null,
        soil_sample:
          selectedFeature.geometry.type === "Point"
            ? {
                location: selectedFeature.geometry,
              }
            : null,
      })
        .unwrap()
        .then((data: Activity) => {
          setName("");
          setType("");
          setMeasurements([]);
          onOpenChange(false);
          router.push(`/activities/${data.id}`);
        });
    }
  };

  return (
    <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className="flex flex-col gap-1">
              Create new Activity
            </ModalHeader>
            <ModalBody className="max-h-[400px] overflow-y-auto">
              <Input
                value={name}
                onValueChange={setName}
                label="Name"
                variant="bordered"
                placeholder="Enter the name of the activity"
              />
              <Input
                value={type}
                onValueChange={setType}
                label="Type"
                variant="bordered"
                placeholder="Enter the type of the activity"
                isDisabled
              />
              <Button
                color="primary"
                className="w-full min-h-[40px]"
                onClick={() => {
                  setMeasurements((prev) => [
                    ...prev,
                    { value: 0, date: new Date().toISOString() },
                  ]);
                }}
              >
                Add Measurement
              </Button>
              {measurements.map((measurement, index) => (
                <div key={index}>
                  <Input
                    type="number"
                    value={measurement.value.toString()}
                    onValueChange={(value) => {
                      setMeasurements((prev) => {
                        const newMeasurements = [...prev];
                        newMeasurements[index].value = Number(value);
                        return newMeasurements;
                      });
                    }}
                    label="Value"
                    variant="bordered"
                    placeholder="Enter the value of the measurement"
                  />
                  <Spacer y={2} />
                  <Input
                    value={measurement.date}
                    onValueChange={(date) => {
                      setMeasurements((prev) => {
                        const newMeasurements = [...prev];
                        newMeasurements[index].date = date;
                        return newMeasurements;
                      });
                    }}
                    label="Date"
                    variant="bordered"
                    placeholder="Enter the date of the measurement"
                    type="date"
                  />
                  <Spacer y={2} />
                  <Divider />
                </div>
              ))}
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
