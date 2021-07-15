<template>
  <div class="searchWrapper">
    <a-input-search
      placeholder="input search movie"
      enter-button
      class="inputSearch"
      @search="onSearch"
      v-model="name"
    />
    <a-pagination class="pagination" :total="foundMoviesCount" v-model="current" />
    <SearchCards class="cardsWrapper" :movies="foundMovies" />
  </div>
</template>

<script lang="ts">
  import Vue from 'vue'
  import { mapGetters, mapActions } from 'vuex'
  import SearchCards from '../../components/Cards/SearchCards.vue'

  interface Data {
    current: number | null | undefined
    name: string | null | undefined
  }

  export default Vue.extend<Data, any, any>({
    name: 'search',
    data: () => ({
      current: null,
      name: null
    }),
    computed: mapGetters(['nameMovie', 'pageNumber', 'foundMovies', 'foundMoviesCount']),
    components: {
      SearchCards
    },
    methods: {
      ...mapActions(['getNameMovie', 'getPageNumber', 'getMovies']),
      onSearch(name: any) {
        const payload = {
          name,
          isWith: true,
          page: this.current
        }
        this.getMovies(payload)
        this.getNameMovie(name)
        this.current = 1
        this.getPageNumber(this.current)
      }
    },
    watch: {
      current: function (item: any) {
        const payload = {
          name: this.name,
          isWith: true,
          page: this.current
        }
        this.getMovies(payload)
        this.getPageNumber(this.current)
      }
    },
    mounted() {
      this.name = this.nameMovie
      this.current = this.pageNumber
    }
  })
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
