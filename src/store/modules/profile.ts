// import { InjectionKey } from 'vue/'
import jsonMovies from '../../assets/profileMovies.json'
import { FetchMovies } from '../../api/apiTypes'

export interface State {
  actions: {
    getProfileMovies: (ctx: any) => void
  }
  mutations: any
  state: {
    profileMovies: FetchMovies[]
    profileMoviesCount: number | null
  }
  getters: any
}

export const profile: State = {
  actions: {
    getProfileMovies(ctx: any) {
      console.log(jsonMovies)
      ctx.commit('updateProfileMovies', jsonMovies)
    }
  },
  mutations: {
    updateProfileMovies(state: any, profileMovies: any) {
      return (state.profileMovies = profileMovies)
    }
  },
  state: {
    profileMovies: [],
    profileMoviesCount: null
  },
  getters: {
    profileMovies(state: any) {
      return state.profileMovies
    },
    profileMoviesCount(state: any) {
      return state.profileMovies.length
    }
  }
}
