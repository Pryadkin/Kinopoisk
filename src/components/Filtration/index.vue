<template>
  <div>
    <div class="filtersContainer" v-if="filters">
      <!-- <Filters
        v-for="filter in dataFilters"
        :key="filter.id"
        :filter="filter"
        @isOpen="isOpen"
        @addFilter="addFilter"
        @deleteFilter="deleteFilter"
        @saveFilterName="saveFilterName"
      /> -->
      <NewFilter :model="treeData" />
    </div>
    <div v-else>Filters is not found</div>
  </div>
</template>

<script lang="ts">
  import Vue from 'vue'
  import Filters from './Filters.vue'
  import { Filter } from '../../store/modules/filters/filtersType'
  import { mapGetters, mapActions } from 'vuex'
  import NewFilter from './NewFilter.vue'

  interface Data {
    dataFilters: Filter[]
  }

  export default Vue.extend<Data, any, any>({
    data: () => ({
      dataFilters: [],
      treeData: {
        name: 'Filters',
        children: [
          {
            id: 6745757,
            name: 'СуперАдмин'
          },
          {
            id: 67453434757,
            name: 'Админ'
          },
          {
            id: 66768575757,
            name: 'Кассиры'
          },
          {
            id: 634234234,
            name: 'Сотрудники',
            children: [
              {
                id: 60000757,
                name: 'subfolder folder',
                children: [
                  {
                    id: 868686857,
                    name: 'subfolder'
                  },
                  {
                    id: 64234234323489987,
                    name: 'subfolder'
                  }
                ]
              },
              {
                id: 6743234234245757,
                name: 'subfolder1'
              },
              {
                id: 674777775757,
                name: 'subfolder2'
              },
              {
                id: 6745732222257,
                name: 'child folder',
                children: [
                  {
                    id: 688888,
                    name: 'children'
                  },
                  {
                    id: 667567557,
                    name: 'children'
                  }
                ]
              }
            ]
          }
        ]
      }
    }),
    components: {
      NewFilter
    },
    computed: mapGetters(['filters']),
    methods: {
      ...mapActions(['filterIsOpen', 'getFilters'])
      // isOpen(id: number) {
      //   const getIsOpenFilter = (filters: Filter[], id: number): any => {
      //     return filters?.map((filter: Filter) => {
      //       if (filter.filters) {
      //         return {
      //           ...filter,
      //           isOpen: filter.id === id ? !filter.isOpen : filter.isOpen,
      //           filters: getIsOpenFilter(filter.filters, id)
      //         }
      //       } else {
      //         return filter
      //       }
      //     })
      //   }
      //   this.dataFilters = getIsOpenFilter(this.dataFilters, id)
      // },
      // addRootFilter() {
      //   const uniqueId = Math.trunc(Math.random() * 10e5)
      //   this.dataFilters = [
      //     {
      //       id: uniqueId,
      //       name: 'newRootFilter',
      //       path: 'newRootFilter'
      //     },
      //     ...this.dataFilters
      //   ]
      // },
      // addFilter(id: number) {
      //   const uniqueId = Math.trunc(Math.random() * 10e5)
      //   const getNewFiltration = (filters: Filter[], id: number): any => {
      //     return filters?.map((filter: Filter) => {
      //       if (filter.id === id) {
      //         if (filter.filters) {
      //           return {
      //             ...filter,
      //             isOpen: true,
      //             filters: [
      //               ...filter.filters,
      //               {
      //                 id: uniqueId,
      //                 name: 'newFilter',
      //                 path: 'newFilter'
      //               }
      //             ]
      //           }
      //         }
      //         return {
      //           ...filter,
      //           isOpen: true,
      //           filters: [
      //             {
      //               id: uniqueId,
      //               name: 'newFilter',
      //               path: 'newFilter'
      //             }
      //           ]
      //         }
      //       }
      //       if (filter.filters) {
      //         return {
      //           ...filter,
      //           filters: getNewFiltration(filter.filters, id)
      //         }
      //       }

      //       return filter
      //     })
      //   }

      //   this.dataFilters = getNewFiltration(this.dataFilters, id)
      // },
      // deleteFilter(id: number) {
      //   const getNewFiltration = (filters: Filter[], id: number): any => {
      //     const newFilters = filters.filter((item: any) => item.id !== id)

      //     if (newFilters.length === filters.length) {
      //       return filters.map((item: any) => {
      //         if (item.filters) {
      //           const newFiltration = getNewFiltration(item.filters, id)

      //           return newFiltration.length
      //             ? {
      //                 ...item,
      //                 filters: newFiltration
      //               }
      //             : {
      //                 id: item.id,
      //                 name: item.name,
      //                 path: item.path
      //               }
      //         }
      //         return item
      //       })
      //     }

      //     return newFilters
      //   }

      //   const alert = confirm('Are you sure you want to remove this filter?')

      //   if (alert) {
      //     this.dataFilters = getNewFiltration(this.dataFilters, id)
      //   }
      // },
      // saveFilterName(id: number, filterName: string) {
      //   console.log(filterName)
      //   const getNewFiltration = (
      //     filters: Filter[],
      //     id: number,
      //     name: string
      //   ): any => {
      //     return filters?.map((filter: Filter) => {
      //       if (filter.id !== id) {
      //         if (filter.filters) {
      //           return {
      //             ...filter,
      //             filters: getNewFiltration(filter.filters, id, name)
      //           }
      //         }
      //         return filter
      //       }
      //       return {
      //         ...filter,
      //         name: name,
      //         path: name
      //       }
      //     })
      //   }
      //   console.log(getNewFiltration(this.dataFilters, id, filterName))

      //   this.dataFilters = getNewFiltration(this.dataFilters, id, filterName)
      // }
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
