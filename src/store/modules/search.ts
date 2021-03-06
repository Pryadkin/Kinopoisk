import { fetchMovies } from '../../api/fetchMovies'

export default {
  actions: {
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
    updateFoundMovies(state: any, results: any) {
      return (state.foundMovies = results)
    },
    updateFoundMoviesCount(state: any, count: any) {
      return (state.foundMoviesCount = count)
    }
  },
  state: {
    foundMovies: [],
    foundMoviesCount: 0
  },
  getters: {
    foundMovies(state: any) {
      console.log(state.foundMovies)
      return state.foundMovies
    },
    foundMoviesCount(state: any) {
      return state.foundMoviesCount
    }
  }
}
