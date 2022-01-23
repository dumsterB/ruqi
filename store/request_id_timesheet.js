export const state = () => ({
  request_id_timesheet: [],
})

export const getters = {
  request_id_timesheet(state) {
    return state.request_id_timesheet;
  },
}


export const actions = {
  async fetchRequestIdTimeSheet({commit}, requestId) {

    const request_id_timesheet = await this.$axios.get('/manager/tasks/' + requestId + '/timesheet', {
      headers: {
        "Authorization": "Bearer eb5e61886e9a766273b4ea87ad67844c5e5ee22a8e22bffce0225151dfc5eaf3"
      }
    });
    commit('setRequest', request_id_timesheet)
  },

  async fillOutAssigned({commit, dispatch}, requestId) {
    const request_id_timesheet = await this.$axios.post('/manager/tasks/' + requestId + '/timesheet/assigned',
      {},
      {
        headers: {
          "Authorization": "Bearer eb5e61886e9a766273b4ea87ad67844c5e5ee22a8e22bffce0225151dfc5eaf3",
        },
      })
      .then((response) => {
        console.log(response);
        dispatch('fetchRequestIdTimeSheet', requestId);
        commit('response/setSuccess', {type: 'success', text: 'Данные обновлены', }, {root: true});
        setTimeout(function () {
          commit('response/removeSuccess', null, { root: true });
        }, 2000);

      })
      .catch((error) => {
        console.log(error);
      });

  },

  async putRequestIdTimeSheet({commit, dispatch}, {uuid, body}) {
    let self = this;
    await this.$axios.put('/manager/tasks/' + uuid + '/timesheet/assigned',
      body,
      {
        headers: {
          "Authorization": "Bearer eb5e61886e9a766273b4ea87ad67844c5e5ee22a8e22bffce0225151dfc5eaf3",
          'Content-Type': 'application/json',
        },

      })
      .then((response) => {
        console.log(response);
        dispatch('fetchRequestIdTimeSheet', uuid);
        commit('response/setSuccess', {type: 'success', text: 'Данные обновлены', }, {root: true});
        setTimeout(function () {
          commit('response/removeSuccess', null, { root: true });
        }, 2000);
      })
      .catch((error) => {
        console.log(error);
      });


  },

}

export const mutations = {
  setRequest(state, request_id_timesheet) {
    let request = request_id_timesheet.data.data;
    let assigned = request.assigned.map((item, index) => ({
      id: index + 1,
      activeChangeButton: 0,
      ...item
    }));

    request.assigned = assigned;

    state.request_id_timesheet = request;
  },
  updateChangeButton(state, {id, activeStatus}) {
    state.request_id_timesheet.assigned[id].activeChangeButton = +activeStatus;
  },
}
