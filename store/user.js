export const state = () => ({
  user: {},
})

export const getters = {
  user(state) {
    return state.user;
  },
}

export const actions = {
  async fetchUser({commit}, params) {

    const user = await this.$axios.get('/user/my', {
      headers: {
        "Authorization": "Bearer 8dfb1b84690ece3d84456b4355322b0ffc561ac8683e4465c8d60db87230cc42"
      },
    });
    commit('setUser', user)
  },

}

export const mutations = {
  setUser(state, user) {
    state.user = user.data.data;
  },
}

