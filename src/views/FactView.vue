<template>
  <div class="wrapper">
    <BackButton to="/facts" />
    <section v-if="factData" class="fact">
      <CardItem :item="factData" />
    </section>
    <ErrorPlug v-else>
      There is no fact on this page. Try to back to the /facts page and choose
      another one.
    </ErrorPlug>
  </div>
</template>

<script>
import BackButton from "@/components/BackButton.vue";
import CardItem from "@/components/CardItem.vue";
import ErrorPlug from "@/components/ErrorPlug.vue";
import { getItemFromStorage } from "@/utils/localStorage";

export default {
  components: {
    BackButton,
    CardItem,
    ErrorPlug,
  },
  data() {
    return {
      factData: null,
    };
  },
  computed: {
    factsList() {
      return this.$store.getters["facts/factsList"];
    },
  },
  async mounted() {
    if (!this.factsList.length) {
      await this.setFactsList();
    }
    this.findFactData();
  },
  methods: {
    async setFactsList() {
      const listFromStorage = await getItemFromStorage("factsList");
      if (listFromStorage?.length) {
        await this.$store.dispatch("facts/setFactsList", {
          payload: listFromStorage,
        });
      }
    },
    findFactData() {
      this.factData = this.factsList.find(
        (item) => +item.id === +this.$route.query?.id
      );
    },
  },
};
</script>

<style lang="scss" scoped>
@use "@/assets/scss/mixins.scss" as *;

.wrapper {
  margin-top: 24px;
  margin-bottom: 140px;

  @include media(max-tablet) {
    margin-top: 30px;
    margin-bottom: 70px;
  }
}

.fact {
  width: 854px;
  margin: 0 auto;

  @include media(max-desktop) {
    width: var(--wrapper-width);
  }

  .fact-item:hover {
    background-color: transparent;
    cursor: auto;
  }
}
</style>