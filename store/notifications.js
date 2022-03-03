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

