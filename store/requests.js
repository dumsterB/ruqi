import Vue from "vue";

export const state = () => ({
  requests: []
})

export const getters = {
  requests(state) {
    return state.requests;
  },
}


export const actions = {
  async fetch({commit}) {
    const requests = await this.$axios.get('https://cdn.ruqi.maxber.ru/api/v1/manager/tasks', {
      headers: {
        "Authorization": "Bearer a1c7c07794281f1ff168e19116c2d66b011bd61437dba46655a2cf581b90eb68"
      }
    });
    commit('setRequest', requests)
  },
  async createRequest({commit, dispatch}, newRequest) {
    const requests = await this.$axios.post('https://cdn.ruqi.maxber.ru/api/v1/manager/tasks',
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
       // Vue.set(this.alert, true);

      })
      .catch((error) => {
        console.log(error);
      });

  },
  async removeRequest({commit, dispatch}, requestID) {

    await this.$axios.delete('https://cdn.ruqi.maxber.ru/api/v1/manager/tasks/'+requestID, {
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
}

export const mutations = {
  setRequest(state, requests) {
    state.requests = requests.data.data;
  },
  createRequest(state, newRequest) {
    state.requests.data.data.unshift(newRequest);
  },
}



