import { RestService } from "@/app/core/services/core/RestService";
import { User } from "@/app/core/models/domain/User";
import { UserResponseContract } from "@/app/core/interfaces/services/user/UserResponseContract";

export class UserService extends RestService<User> {
  constructor() {
    super("/users", "user", "ua");
  }

  async getCurrent(): Promise<UserResponseContract> {
    return await this.httpGet<UserResponseContract>(`${this.apiHref()}/current`);
  }

  async uploadAvatar(file: FormData): Promise<any> {
    return await this.httpPost(`${this.apiHref()}/avatar`, file, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  }

  async removeAvatar(): Promise<any> {
    return await this.httpDelete(`${this.apiHref()}/avatar`);
  }
}
