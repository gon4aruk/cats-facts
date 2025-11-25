<template>
  <div class="custom-select" @blur="isOpen = false">
    <div
      class="custom-select__selected"
      :class="{ 'custom-select__selected--active': isOpen }"
      @click="isOpen = !isOpen"
    >
      {{ selected.text || "" }}
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
    <div
      class="custom-select__list"
      :class="{ 'custom-select__list--open': isOpen }"
    >
      <div
        class="custom-select__item"
        :class="{ 'custom-select__item--active': option.id === selected.id }"
        v-for="(option, idx) of options"
        :key="option.id || idx"
        @click="onClick(option)"
      >
        {{ option.text || "" }}
        <svg
          v-if="option.id === selected.id"
          class="svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M21.5307 7.28062L9.53068 19.2806C9.46102 19.3503 9.3783 19.4057 9.28726 19.4434C9.19621 19.4812 9.09861 19.5006 9.00005 19.5006C8.90149 19.5006 8.80389 19.4812 8.71285 19.4434C8.6218 19.4057 8.53908 19.3503 8.46943 19.2806L3.21943 14.0306C3.0787 13.8899 2.99963 13.699 2.99963 13.5C2.99963 13.301 3.0787 13.1101 3.21943 12.9694C3.36016 12.8286 3.55103 12.7496 3.75005 12.7496C3.94907 12.7496 4.13995 12.8286 4.28068 12.9694L9.00005 17.6897L20.4694 6.21936C20.6102 6.07863 20.801 5.99957 21.0001 5.99957C21.1991 5.99957 21.3899 6.07863 21.5307 6.21936C21.6714 6.36009 21.7505 6.55097 21.7505 6.74999C21.7505 6.94901 21.6714 7.13988 21.5307 7.28062Z"
            fill="#6E72EC"
          />
        </svg>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    options: {
      type: Array,
      required: true,
      // ex. { id: 'all', text: 'All items' }
    },
    default: {
      type: String,
      required: false,
      default: null,
    },
  },
  data() {
    return {
      isOpen: false,
      selected: null,
    };
  },
  created() {
    this.selected = this.default
      ? this.default
      : this.options.length > 0
      ? this.options[0]
      : null;
  },
  methods: {
    onClick(option) {
      if (option.id === this.selected.id) {
        this.isOpen = false;
        return;
      }
      this.selected = option;
      this.isOpen = false;
      this.$emit("input", option);
    },
  },
};
</script>

<style lang="scss" scoped>
@use "@/assets/scss/mixins.scss" as *;

.custom-select {
  position: relative;
  width: 300px;

  @include media(max-desktop) {
    width: 250px;
  }

  @include media(max-tablet) {
    width: 240px;
  }

  &__selected {
    width: 100%;
    line-height: 48px;
    padding: 0 16px;
    background-color: var(--purple-backgroud);
    border-radius: 6px;
    cursor: pointer;
    user-select: none;
    color: var(--text-color);

    .svg {
      position: absolute;
      width: 24px;
      height: 24px;
      top: 12px;
      right: 16px;
      transition: transform 0.3s;

      path {
        fill: var(--input-svg-color);
      }
    }

    &--active .svg {
      transform: rotate(180deg);
    }
  }

  &__list {
    position: absolute;
    left: 0;
    width: 100%;
    top: 54px;
    display: none;
    border-radius: 6px;
    overflow: hidden;

    &--open {
      display: block;
    }
  }

  &__item {
    position: relative;
    line-height: 48px;
    padding: 0 16px;
    user-select: none;
    background-color: var(--purple-backgroud);
    color: var(--select-item-color);
    cursor: pointer;

    &--active {
      color: var(--select-active-color);

      .svg {
        position: absolute;
        width: 24px;
        height: 24px;
        top: 12px;
        right: 16px;

        path {
          fill: var(--select-active-color);
        }
      }
    }

    &:hover {
      background-color: var(--hover-purple);
    }
  }
}
</style>
