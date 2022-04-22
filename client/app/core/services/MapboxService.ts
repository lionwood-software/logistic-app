import axios from "axios";

export class MapboxService {
  async getDirection(
    pickupCoordinates: number[],
    destinationCoordinates: number[],
    token: string
  ) {
    const response = await axios.get(
      `https://api.mapbox.com/directions/v5/mapbox/driving/${pickupCoordinates[0]},${pickupCoordinates[1]};${destinationCoordinates[0]},${destinationCoordinates[1]}?steps=true&geometries=geojson&access_token=${token}&overview=full`
    );
    return response.data;
  }
}
