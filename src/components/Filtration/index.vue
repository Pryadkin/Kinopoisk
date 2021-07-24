<template>
  <div>
    <button @click="addRootFilter">Add filter</button>
    <div class="filtersContainer" v-if="filters">
      <Filters
        v-for="filter in dataFilters"
        :key="filter.id"
        :filter="filter"
        @isOpen="isOpen"
        @addFilter="addFilter"
        @deleteFilter="deleteFilter"
      />
    </div>
    <div v-else>Filters is not found</div>
  </div>
</template>

<script lang="ts">
  import Vue from 'vue'
  import Filters from './Filters.vue'
  import { Filter } from '../../store/modules/filters/filtersType'
  import { mapGetters, mapActions } from 'vuex'

  interface Data {
    dataFilters: Filter[]
  }

  export default Vue.extend<Data, any, any>({
    data: () => ({
      dataFilters: []
    }),
    components: {
      Filters
    },
    computed: mapGetters(['filters']),
    methods: {
      ...mapActions(['filterIsOpen', 'getFilters']),
      isOpen(id: number) {
        const getIsOpenFilter = (filters: Filter[], id: number): any => {
          return filters?.map((filter: Filter) => {
            if (filter.filters) {
              return {
                ...filter,
                isOpen: filter.id === id ? !filter.isOpen : filter.isOpen,
                filters: getIsOpenFilter(filter.filters, id)
              }
            } else {
              return filter
            }
          })
        }
        this.dataFilters = getIsOpenFilter(this.dataFilters, id)
      },
      addRootFilter() {
        const uniqueId = Math.trunc(Math.random() * 10e5)
        this.dataFilters = [
          {
            id: uniqueId,
            name: 'newRootFilter',
            path: 'newRootFilter'
          },
          ...this.dataFilters
        ]
      },
      addFilter(id: number) {
        const uniqueId = Math.trunc(Math.random() * 10e5)
        const getNewFiltration = (filters: Filter[], id: number): any => {
          return filters?.map((filter: Filter) => {
            if (filter.id === id) {
              if (filter.filters) {
                return {
                  ...filter,
                  isOpen: true,
                  filters: [
                    ...filter.filters,
                    {
                      id: uniqueId,
                      name: 'newFilter',
                      path: 'newFilter'
                    }
                  ]
                }
              }
              return {
                ...filter,
                isOpen: true,
                filters: [
                  {
                    id: uniqueId,
                    name: 'newFilter',
                    path: 'newFilter'
                  }
                ]
              }
            }
            if (filter.filters) {
              return {
                ...filter,
                filters: getNewFiltration(filter.filters, id)
              }
            }

            return filter
          })
        }

        this.dataFilters = getNewFiltration(this.dataFilters, id)
      },
      deleteFilter(id: number) {
        const getNewFiltration = (filters: Filter[], id: number): any => {
          const newFilters = filters.filter((item: any) => item.id !== id)

          if (newFilters.length === filters.length) {
            return filters.map((item: any) => {
              if (item.filters) {
                const newFiltration = getNewFiltration(item.filters, id)

                return newFiltration.length
                  ? {
                      ...item,
                      filters: newFiltration
                    }
                  : {
                      id: item.id,
                      name: item.name,
                      path: item.path
                    }
              }
              return item
            })
          }

          return newFilters
        }

        this.dataFilters = getNewFiltration(this.dataFilters, id)
      }
    },
    async mounted() {
      this.dataFilters = this.filters
    }
  })
</script>

<style lang="scss" scoped>
  .filtersContainer {
    width: 100%;
    height: 100%;
    // overflow: scroll;
  }
</style>
