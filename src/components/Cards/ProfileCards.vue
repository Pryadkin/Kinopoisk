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

    <a-modal
      v-model="visible"
      title="Filtration"
      @ok="handleOk"
      @cancel="handleCancel"
    >
      <a-form-model>
        <a-form-model-item label="Existing filters">
          <a-select placeholder="please select your zone" v-model="selected">
            <a-select-option
              v-for="filter in movieFilters"
              :key="filter.id"
              :value="filter.name"
            >
              {{ filter.name }}
            </a-select-option>
          </a-select>

          <Filtation :treeFilters="treeFilters" />
        </a-form-model-item>
      </a-form-model>
    </a-modal>
  </div>
</template>

<script lang="ts">
  import Vue from 'vue'
  import Card from './Card.vue'
  import Filtation from '../Filtration/index.vue'
  import { mapGetters, mapActions } from 'vuex'
  import { copyByJson } from '../../common/utils'

  export default Vue.extend<any, any, any, any>({
    props: {
      movies: Array,
      removeMovieAction: Function
    },
    data() {
      return {
        visible: false,
        movieFilters: [],
        selected: undefined,
        treeFilters: []
      }
    },
    components: {
      Card,
      Filtation
    },
    computed: {
      ...mapGetters(['filters']),
      getMovies() {
        return this.movies
      }
    },
    methods: {
      ...mapActions(['getFilters', 'updateFilters']),
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
        console.log(this.$store)
        this.movieFilters = filters
        this.visible = true
        this.treeFilters = copyByJson(this.filters)
      },
      handleOk() {
        this.selected = undefined
        this.visible = false
        this.updateFilters(this.treeFilters)
      },
      handleCancel() {
        this.$confirm({
          title: 'Do you want to delete these changes?',
          content: '',
          onOk: () => {
            this.visible = false
          },
          onCancel: () => {
            this.visible = true
          }
        })
      }
    },
    mounted() {
      // get filters from localStorage
      // this.getFilters()
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
