import { AreaType } from "@/app/core/enums/AreaType";
import { Geometry } from "geojson";

export class Area {
  id: number;
  name: string;
  type: AreaType;
  polygon: Geometry;
}
