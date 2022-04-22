import {
  Actions,
  Context,
  createComposable,
  Getters,
  Module,
  Mutations,
} from "vuex-smart-module";
import { UserJwtResponseContract } from "@/app/core/interfaces/services/auth/UserJwtResponseContract";
import { LoginRequestContract } from "@/app/core/interfaces/services/auth/LoginRequestContract";
import { container } from "tsyringe";
import { AuthService } from "@/app/core/services/AuthService";
import { RegisterUserRequestContract } from "@/app/core/interfaces/services/auth/RegisterUserRequestContract";
import { profileModule } from "@/store/modules/ProfileModule";
import { Store } from "vuex";
import { root } from "@/store/Store";

class AuthState {
  profileCtx: Context<typeof profileModule>;
  rootCtx: Context<typeof root>;
}
class AuthGetters extends Getters<AuthState> {}
class AuthMutations extends Mutations<AuthState> {
  setAuth(payload: boolean) {
    this.state.rootCtx.mutations.setAuth(payload);
  }
  setUser(payload: UserJwtResponseContract | null) {
    this.state.profileCtx.actions.fetchUser(payload);
  }
}
class AuthActions extends Actions<AuthState, AuthGetters, AuthMutations, AuthActions> {
  $init(store: Store<any>): void {
    this.state.profileCtx = profileModule.context(store);
    this.state.rootCtx = root.context(store);
  }
  async login(dto: LoginRequestContract) {
    const response = await container.resolve(AuthService).login(dto);
    localStorage.setItem("token", response.accessToken);
    this.mutations.setAuth(true);
    this.mutations.setUser(response.user);
  }
  async register(dto: RegisterUserRequestContract) {
    const response = await container.resolve(AuthService).registration(dto);
    localStorage.setItem("token", response.accessToken);
    this.mutations.setAuth(true);
    this.mutations.setUser(response.user);
  }
  async logout() {
    await container.resolve(AuthService).logout();
    localStorage.removeItem("token");
    this.mutations.setAuth(false);
    this.mutations.setUser(null);
  }
}
export const authModule = new Module({
  state: AuthState,
  getters: AuthGetters,
  mutations: AuthMutations,
  actions: AuthActions,
});
export const useAuthModule = createComposable(authModule);
