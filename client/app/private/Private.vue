<template>
  <the-wrapper>
    <router-view></router-view>
  </the-wrapper>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import TheWrapper from "@/app/private/components/TheWrapper.vue";

export default defineComponent({
  name: "Private",
  components: { TheWrapper },
});
</script>
