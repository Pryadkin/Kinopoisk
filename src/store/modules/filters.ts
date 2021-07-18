export const filters = {
  actions: {
    // getProfileMovies({ commit }) {
    // commit('updateProfileMovies', getMovieFromStorage())
    // },
  },
  mutations: {
    // updateProfileMovies(state: any, profileMovies: any) {
    //   state.profileMovies = profileMovies
    //   state.stackProfileMovies = profileMovies
    // },
  },
  state: {
    filters: [
      {
        id: 795988,
        name: 'new',
        path: 'new'
      },
      {
        id: 795454988,
        name: 'new2',
        path: 'new2'
      }
    ]
  },
  getters: {
    filters(state: any) {
      return state.filters
    }
  }
}
