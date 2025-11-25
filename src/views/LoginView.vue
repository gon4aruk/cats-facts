<template>
  <div class="login wrapper">
    <h3 class="login__title">Log in</h3>
    <LoginForm @submit="submitForm" />
  </div>
</template>

<script>
import LoginForm from "@/components/Forms/LoginForm.vue";
import { setItemToStorage } from "@/utils/localStorage";

export default {
  components: {
    LoginForm,
  },
  methods: {
    async submitForm(userName) {
      setItemToStorage("userName", userName);
      this.$store.dispatch("user/setUserName", userName);
      this.$router.push("/facts");
    },
  },
};
</script>

<style lang="scss" scoped>
.login {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 600px;

  &__title {
    margin-bottom: 48px;
    font-size: 24px;
    line-height: 34px;
    font-weight: 700;
    color: var(--title-color);
  }
}
</style>