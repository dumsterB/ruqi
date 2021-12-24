export const state = () => ({
  request_id_dispatchers: []
})

export const getters = {
  request_id_dispatchers(state) {
    return state.request_id_dispatchers;
  },
}


export const actions = {
  async fetchRequestIdDispatchers({commit}, requestId) {
    const request_id_dispatchers = await this.$axios.get('https://cdn.ruqi.maxber.ru/api/v1/manager/tasks/'+requestId+'/responses', {
      headers: {
        "Authorization": "Bearer a1c7c07794281f1ff168e19116c2d66b011bd61437dba46655a2cf581b90eb68"
      }
    });
    commit('setRequestIdDispatchers', request_id_dispatchers);
  },
  async fetchRequestIdDispatchersSelection({commit}, requestId) {
    const request_id_dispatchers = await this.$axios.get('https://cdn.ruqi.maxber.ru/api/v1/manager/tasks/'+requestId+'/selection', {
      headers: {
        "Authorization": "Bearer a1c7c07794281f1ff168e19116c2d66b011bd61437dba46655a2cf581b90eb68"
      }
    });
    commit('setRequestIdDispatchers', request_id_dispatchers);
  },
  async fetchRequestIdDispatchersInvitations({commit}, requestId) {
    const request_id_dispatchers = await this.$axios.get('https://cdn.ruqi.maxber.ru/api/v1/manager/tasks/'+requestId+'/invitations', {
      headers: {
        "Authorization": "Bearer a1c7c07794281f1ff168e19116c2d66b011bd61437dba46655a2cf581b90eb68"
      }
    });
    commit('setRequestIdDispatchers', request_id_dispatchers);
  },
  async fetchRequestIdDispatchersaAssigned({commit}, requestId) {
    const request_id_dispatchers = await this.$axios.get('https://cdn.ruqi.maxber.ru/api/v1/manager/tasks/'+requestId+'/assigned', {
      headers: {
        "Authorization": "Bearer a1c7c07794281f1ff168e19116c2d66b011bd61437dba46655a2cf581b90eb68"
      }
    });
    commit('setRequestIdDispatchers', request_id_dispatchers);
  },
}

export const mutations = {
  setRequestIdDispatchers(state, request_id_dispatchers) {
    state.request_id_dispatchers = request_id_dispatchers.data.data;
  },
}
