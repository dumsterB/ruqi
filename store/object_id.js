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

    const object_id = await this.$axios.get('/manager/objects/'+requestId, {
      headers: {
        "Authorization": "Bearer eb5e61886e9a766273b4ea87ad67844c5e5ee22a8e22bffce0225151dfc5eaf3"
      }
    });
    commit('setRequest', object_id);

  },
  async fetchObjectIdRequest({commit}, requestId) {

    console.log('fetchObjectIdRequest ###');

    const object_id_requests = await this.$axios.get('/objects/'+requestId+'/tasks', {
      headers: {
        "Authorization": "Bearer eb5e61886e9a766273b4ea87ad67844c5e5ee22a8e22bffce0225151dfc5eaf3"
      }
    });

    console.log('object_id_requests');
    console.log(object_id_requests);

    commit('setObjectIdRequests', object_id_requests);

  },
  async putStatus({commit, dispatch}, {requestId, status}) {
    await this.$axios.put('/manager/objects/'+requestId+'/'+status,
      {},
      {
        headers: {
          "Authorization": "Bearer eb5e61886e9a766273b4ea87ad67844c5e5ee22a8e22bffce0225151dfc5eaf3",
          'Content-Type': 'application/json',
        },
      })
      .then((response) => {
        dispatch('fetchObjectId', requestId);
        commit('response/setSuccess', {type: 'success', text: 'Объект успешно обновлен', }, {root: true});
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
  setRequest(state, object_id) {
    state.object_id = object_id.data.data;
  },
  setObjectIdRequests(state, object_id_requests) {
    state.object_id_requests = object_id_requests.data.data;
  },
}

