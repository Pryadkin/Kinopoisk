import { Filter } from './filtersType'

export interface State {
  actions: {
    getFilters: (ctx: any) => void
    addFilter: (ctx: any, filter: Filter) => void
    removeFilter: (ctx: any, id: number) => void
    filterIsOpen: (ctx: any, id: number) => void
  }
  mutations: {
    updateFilters: (state: any, filters: Filter) => void
    addFilterMutation: (state: any, filters: Filter) => void
    removeFilterMutation: (state: any, filters: Filter) => void
    filterIsOpenMutation: (state: any, filters: Filter) => void
  }
  state: {
    filters: Filter[]
  }
  getters: any
}

function getFiltersFromStorage() {
  const jsonFilters = localStorage.getItem('filters')
  return jsonFilters && JSON.parse(jsonFilters)
}

function addFilterToStorage(state: any, filter: Filter) {
  const filters = [filter, ...state.filters]
  const jsonFilters = JSON.stringify(filters)
  localStorage.setItem('filters', jsonFilters)
}

function removeFilterFromStorage(filteredFilters: number) {
  const jsonMovies = JSON.stringify(filteredFilters)
  localStorage.setItem('filters', jsonMovies)
}

function getFiltration(filters: Filter[], id: number): any {
  return filters?.map((filter: Filter) => {
    if (filter.filters) {
      return {
        ...filter,
        isOpen: filter.id === id ? !filter.isOpen : filter.isOpen,
        filters: getFiltration(filter.filters, id)
      }
    } else {
      return filter
    }
  })
}

export const filters: State = {
  actions: {
    getFilters({ commit }) {
      commit('updateFilters', getFiltersFromStorage())
    },
    addFilter({ commit, state }, filter: Filter) {
      if (!state.filters?.find((item: any) => item.id === filter.id)) {
        addFilterToStorage(state, filter)
        commit('addFilterMutation', filter)
      }
    },
    removeFilter({ commit, state }, id: number) {
      const filteredFilters = state.filters.filter(
        (item: Filter) => item.id !== id
      )

      removeFilterFromStorage(filteredFilters)
      commit('removeFilterMutation', filteredFilters)
    },
    filterIsOpen({ commit, state }, id: number) {
      const changeFilters = getFiltration(state.filters, id)
      commit('filterIsOpenMutation', changeFilters)
    }
  },
  mutations: {
    updateFilters(state, filters) {
      state.filters = filters
    },
    addFilterMutation(state, filter) {
      state.filters = [filter, ...state.filters]
    },
    removeFilterMutation(state, filteredFilters) {
      state.filters = filteredFilters
    },
    filterIsOpenMutation(state, filteredFilters) {
      state.filters = filteredFilters
    }
  },
  state: {
    filters: [
      {
        filters: [
          {
            id: 34234,
            name: 'subnew2',
            path: 'new/subnew2'
          },
          {
            id: 342454545634,
            name: 'subnew2',
            path: 'new/subnew2'
          },
          {
            filters: [
              {
                id: 79545455554988,
                name: 'new2',
                path: 'new2'
              }
            ],
            isOpen: false,
            id: 79578687988,
            name: 'new',
            path: 'new'
          }
        ],
        isOpen: false,
        id: 795988,
        name: 'new',
        path: 'new'
      },
      {
        id: 795454988,
        name: 'new2',
        path: 'new2'
      },
      {
        filters: [
          {
            id: 34234464,
            name: 'subnew3',
            path: 'new/subnew3'
          }
        ],
        isOpen: false,
        id: 43535,
        name: 'new3',
        path: 'new3'
      }
    ]
  },
  getters: {
    filters(state: any) {
      return state.filters
    }
  }
}
