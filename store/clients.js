export const state = () => ({
  clients: [],
})

export const getters = {
  clients(state) {
    return state.clients;
  },
}


export const actions = {
  async fetchClients({commit}, params) {
    console.log('фетч', params)

    const clients = await this.$axios.get('/super_manager/accounts', {
      headers: {
        "Authorization": "Bearer af2cf5b991716c8fe1d0c6bf9c7a03f6fa088887dd10921d605dad809e2df125"
      },
      params: params
    });
    commit('setClients', clients)

  },
  async createRequest({commit, dispatch}, newRequest) {
    let self= this;
    const requests = await this.$axios.post('/super_manager/accounts',
      newRequest,
      {
        headers: {
          "Authorization": "Bearer af2cf5b991716c8fe1d0c6bf9c7a03f6fa088887dd10921d605dad809e2df125",
          'Content-Type': 'application/json',
        },

      })
      .then((response) => {
        console.log(response);
        dispatch('fetchClients');
        commit('response/setSuccess', {type: 'success', text: 'Клиент успешно создан', }, {root: true});
        setTimeout(function() {
          commit('response/removeSuccess', null, { root: true });
        }, 2000);
        setTimeout(function() {
          self.$router.push('/clients/');
        }, 3000);

      })
      .catch((error) => {
        commit('response/setSuccess', {type: 'error', text: 'Заполните поля', }, {root: true});
        setTimeout(function() {
          commit('response/removeSuccess', null, { root: true });
        }, 3000);
        console.log(error);
      });
  },
  async removeRequest({commit, dispatch}, {requestId, status}) {
    console.log(status);

    await this.$axios.delete('/super_manager/accounts/'+requestId, {
      headers: {
        "Authorization": "Bearer af2cf5b991716c8fe1d0c6bf9c7a03f6fa088887dd10921d605dad809e2df125",
      },
    })
      .then((response) => {
        console.log(response);
        dispatch('fetchClients', {"status": status});

      })
      .catch((error) => {
        console.log(error);
      });

  },
}

export const mutations = {
  setClients(state, clients) {
    state.clients = clients.data.data;
  },
}

