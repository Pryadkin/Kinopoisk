<template>
  <div>
    <div class="cards_container">
      <div class="row" v-for="movie in getMovies" :key="movie.id">
        <Card v-bind:movie="movie" />
        <div class="removeIcon" @click="removeModal(movie.id)">remove</div>
        <div class="filterIcon" @click="openFilterModal(movie)">filter</div>
      </div>
    </div>
    <a-modal v-model="visible" title="Basic Modal" @ok="handleOk">
      <a-form-model>
        <a-form-model-item label="Activity zone">
          <a-select placeholder="please select your zone">
            <template v-for="filter in movie.filters">
              <a-select-option :key="filter.id" :value="filter.name">{{ filter.name }}</a-select-option>
            </template>
          </a-select>
        </a-form-model-item>
      </a-form-model>
    </a-modal>
  </div>
</template>

<script lang="ts">
  import Vue from 'vue'
  import Card from './Card.vue'

  export default Vue.extend<any, any, any, any>({
    props: {
      movies: Array,
      filters: Array,
      removeMovieAction: Function
    },
    data() {
      return {
        visible: false,
        movie: {}
      }
    },
    components: {
      Card
    },
    computed: {
      getMovies() {
        return this.movies
      }
    },
    methods: {
      removeModal(id: number) {
        this.$confirm({
          title: 'Do you want to delete these movie?',
          content: '',
          onOk: () => {
            this.removeMovieAction(id)
          },
          // eslint-disable-next-line
          onCancel() {}
        })
      },
      openFilterModal(movie: any) {
        this.movie = movie
        this.visible = true
      },
      handleOk(e: any) {
        console.log(e)
        this.visible = false
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

    &:hover .removeIcon,
    &:hover .filterIcon {
      display: block;
    }

    .removeIcon,
    .filterIcon {
      display: none;
      position: absolute;
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

    .removeIcon {
      top: 33px;
      right: -29px;
    }

    .filterIcon {
      top: 100px;
      right: -23px;
    }
  }
</style>
