<template>
  <base-modal v-model="opened" title="Save search">
    <template #title>You are almost logged out</template>
    <template #description>Are you sure you want log out?</template>
    <template #actions>
      <div class="logout-actions">
        <base-button @click="submit" primary>
          <base-icon
            icon-src="static/icons/profile/log-out.svg"
            icon-color="white"
          ></base-icon>
          Yes, log out
        </base-button>
        <base-button @click="opened = false" decline>Go back</base-button>
      </div>
    </template>
  </base-modal>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import BaseModal from "@/app/core/components/BaseModal.vue";
import { useRouter } from "vue-router";
import BaseButton from "@/app/core/components/buttons/BaseButton.vue";
import BaseIcon from "@/app/core/components/BaseIcon.vue";
import { useRoot } from "@/store/Store";
import { useAuthModule } from "@/store/modules/AuthModule";

export default defineComponent({
  name: "LogOutModal",
  components: { BaseIcon, BaseButton, BaseModal },
  setup() {
    const authCtx = useAuthModule();
    let opened = ref<boolean>(false);
    const router = useRouter();
    const open = () => {
      opened.value = true;
    };
    const submit = () => {
      authCtx.actions.logout().then(() => {
        opened.value = false;
        router.push({ name: "Login" });
      });
    };
    return {
      open,
      opened,
      submit,
    };
  },
});
</script>

<style scoped lang="scss">
.logout-actions {
  display: flex;
  width: 100%;
  justify-content: space-between;
}
</style>
