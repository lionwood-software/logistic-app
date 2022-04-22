<template>
  <div class="slider-wrapper" :class="{ simple }">
    <input v-if="!hideInputs && firstValue !== undefined" v-model.number="sliderMin" />
    <div class="container">
      <div
        class="slider-track"
        :style="{
          background: `linear-gradient(to right, #dadae5 ${percent1}% , #3264fe ${percent1}% , #3264fe ${percent2}%, #dadae5 ${percent2}%)`,
        }"
      ></div>
      <input
        v-if="firstValue !== undefined"
        type="range"
        :min="min"
        :max="max"
        :step="step"
        v-model.number="sliderMin"
      />
      <input type="range" :min="min" :max="max" :step="step" v-model.number="sliderMax" />
    </div>
    <input v-if="!hideInputs" v-model.number="sliderMax" />
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, ref, WritableComputedRef } from "vue";
import { onClickOutside } from "@vueuse/core";

const props = defineProps({
  step: {
    type: Number,
    required: false,
    default: 1,
  },
  min: {
    type: Number,
    required: true,
    default: 0,
  },
  max: {
    type: Number,
    required: true,
    default: 100,
  },
  firstValue: {
    type: Number,
  },
  secondValue: {
    type: Number,
    required: true,
  },
  hideInputs: {
    type: Boolean,
    required: false,
    default: false,
  },
  simple: {
    type: Boolean,
    required: false,
  },
});

const emits = defineEmits<{
  (e: "update:first-value", value: any): void;
  (e: "update:second-value", value: any): void;
}>();

let percent1 = ref<number>();
let percent2 = ref<number>();

onMounted(() => {
  calculateLine();
});

const calculateLine = () => {
  if (props.secondValue && !props.firstValue) {
    percent1.value = 0;
    percent2.value = (props.secondValue / props.max) * 100;
  } else {
    percent1.value =
      props.firstValue === props.min
        ? 0
        : ((props.firstValue! - props.min) / (props.max - props.min)) * 100;
    percent2.value = (props.secondValue / props.max) * 100;
  }
};

const sliderMin: WritableComputedRef<number> = computed({
  get(): number {
    calculateLine();
    return props.firstValue!;
  },
  set(newValue: number): void {
    if (props.secondValue && newValue > props.secondValue) {
      emits("update:second-value", newValue);
    }
    emits("update:first-value", newValue >= props.max ? props.max : newValue);
  },
});

const sliderMax: WritableComputedRef<number> = computed({
  get(): number {
    calculateLine();
    return props.secondValue!;
  },
  set(newValue: number): void {
    if (newValue < props.firstValue!) {
      emits("update:first-value", newValue);
    }
    emits("update:second-value", newValue <= props.min ? props.min : newValue);
  },
});
</script>

<style scoped lang="scss">
.slider-wrapper {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 6px;
  position: relative;
  width: 100%;
  height: 44px;
  background-color: var(--white);
  padding: 6px 10px;
  border-radius: 4px;
  box-shadow: 0 14px 38px 0 #2f323533;

  &.simple {
    background: transparent;
    padding: 0 0;
    height: 1px;
  }

  & > input {
    text-align: center;
    padding: 8px 10px;
    border: 1px solid var(--secondary-medium);
    border-radius: 4px;
    font-size: 14px;
    line-height: 16px;
    max-width: 40px;
  }

  .container {
    position: relative;
    width: 100%;
    height: 100%;

    .slider-track {
      width: 100%;
      height: 2px;
      position: absolute;
      margin: auto;
      top: 0;
      bottom: 0;
      border-radius: 5px;
      background: var(--secondary-medium);
    }

    input[type="range"] {
      -webkit-appearance: none;
      -moz-appearance: none;
      appearance: none;
      width: 100%;
      outline: none;
      position: absolute;
      margin: auto;
      top: 0;
      bottom: 0;
      background-color: transparent;
      pointer-events: none;

      &::-webkit-slider-runnable-track {
        -webkit-appearance: none;
        height: 5px;
      }
      &::-moz-range-track {
        -moz-appearance: none;
        height: 5px;
      }
      &::-ms-track {
        appearance: none;
        height: 5px;
      }
      &::-webkit-slider-thumb {
        -webkit-appearance: none;
        height: 14px;
        width: 14px;
        background-color: var(--white);
        border: 4px solid var(--primary);
        cursor: pointer;
        margin-top: -4px;
        pointer-events: auto;
        border-radius: 50%;
      }
      &:active::-webkit-slider-thumb {
        background-color: var(--white);
        border: 2px solid var(--primary);
      }
      &::-moz-range-thumb {
        -webkit-appearance: none;
        height: 14px;
        width: 14px;
        cursor: pointer;
        border-radius: 50%;
        background-color: var(--primary);
        pointer-events: auto;
      }
      &::-ms-thumb {
        appearance: none;
        height: 14px;
        width: 14px;
        cursor: pointer;
        border-radius: 50%;
        background-color: var(--primary);
        pointer-events: auto;
      }
    }
  }
}
</style>
