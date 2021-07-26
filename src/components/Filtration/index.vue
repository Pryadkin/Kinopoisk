<template>
  <div>
    <div class="filtersContainer">
      <NewFilter :model="filters" :mode="mode" />
    </div>
  </div>
</template>

<script lang="ts">
  import Vue from 'vue'
  import NewFilter from './NewFilter.vue'

  export default Vue.extend({
    props: {
      treeFilters: Array,
      mode: String
    },
    components: {
      NewFilter
    },
    computed: {
      filters() {
        return {
          name: 'Filters',
          path: 'filters',
          children: this.treeFilters
        }
      }
    }
  })
</script>

<style lang="scss" scoped>
  .filtersContainer {
    width: 100%;
    height: 100%;
  }
</style>
