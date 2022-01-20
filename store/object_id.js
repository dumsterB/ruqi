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

    const object_id_requests = await this.$axios.get('/objects/'+requestId+'/tasks', {
      headers: {
        "Authorization": "Bearer eb5e61886e9a766273b4ea87ad67844c5e5ee22a8e22bffce0225151dfc5eaf3"
      }
    });
    commit('setObjectIdRequests', object_id_requests);

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

