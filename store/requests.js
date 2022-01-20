export const state = () => ({
  requests: [],
  response: {
    status: false,
    text: '',
    type: 'error'
  },
})

export const getters = {
  requests(state) {
    return state.requests;
  },
  requestSuccess(state) {
    return state.response;
  },
}


export const actions = {
  async fetch({commit}) {
    const requests = await this.$axios.get('/manager/tasks', {
      headers: {
        "Authorization": "Bearer a1c7c07794281f1ff168e19116c2d66b011bd61437dba46655a2cf581b90eb68"
      }
    });
    commit('setRequest', requests)
  },
  async createRequest({commit, dispatch}, newRequest) {
    let self= this;
    const requests = await this.$axios.post('/manager/tasks',
      newRequest,
      {
        headers: {
          "Authorization": "Bearer eb5e61886e9a766273b4ea87ad67844c5e5ee22a8e22bffce0225151dfc5eaf3",
          'Content-Type': 'application/json',
        },

      })
      .then((response) => {
        console.log(response);
        dispatch('fetch');
        commit('setSuccess', {type: 'success', text: 'Ваша заявка успешно создана'});
        setTimeout(function() {
          commit('removeSuccess');
        }, 2000);
        setTimeout(function() {
          self.$router.push('/request/');
        }, 3000);

      })
      .catch((error) => {
        commit('setSuccess', {type: 'error', text: 'Заполните поля заявки'});
        setTimeout(function() {
          commit('removeSuccess');
        }, 3000);
        console.log(error);
      });

  },
  async removeRequest({commit, dispatch}, requestID) {

    await this.$axios.delete('/manager/tasks/'+requestID, {
      headers: {
        "Authorization": "Bearer eb5e61886e9a766273b4ea87ad67844c5e5ee22a8e22bffce0225151dfc5eaf3",
      },
    })
      .then((response) => {
        console.log(response);
        dispatch('fetch');

      })
      .catch((error) => {
        console.log(error);
      });

  },
  async putRequest({commit, dispatch}, {uuid, body}) {
    let self= this;
    await this.$axios.put('/manager/tasks/'+uuid,
      body,
      {
        headers: {
          "Authorization": "Bearer eb5e61886e9a766273b4ea87ad67844c5e5ee22a8e22bffce0225151dfc5eaf3",
          'Content-Type': 'application/json',
        },

      })
      .then((response) => {
        console.log(response);
        dispatch('fetch');
        commit('setSuccess', {type: 'success', text: 'Ваша заявка успешно обновлена'});
        setTimeout(function() {
          commit('removeSuccess');
        }, 2000);
        setTimeout(function() {
          self.$router.push('/request/');
        }, 3000);
      })
      .catch((error) => {
        console.log(error);
      });


  },
}

export const mutations = {
  setRequest(state, requests) {
    state.requests = requests.data.data;
  },
  createRequest(state, newRequest) {
    state.requests.data.data.unshift(newRequest);
  },
  setSuccess(state, { type, text }){
    console.log(type, text);
    state.response.status = true;
    state.response.type = type;
    state.response.text = text;
  },
  removeSuccess(state){
    state.success = false;
  }
}



