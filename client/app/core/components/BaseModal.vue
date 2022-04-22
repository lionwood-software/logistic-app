<template>
  <transition name="fade">
    <div
      v-show="modelValue"
      class="modal"
      @keydown.esc="
        emits('update:modelValue', false);
        emits('close');
      "
      tabindex="0"
    >
      <div ref="modalContent" class="modal-content" v-if="!bottom">
        <base-card
          class="card"
          :accept="accept"
          :accept-decline="acceptDecline"
          :accept-title="acceptTitle"
          :decline-title="declineTitle"
          :buttons-align="buttonsAlign"
          :padding="padding"
          @accepted="$emit('submit')"
          @declined="
            emits('update:modelValue', false);
            emits('cancel');
          "
        >
          <template v-if="slots.title" #title>
            <slot name="title"></slot>
          </template>
          <template v-if="slots.description" #description>
            <slot name="description"></slot>
          </template>
          <template v-if="slots.actions || accept || acceptDecline" #actions>
            <slot name="actions"></slot>
          </template>
          <slot></slot>
        </base-card>
      </div>
      <div ref="modalContent" class="modal-content-bottom" v-if="bottom">
        <div class="top">
          <span>
            <slot name="title"></slot>
          </span>
          <base-icon
            class="icon"
            icon-src="static/icons/shared/close.svg"
            icon-color="additional-medium"
            @click="
              $emit('update:modelValue', false);
              $emit('close');
            "
          ></base-icon>
        </div>
        <div class="main">
          <slot></slot>
        </div>
        <div class="actions">
          <slot name="actions"></slot>
        </div>
      </div>
    </div>
  </transition>
</template>

<script setup lang="ts">
import { defineComponent, ref, useSlots } from "vue";
import BaseIcon from "@/app/core/components/BaseIcon.vue";
import BaseCard from "@/app/core/components/cards/BaseCard.vue";
import { onClickOutside } from "@vueuse/core";

const props = defineProps({
  modelValue: {
    type: Boolean,
    required: true,
  },
  bottom: {
    type: Boolean,
    required: false,
  },
  accept: {
    type: Boolean,
    required: false,
  },
  acceptDecline: {
    type: Boolean,
    required: false,
  },
  acceptTitle: {
    type: String,
    required: false,
  },
  declineTitle: {
    type: String,
    required: false,
  },
  buttonsAlign: {
    type: String,
    required: false,
    default: "center",
    validator(value: string): boolean {
      return ["left", "center", "right"].includes(value);
    },
  },
  padding: {
    type: String,
    required: false,
    default: "small",
    validator(value: string): boolean {
      return ["mini", "small", "normal"].includes(value);
    },
  },
});

const emits = defineEmits<{
  (e: "submit"): void;
  (e: "cancel"): void;
  (e: "close"): void;
  (e: "update:modelValue", value: any): void;
}>();

const slots = useSlots();
const modalContent = ref(null);
onClickOutside(modalContent, () => {
  if (props.modelValue) {
    emits("close");
  }
});
</script>

<style scoped lang="scss">
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}
@import "src/styles/mixins.scss";
.modal {
  position: fixed;
  z-index: 10;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  @include transparent-background(#d7d9db, 0.5); // Due to no var support

  .modal-content {
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;

    .card {
      width: 50%;

      @media (max-width: 768px) {
        width: 95%;
      }
      @media (min-width: 1200px) {
        width: 35%;
      }
    }
  }

  .modal-content-bottom {
    display: flex;
    flex-direction: column;
    gap: 30px;
    position: absolute;
    width: 100%;
    background-color: var(--white);
    border-radius: 20px 20px 0 0;
    padding: 24px 30px 30px 30px;
    bottom: 0;
    box-shadow: 0 -14px 58px 0 #2f323533;

    .top {
      display: flex;
      justify-content: space-between;

      span {
        color: var(--additional-high);
        font-size: 32px;
      }

      .icon {
        cursor: pointer;
      }
    }

    .main {
      display: flex;
    }

    .actions {
      display: flex;
      gap: 24px;
    }
  }
}
</style>
