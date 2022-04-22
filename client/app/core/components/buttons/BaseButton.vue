<template>
  <button
    class="basic"
    :class="{
      primary,
      'primary-reverted': primaryReverted,
      'primary-low': primaryLow,
      'primary-unfilled': primaryUnfilled,
      'multi-select': multiSelect,
      decline,
      'decline-void': declineVoid,
      dark,
      danger,
      'danger-fill': dangerFill,
      reset,
      disabled,
    }"
    :disabled="disabled"
  >
    <slot></slot>
  </button>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "BaseButton",
  props: {
    primary: {
      type: Boolean,
      required: false,
    },
    primaryReverted: {
      type: Boolean,
      required: false,
    },
    primaryLow: {
      type: Boolean,
      required: false,
    },
    primaryUnfilled: {
      type: Boolean,
      required: false,
    },
    multiSelect: {
      type: Boolean,
      required: false,
    },
    decline: {
      type: Boolean,
      required: false,
    },
    declineVoid: {
      type: Boolean,
      required: false,
    },
    dark: {
      type: Boolean,
      required: false,
    },
    danger: {
      type: Boolean,
      required: false,
    },
    dangerFill: {
      type: Boolean,
      required: false,
    },
    reset: {
      type: Boolean,
      required: false,
    },
    disabled: {
      type: Boolean,
      required: false,
    },
  },
});
</script>

<style scoped lang="scss">
button {
  &.basic {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 8px;
    border-radius: 4px;
    cursor: pointer;
    font-size: 16px;
    line-height: 24px;
    text-align: center;
    min-width: 80px;
    min-height: 42px;
    padding: 9px 24px;
  }
  &:disabled {
    opacity: 0.7;
    cursor: not-allowed;
  }
  &.primary {
    background: var(--primary);
    color: var(--text-white);
  }
  &.primary-reverted {
    background: var(--text-white);
    color: var(--primary);
  }
  &.primary-low {
    background: var(--primary-low);
    color: var(--text-white);
  }
  &.primary-unfilled {
    color: var(--primary);
    background: none;
  }
  &.multi-select {
    background: var(--primary-low);
    color: var(--text-cta);
    height: 26px;
    min-height: 0;
    min-width: auto;
    font-size: 12px;
    line-height: 16px;
    padding: 6px 4px;
    font-weight: 500;
    gap: 4px;
  }
  &.decline {
    background: var(--secondary-high);
    color: var(--secondary-low);
  }
  &.decline-void {
    background: none;
    color: var(--text-additional);
  }
  &.dark {
    background: var(--additional-high);
    color: var(--secondary-low);
  }
  &.danger {
    color: var(--danger);
    background: none;
  }
  &.danger-fill {
    background: var(--danger);
    color: var(--white);
  }
  &.reset {
    min-width: 0;
    min-height: 0;
    padding: 0;
  }
}
</style>
