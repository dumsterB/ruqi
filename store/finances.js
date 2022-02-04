export const state = () => ({
  finances: [],
  summary: [],
})

export const getters = {
  finances(state) {
    return state.finances;
  },
  summary(state) {
    return state.summary;
  },
}


export const actions = {
  async fetchFinances({commit}, params) {

    const finances = await this.$axios.get('user/finances', {
      headers: {
        "Authorization": "Bearer 3914b0689fca39c94b2ac6002c4e4c6636da883279f4a904f302ac2b624c4a62"
      },
      params: params
    });
    commit('setFinances', finances)

  },
  async fetchSummary({commit}) {

    const summary = await this.$axios.get('user/summary', {
      headers: {
        "Authorization": "Bearer 3914b0689fca39c94b2ac6002c4e4c6636da883279f4a904f302ac2b624c4a62"
      },
    });
    commit('setSummary', summary)

  },

}

export const mutations = {
  setFinances(state, finances) {
    state.finances = finances.data.data;
  },
  setSummary(state, summary) {
    state.summary = summary.data.data;
  },
}

