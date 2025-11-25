<template>
  <form class="login-form" id="login" @submit.prevent="checkForm">
    <div class="input-block">
      <label class="input-block__label" for="userName">Name</label>
      <input
        class="input-block__input"
        :class="{ 'input--error': error }"
        id="userName"
        v-model.trim="userName"
        type="text"
        name="userName"
        maxlength="20"
        placeholder="Enter your name"
        @input="error = ''"
      />
      <span v-if="error" class="input-block__error">{{ error }}</span>
    </div>
    <input class="submit-btn" type="submit" value="Log in" />
  </form>
</template>

<script>
import { isRequired, minMax, onlyLatin } from "@/utils/validations";

export default {
  data() {
    return {
      userName: "",
      error: "",
    };
  },
  methods: {
    async checkForm() {
      if (!isRequired(this.userName)) {
        this.error = "Enter your name";
        return;
      }
      if (!minMax(this.userName)) {
        this.error = "Min. 3 characters, max. 15 characters";
        return;
      }
      if (!onlyLatin(this.userName)) {
        this.error = "Latin letters only";
        return;
      }
      this.$emit("submit", this.userName);
    },
  },
};
</script>

<style lang="scss" scoped>
@use "@/assets/scss/mixins.scss" as *;

.login-form {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.input-block {
  display: flex;
  flex-direction: column;
  gap: 2px;
  margin-bottom: 48px;

  &__label {
    font-size: 16px;
    line-height: 27px;
    color: var(--text-color);
  }

  &__input {
    width: 410px;
    padding: 0 16px;
    border-radius: 6px;
    font-size: 16px;
    line-height: 48px;
    background-color: var(--purple-backgroud);
    color: var(--text-color);
    border: 1px solid transparent;

    @include media(max-tablet) {
      width: 250px;
    }

    &::placeholder {
      color: var(--placeholder-color);
    }

    &:focus {
      border: 1px solid var(--border-color);
    }

    &--error {
      border: 1px solid var(--error-color);
    }
  }

  &__error {
    font-size: 14px;
    line-height: 18px;
    color: var(--error-color);
  }
}

.submit-btn {
  width: 224px;
  border-radius: 6px;
  line-height: 48px;
  font-size: 18px;
  color: var(--white);
  background-color: var(--border-color);
}
</style>