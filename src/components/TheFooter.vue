<template>
  <footer class="footer">
    <div class="footer__container">
      <div class="top-block">
        <TheLogo color="var(--white)" />
        <div class="footer__section nav">
          <div class="footer__section--title">Built for catlovers</div>
          <nav class="nav__list">
            <router-link class="nav__item" :to="$route.path">About</router-link>
            <router-link class="nav__item" :to="$route.path">Blog</router-link>
          </nav>
        </div>
        <div class="footer__section social">
          <div class="footer__section--title">Social</div>
          <ul class="social__list">
            <li
              v-for="(item, idx) in socialItems"
              :key="idx"
              class="social__item"
            >
              <img
                :src="require(`@/assets/img/social/${item}.svg`)"
                :alt="item"
              />
            </li>
          </ul>
        </div>
      </div>
      <div class="separate-line" />
      <div class="bottom-block">
        <p class="bottom-block__item license">
          @cats.com inc. All rights reserved.
        </p>
        <div class="bottom-block__item lang-switch">
          English
          <svg
            class="svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M3.96932 14.4694L11.4693 6.96939C11.539 6.89965 11.6217 6.84433 11.7127 6.80659C11.8038 6.76885 11.9014 6.74942 12 6.74942C12.0985 6.74942 12.1961 6.76885 12.2872 6.80659C12.3782 6.84433 12.4609 6.89965 12.5306 6.96939L20.0306 14.4694C20.1713 14.6101 20.2504 14.801 20.2504 15C20.2504 15.199 20.1713 15.3899 20.0306 15.5306C19.8898 15.6714 19.699 15.7504 19.4999 15.7504C19.3009 15.7504 19.1101 15.6714 18.9693 15.5306L12 8.56032L5.03057 15.5306C4.96089 15.6003 4.87817 15.6556 4.78712 15.6933C4.69608 15.731 4.59849 15.7504 4.49995 15.7504C4.4014 15.7504 4.30382 15.731 4.21278 15.6933C4.12173 15.6556 4.03901 15.6003 3.96932 15.5306C3.89964 15.461 3.84437 15.3782 3.80665 15.2872C3.76894 15.1961 3.74953 15.0986 3.74953 15C3.74953 14.9015 3.76894 14.8039 3.80665 14.7128C3.84437 14.6218 3.89964 14.5391 3.96932 14.4694Z"
              fill="#434343"
            />
          </svg>
        </div>
      </div>
    </div>
  </footer>
</template>

<script>
import TheLogo from "./TheLogo.vue";
export default {
  components: {
    TheLogo,
  },
  data() {
    return {
      socialItems: ["Instagram", "Facebook", "Youtube", "X"],
    };
  },
};
</script>

<style lang="scss" scoped>
@use "@/assets/scss/mixins.scss" as *;

.footer {
  background-color: var(--footer-black);
  color: var(--white);

  &__container {
    display: flex;
    flex-direction: column;
    width: var(--wrapper-width);
    margin: 0 auto;
    padding: 32px 0;
  }

  &__section {
    display: flex;
    flex-direction: column;
    gap: 8px;

    &--title {
      font-size: 16px;
      line-height: 22px;
      font-weight: 700;
    }
  }
}

.top-block {
  margin-bottom: 55px;
  display: flex;

  @include media(max-tablet) {
    flex-direction: column;
    gap: 40px;
    margin-bottom: 40px;
  }

  .nav {
    margin-left: auto;

    @include media(max-tablet) {
      margin: 0;
    }

    &__list {
      display: flex;
      flex-direction: column;
      gap: 8px;
    }

    &__item {
      font-size: 14px;
      line-height: 22px;
      color: var(--footer-text);
    }
  }

  .social {
    margin-left: 94px;

    @include media(max-tablet) {
      margin: 0;
    }

    &__list {
      display: flex;
      gap: 24px;
    }

    &__item {
      flex: 0 0 24px;
      width: 24px;
      height: 24px;
      cursor: pointer;
    }
  }
}
.separate-line {
  margin-bottom: 32px;
  height: 1px;
  background-color: #8e8e8e;
}

.bottom-block {
  display: flex;
  justify-content: space-between;

  &__item {
    font-size: 14px;
    line-height: 22px;
  }

  .license {
    color: var(--footer-text);
  }

  .lang-switch {
    display: flex;
    align-items: center;
    gap: 8px;

    svg {
      transform: rotate(180deg);

      path {
        fill: var(--white);
      }
    }
  }
}
</style>