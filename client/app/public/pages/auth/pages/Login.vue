<template>
  <div class="login">
    <base-card
      class="main"
      :padding="windowWidth <= 768 ? 'mini' : 'normal'"
      accept
      accept-title="Sign in"
      @accepted="submit"
    >
      <template #title>Sign in</template>
      <div class="form">
        <base-input
          class="username"
          label="Username"
          required
          v-model="form.username"
          @blur="v$.username.$touch()"
          :errors="v$.username.$errors"
        >
        </base-input>
        <base-input
          class="password"
          label="Password"
          type="password"
          required
          password-icon
          v-model="form.password"
          @blur="v$.password.$touch()"
          :errors="v$.password.$errors"
        ></base-input>
      </div>
    </base-card>
    <additional-card
      class="additional"
      button-title="Register"
      @accepted="$router.push({ name: 'CheckMc' })"
    >
      <template #description>Don’t have an account?</template>
    </additional-card>
  </div>
  <spinner-loader :visible="false"></spinner-loader>
</template>

<script lang="ts">
import BaseCard from "@/app/core/components/cards/BaseCard.vue";
import BaseInput from "@/app/core/components/forms/BaseInput.vue";
import { defineComponent, reactive, ref, useSlots, watch } from "vue";
import { required, minLength, helpers } from "@vuelidate/validators";
import useVuelidate from "@vuelidate/core";
import AdditionalCard from "@/app/core/components/cards/AdditionalCard.vue";
import SpinnerLoader from "@/app/core/components/SpinnerLoader.vue";
import { container } from "tsyringe";
import { AuthService } from "@/app/core/services/AuthService";
import { LoginRequestContract } from "@/app/core/interfaces/services/auth/LoginRequestContract";
import { useToast } from "vue-toastification";
import { useRouter } from "vue-router";
import { useRoot } from "@/store/Store";
import { useAuthModule } from "@/store/modules/AuthModule";
export default defineComponent({
  name: "Login",
  components: { SpinnerLoader, AdditionalCard, BaseInput, BaseCard },
  setup() {
    const windowWidth = ref(window.innerWidth);
    const authCtx = useAuthModule();
    const router = useRouter();
    const toast = useToast();

    const form = reactive<LoginRequestContract>({
      username: "",
      password: "",
    });

    const rules = {
      username: {
        required,
      },
      password: {
        required,
        minLength: minLength(2),
      },
    };

    const v$ = useVuelidate(rules, form);

    const submit = (): void => {
      v$.value.$touch();
      if (!v$.value.$invalid) {
        authCtx.actions.login(form).then(() => {
          toast.clear();
          router.push({ name: "SearchListings" });
        });
      }
    };

    return {
      form,
      v$,
      submit,
      windowWidth,
    };
  },
});
</script>

<style scoped lang="scss">
.login {
  display: flex;
  width: 100%;
  height: 100%;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  gap: 40px;

  .main {
    width: calc(100% * 2 / 3);

    @media screen and (max-width: 768px) {
      width: 100%;
      height: auto;
      display: flex;
      padding: 0 16px;
    }

    .form {
      display: flex;
      flex-direction: column;
      gap: 16px;

      .username {
        display: flex;
        justify-content: center;
      }

      .password {
        display: flex;
      }
    }
  }

  .additional {
    width: calc(100% * 2 / 3);

    @media screen and (max-width: 768px) {
      width: 100%;
      display: flex;
      margin: 0 10px;
      padding: 0 16px;
    }
  }
}
</style>
