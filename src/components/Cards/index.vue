<template>
  <div>
    <div class="cards_container">
      <div class="row" v-for="movie in getMovies" :key="movie.id">
        <Card v-bind:movie="movie" />
      </div>
    </div>
  </div>
</template>

<script>
  import Card from './Card'

  export default {
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
  }
</script>

<style scoped>
  .cards_container {
    display: flex;
    flex-wrap: wrap;
  }
</style>
