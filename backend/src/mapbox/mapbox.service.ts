import { Injectable } from '@nestjs/common';
import axios from 'axios';
import { ConfigService } from '@nestjs/config';
import { MapboxGeocodingResponse } from './interfaces/mapbox-geocoding-response.contract';

@Injectable()
export class MapboxService {
  constructor(private readonly configService: ConfigService) {}

  async getForwardGeocoding(search: string): Promise<MapboxGeocodingResponse> {
    const response = await axios.get(
      `https://api.mapbox.com/geocoding/v5/mapbox.places/${search}.json?country=US&access_token=${this.configService.get<string>(
        'MAPBOX_KEY',
      )}`,
    );
    return response.data;
  }
}
