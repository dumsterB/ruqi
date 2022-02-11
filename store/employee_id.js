export const state = () => (
  {
    employee_id       : {},
    employee_id_tasks : [],
    employee_id_support : [],
    employee_id_active : [],
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
  employee_id_support ( state )
  {
    return state.employee_id_support;
  },
  employee_id_active ( state )
  {
    return state.employee_id_active;
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
  async fetchEmployeeTasks({commit}, requestId) {

    const employee_id_tasks = await this.$axios.get('manager/employee/'+requestId+'/tasks', {
      headers: {
        "Authorization": "Bearer af2cf5b991716c8fe1d0c6bf9c7a03f6fa088887dd10921d605dad809e2df125"
      },
    });
    commit('setEmployeeIDTasks', employee_id_tasks)
  },
  async fetchEmployeeSupport({commit}, requestId) {

    const employee_id_support = await this.$axios.get('manager/employee/'+requestId+'/support', {
      headers: {
        "Authorization": "Bearer af2cf5b991716c8fe1d0c6bf9c7a03f6fa088887dd10921d605dad809e2df125"
      },
    });
    commit('setEmployeeIDSupport', employee_id_support)
  },
  async fetchEmployeeActive({commit}, requestId) {

    const employee_id_active = await this.$axios.get('manager/employee/'+requestId+'/active', {
      headers: {
        "Authorization": "Bearer af2cf5b991716c8fe1d0c6bf9c7a03f6fa088887dd10921d605dad809e2df125"
      },
    });
    commit('setEmployeeIDActive', employee_id_active)
  },
}

export const mutations = {
  setEmployeeID(state, employee_id) {
    state.employee_id = employee_id.data.data;
  },
  setEmployeeIDTasks(state, employee_id_tasks) {
    state.employee_id_tasks = employee_id_tasks.data.data;
  },
  setEmployeeIDSupport(state, employee_id_support) {
    state.employee_id_support = employee_id_support.data.data;
  },
  setEmployeeIDActive(state, employee_id_active) {
    state.employee_id_active = employee_id_active.data.data;
  },
}
