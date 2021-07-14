<template>
  <div class="profilePage">
    <Cards :profileMovies="profileMovies" />
  </div>
</template>

<script lang="ts">
  import Vue from 'vue'
  import { mapGetters, mapActions } from 'vuex'
  import Cards from '../../components/Cards/index.vue'

  interface Method {
    getProfileMovies: () => void
  }

  export default Vue.extend<any, any, any, Method>({
    name: 'profile',
    computed: mapGetters(['profileMovies', 'profileMoviesCount']),
    components: {
      Cards
    },
    methods: mapActions(['getProfileMovies']),
    async mounted() {
      this.getProfileMovies()
    }
  })
</script>

<style lang="scss" scoped>
  .profilePage {
    width: 100%;
    height: 100vh;
    display: block;
    overflow-y: scroll;
  }
</style>
