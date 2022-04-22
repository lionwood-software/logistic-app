import { useToast } from "vue-toastification";
import { container } from "tsyringe";
import { TokenService } from "@/app/core/services/TokenService";
import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from "axios";
import router from "@/router/Router";

export class ErrorResponseInterceptor {
  private static _toast = useToast();
  private static _isRefreshing = false;
  private static _tokenService: TokenService = container.resolve(TokenService);

  public static onFulfilled = (response: any) => {
    return Promise.resolve(response);
  };

  public static onRejected = (error: AxiosError) => {
    const status = error.response ? error.response.status : null;
    const response = error.response?.data;
    const originalRequest = error.config;
    switch (status) {
      case 401:
        return ErrorResponseInterceptor._handle401Response(originalRequest);
      default:
        return ErrorResponseInterceptor._handleUnknownResponse(response);
    }
  };

  private static async _handle401Response(originalRequest: AxiosRequestConfig) {
    if (!this._isRefreshing) {
      return new Promise((resolve) => {
        this._isRefreshing = true;
        this._tokenService
          .refreshTokens()
          .then((res) => {
            localStorage.setItem("token", res.accessToken);
            resolve(axios.request(this.addAuthorizationHeader(originalRequest)));
          })
          .catch((error: AxiosError) => this._logOut(error.response?.data))
          .finally(() => (this._isRefreshing = false));
      });
    } else {
      return new Promise((resolve) => {
        const interval = setInterval(() => {
          if (!this._isRefreshing) {
            clearInterval(interval);
            resolve(axios.request(this.addAuthorizationHeader(originalRequest)));
          }
        }, 50);
      });
    }
  }

  private static _handleUnknownResponse(response: any) {
    if (typeof response.message === "string") {
      this._toast.error(response.message ? response.message : "Unknown Error");
    } else {
      for (const error of response.message) {
        this._toast.error(error);
      }
    }
    return Promise.reject(response);
  }

  private static async _logOut(response: any) {
    await router.push({ name: "Login" });
    localStorage.clear();
    this._toast.error(response.message ? response.message : "Unknown Error");
    return Promise.reject(response);
  }

  private static addAuthorizationHeader(originalRequest: AxiosRequestConfig) {
    originalRequest.headers!.Authorization = `Bearer ${localStorage.getItem("token")}`;
    return originalRequest;
  }
}
