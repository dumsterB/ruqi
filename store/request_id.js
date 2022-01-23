export const state = () => ({
  request_id: [],
})

export const getters = {
  request_id(state) {
    return state.request_id;
  },
}


export const actions = {
  async fetchRequestId({commit}, requestId) {

    const request_id = await this.$axios.get('/manager/tasks/'+requestId, {
      headers: {
        "Authorization": "Bearer a1c7c07794281f1ff168e19116c2d66b011bd61437dba46655a2cf581b90eb68"
      }
    });
    commit('setRequest', request_id)

  },
  async putStatus({commit, dispatch}, {requestId, status}) {
    await this.$axios.put('/manager/tasks/'+requestId+'/'+status,
      {},
      {
        headers: {
          "Authorization": "Bearer eb5e61886e9a766273b4ea87ad67844c5e5ee22a8e22bffce0225151dfc5eaf3",
          'Content-Type': 'application/json',
        },
      })
      .then((response) => {
        dispatch('fetchRequestId', requestId);
        commit('response/setSuccess', {type: 'success', text: 'Заявка успешно обновлена', }, {root: true});
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
  setRequest(state, request_id) {
    state.request_id = request_id.data.data;
  },
}

