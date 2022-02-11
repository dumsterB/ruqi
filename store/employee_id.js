export const state = () => (
  {
    employee_id       : {},
    employee_id_tasks : [],
  }
)

export const getters = {
  employee_id ( state )
  {
    return state.employee_id;
  },

  employee_id_tasks ( state )
  {
    return state.employee_id_tasks;
  },
}

export const actions = {
  async fetchEmployee({commit}, requestId) {

    const employee_id = await this.$axios.get('/manager/employee/'+requestId, {
      headers: {
        "Authorization": "Bearer af2cf5b991716c8fe1d0c6bf9c7a03f6fa088887dd10921d605dad809e2df125"
      },
    });
    commit('setEmployeeID', employee_id)

  },
}

export const mutations = {
  setEmployeeID(state, employee_id) {
    state.employee_id = employee_id.data.data;
  },
}
