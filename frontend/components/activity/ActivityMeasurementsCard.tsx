"use strict";
"use client";
import { useGetMeasurementsQuery } from "@/redux/features/activitiesApiSlice";
import { useState } from "react";
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Divider,
  Spacer,
} from "@nextui-org/react";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import CreateMeasurementModal from "./CreateMeasurementModal";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  Tooltip,
  PointElement,
  LineElement,
} from "chart.js";
import { Line } from "react-chartjs-2";
import dayjs, { Dayjs } from "dayjs";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip
);

export default function ActivityMeasurementsCard({
  activity,
  activityId,
}: {
  activity: Activity;
  activityId: string;
}) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [measurementsParams, setMeasurementsParams] = useState({
    activity: activityId,
    // date_after: dayjs().startOf("month").format("YYYY-MM-DD"),
    // date_before: dayjs().endOf("month").format("YYYY-MM-DD"),
  });
  const { data: measurements } = useGetMeasurementsQuery(measurementsParams);
  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const darkTickColor = "rgba(255, 255, 255, 0.7)"; // Lighter grey for ticks
  const darkLegendColor = "rgba(255, 255, 255, 0.7)"; // Lighter grey for legend labels

  const monthDays = () => {
    const initialDate = dayjs().startOf("month");
    const daysInMonth = initialDate.daysInMonth();
    const days: string[] = [];
    Array.from({ length: daysInMonth }, (_, i) => i + 1).forEach((day) => {
      days.push(initialDate.date(day).format("YYYY-MM-DD"));
    });
    return days;
  };

  const data = {
    labels: monthDays() || [],
    datasets: [
      {
        label: "Measurements",
        data: measurements?.map((measure: Measurement) => measure.value) || [],
        fill: true,
        backgroundColor: "rgba(75, 192, 192, 0.2)",
        borderColor: "#ffffff",
        borderWidth: 2,
      },
    ],
  };

  const options = {
    scales: {
      x: {
        ticks: {
          color: darkTickColor,
        },
      },
      y: {
        ticks: {
          color: darkTickColor,
        },
      },
    },
    plugins: {
      legend: {
        labels: {
          color: darkLegendColor,
        },
      },
    },
  };

  return (
    <div className="w-3/5">
      <Card className="h-full">
        <CardHeader>Measurements</CardHeader>
        <Divider />
        <CardBody className="p-10">
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
              views={["month", "year"]}
              className="bg-white"
              sx={{ width: 400, height: 50 }}
              slotProps={{
                field: { clearable: true },
              }}
              onChange={(date: Dayjs | null) => {
                if (date) {
                  setMeasurementsParams((prev) => ({
                    ...prev,
                    date_after: date.startOf("month").format("YYYY-MM-DD"),
                    date_before: date.endOf("month").format("YYYY-MM-DD"),
                  }));
                }
              }}
              defaultValue={dayjs()}
            />
          </LocalizationProvider>
          <Spacer y={10} />
          <Line data={data} options={options} />
        </CardBody>
        <CardFooter>
          <Button onClick={handleOpenModal}>Add Measurement</Button>
        </CardFooter>
        <CreateMeasurementModal
          isOpen={isModalOpen}
          onOpenChange={setIsModalOpen}
          activity={activity}
        />
      </Card>
    </div>
  );
}
