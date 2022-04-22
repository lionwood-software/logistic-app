import { LoginRequestContract } from "@/app/core/interfaces/services/auth/LoginRequestContract";
import { UserWithTokensResponseContract } from "@/app/core/interfaces/services/auth/UserWithTokensResponseContract";
import { RegisterUserRequestContract } from "@/app/core/interfaces/services/auth/RegisterUserRequestContract";
import { RestService } from "@/app/core/services/core/RestService";

export class AuthService extends RestService {
  constructor() {
    super("/auth", "auth", "");
  }

  async login(dto: LoginRequestContract): Promise<UserWithTokensResponseContract> {
    return await this.httpPost<LoginRequestContract, UserWithTokensResponseContract>(
      `${this.apiHref()}/login`,
      dto
    );
  }

  async registration(
    dto: RegisterUserRequestContract
  ): Promise<UserWithTokensResponseContract> {
    return await this.httpPost<RegisterUserRequestContract, UserWithTokensResponseContract>(
      `${this.apiHref()}/registration`,
      dto
    );
  }

  async logout(): Promise<void> {
    return await this.httpPost(`${this.apiHref()}/logout`);
  }
}
