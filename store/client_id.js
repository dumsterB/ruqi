export const state = () => ({
  client_id: [],
})

export const getters = {
  client_id(state) {
    return state.client_id;
  },
}

export const actions = {
  async fetchClientId({commit}, requestId) {
    const client_id = await this.$axios.get('/super_manager/accounts/'+requestId, {
      headers: {
        "Authorization": "Bearer af2cf5b991716c8fe1d0c6bf9c7a03f6fa088887dd10921d605dad809e2df125"
      }
    });
    commit('setRequest', client_id);
  },
  async putRequest({commit, dispatch}, {uuid, body}) {
    let self= this;
    await this.$axios.put('/super_manager/accounts/'+uuid,
      body,
      {
        headers: {
          "Authorization": "Bearer af2cf5b991716c8fe1d0c6bf9c7a03f6fa088887dd10921d605dad809e2df125",
          'Content-Type': 'application/json',
        },

      })
      .then((response) => {
        console.log(response);
        dispatch('fetchClientId', uuid);
        commit('response/setSuccess', {type: 'success', text: 'Клиент успешно обновлен', }, {root: true});
        setTimeout(function() {
          commit('response/removeSuccess', null, { root: true });
        }, 2000);
        setTimeout(function() {
          self.$router.push('/clients/');
        }, 3000);
      })
      .catch((error) => {
        console.log(error);
      });
  },

}

export const mutations = {
  setRequest(state, client_id) {
    state.client_id = client_id.data.data;
  },
}

