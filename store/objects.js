export const state = () => ({
  objects: [],
  response: {
    status: false,
    text: '',
    type: 'error'
  },
})

export const getters = {
  objects(state) {
    return state.objects;
  },
  requestSuccess(state) {
    return state.response;
  },
}


export const actions = {
  async fetchObjects({commit}) {

    const objects = await this.$axios.get('/manager/objects', {
      headers: {
        "Authorization": "Bearer eb5e61886e9a766273b4ea87ad67844c5e5ee22a8e22bffce0225151dfc5eaf3"
      },
    });
    commit('setObjects', objects)

  },
  async createRequest({commit, dispatch}, newRequest) {
    const requests = await this.$axios.post('/manager/objects',
      newRequest,
      {
        headers: {
          "Authorization": "Bearer eb5e61886e9a766273b4ea87ad67844c5e5ee22a8e22bffce0225151dfc5eaf3",
          'Content-Type': 'application/json',
        },

      })
      .then((response) => {
        console.log(response);
        dispatch('fetchObjects');
        commit('setSuccess', {type: 'success', text: 'Объект успешно создан'});
        setTimeout(function() {
          commit('removeSuccess');
        }, 2000);
        setTimeout(function() {
          self.$router.push('/objects/');
        }, 3000);

      })
      .catch((error) => {
        commit('setSuccess', {type: 'error', text: 'Заполните поля объекта'});
        setTimeout(function() {
          commit('removeSuccess');
        }, 3000);
        console.log(error);
      });

  },
  async putRequest({commit, dispatch}, {uuid, body}) {
    let self= this;
    await this.$axios.put('/manager/objects/'+uuid,
      body,
      {
        headers: {
          "Authorization": "Bearer eb5e61886e9a766273b4ea87ad67844c5e5ee22a8e22bffce0225151dfc5eaf3",
          'Content-Type': 'application/json',
        },

      })
      .then((response) => {
        console.log(response);
        dispatch('fetchObjects');
        commit('setSuccess', {type: 'success', text: 'Объект успешно обновлен'});
        setTimeout(function() {
          commit('removeSuccess');
        }, 2000);
        setTimeout(function() {
          self.$router.push('/objects/');
        }, 3000);
      })
      .catch((error) => {
        console.log(error);
      });


  },
  async removeRequest({commit, dispatch}, requestID) {

    await this.$axios.delete('/manager/objects/'+requestID, {
      headers: {
        "Authorization": "Bearer eb5e61886e9a766273b4ea87ad67844c5e5ee22a8e22bffce0225151dfc5eaf3",
      },
    })
      .then((response) => {
        console.log(response);
        dispatch('fetchObjects');

      })
      .catch((error) => {
        console.log(error);
      });

  },
}

export const mutations = {
  setObjects(state, objects) {
    state.objects = objects.data.data;
  },
  setSuccess(state, { type, text }){
    state.response.status = true;
    state.response.type = type;
    state.response.text = text;
  },
  removeSuccess(state){
    state.success = false;
  }
}

