<template>
  <div class="facts wrapper">
    <h1 class="facts__title">Facts About Cats To Share With Kids!</h1>
    <div class="filter">
      <SearchInput @click="onSearchInput" />
      <BaseSelect :options="selectOptions" @input="onSelectChange" />
    </div>
    <div v-if="mutatedFactsList.length" class="facts__list">
      <CardItem
        v-for="item in mutatedFactsList"
        :key="item.id"
        :item="item"
        @click="toFactPage(item)"
      />
    </div>
    <ErrorPlug v-else>
      There are no facts. Please, change filters or try again later.
    </ErrorPlug>
    <div v-if="mutatedFactsList.length" class="load-more">
      <button class="load-more__button" @click="loadMore">
        Load more facts
      </button>
    </div>
  </div>
</template>

<script>
import BaseSelect from "@/components/Base/BaseSelect.vue";
import CardItem from "@/components/CardItem.vue";
import ErrorPlug from "@/components/ErrorPlug.vue";
import SearchInput from "@/components/SearchInput.vue";
import { getItemFromStorage } from "@/utils/localStorage";
import { setItemToStorage } from "@/utils/localStorage";

const FETCH_LIMIT = 10;
const TEXT_LENGTH_LIMIT = 2000;

export default {
  components: {
    BaseSelect,
    CardItem,
    ErrorPlug,
    SearchInput,
  },
  data() {
    return {
      selectOptions: [
        { id: "all", text: "All facts" },
        { id: "longFirst", text: "Show long ones first" },
        { id: "shortFirst", text: "Show short ones first" },
        { id: "shortOnly", text: "Short ones only" },
        { id: "longOnly", text: "Long ones only" },
      ],
      sort: "all",
      searchValue: "",
    };
  },
  computed: {
    pureFactsList() {
      return this.$store.getters["facts/factsList"];
    },
    mutatedFactsList() {
      let factsList = this.pureFactsList;
      if (this.sort !== "all") {
        factsList = this.sortItems(factsList);
      }
      if (this.searchValue) {
        factsList = this.filterItems(factsList);
      }
      return factsList;
    },
  },
  async mounted() {
    const listFromStorage = await getItemFromStorage("factsList");
    if (listFromStorage?.length) {
      this.$store.dispatch("facts/setFactsList", { payload: listFromStorage });
      return;
    }

    await this.fetchFacts();
    setItemToStorage("factsList", this.pureFactsList);
  },
  methods: {
    toFactPage(fact) {
      this.$router.push({
        path: "/fact",
        query: {
          id: fact.id,
        },
      });
    },
    async fetchFacts(loadMore = false) {
      this.$loader.showLoader();
      const params = {
        limit: FETCH_LIMIT,
        max_length: TEXT_LENGTH_LIMIT,
      };
      await this.$store.dispatch("facts/loadFacts", { loadMore, params });
      this.$loader.closeLoader();
    },
    async loadMore() {
      await this.fetchFacts(true);
      setItemToStorage("factsList", this.pureFactsList);
    },
    onSelectChange(item) {
      this.sort = item.id || "all";
    },
    onSearchInput(value) {
      this.searchValue = value || "";
    },
    sortItems(array) {
      const newArray = [...array];
      switch (this.sort) {
        case "longFirst":
          newArray.sort((item1, item2) => item1.length - item2.length);
          break;
        case "shortFirst":
          newArray.sort((item1, item2) => item2.length - item1.length);
          break;
        case "shortOnly":
          return newArray.filter((item) => item.length < 100);
        case "longOnly":
          return newArray.filter((item) => item.length >= 100);
        default:
          break;
      }
      return newArray;
    },
    filterItems(array) {
      return array.filter((item) =>
        item.fact?.toLowerCase().includes(this.searchValue?.toLowerCase())
      );
    },
  },
};
</script>

<style lang="scss" scoped>
@use "@/assets/scss/mixins.scss" as *;

.facts {
  margin-top: 57px;
  margin-bottom: 48px;

  @include media(max-tablet) {
    margin-top: 30px;
    margin-bottom: 40px;
  }

  &__title {
    margin-bottom: 32px;
    text-align: center;
    font-weight: 700;
    font-size: 56px;
    line-height: 68px;
    color: var(--title-color);

    @include media(max-desktop) {
      font-size: 48px;
      line-height: 60px;
    }

    @include media(max-tablet) {
      font-size: 38px;
      line-height: 52px;
    }
  }

  &__list {
    width: 100%;
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    row-gap: 40px;
    column-gap: 30px;
    margin-bottom: 40px;

    @include media(max-desktop) {
      grid-template-columns: 1fr 1fr;
    }

    @include media(max-tablet) {
      grid-template-columns: 1fr;
      row-gap: 20px;
    }
  }
}

.filter {
  display: flex;
  justify-content: space-between;
  margin-bottom: 32px;

  @include media(max-tablet) {
    flex-direction: column;
    gap: 20px;
  }
}

.load-more {
  text-align: center;

  &__button {
    width: 310px;
    line-height: 48px;
    font-size: 18px;
    border: 1px solid var(--border-color);
    border-radius: 6px;
    font-weight: 600;
    color: var(--border-color);
    background-color: transparent;
    cursor: pointer;
  }
}
</style>