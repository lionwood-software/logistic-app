<template>
  <div class="background">
    <router-view></router-view>
  </div>
</template>

<script lang="ts">
import "core-js";
import { defineComponent } from "vue";

export default defineComponent({
  name: "App",
});
</script>

<style lang="scss">
@import "../styles/main.scss";

.background {
  background: var(--background);
}
</style>
