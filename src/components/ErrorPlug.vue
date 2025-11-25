<template>
  <div class="plug">
    <span>Sorry</span>
    <slot />
  </div>
</template>

<script>
export default {
  props: {
    text: {
      type: String,
      required: false,
      default: "",
    },
  },
};
</script>

<style lang="scss" scoped>
.plug {
  height: 300px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 20px;
  color: var(--text-color);

  span {
    font-size: 40px;
    line-height: 56px;
  }
}
</style>