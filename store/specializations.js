export const state = () => ({
  specializations: []
})

export const getters = {
  specializations: s => s.specializations
}


export const actions = {
  async fetchSpecializations({commit}) {

    const specializations = await this.$axios.get('/dictionary/specializations', {
    });
    commit('setSpecializations', specializations)

  }
}

export const mutations = {
  setSpecializations(state, specializations) {
    state.specializations = specializations.data.data;
  }
}

