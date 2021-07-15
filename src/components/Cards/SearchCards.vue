<template>
  <div>
    <div class="cards_container">
      <div class="row" v-for="movie in getMovies" :key="movie.id">
        <Card v-bind:movie="movie" />
        <div class="cardCloseIcon">add</div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
  import Vue from 'vue'
  import Card from './Card.vue'

  export default Vue.extend<any, any, any, any>({
    props: {
      movies: Array
    },
    components: {
      Card
    },
    computed: {
      getMovies() {
        return this.movies
      }
    }
  })
</script>

<style lang="scss" scoped>
  .cards_container {
    display: flex;
    flex-wrap: wrap;
  }

  .row {
    position: relative;
    margin-left: 5px;
    margin-right: 5px;

    &:hover > .cardCloseIcon {
      display: block;
    }

    .cardCloseIcon {
      display: none;
      position: absolute;
      top: 19px;
      right: -15px;
      text-transform: uppercase;
      transform: rotate(90deg);
      background-color: rgb(80, 80, 245);
      color: white;
      padding-left: 5px;
      padding-right: 5px;
      font-size: 12px;
      transition: 0.2s;
      cursor: pointer;

      &:hover {
        background-color: rgb(224, 44, 44);
      }
    }
  }
</style>
