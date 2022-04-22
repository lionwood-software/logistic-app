import {
  Actions,
  createComposable,
  createStore,
  Getters,
  Module,
  Mutations,
} from "vuex-smart-module";
import { profileModule } from "@/store/modules/ProfileModule";
import { authModule } from "@/store/modules/AuthModule";
import { orderModule } from "@/store/modules/OrderModule";
import { savedSearchModule } from "@/store/modules/SavedSearchModule";
import { bookmarkModule } from "@/store/modules/BookmarkModule";
import { checkRouteModule } from "@/store/modules/CheckRouteModule";

class RootState {
  isAuthenticated = false;
}
class RootGetters extends Getters<RootState> {}
class RootMutations extends Mutations<RootState> {
  setAuth(payload: boolean) {
    this.state.isAuthenticated = payload;
  }
}
class RootActions extends Actions<RootState, RootGetters, RootMutations, RootActions> {}
export const root = new Module({
  state: RootState,
  getters: RootGetters,
  mutations: RootMutations,
  actions: RootActions,
  namespaced: false,
  modules: {
    profileModule,
  },
});
export const useRoot = createComposable(root);
export const store = createStore(root);
