import { fetchMovies } from '../../api/fetchMovies'

export interface State {
  actions: {
    getNameMovie: (ctx: any, name: string) => void
    getPageNumber: (ctx: any, page: number) => void
    getMovies: (ctx: any, payload: any) => void
  }
  mutations: any
  state: {
    nameMovie: string | null
    pageNumber: number
    foundMovies: []
    foundMoviesCount: number
  }
  getters: any
}

export const search: State = {
  actions: {
    getNameMovie(ctx: any, name: string) {
      ctx.commit('updateNameMovie', name)
    },
    getPageNumber(ctx: any, page: number) {
      console.log(page)
      ctx.commit('updatePageNumber', page)
    },
    async getMovies(ctx: any, payload: any) {
      try {
        const data = await fetchMovies(payload.name, payload.isWith, payload.page)
        ctx.commit('updateFoundMovies', data.results)
        ctx.commit('updateFoundMoviesCount', data.total_results)
      } catch (error) {
        alert(error)
      }
    }
  },
  mutations: {
    updateNameMovie(state: any, name: string) {
      state.nameMovie = name
    },
    updatePageNumber(state: any, page: number) {
      console.log(page)
      state.pageNumber = page
    },
    updateFoundMovies(state: any, results: any) {
      state.foundMovies = results
    },
    updateFoundMoviesCount(state: any, count: any) {
      state.foundMoviesCount = count
    }
  },
  state: {
    nameMovie: null,
    pageNumber: 1,
    foundMovies: [],
    foundMoviesCount: 0
  },
  getters: {
    nameMovie(state: any) {
      return state.nameMovie
    },
    pageNumber(state: any) {
      return state.pageNumber
    },
    foundMovies(state: any) {
      return state.foundMovies
    },
    foundMoviesCount(state: any) {
      return state.foundMoviesCount
    }
  }
}
