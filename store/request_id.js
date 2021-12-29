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

    const request_id = await this.$axios.get('https://cdn.ruqi.maxber.ru/api/v1/manager/tasks/'+requestId, {
      headers: {
        "Authorization": "Bearer a1c7c07794281f1ff168e19116c2d66b011bd61437dba46655a2cf581b90eb68"
      }
    });
    commit('setRequest', request_id)

  },
}

export const mutations = {
  setRequest(state, request_id) {
    state.request_id = request_id.data.data;
  },
}

