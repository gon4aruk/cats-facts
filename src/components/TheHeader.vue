<template>
  <header class="header">
    <div class="header__container">
      <TheLogo color="var(--main-purple)" />
      <div class="header__right-block">
        <div
          class="theme-switch"
          :class="
            theme === 'light' ? 'theme-switch--light' : 'theme-switch--dark'
          "
          @click="toggleTheme"
        >
          <div class="theme-switch__item theme-switch__item--moon">
            <img class="icon" src="@/assets/img/moon.svg" alt="Moon" />
          </div>
          <div class="theme-switch__item">
            <img class="icon" src="@/assets/img/sun.svg" alt="Sun" />
          </div>
          <div
            class="theme-switch__point"
            :class="{ 'theme-switch__point--right': false }"
          ></div>
        </div>
        <div class="profile" @click="toggleLogout">
          <p class="profile__name">{{ firstLetterOfUserName }}</p>
          <div v-if="isShowLogout" class="profile__logout" @click="logOut">
            Log out
          </div>
        </div>
      </div>
    </div>
  </header>
</template>

<script>
import TheLogo from "./TheLogo.vue";
import { getItemFromStorage } from "@/utils/localStorage";

export default {
  components: {
    TheLogo,
  },
  data() {
    return {
      isShowLogout: false,
      theme: "light", // ligth, dark
    };
  },
  computed: {
    userName() {
      return this.$store.getters["user/userName"];
    },
    firstLetterOfUserName() {
      return this.userName ? this.userName[0] : "A";
    },
  },
  mounted() {
    this.setTheme();
    this.setUserName();
  },
  methods: {
    toggleLogout() {
      if (this.$route.path === "/login") return;
      this.isShowLogout = !this.isShowLogout;
    },
    logOut() {
      if (this.$route.path === "/login") return;
      localStorage.removeItem("userName");
      this.isShowLogout = false;
      this.$store.dispatch("user/setUserName", "");
      this.$router.push({ path: "/login" });
    },
    toggleTheme() {
      const rootElement = document.querySelector("body");
      rootElement.classList.remove(`${this.theme}-theme`);
      this.theme = this.theme === "light" ? "dark" : "light";
      rootElement.classList.add(`${this.theme}-theme`);
      localStorage.setItem("theme", this.theme);
    },
    setTheme() {
      const savedTheme = localStorage.getItem("theme");
      const rootElement = document.querySelector("body");

      if (savedTheme) {
        this.theme = savedTheme;
      } else {
        this.setUserSystemTheme();
      }

      rootElement.classList.add(`${this.theme}-theme`);
    },
    setUserSystemTheme() {
      const isUserSystemThemeDark = window?.matchMedia(
        "(prefers-color-scheme: dark)"
      )?.matches;

      if (isUserSystemThemeDark) {
        this.theme = "dark";
      } else {
        this.theme = "light";
      }
    },
    setUserName() {
      const userNameFormStorage = getItemFromStorage("userName");
      if (userNameFormStorage) {
        this.$store.dispatch("user/setUserName", userNameFormStorage);
      }
    },
  },
};
</script>

<style lang="scss" scoped>
@use "@/assets/scss/mixins.scss" as *;

.header {
  position: sticky;
  top: 0;
  z-index: 2;
  background-color: var(--header-backgroud);

  &__container {
    height: 95px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: var(--wrapper-width);
    margin: 0 auto;
  }

  &__right-block {
    display: flex;
    gap: 14px;
    align-items: center;
  }
}

.theme-switch {
  position: relative;
  display: flex;
  align-items: center;
  gap: 15px;
  padding: 5px 6px;
  border-radius: 30px;
  cursor: pointer;

  &__item {
    width: 26px;
    height: 26px;
    display: flex;
    align-items: center;
    justify-content: center;

    &--moon {
      height: 16px;
      width: 21px;
      padding-left: 4px;
    }
  }

  &__point {
    position: absolute;
    width: 28px;
    height: 28px;
    top: 4px;
    border-radius: 50%;
    background-color: var(--main-gray);
  }

  &--light {
    background-color: var(--white);

    .theme-switch__point {
      transform: translateX(0);
    }
  }
  &--dark {
    background-color: var(--black);

    .theme-switch__point {
      transform: translateX(35px);
    }
  }
}

.profile {
  position: relative;
  flex: 0 0 56px;
  width: 56px;
  height: 56px;
  border-radius: 50%;
  text-align: center;
  line-height: 56px;
  font-size: 31px;
  font-weight: 500;
  background-color: var(--main-purple);
  color: var(--white);
  cursor: pointer;

  @include media(max-tablet) {
    flex: 0 0 40px;
    width: 40px;
    height: 40px;
    line-height: 40px;
  }

  &__logout {
    position: absolute;
    top: 83px;
    right: 0;
    width: 148px;
    line-height: 48px;
    padding: 0 16px;
    border-radius: 6px;
    color: var(--text-color);
    font-size: 16px;
    background-color: var(--purple-backgroud);
    text-align: left;

    @include media(max-tablet) {
      top: 72px;
    }
  }
}
</style>