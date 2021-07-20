<template>
  <div>
    <div v-if="filters">
      <Filters
        v-for="filter in filters"
        :key="filter.id"
        :filter="filter"
        @changeNest="changeNest"
        @isOpen="isOpen"
      />
    </div>
    <div v-else>Filters is not found</div>
  </div>
</template>

<script lang="ts">
  import Vue from 'vue'
  import Filters from './Filters.vue'
  import { mapGetters, mapActions } from 'vuex'

  export default Vue.extend({
    components: {
      Filters
    },
    computed: mapGetters(['filters']),
    methods: {
      ...mapActions(['filterIsOpen']),
      changeNest(props: { id: number; name: string; path: string }) {
        console.log(props)
      },
      isOpen(id: number) {
        this.filterIsOpen(id)
      }
    }
  })
</script>

<style lang="scss" scoped></style>
