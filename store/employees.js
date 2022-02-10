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
    const requests = await this.$axios.post('/manager/employee',
      newRequest,
      {
        headers: {
          "Authorization": "Bearer eb5e61886e9a766273b4ea87ad67844c5e5ee22a8e22bffce0225151dfc5eaf3",
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
          self.$router.push('/employees/');
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
  async putRequest({commit, dispatch}, {uuid, body}) {
    let self= this;
    await this.$axios.put('/manager/employee/'+uuid,
      body,
      {
        headers: {
          "Authorization": "Bearer eb5e61886e9a766273b4ea87ad67844c5e5ee22a8e22bffce0225151dfc5eaf3",
          'Content-Type': 'application/json',
        },

      })
      .then((response) => {
        console.log(response);
        dispatch('fetchEmployees');
        commit('response/setSuccess', {type: 'success', text: 'Сотрудник успешно обновлен', }, {root: true});
        setTimeout(function() {
          commit('response/removeSuccess', null, { root: true });
        }, 2000);
        setTimeout(function() {
          self.$router.push('/employees/');
        }, 3000);
      })
      .catch((error) => {
        console.log(error);
      });


  },
  async removeRequest({commit, dispatch}, {requestId, params}) {

    await this.$axios.delete('/manager/employee/',
      requestId,
      {
      headers: {
        "Authorization": "Bearer eb5e61886e9a766273b4ea87ad67844c5e5ee22a8e22bffce0225151dfc5eaf3",
      },
    })
      .then((response) => {
        console.log(response);
        dispatch('fetchEmployees', params);
        commit('response/setSuccess', {type: 'success', text: 'Сотрудник удален', }, {root: true});
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

