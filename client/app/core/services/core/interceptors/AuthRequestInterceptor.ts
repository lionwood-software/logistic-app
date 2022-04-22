import { AxiosRequestConfig } from "axios";

export class AuthRequestInterceptor {
  public static onFulfilled = (config: AxiosRequestConfig) => {
    config.headers!.Authorization = `Bearer ${localStorage.getItem("token")}`;
    return config;
  };
}
