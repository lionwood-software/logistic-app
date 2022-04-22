export class EnvironmentService {
  public get apiHost(): string {
    return process.env.VUE_APP_API_HOST;
  }
  public get avatarsBucketOrigin(): string {
    return process.env.VUE_APP_S3_AVATARS_ORIGIN;
  }
  public get mapboxToken(): string {
    return process.env.VUE_APP_MAPBOX_TOKEN;
  }
}
