<template>
  <div class="searchWrapper">
    <a-input-search placeholder="input search text" enter-button class="inputSearch" @search="onSearch" />
    <a-pagination class="pagination" :default-current="6" :total="foundMoviesCount" />
    <SearchCards class="cardsWrapper" :movies="foundMovies" />
  </div>
</template>

<script lang="ts">
  import { mapGetters, mapActions } from 'vuex'
  import SearchCards from '../../components/Cards/SearchCards.vue'

  export default {
    name: 'search',
    computed: mapGetters(['foundMovies', 'foundMoviesCount']),
    components: {
      SearchCards
    },
    methods: {
      ...mapActions(['getMovies']),
      onSearch(e: any) {
        const payload = {
          name: e,
          isWith: true,
          page: 1
        }
        console.log(payload)
        this.getMovies(payload)
      }
    }
  }
</script>

<style lang="scss" scoped>
  .searchWrapper {
    width: 100%;
    height: 100vh;
    display: block;
    overflow-y: scroll;
  }
  .pagination {
    padding: 10px;
  }
  .inputSearch {
    width: 300px;
    margin: auto;
    padding: 10px;
  }
</style>
