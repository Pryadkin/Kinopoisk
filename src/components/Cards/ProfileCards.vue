<template>
  <div>
    <div class="cards_container">
      <div class="row" v-for="movie in getMovies" :key="movie.id">
        <Card v-bind:movie="movie" />
        <div class="removeIcon" @click="removeModal(movie.id)">remove</div>
        <div class="filterIcon" @click="openFilterModal(movie.filters)">
          filter
        </div>
      </div>
    </div>

    <a-modal v-model="visible" title="Filtration" @ok="handleOk">
      <a-form-model>
        <a-form-model-item label="Existing filters">
          <a-select placeholder="please select your zone" v-model="selected">
            <a-select-option
              v-for="filter in filters"
              :key="filter.id"
              :value="filter.name"
            >
              {{ filter.name }}
            </a-select-option>
          </a-select>

          <Filtation />
        </a-form-model-item>
      </a-form-model>
    </a-modal>
  </div>
</template>

<script lang="ts">
  import Vue from 'vue'
  import Card from './Card.vue'
  import Filtation from '../Filtration/index.vue'

  export default Vue.extend<any, any, any, any>({
    props: {
      movies: Array,
      removeMovieAction: Function
    },
    data() {
      return {
        visible: false,
        filters: [],
        selected: undefined
      }
    },
    components: {
      Card,
      Filtation
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
      openFilterModal(filters: any) {
        this.filters = filters
        this.visible = true
      },
      handleOk(e: any) {
        this.selected = undefined
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
