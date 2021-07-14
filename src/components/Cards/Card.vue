<template>
  <div>
    <a-card hoverable class="card">
      <img slot="cover" alt="example" :src="movie.poster_path" />
      <a-card-meta :title="movie.title" />
    </a-card>
  </div>
</template>

<script>
  export default {
    props: {
      movie: {
        type: Object
      }
    },
    computed: {
      dateFilter() {
        const option = {}

        option.year = 'numeric'
        // console.log(new Intl.DateTimeFormat('ru-RU', option))

        return new Intl.DateTimeFormat('ru-RU', option).format(new Date(this.movie.release_date))
      }
    }
  }
</script>

<style scoped>
  .card {
    width: 150px;
    margin: 10px;
  }
</style>
