export const state = () => ({
  requests: []
})

export const getters = {
  requests: s => s.requests
}


export const actions = {
  async fetch({commit}) {

    const requests = await this.$axios.get('https://cdn.ruqi.maxber.ru/api/v1/manager/tasks', {
      headers: {
        "Authorization": "Bearer a1c7c07794281f1ff168e19116c2d66b011bd61437dba46655a2cf581b90eb68"
      }
    });
    commit('setRequest', requests)

  }
}

export const mutations = {
  setRequest(state, requests) {
    state.requests = requests.data.data;
  }
}

