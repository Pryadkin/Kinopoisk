<template>
  <div>
    <a-switch @change="onChange" />
    <span :style="{ padding: '10px' }">edit mode</span>

    <div class="filtersContainer">
      <NewFilter :model="filters" :isEdit="isEdit" />
    </div>
  </div>
</template>

<script lang="ts">
  import Vue from 'vue'
  import NewFilter from './Filter.vue'

  interface Data {
    isEdit: boolean
  }

  export default Vue.extend<Data, any, any, any>({
    props: {
      treeFilters: Array
    },
    data() {
      return {
        isEdit: true
      }
    },
    components: {
      NewFilter
    },
    computed: {
      filters() {
        return {
          name: 'Filters',
          path: '',
          children: this.treeFilters
        }
      }
    },
    methods: {
      onChange(checked: boolean) {
        this.isEdit = checked
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
