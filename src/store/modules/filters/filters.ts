import { Filter } from './filtersType'
import _ from 'lodash'
import jsonMovies from '../../../assets/profileMovies.json'

export interface State {
  actions: {
    getFilters: (ctx: any) => void
    updateFilters: (ctx: any, filters: Filter) => void
    removeFilter: (ctx: any, id: number) => void
    filterIsOpen: (ctx: any, id: number) => void
  }
  mutations: {
    updateFiltersMutation: (state: any, filters: Filter) => void
    removeFilterMutation: (state: any, filters: Filter) => void
    filterIsOpenMutation: (state: any, filters: Filter) => void
  }
  state: {
    filters: any
  }
  getters: any
}

function setNewFilter(
  filter: any,
  i: number,
  filters: any,
  onePath = filter.path,
  twoPath = null
): any {
  // console.log(filter, i, filters, onePath, twoPath)
  // console.log(filter.path, filters[i - 1])
  // console.log(filter.path, filters[i - 1] && filters[i - 1].path)
  // if (filter.path.includes('/')) {
  //   return {
  //     id: filter.id,
  //     name: filter.name,
  //     path: filter.path,
  //     isOpen: false,
  //     filters: setNewFilter(filter, index + 1)
  //   }
  // }
}

function getFiltersFromMovies(movies: any) {
  const filters = movies.map((movie: any) => {
    return Object.values(movie.filters)
  })
  const allFilters = _.flattenDeep(filters)
  const uniqFiltes = _.uniqBy(allFilters, 'id')
  // const uniqSortFilters = _.sortedIndexBy(uniqFiltes, 'path')
  const uniqSortFilters = uniqFiltes.sort((a: any, b: any) => {
    return a.path.localeCompare(b.path)
  })
  // console.log(uniqSortFilters)
  const func = uniqSortFilters.map(
    (filter: any, index: number, filters: any) => {
      return setNewFilter(filter, index, filters)
    }
  )

  console.log(func)
}

function getFiltersFromStorage() {
  const jsonFilters = localStorage.getItem('filters')
  return jsonFilters && JSON.parse(jsonFilters)
}

function updateFilterStorage(state: any, filters: any) {
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
    getFilters({ commit, rootState }) {
      // getFiltersFromMovies(rootState.profile.profileMovies)
      commit('updateFiltersMutation', getFiltersFromStorage())
    },
    updateFilters({ commit, state }, filters: Filter) {
      updateFilterStorage(state, filters)
      commit('updateFiltersMutation', filters)
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
    updateFiltersMutation(state, filters) {
      state.filters = filters
    },
    removeFilterMutation(state, filteredFilters) {
      state.filters = filteredFilters
    },
    filterIsOpenMutation(state, filteredFilters) {
      state.filters = filteredFilters
    }
  },
  state: {
    filters: {
      name: 'rootFilters',
      path: 'rootFilters',
      children: []
    }
  },
  getters: {
    filters(state: any) {
      return state.filters
    }
  }
}
