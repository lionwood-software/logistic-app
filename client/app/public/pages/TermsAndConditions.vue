<template>
  <div class="terms-and-conditions">
    <div class="logo">
      <img src="/static/images/shared/logo.png" alt="logo" />
    </div>
    <div class="title">
      <base-button decline-void reset @click="$router.go(-1)">
        <base-icon
          icon-src="static/icons/shared/arrow-left.svg"
          icon-color="additional-medium"
        ></base-icon>
        Back
      </base-button>
      <h2>Terms and Conditions</h2>
    </div>
    <base-card class="card" title-align="left" padding="mini">
      <h2 class="headline">1. Accepting these terms</h2>
      <p class="description">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec
      </p>
    </base-card>
  </div>
</template>

<script setup lang="ts">
import BaseCard from "@/app/core/components/cards/BaseCard.vue";
import BaseIcon from "@/app/core/components/BaseIcon.vue";
import BaseButton from "@/app/core/components/buttons/BaseButton.vue";
</script>

<style scoped lang="scss">
.terms-and-conditions {
  padding: 55px 0;
  width: calc(100% * 2 / 3);
  margin: auto;
  @media (max-width: 768px) {
    width: calc(100% * 4 / 5);
  }
  .logo {
    text-align: center;
  }
  .title {
    margin-top: 64px;
    margin-bottom: 24px;
    display: flex;
    justify-content: center;
    @media (max-width: 768px) {
      flex-direction: column;
      justify-content: flex-start;
    }
    h2 {
      font-family: "SF Pro Display", serif;
      font-size: 32px;
      line-height: 38px;
      color: var(--text-primary);
      flex-grow: 1;
      text-align: center;
      @media (max-width: 768px) {
        text-align: start;
      }
    }
  }
  .card {
    margin-top: 20px;
    margin-bottom: 20px;
    h2 {
      font-weight: 700;
      font-size: 16px;
      line-height: 24px;
      color: var(--text-primary);
      margin-bottom: 8px;
    }
    p {
      font-family: "SF Pro Text", serif;
      font-size: 14px;
      line-height: 22px;
      color: var(--text-secondary);
    }
  }
}
</style>
