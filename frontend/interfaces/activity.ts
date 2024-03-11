interface Measurement {
  id?: number | string;
  value: number | string;
  date: string;
}

interface Soil_Sample {
  id?: number | string;
  location: {
    type: string;
    coordinates: [number, number];
  };
}

interface Fertilization_Area {
  id?: number | string;
  area: {
    type: string;
    coordinates: number[][][];
  };
  center: [number, number];
}

interface Activity {
  id?: number | string;
  type: string | number;
  activity_type?: string;
  name?: string;
  measurements: Measurement[];
  soil_sample: Soil_Sample;
  fertilization_area: Fertilization_Area;
}
