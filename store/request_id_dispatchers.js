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
  async fetchRequestIdDispatchers({commit}, {requestId, params}) {
    const request_id_dispatchers = await this.$axios.get('/manager/tasks/'+requestId+'/responses', {
      headers: {
        "Authorization": "Bearer a1c7c07794281f1ff168e19116c2d66b011bd61437dba46655a2cf581b90eb68"
      },
      params: params
    });
    commit('setRequestIdDispatchers', request_id_dispatchers);
  },
  async fetchRequestIdDispatchersSelection({commit}, {requestId}) {
    console.log("обновил");
    const request_id_dispatchers = await this.$axios.get('/manager/tasks/'+requestId+'/selection', {
      headers: {
        "Authorization": "Bearer a1c7c07794281f1ff168e19116c2d66b011bd61437dba46655a2cf581b90eb68"
      }
    });
    commit('setRequestIdDispatchers', request_id_dispatchers);
  },
  async fetchRequestIdDispatchersInvitations({commit}, {requestId}) {
    const request_id_dispatchers = await this.$axios.get('/manager/tasks/'+requestId+'/invitations', {
      headers: {
        "Authorization": "Bearer a1c7c07794281f1ff168e19116c2d66b011bd61437dba46655a2cf581b90eb68"
      }
    });
    commit('setRequestIdDispatchers', request_id_dispatchers);
  },
  async fetchRequestIdDispatchersaAssigned({commit}, {requestId}) {
    const request_id_dispatchers = await this.$axios.get('/manager/tasks/'+requestId+'/assigned', {
      headers: {
        "Authorization": "Bearer a1c7c07794281f1ff168e19116c2d66b011bd61437dba46655a2cf581b90eb68"
      }
    });
    commit('setRequestIdDispatchers', request_id_dispatchers);
  },
  async fetchRequestIdHistory({commit}, {requestId}) {
    const request_id_history= await this.$axios.get('/manager/tasks/'+requestId+'/history', {
      headers: {
        "Authorization": "Bearer a1c7c07794281f1ff168e19116c2d66b011bd61437dba46655a2cf581b90eb68"
      }
    });
    commit('setRequestIdHistory', request_id_history);
  },
  async acceptRequest({commit, dispatch}, {task_uuid, user_uuid}) {
    await this.$axios.put('/dispatcher/tasks/'+task_uuid+'/contractors/'+user_uuid+'/accept',
      {},
      {
        headers: {
          "Authorization": "Bearer eb5e61886e9a766273b4ea87ad67844c5e5ee22a8e22bffce0225151dfc5eaf3",
        },

      })
      .then((response) => {
        console.log(response);
        dispatch('fetchRequestIdDispatchers', {requestId: task_uuid});
        commit('response/setSuccess', {type: 'success', text: 'Заявка принята', }, {root: true});
        setTimeout(function() {
          commit('response/removeSuccess', null, { root: true });
        }, 2000);
      })
      .catch((error) => {
        console.log(error);
      });
  },
  async rejectRequest({commit, dispatch}, {task_uuid, user_uuid, dispatchMetod}) {
    await this.$axios.put('/dispatcher/tasks/'+task_uuid+'/contractors/'+user_uuid+'/cancel',
      {},
      {
        headers: {
          "Authorization": "Bearer eb5e61886e9a766273b4ea87ad67844c5e5ee22a8e22bffce0225151dfc5eaf3",
        },

      })
      .then((response) => {
        console.log(response);
        dispatch(dispatchMetod, {requestId: task_uuid});
        commit('response/setSuccess', {type: 'success', text: 'Заявка отклонена', }, {root: true});
        setTimeout(function() {
          commit('response/removeSuccess', null, { root: true });
        }, 2000);
      })
      .catch((error) => {
        console.log(error);
      });
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
