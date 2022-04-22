import axios, { AxiosInstance, AxiosRequestConfig } from "axios";
import { EnvironmentService } from "@/app/core/services/core/EnvironmentService";
import { container, singleton } from "tsyringe";
import { AuthRequestInterceptor } from "@/app/core/services/core/interceptors/AuthRequestInterceptor";
import { ErrorResponseInterceptor } from "@/app/core/services/core/interceptors/ErrorResponseInterceptor";

@singleton()
export class HttpService {
  private _axios: AxiosInstance = axios.create({
    withCredentials: true,
  });
  private readonly _host: string;
  private readonly _cleanPath: string;

  protected environmentService: EnvironmentService;

  constructor(path: string) {
    this.environmentService = container.resolve(EnvironmentService);
    this._host = this._getHost();
    this._cleanPath = path;
    this.axios.interceptors.response.use(
      ErrorResponseInterceptor.onFulfilled,
      ErrorResponseInterceptor.onRejected
    );
    this.axios.interceptors.request.use(AuthRequestInterceptor.onFulfilled);
  }

  request(config: AxiosRequestConfig) {
    return this._axios.request(config);
  }

  protected get axios(): AxiosInstance {
    return this._axios;
  }

  protected apiHref(): string {
    return `${this.apiBaseHref()}${this._cleanPath}`;
  }

  protected apiBaseHref(): string {
    if (!this._host) {
      return `/api`;
    } else {
      return `${this._host}/api`;
    }
  }

  private _getHost(): string {
    return this.environmentService.apiHost;
  }
}
