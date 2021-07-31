import { FetchMovies } from '../../api/apiTypes'

export interface State {
  actions: {
    getProfileMovies: (ctx: any) => void
    addMovieToProfile: (ctx: any, movie: any) => void
    setFilterableMovie: (ctx: any, movie: any) => void
    setProfileMovies: (ctx: any, movie: any) => void
    removeMovieFromProfile: (ctx: any, id: number) => void
  }
  mutations: any
  state: {
    profileMovies: FetchMovies[]
    stackProfileMovies: FetchMovies[]
    profileMoviesCount: number | null
    filterableMovie: FetchMovies | null
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

function setMovieFromStorage(movies: any) {
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
    setProfileMovies({ state }) {
      setMovieFromStorage(state.profileMovies)
    },
    addMovieToProfile({ commit, state }, movie: any) {
      if (!state.profileMovies?.find((item: any) => item.id === movie.id)) {
        movie.filters = []

        addMovieToStorage(state, movie)
        commit('addMovieToProfileMutation', movie)
      }
    },
    setFilterableMovie({ commit }, movie) {
      commit('updateFilterableMovie', movie)
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
    updateFilterableMovie(state: any, movie: any) {
      state.filterableMovie = movie
    },
    removeMovieFromProfileMutation(state: any, filteredMovies: any) {
      state.profileMovies = filteredMovies
      state.stackProfileMovies = filteredMovies
    }
  },
  state: {
    profileMovies: [],
    stackProfileMovies: [],
    profileMoviesCount: null,
    filterableMovie: null
  },
  getters: {
    profileMovies(state: any) {
      return state.profileMovies
    },
    profileMoviesCount(state: any) {
      return state.profileMovies.length
    },
    filterableMovie(state: any) {
      return state.filterableMovie
    }
  }
}
