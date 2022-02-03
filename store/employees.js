export const state = () => ({
  employees: [],
})

export const getters = {
  employees(state) {
    return state.employees;
  },
}


export const actions = {
  async fetchEmployees({commit}, params) {

    const employees = await this.$axios.get('/super_manager/accounts/57721e51-d7ba-492d-8579-24e9df1a1cbc/employees', {
      headers: {
        "Authorization": "Bearer af2cf5b991716c8fe1d0c6bf9c7a03f6fa088887dd10921d605dad809e2df125"
      },
      params: params
    });
    commit('setEmployees', employees)

  },
  async createRequest({commit, dispatch}, newRequest) {
    let self= this;
    const requests = await this.$axios.post('/super_manager/accounts',
      newRequest,
      {
        headers: {
          "Authorization": "Bearer af2cf5b991716c8fe1d0c6bf9c7a03f6fa088887dd10921d605dad809e2df125",
          'Content-Type': 'application/json',
        },

      })
      .then((response) => {
        console.log(response);
        dispatch('fetchEmployees');
        commit('response/setSuccess', {type: 'success', text: 'Сотрудник успешно создан', }, {root: true});
        setTimeout(function() {
          commit('response/removeSuccess', null, { root: true });
        }, 2000);
        setTimeout(function() {
          self.$router.push('/clients/');
        }, 3000);

      })
      .catch((error) => {
        commit('response/setSuccess', {type: 'error', text: 'Заполните поля', }, {root: true});
        setTimeout(function() {
          commit('response/removeSuccess', null, { root: true });
        }, 3000);
        console.log(error);
      });
  },
  async removeRequest({commit, dispatch}, {requestId, params}) {

    await this.$axios.delete('/super_manager/accounts/'+requestId, {
      headers: {
        "Authorization": "Bearer af2cf5b991716c8fe1d0c6bf9c7a03f6fa088887dd10921d605dad809e2df125",
      },
    })
      .then((response) => {
        console.log(response);
        dispatch('fetchEmployees', params);
        commit('response/setSuccess', {type: 'success', text: 'Клиент удален', }, {root: true});
        setTimeout(function() {
          commit('response/removeSuccess', null, { root: true });
        }, 3000);
      })
      .catch((error) => {
        console.log(error);
      });

  },
}

export const mutations = {
  setEmployees(state, employees) {
    state.employees = employees.data.data;
  },
}

