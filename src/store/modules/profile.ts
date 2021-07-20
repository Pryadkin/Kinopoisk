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

function getMovieFromStorage() {
  const jsonMovies = localStorage.getItem('movies')
  return jsonMovies && JSON.parse(jsonMovies)
}

function addMovieToStorage(state: any, movie: any) {
  const movies = [movie, ...state.profileMovies]
  const jsonMovies = JSON.stringify(movies)
  localStorage.setItem('movies', jsonMovies)
}

function removeMovieFromStorage(filteredMovies: number) {
  const jsonMovies = JSON.stringify(filteredMovies)
  localStorage.setItem('movies', jsonMovies)
}

export const profile: State = {
  actions: {
    getProfileMovies({ commit }) {
      commit('updateProfileMovies', getMovieFromStorage())
    },
    addMovieToProfile({ commit, state }, movie: any) {
      if (!state.profileMovies?.find((item: any) => item.id === movie.id)) {
        movie.filter = []

        addMovieToStorage(state, movie)
        commit('addMovieToProfileMutation', movie)
      }
    },
    removeMovieFromProfile({ commit, state }, id: number) {
      const filteredMovies = state.profileMovies.filter(
        (item: any) => item.id !== id
      )

      removeMovieFromStorage(filteredMovies)
      commit('removeMovieFromProfileMutation', filteredMovies)
    }
  },
  mutations: {
    updateProfileMovies(state: any, profileMovies: any) {
      state.profileMovies = profileMovies
      state.stackProfileMovies = profileMovies
    },
    addMovieToProfileMutation(state: any, movie: any) {
      state.profileMovies = [movie, ...state.profileMovies]
      state.stackProfileMovies = [movie, ...state.stackProfileMovies]
    },
    removeMovieFromProfileMutation(state: any, filteredMovies: any) {
      state.profileMovies = filteredMovies
      state.stackProfileMovies = filteredMovies
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
