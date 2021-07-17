<template>
  <div class="searchWrapper">
    <a-input-search
      placeholder="input search movie"
      enter-button
      class="inputSearch"
      @search="onSearch"
      v-model="name"
    />

    <a-pagination class="pagination" :total="foundMoviesCount" v-model="pageHumber" />

    <SearchCards class="cardsWrapper" :movies="foundMovies" />
  </div>
</template>

<script lang="ts">
  import Vue from 'vue'
  import { mapGetters, mapActions } from 'vuex'
  import SearchCards from '../../components/Cards/SearchCards.vue'

  interface Data {
    pageHumber: number | null | undefined
    name: string | null | undefined
  }

  export default Vue.extend<Data, any, any>({
    name: 'search',
    data: () => ({
      pageHumber: null,
      name: null
    }),
    computed: mapGetters(['nameMovie', 'pageNumber', 'foundMovies', 'foundMoviesCount']),
    components: {
      SearchCards
    },
    methods: {
      ...mapActions(['getNameMovie', 'getPageNumber', 'getMovies']),
      onSearch(name: any) {
        if (name.length > 0) {
          const payload = {
            name,
            isWith: true,
            page: this.pageHumber
          }
          this.getMovies(payload)
          this.getNameMovie(name)
          this.pageHumber = 1
          this.getPageNumber(this.pageHumber)
        } else {
          const h = this.$createElement
          this.$info({
            title: 'Enter the title of the movie',
            // eslint-disable-next-line
            onOk() {}
          })
        }
      }
    },
    watch: {
      pageHumber: function (item: any) {
        if (this.name) {
          const payload = {
            name: this.name,
            isWith: true,
            page: this.pageHumber
          }
          this.getMovies(payload)
          this.getPageNumber(this.pageHumber)
        }
      }
    },
    mounted() {
      this.name = this.nameMovie
      this.pageHumber = this.pageNumber
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
