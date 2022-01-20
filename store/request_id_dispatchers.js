export const state = () => ({
  request_id_dispatchers: [],
  request_id_history: [],
})

export const getters = {
  request_id_dispatchers(state) {
    return state.request_id_dispatchers;
  },
  request_id_history(state) {
    return state.request_id_history;
  },
}


export const actions = {
  async fetchRequestIdDispatchers({commit}, requestId) {
    const request_id_dispatchers = await this.$axios.get('/manager/tasks/'+requestId+'/responses', {
      headers: {
        "Authorization": "Bearer a1c7c07794281f1ff168e19116c2d66b011bd61437dba46655a2cf581b90eb68"
      }
    });
    commit('setRequestIdDispatchers', request_id_dispatchers);
  },
  async fetchRequestIdDispatchersSelection({commit}, requestId) {
    const request_id_dispatchers = await this.$axios.get('/manager/tasks/'+requestId+'/selection', {
      headers: {
        "Authorization": "Bearer a1c7c07794281f1ff168e19116c2d66b011bd61437dba46655a2cf581b90eb68"
      }
    });
    commit('setRequestIdDispatchers', request_id_dispatchers);
  },
  async fetchRequestIdDispatchersInvitations({commit}, requestId) {
    const request_id_dispatchers = await this.$axios.get('/manager/tasks/'+requestId+'/invitations', {
      headers: {
        "Authorization": "Bearer a1c7c07794281f1ff168e19116c2d66b011bd61437dba46655a2cf581b90eb68"
      }
    });
    commit('setRequestIdDispatchers', request_id_dispatchers);
  },
  async fetchRequestIdDispatchersaAssigned({commit}, requestId) {
    const request_id_dispatchers = await this.$axios.get('/manager/tasks/'+requestId+'/assigned', {
      headers: {
        "Authorization": "Bearer a1c7c07794281f1ff168e19116c2d66b011bd61437dba46655a2cf581b90eb68"
      }
    });
    commit('setRequestIdDispatchers', request_id_dispatchers);
  },
  async fetchRequestIdHistory({commit}, requestId) {
    const request_id_history= await this.$axios.get('/manager/tasks/'+requestId+'/history', {
      headers: {
        "Authorization": "Bearer a1c7c07794281f1ff168e19116c2d66b011bd61437dba46655a2cf581b90eb68"
      }
    });
    commit('setRequestIdHistory', request_id_history);
  },
}

export const mutations = {
  setRequestIdDispatchers(state, request_id_dispatchers) {
    state.request_id_dispatchers = request_id_dispatchers.data.data;
  },
  setRequestIdHistory(state, request_id_history) {
    state.request_id_history = request_id_history.data.data;
  },
}
