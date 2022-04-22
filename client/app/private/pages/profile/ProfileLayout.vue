<template>
  <div class="profile-wrapper grid-container">
    <div class="col-xs-2 col-sm-12">
      <profile-navigation-menu></profile-navigation-menu>
    </div>
    <div class="main col-xs-8 col-sm-12">
      <div v-if="error">Error happened</div>
      <suspense v-else>
        <template #default>
          <router-view></router-view>
        </template>
        <template #fallback> Loading.... </template>
      </suspense>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, onErrorCaptured, ref } from "vue";
import ProfileNavigationMenu from "@/app/private/pages/profile/components/ProfileNavigationMenu.vue";

export default defineComponent({
  name: "ProfileLayout",
  components: { ProfileNavigationMenu },
  setup() {
    const error = ref<Error | null>(null);
    onErrorCaptured((e) => {
      error.value = e;
      return true;
    });
    return { error };
  },
});
</script>

<style scoped lang="scss">
.profile-wrapper {
  padding: 32px 5%;
  /*  border: 1px solid red;*/
  column-gap: 40px;

  .main {
    /*border: 1px solid red;*/
  }
}
@media (max-width: 768px) {
  .profile-wrapper {
    row-gap: 40px;
    column-gap: unset;
  }
}
</style>
