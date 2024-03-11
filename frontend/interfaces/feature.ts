interface Feature {
  id: number | string;
  type: string;
  geometry: {
    type: string;
    coordinates: number[];
  };
}
