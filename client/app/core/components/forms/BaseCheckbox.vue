<template>
  <label :for="randomKey" class="container">
    <input
      :id="randomKey"
      type="checkbox"
      :value="value"
      :checked="checked"
      @change="$emit('update:model-value', value)"
    />
    <div></div>
    <p v-if="slots.default"><slot></slot></p>
  </label>
</template>

<script setup lang="ts">
import { useSlots } from "vue";

const props = defineProps({
  value: {
    required: false,
  },
  checked: {
    required: true,
  },
});

const slots = useSlots();
const randomKey = Math.random().toString(36);
</script>

<style scoped lang="scss">
.container {
  display: flex;
  align-items: center;
  cursor: pointer;
  position: relative;
  gap: 8px;

  p {
    color: var(--text-additional);
    font-size: 16px;
    line-height: 18px;
  }

  input {
    display: none;

    &:checked + div {
      color: var(--primary);
    }

    &:checked + div::before {
      border-color: var(--primary);
      font-size: 60px;
    }

    &:checked + div::after {
      transform: scale(1);
    }
  }

  div {
    display: flex;
    align-items: center;
    transition: 0.5s color ease;
    white-space: nowrap;
    position: relative;
    height: 12px;
    width: 14px;

    &::before {
      content: "";
      width: 100%;
      height: 100%;
      border: 1px solid var(--secondary-high);
      border-radius: 3px;
    }

    &::after {
      content: "";
      width: 60%;
      height: 62%;
      top: 20%;
      left: 20%;
      border-radius: 2px;
      background-color: var(--primary);
      position: absolute;
      transform: scale(0);
      transition: 0.5s transform ease;
    }
  }
}
</style>
