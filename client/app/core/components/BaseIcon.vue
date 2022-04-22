<template>
  <div
    v-if="iconSrc"
    class="icon"
    :style="[
      { 'mask-image': `url(/${iconSrc})` },
      { '-webkit-mask-image': `url(/${iconSrc})` },
      iconColor
        ? { 'background-color': `var(--${iconColor})` }
        : { 'background-color': 'var(--additional-high)' },
    ]"
  ></div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "BaseIcon",
  props: {
    iconSrc: {
      type: String,
      required: false,
    },
    iconColor: {
      type: String,
      required: false,
    },
  },
});
</script>

<style scoped lang="scss">
.icon {
  -webkit-mask-size: contain;
  -webkit-mask-position: center;
  -webkit-mask-repeat: no-repeat;
  mask-size: contain;
  mask-position: center;
  mask-repeat: no-repeat;
  width: 15px;
  height: 15px;
}
</style>
