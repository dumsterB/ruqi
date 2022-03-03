export const state = () => ({
  object_id: [],
  object_id_requests: []
})

export const getters = {
  object_id(state) {
    return state.object_id;
  },
  object_id_requests(state) {
    return state.object_id_requests;
  },
}


export const actions = {
  async fetchObjectId({commit}, requestId) {

    const object_id = await this.$axios.get('/objects/' + requestId, );
    commit('setRequest', object_id);

  },
  async fetchObjectIdRequest({commit}, requestId) {

    const object_id_requests = await this.$axios.get('/objects/' + requestId + '/tasks', );

    commit('setObjectIdRequests', object_id_requests);

  },
  async putStatus({commit, dispatch}, {requestId, status}) {
    await this.$axios.put('/objects/' + requestId + '/' + status,
      {},
      {
        headers: {
          'Content-Type': 'application/json',
        },
      })
      .then((response) => {
        dispatch('fetchObjectId', requestId);
        commit('response/setSuccess', {type: 'success', text: 'Объект успешно обновлен',}, {root: true});
        setTimeout(function () {
          commit('response/removeSuccess', null, {root: true});
        }, 2000);
      })
      .catch((error) => {
        console.log(error);
      });
  },
}

export const mutations = {
  setRequest(state, object_id) {
    state.object_id = object_id.data.data;
  },
  setObjectIdRequests(state, object_id_requests) {
    state.object_id_requests = object_id_requests.data.data;
  },
}

