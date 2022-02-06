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

export const actions = {}

export const mutations = {}
