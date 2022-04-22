import { Geometry } from 'geojson';

export interface MapboxGeocodingResponse {
  type: string;
  query: string[];
  features: Feature[];
}

interface Feature {
  id: string;
  type: string;
  place_type: string[];
  relevance: number;
  properties: any;
  text: string;
  place_name: string;
  bbox: number[];
  center: number[];
  geometry: Geometry;
  context: Context[];
}

interface Context {
  id: string;
  wikidata: string;
  text: string;
  short_code?: string;
}
