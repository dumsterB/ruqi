export const state = () => ({
  notifications: [],
})

export const getters = {
  notifications(state) {
    return state.notifications;
  },
}


export const actions = {
  async fetchNotifications({commit}, params) {

    const notifications = await this.$axios.get('/user/notifications', {
      headers: {
        "Authorization": "Bearer 8dfb1b84690ece3d84456b4355322b0ffc561ac8683e4465c8d60db87230cc42"
      },
      params: params
    });
    commit('setNotifications', notifications)

  },

}

export const mutations = {
  setNotifications(state, notifications) {
    state.notifications = notifications.data.data;
  },
}

