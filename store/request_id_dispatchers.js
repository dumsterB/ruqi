export const state = () => ({
  request_id_history: [],
  request_id_responses: [],
  request_id_selection: [],
  request_id_invitations: [],
  request_id_assigned: [],
  request_id_responses_filters: [],
  request_id_selection_filters: [],
  request_id_invitations_filters: [],
  request_id_assigned_filters: [],
  request_id_search: [],
  request_id_filter_professions: [],
  request_id_filter_rank: [],
  request_id_filter_active: [],
  request_id_search_lastpage: 1,
  request_id_responses_lastpage: 1,
  request_id_selection_lastpage: 1,
  request_id_invitations_lastpage: 1,
  request_id_assigned_lastpage: 1,
})

export const getters = {
  request_id_history(state) {
    return state.request_id_history;
  },
  request_id_responses(state) {
    return state.request_id_responses;
  },
  request_id_selection(state) {
    return state.request_id_selection;
  },
  request_id_invitations(state) {
    return state.request_id_invitations;
  },
  request_id_assigned(state) {
    return state.request_id_assigned;
  },
  request_id_responses_filters(state) {
    return state.request_id_responses_filters;
  },
  request_id_selection_filters(state) {
    return state.request_id_selection_filters;
  },
  request_id_invitations_filters(state) {
    return state.request_id_invitations_filters;
  },
  request_id_assigned_filters(state) {
    return state.request_id_assigned_filters;
  },
  request_id_search(state) {
    return state.request_id_search;
  },
  request_id_filter_professions(state) {
    return state.request_id_filter_professions;
  },
  request_id_filter_rank(state) {
    return state.request_id_filter_rank;
  },
  request_id_filter_active(state) {
    return state.request_id_filter_active;
  },
  request_id_search_lastpage(state) {
    return state.request_id_search_lastpage;
  },
  request_id_responses_lastpage(state) {
    return state.request_id_responses_lastpage;
  },
  request_id_selection_lastpage(state) {
    return state.request_id_selection_lastpage;
  },
  request_id_invitations_lastpage(state) {
    return state.request_id_invitations_lastpage;
  },
  request_id_assigned_lastpage(state) {
    return state.request_id_assigned_lastpage;
  },
}


export const actions = {
  async fetchRequestIdResponses({commit}, {requestId, params, concat, unit}) {
    const request_id_responses = await this.$axios.get('/tasks/'+requestId+'/responses', {
      params: params
    });
    commit('setRequestIdResponses', {request_id_responses: request_id_responses, concat: concat, unit: unit});
  },

  async fetchRequestIdSelection( { commit }, { requestId, params, concat, unit } ){

    const request_id_selection = await this.$axios.get( '/tasks/'+requestId+'/selection', {
      params: params
    } );

    commit('setRequestIdSelection', {request_id_selection: request_id_selection, concat: concat, unit: unit});
  },

  async fetchRequestIdInvitations({commit}, {requestId, params, concat, unit}) {
    const request_id_invitations = await this.$axios.get('/tasks/'+requestId+'/invitations', {
      params: params
    });
    commit('setRequestIdInvitations', {request_id_invitations: request_id_invitations, concat: concat, unit: unit});
  },

  async fetchRequestIdAssigned({commit}, {requestId, params, concat, unit}) {
    const request_id_assigned = await this.$axios.get('/tasks/'+requestId+'/assigned', {
      params: params
    });
    commit('setRequestIdAssigned', {request_id_assigned: request_id_assigned, concat: concat, unit: unit});
  },

  async fetchRequestIdHistory({commit},  {requestId, params, concat}) {
    const request_id_history = await this.$axios.get('/tasks/' + requestId + '/history',{
      params: params
    });
    commit('setRequestIdHistory', {request_id_history: request_id_history, concat: concat,} );
  },

  async fetchRequestIdSearch({commit}, {requestId, params, concat, unit}) {
    console.log('fetchRequestIdSearch ---', params)
    console.log(typeof params);
    const request_id_search = await this.$axios.get('/tasks/'+requestId+'/contractors/search', {
      params: params
    });
    commit('setRequestIdSearch', {request_id_search: request_id_search, concat: concat, unit: unit});
  },

  async acceptRequest({commit, dispatch}, {task_uuid, user_uuid}) {
    await this.$axios.put('/dispatcher/tasks/'+task_uuid+'/contractors/'+user_uuid+'/accept',
      {},
      {
        headers: {
          "Authorization": "Bearer eb5e61886e9a766273b4ea87ad67844c5e5ee22a8e22bffce0225151dfc5eaf3",
        },

      })
      .then((response) => {
        console.log(response);
        dispatch('fetchRequestIdDispatchers', {requestId: task_uuid});
        commit('response/setSuccess', {type: 'success', text: '???????????? ??????????????', }, {root: true});
        setTimeout(function() {
          commit('response/removeSuccess', null, { root: true });
        }, 2000);
      })
      .catch((error) => {
        console.log(error);
      });
  },

  async rejectRequest({commit, dispatch}, {task_uuid, user_uuid, dispatchMetod}) {
    await this.$axios.put('/dispatcher/tasks/'+task_uuid+'/contractors/'+user_uuid+'/cancel',
      {},
      {
        headers: {
          "Authorization": "Bearer eb5e61886e9a766273b4ea87ad67844c5e5ee22a8e22bffce0225151dfc5eaf3",
        },

      })
      .then((response) => {
        console.log(response);
        dispatch(dispatchMetod, {requestId: task_uuid});
        commit('response/setSuccess', {type: 'success', text: '???????????? ??????????????????', }, {root: true});
        setTimeout(function() {
          commit('response/removeSuccess', null, { root: true });
        }, 2000);
      })
      .catch((error) => {
        console.log(error);
      });
  },



  async appointExecutor({commit, dispatch}, {task_uuid, user_uuids}) {
    await this.$axios.put('/tasks/'+task_uuid+'/contractors/working',
      user_uuids,
      { headers: {
          'Content-Type': 'application/json',
        },
      })
      .then((response) => {
        console.log(response);
        dispatch('fetchRequestIdResponses', {requestId: task_uuid, params: {}, concat: false, unit: false});
        dispatch('fetchRequestIdAssigned', {requestId: task_uuid, params: {}, concat: false, unit: false});
        dispatch('fetchRequestIdInvitations', {requestId: task_uuid, params: {}, concat: false, unit: false});
        commit('response/setSuccess', {type: 'success', text: '?????????????????????? ????????????????', }, {root: true});
        setTimeout(function() {
          commit('response/removeSuccess', null, { root: true });
        }, 2000);
      })
      .catch((error) => {
        console.log(error);
      });
  },

  async rejectExecutor({commit, dispatch}, {task_uuid, user_uuids}) {
    await this.$axios.put('/tasks/'+task_uuid+'/contractors/reject',
      user_uuids,
      { headers: {
          'Content-Type': 'application/json',
        },
      })
      .then((response) => {
        console.log(response);
        dispatch('fetchRequestIdResponses', {requestId: task_uuid, params: {}, concat: false, unit: false});
        commit('response/setSuccess', {type: 'success', text: '?????????????????????? ????????????????', }, {root: true});
        setTimeout(function() {
          commit('response/removeSuccess', null, { root: true });
        }, 2000);
      })
      .catch((error) => {
        console.log(error);
      });
  },

  async inviteExecutor({commit, dispatch}, {task_uuid, user_uuids, params}) {
    await this.$axios.put('/tasks/'+task_uuid+'/contractors/invite',
      user_uuids,
      { params: params,
        headers: {
          'Content-Type': 'application/json',
        },
      })
      .then((response) => {
        console.log(response);
        dispatch('fetchRequestIdResponses', {requestId: task_uuid, params: {}, concat: false, unit: false});
        dispatch('fetchRequestIdInvitations', {requestId: task_uuid, params: {}, concat: false, unit: false});
        dispatch('fetchRequestIdSelection', {requestId: task_uuid, params: {}, concat: false, unit: false});
        commit('response/setSuccess', {type: 'success', text: '?????????????????????? ??????????????????', }, {root: true});
        setTimeout(function() {
          commit('response/removeSuccess', null, { root: true });
        }, 2000);
      })
      .catch((error) => {
        console.log(error);
      });
  },

  async inviteExecutorEmail({commit, dispatch}, {task_uuid, user_uuids}) {
    await this.$axios.put('/tasks/'+task_uuid+'/contractors/invite/email',
      user_uuids,
      { headers: {
          'Content-Type': 'application/json',
        },
      })
      .then((response) => {
        console.log(response);
        dispatch('fetchRequestIdResponses', {requestId: task_uuid, params: {}, concat: false, unit: false});
        dispatch('fetchRequestIdInvitations', {requestId: task_uuid, params: {}, concat: false, unit: false});
        dispatch('fetchRequestIdSelection', {requestId: task_uuid, params: {}, concat: false, unit: false});
        commit('response/setSuccess', {type: 'success', text: '?????????????????????? ??????????????????', }, {root: true});
        setTimeout(function() {
          commit('response/removeSuccess', null, { root: true });
        }, 2000);
      })
      .catch((error) => {
        console.log(error);
        commit('response/setSuccess', {type: 'error', text: 'Email ???? ????????????', }, {root: true});
        setTimeout(function() {
          commit('response/removeSuccess', null, { root: true });
        }, 2000);
      });
  },

  async inviteExecutorSms({commit, dispatch}, {task_uuid, user_uuids}) {
    await this.$axios.put('/tasks/'+task_uuid+'/contractors/invite/sms',
      user_uuids,
      { headers: {
          'Content-Type': 'application/json',
        },
      })
      .then((response) => {
        console.log(response);
        dispatch('fetchRequestIdResponses', {requestId: task_uuid, params: {}, concat: false, unit: false});
        dispatch('fetchRequestIdInvitations', {requestId: task_uuid, params: {}, concat: false, unit: false});
        dispatch('fetchRequestIdSelection', {requestId: task_uuid, params: {}, concat: false, unit: false});
        commit('response/setSuccess', {type: 'success', text: '?????????????????????? ??????????????????', }, {root: true});
        setTimeout(function() {
          commit('response/removeSuccess', null, { root: true });
        }, 2000);
      })
      .catch((error) => {
        console.log(error);
      });
  },

  async inviteExecutorTelegram({commit, dispatch}, {task_uuid, user_uuids}) {
    await this.$axios.put('/tasks/'+task_uuid+'/contractors/invite/telegram',
      user_uuids,
      { headers: {
          'Content-Type': 'application/json',
        },
      })
      .then((response) => {
        console.log(response);
        dispatch('fetchRequestIdResponses', {requestId: task_uuid, params: {}, concat: false, unit: false});
        dispatch('fetchRequestIdInvitations', {requestId: task_uuid, params: {}, concat: false, unit: false});
        dispatch('fetchRequestIdSelection', {requestId: task_uuid, params: {}, concat: false, unit: false});
        commit('response/setSuccess', {type: 'success', text: '?????????????????????? ??????????????????', }, {root: true});
        setTimeout(function() {
          commit('response/removeSuccess', null, { root: true });
        }, 2000);
      })
      .catch((error) => {
        console.log(error);
        commit('response/setSuccess', {type: 'error', text: 'Telegram ???? ????????????', }, {root: true});
        setTimeout(function() {
          commit('response/removeSuccess', null, { root: true });
        }, 2000);
      });
  },

  async deleteExecutor({commit, dispatch}, {task_uuid, user_uuids}) {
    await this.$axios.put('/tasks/'+task_uuid+'/contractors/cancel',
      user_uuids,
      { headers: {
          'Content-Type': 'application/json',
        },
      })
      .then((response) => {
        console.log(response);
        dispatch('fetchRequestIdResponses', {requestId: task_uuid, params: {}, concat: false, unit: false});
        dispatch('fetchRequestIdInvitations', {requestId: task_uuid, params: {}, concat: false, unit: false});
        dispatch('fetchRequestIdSelection', {requestId: task_uuid, params: {}, concat: false, unit: false});
        commit('response/setSuccess', {type: 'success', text: '?????????????????????? ????????????????', }, {root: true});
        setTimeout(function() {
          commit('response/removeSuccess', null, { root: true });
        }, 2000);
      })
      .catch((error) => {
        console.log(error);
      });
  },

  async refuseExecutor({commit, dispatch}, {task_uuid, user_uuids}) {
    await this.$axios.put('/tasks/'+task_uuid+'/contractors/refused',
      user_uuids,
      { headers: {
          'Content-Type': 'application/json',
        },
      })
      .then((response) => {
        console.log(response);
        dispatch('fetchRequestIdAssigned', {requestId: task_uuid, params: {}, concat: false, unit: false});
        commit('response/setSuccess', {type: 'success', text: '?????????????????????? ????????????????', }, {root: true});
        setTimeout(function() {
          commit('response/removeSuccess', null, { root: true });
        }, 2000);
      })
      .catch((error) => {
        console.log(error);
      });
  },

  async acceptedExecutor({commit, dispatch}, {task_uuid, user_uuids}) {
    await this.$axios.put('/tasks/'+task_uuid+'/contractors/accept',
      user_uuids,
      { headers: {
          'Content-Type': 'application/json',
        },
      })
      .then((response) => {
        console.log(response);
        dispatch('fetchRequestIdSearch', {requestId: task_uuid, params: {}, concat: false, unit: false});
        dispatch('fetchRequestIdAssigned', {requestId: task_uuid, params: {}, concat: false, unit: false});
        commit('response/setSuccess', {type: 'success', text: '?????????????????????? ?????????? ??????????????????', }, {root: true});
        setTimeout(function() {
          commit('response/removeSuccess', null, { root: true });
        }, 2000);
      })
      .catch((error) => {
        console.log(error);
      });
  },

  async localExecutor({commit, dispatch}, {task_uuid, user_uuids}) {
    let self= this
    await this.$axios.post('/tasks/'+task_uuid+'/contractors/local',
      user_uuids,
      { headers: {
          'Content-Type': 'application/json',
        },
      })
      .then((response) => {
        console.log(response);
        dispatch('fetchRequestIdAssigned', {requestId: task_uuid, params: {}, concat: false, unit: false});
        commit('response/setSuccess', {type: 'success', text: '?????????????????????? ?????????????????? ?? ????????????', }, {root: true});
        setTimeout(function() {
          commit('response/removeSuccess', null, { root: true });
        }, 2000);
        /*setTimeout(function() {
          self.$router.push('/tasks/' + task_uuid);
        }, 1000);*/
      })
      .catch((error) => {
        console.log(error);
      });
  },


}

export const mutations = {
  setRequestIdHistory(state, {request_id_history, concat}) {

    state.request_id_history = request_id_history.data.data;
    if (concat) {
      state.request_id_history = state.request_id_history.concat(request_id_history.data.data);
    } else {
      state.request_id_history = request_id_history.data.data;
    }

  },

  setRequestIdSearch(state, {request_id_search, concat, unit}) {
    if (concat) {
      state.request_id_search = state.request_id_search.concat(request_id_search.data.data);
    } else {
      state.request_id_search = request_id_search.data.data;
    }

    if (unit) {
      state.request_id_filter_professions = request_id_search.data.meta.filters.filter(obj => obj.field == 'professions')[0].options;
      state.request_id_filter_rank = request_id_search.data.meta.filters.filter(obj => obj.field == 'rank')[0].options;
      state.request_id_filter_active = request_id_search.data.meta.filters.filter(obj => obj.field == 'last_active')[0].options;
    }

    state.request_id_search_lastpage = request_id_search.data.meta.last_page;
  },

  setRequestIdResponses(state, {request_id_responses, concat, unit}) {

    if (concat) {
      state.request_id_responses = state.request_id_responses.concat(request_id_responses.data.data);
    } else {
      state.request_id_responses = request_id_responses.data.data;
    }

    if (unit) {
      state.request_id_responses_filters = request_id_responses.data.meta.filters;
    }

    state.request_id_responses_lastpage = request_id_responses.data.meta.last_page;

  },
  setRequestIdSelection(state, {request_id_selection, concat, unit}) {

    if (concat) {
      state.request_id_selection = state.request_id_selection.concat(request_id_selection.data.data);
    } else {
      state.request_id_selection = request_id_selection.data.data;
    }

    if (unit) {
      state.request_id_selection_filters = request_id_selection.data.meta.filters;
    }

    state.request_id_selection_lastpage = request_id_selection.data.meta.last_page;

  },
  setRequestIdInvitations(state, {request_id_invitations, concat, unit}) {

    if (concat) {
      state.request_id_invitations = state.request_id_invitations.concat(request_id_invitations.data.data);
    } else {
      state.request_id_invitations = request_id_invitations.data.data;
    }

    if (unit) {
      state.request_id_invitations_filters = request_id_invitations.data.meta.filters;
    }

    state.request_id_invitations_lastpage = request_id_invitations.data.meta.last_page;

  },
  setRequestIdAssigned(state, {request_id_assigned, concat, unit}) {

    if (concat) {
      state.request_id_assigned = state.request_id_assigned.concat(request_id_assigned.data.data);
    } else {
      state.request_id_assigned = request_id_assigned.data.data;
    }

    if (unit) {
      state.request_id_assigned_filters = request_id_assigned.data.meta.filters;
    }

    state.request_id_assigned_lastpage = request_id_assigned.data.meta.last_page;

  },


}
