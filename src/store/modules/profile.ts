import jsonMovies from '../../assets/profileMovies.json'
import { FetchMovies } from '../../api/apiTypes'

export interface State {
  actions: {
    getProfileMovies: (ctx: any) => void
    addMovieToProfile: (ctx: any, movie: any) => void
    removeMovieFromProfile: (ctx: any, id: number) => void
  }
  mutations: any
  state: {
    profileMovies: FetchMovies[]
    stackProfileMovies: FetchMovies[]
    profileMoviesCount: number | null
  }
  getters: any
}

export const profile: State = {
  actions: {
    getProfileMovies(ctx: any) {
      console.log(jsonMovies)
      ctx.commit('updateProfileMovies', jsonMovies)
    },
    addMovieToProfile(ctx: any, movie: any) {
      ctx.commit('addMovieToProfileMutation', movie)
    },
    removeMovieFromProfile(ctx: any, id: number) {
      ctx.commit('removeMovieFromProfileMutation', id)
    }
  },
  mutations: {
    updateProfileMovies(state: any, profileMovies: any) {
      state.profileMovies = profileMovies
      state.stackProfileMovies = profileMovies
    },
    addMovieToProfileMutation(state: any, movie: any) {
      movie.filter = []

      state.profileMovies = [movie, ...state.profileMovies]
      state.stackProfileMovies = [movie, ...state.stackProfileMovies]
    },
    removeMovieFromProfileMutation(state: any, id: number) {
      state.profileMovies = state.profileMovies.filter((item: any) => item.id !== id)
      state.stackProfileMovies = state.stackProfileMovies.filter((item: any) => item.id !== id)
    }
  },
  state: {
    profileMovies: [],
    stackProfileMovies: [],
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
