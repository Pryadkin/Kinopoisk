<template>
  <div class="profilePage">
    <ProfileCards
      :movies="profileMovies"
      :removeMovieAction="removeMovieFromProfile"
    />
  </div>
</template>

<script lang="ts">
  import Vue from 'vue'
  import { mapGetters, mapActions } from 'vuex'
  import ProfileCards from '../../components/Cards/ProfileCards.vue'

  interface Method {
    getProfileMovies: () => void
  }

  export default Vue.extend<any, any, any, Method>({
    name: 'profile',
    computed: mapGetters(['profileMovies', 'profileMoviesCount']),
    components: {
      ProfileCards
    },
    methods: mapActions(['getProfileMovies', 'removeMovieFromProfile']),
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
