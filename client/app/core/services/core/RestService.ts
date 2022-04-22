import { HttpService } from "@/app/core/services/core/HttpService";
import { AxiosRequestConfig } from "axios";
import { FileResponseContract } from "@/app/core/interfaces/services/core/FileResponseContract";
import { PaginatedResponseContract } from "@/app/core/interfaces/services/core/PaginatedResponseContract";

export class RestService<T = any> extends HttpService {
  constructor(path: string, private _alias: string, private _actions: string = "cruda") {
    super(path);
  }

  public read<P = any>(params?: P): Promise<T> {
    if (!this._supportsAction("r")) throw "This service does not support read operation!";

    return this.httpGet<T>(this.apiHref(), params);
  }

  public all<P = any>(params?: P): Promise<T[]> {
    if (!this._supportsAction("a")) throw "This service does not support all operation!";
    return this.httpGetAll<T>(this.apiHref(), params);
  }

  public create<D = T, R = any>(data: D | FormData): Promise<R> {
    if (!this._supportsAction("c")) throw "This service does not support create operation!";

    return this.httpPost(this.apiHref(), data);
  }

  public update<D = T, R = T>(data: D | FormData): Promise<R> {
    if (!this._supportsAction("u")) throw "This service does not support update operation!";

    return this.httpPatch(`${this.apiHref()}`, data);
  }

  public upsert<A = T>(data: A | FormData): Promise<any> {
    if (!this._supportsAction("u")) throw "This service does not support update operation!";

    return this.httpPatch(`${this.apiHref()}`, data);
  }

  public delete(id: number): Promise<any> {
    if (!this._supportsAction("d")) throw "This service does not support delete operation!";

    return this.httpDelete(`${this.apiHref()}/${id}`);
  }

  protected async httpGet<R = T, P = any>(absoluteUrl: string, params?: P): Promise<R> {
    const response = await this.axios.get<R>(absoluteUrl, {
      params: params,
    });
    return response.data;
  }

  protected async httpGetAll<R = T, P = any>(absoluteUrl: string, params?: P): Promise<R[]> {
    const response = await this.axios.get<R[]>(absoluteUrl, {
      params: params,
    });
    return response.data;
  }

  protected async httpGetPaginated<R = T, P = any>(
    absoluteUrl: string,
    params?: P
  ): Promise<PaginatedResponseContract<R>> {
    const response = await this.axios.get<PaginatedResponseContract<R>>(absoluteUrl, {
      params: params,
    });
    return response.data;
  }

  protected async httpPost<D = T, R = T>(
    absoluteUrl: string,
    data?: D | FormData,
    config?: AxiosRequestConfig
  ): Promise<R> {
    const response = await this.axios.post<R>(absoluteUrl, data, config);
    return response.data;
  }

  protected async httpPut<D = T, P = any>(
    absoluteUrl: string,
    data: D | FormData,
    params?: P
  ): Promise<any> {
    const response = await this.axios.put(absoluteUrl, data, { params: params });
    return response.data;
  }

  protected async httpPatch<D = T, P = any>(
    absoluteUrl: string,
    data: D | FormData,
    params?: P
  ): Promise<any> {
    const response = await this.axios.patch(absoluteUrl, data, { params: params });
    return response.data;
  }

  protected async httpDelete(absoluteUrl: string): Promise<any> {
    const response = await this.axios.delete(absoluteUrl);
    return response.data;
  }

  protected async httpGetBlob<P>(
    absoluteUrl: string,
    params?: P
  ): Promise<FileResponseContract> {
    const response = await this.axios.get(absoluteUrl, {
      responseType: "blob",
      params: params,
    });
    const type = response.headers["content-type"];
    const originalName = this.getFileNameFromHeader(response.headers["content-disposition"]);
    return {
      file: new Blob([response.data as ArrayBuffer], { type }),
      originalName,
    };
  }

  private _supportsAction(action: string): boolean {
    return this._actions.includes(action);
  }

  private getFileNameFromHeader(header: string): string {
    const disposition = header;
    if (disposition && disposition.indexOf("attachment") !== -1) {
      const filenameRegex = /filename[^;=\n]*=((['"]).*?\2|[^;\n]*)/;
      const matches = filenameRegex.exec(disposition);
      if (matches != null && matches[1]) {
        return matches[1].replace(/['"]/g, "");
      }
    }
    return "file";
  }
}
