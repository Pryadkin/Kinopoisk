<template>
  <div>
    <div class="cards_container">
      <div class="row" v-for="movie in getMovies" :key="movie.id">
        <Card v-bind:movie="movie" />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
  import Vue from 'vue'
  import Card from './Card.vue'

  export default Vue.extend<any, any, any, any>({
    props: {
      profileMovies: Array
    },
    data() {
      return {
        movies: []
      }
    },
    components: {
      Card
    },
    computed: {
      getMovies() {
        return this.profileMovies
      }
    },
    mounted() {
      console.log(this.movies)
    }
  })
</script>

<style scoped>
  .cards_container {
    display: flex;
    flex-wrap: wrap;
  }
</style>
