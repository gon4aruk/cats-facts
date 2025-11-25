<template>
  <div class="fact-item" @click="$emit('click', item)">
    <img
      v-if="item.img"
      class="fact-item__image"
      :src="require(`@/assets/img/banners/${item.img}.webp`)"
      alt="Fact image"
    />
    <p
      class="fact-item__description"
      :class="
        isBoldText(item)
          ? 'fact-item__description--bold'
          : 'fact-item__description--regular'
      "
    >
      {{ item.fact }}
    </p>
  </div>
</template>

<script>
export default {
  props: {
    item: {
      type: Object,
      required: true,
    },
  },
  methods: {
    isBoldText(item) {
      return item.length < 100;
    },
  },
};
</script>

<style lang="scss" scoped>
@use "@/assets/scss/mixins.scss" as *;

.fact-item {
  display: flex;
  flex-direction: column;
  border-radius: 6px;
  cursor: pointer;

  &:hover {
    background-color: var(--purple-backgroud);
  }

  &__image {
    width: auto;
    max-width: 100%;
    border-radius: 6px;
  }

  &__description {
    margin: 30px 15px;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    overflow: hidden;
    text-overflow: ellipsis;

    @include media(max-tablet) {
      margin: 15px;
    }

    &--regular {
      -webkit-line-clamp: 6;
      font-size: 16px;
      line-height: 22px;
      color: var(--text-color);

      @include media(max-tablet) {
        font-size: 14px;
        line-height: 20px;
      }
    }

    &--bold {
      -webkit-line-clamp: 2;
      font-size: 24px;
      line-height: 34px;
      font-weight: 700;
      color: var(--title-color);

      @include media(max-tablet) {
        font-size: 20px;
        line-height: 28px;
      }
    }
  }
}
</style>