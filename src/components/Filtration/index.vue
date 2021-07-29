<template>
  <div>
    <a-switch default-checked @change="onChange" />
    <span :style="{ padding: '10px' }">edit mode</span>

    <div class="filtersContainer">
      <NewFilter :model="treeFilters" :isEdit="isEdit" />
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
      treeFilters: Object
    },
    data() {
      return {
        isEdit: true
      }
    },
    components: {
      NewFilter
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
