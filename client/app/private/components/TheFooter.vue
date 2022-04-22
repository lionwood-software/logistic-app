<template>
  <div class="footer-section">
    <div class="left">
      <img src="/static/images/shared/logo.png" alt="logo" />
      <span class="how-it-works">How it works</span>
      <a class="phone" href="tel:480-556-5235">
        <base-icon
          class="icon"
          icon-src="static/icons/shared/phone.svg"
          icon-color="white"
        ></base-icon>
      </a>
      <span class="email">
        <base-icon
          class="icon"
          icon-src="static/icons/shared/mail.svg"
          icon-color="white"
        ></base-icon>
      </span>
    </div>
    <div class="right">
      <router-link :to="{ name: 'TermsAndConditions' }">
        <span class="terms-of-use">Terms of use</span>
      </router-link>
      <span class="privacy-policy">Privacy Policy</span>
      <span class="rights-reserved">© 2021 Specify · All rights reserved.</span>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import BaseIcon from "@/app/core/components/BaseIcon.vue";

export default defineComponent({
  name: "TheFooter",
  components: { BaseIcon },
});
</script>

<style scoped lang="scss">
.footer-section {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  width: 100%;
  padding: 16px 40px;
  margin-top: auto;
  background: var(--additional-high);

  .left,
  .right {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
  }

  .left span,
  .right span {
    color: var(--text-white);
    font-size: 12px;
    line-height: 18px;
  }

  .left {
    gap: 40px;
    img {
      width: 130px;
      height: 48px;
    }

    .how-it-works {
      font-weight: 500;
      font-size: 16px;
      line-height: 20px;
    }

    .phone,
    .email {
      color: var(--text-white);
      display: flex;
      align-items: center;
      gap: 5px;
    }

    .phone .icon {
      width: 11px;
      height: 11px;
    }

    .email .icon {
      width: 12px;
      height: 10px;
    }
  }

  .right {
    gap: 24px;
    font-weight: 500;

    .terms-of-use,
    .privacy-policy {
      text-decoration: underline;
    }

    .rights-reserved {
      color: var(--text-white-medium);
    }
  }
}
</style>
