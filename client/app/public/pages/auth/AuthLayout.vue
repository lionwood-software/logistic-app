<template>
  <div class="container">
    <section class="bar">
      <img src="/static/images/shared/logo.png" alt="logo" />
      <div class="testimonial">
        <img src="/static/icons/auth/quote.svg" alt="quote-mark" />
        <span>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ab, assumenda consequuntur ea enim fugiat harum, hic ipsum libero maxime neque nulla, officiis omnis perspiciatis sit veritatis! Maiores saepe tempore voluptate!
        </span>
        <div class="profile">
          <img src="/static/images/shared/test.png" alt="avatar" />
          <p>
            Lorem1   <br />
            <span>Lorem</span>
          </p>
        </div>
      </div>
      <div @click="redirectToLionwood" class="created-by">
        <p>Created by</p>
        <img src="/static/icons/shared/logo-lionwood.svg" alt="lionwood" />
      </div>
    </section>
    <div class="content">
      <img class="logo-mobile" src="/static/images/shared/logo.png" alt="logo" />
      <router-view></router-view>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "AuthLayout",
  setup() {
    const redirectToLionwood = () => {
      window.location.href = "https://lionwood.software/";
    };

    return {
      redirectToLionwood,
    };
  },
});
</script>

<style scoped lang="scss">
.container {
  display: flex;
  height: 100vh;
  flex-direction: row;
  @media screen and (max-width: 768px) {
    flex-direction: column;
  }

  .bar {
    width: calc(100% / 3);
    height: auto;
    display: flex;
    background-image: url("/static/images/auth/auth-layout.png");
    background-size: cover;
    flex-direction: column;
    align-items: center;
    padding: 30px 48px 24px 48px;

    @media screen and (max-width: 768px) {
      display: none;
    }

    .testimonial {
      display: flex;
      flex-direction: column;
      gap: 24px;
      background: var(--primary);
      padding: 30px;
      margin-top: 60px;
      width: 100%;
      border-radius: 10px;

      img {
        height: 46px;
        width: 46px;
      }

      span {
        font-size: 20px;
        line-height: 30px;
        font-weight: 500;
        color: var(--text-white);
      }

      .profile {
        display: flex;
        justify-content: flex-end;
        gap: 8px;

        img {
          border-radius: 100px;
        }

        p {
          font-size: 16px;
          line-height: 24px;
          font-weight: 500;
          color: var(--text-white);

          span {
            line-height: 24px;
            font-weight: 400;
            color: var(--text-white-medium);
          }
        }
      }
    }

    .created-by {
      display: flex;
      cursor: pointer;
      justify-content: space-between;
      margin-top: auto;
      padding: 10px 24px;
      gap: 12px;
      border-radius: 6px;
      background: var(--additional-high);

      p {
        display: flex;
        align-items: center;
        color: var(--text-white);
        font-weight: 400;
        font-size: 12px;
        line-height: 14px;
      }
    }
  }

  .content {
    width: calc(100% * 2 / 3);
    height: 100vh;
    overflow-y: auto;
    padding: 40px 0;

    @media (max-width: 768px) {
      width: 100%;
    }

    .logo-mobile {
      display: none;

      @media (max-width: 768px) {
        display: flex;
        margin: auto auto 10px;
        justify-content: center;
        align-items: center;
      }
    }
  }
}
</style>
