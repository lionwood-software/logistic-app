import { Geometry } from "geojson";

export class State {
  id: number;
  name: string;
  abbreviation: string;
  polygon: Geometry;
}
