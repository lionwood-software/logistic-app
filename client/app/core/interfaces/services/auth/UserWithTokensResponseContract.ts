import { UserJwtResponseContract } from "@/app/core/interfaces/services/auth/UserJwtResponseContract";

export interface UserWithTokensResponseContract {
  refreshToken: string;
  accessToken: string;
  user: UserJwtResponseContract;
}
