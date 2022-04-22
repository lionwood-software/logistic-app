<template>
  <div class="form-group">
    <div class="title">{{ title }}</div>
    <slot></slot>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "BaseFormGroup",
  props: {
    title: {
      type: String,
      required: true,
    },
  },
});
</script>

<style scoped lang="scss">
.form-group {
  display: flex;
  flex-direction: column;
  margin: 16px 0 32px 0;

  .title {
    font-size: 16px;
    line-height: 24px;
    font-weight: 500;
    margin-bottom: 12px;
    color: var(--text-secondary);
  }
}
</style>
