export const state = () => ({
  object_id: [],
  object_id_requests: [],
  object_id_services: [],
  object_id_vacancies: [],
  object_id_history: [],
})

export const getters = {
  object_id(state) {
    return state.object_id;
  },
  object_id_requests(state) {
    return state.object_id_requests;
  },
  object_id_services(state) {
    return state.object_id_services;
  },
  object_id_vacancies(state) {
    return state.object_id_vacancies;
  },
  object_id_history(state) {
    return state.object_id_history;
  },
}


export const actions = {
  async fetchObjectId({commit}, requestId) {

    const object_id = await this.$axios.get('/objects/' + requestId, );
    commit('setRequest', object_id);

  },
  async fetchObjectIdRequest({commit}, requestId) {

    const object_id_requests = await this.$axios.get('/objects/' + requestId + '/tasks', );
    commit('setObjectIdRequests', object_id_requests);

  },
  async fetchObjectIdServices({commit}, {requestId, params, concat}) {

    const object_id_services = await this.$axios.get('/objects/' + requestId + '/services', {
      params: params
    });
    commit('setObjectIdServices', {object_id_services: object_id_services, concat: concat});

  },
  async fetchObjectIdVacancies({commit}, requestId) {

    const object_id_vacancies = await this.$axios.get('/objects/' + requestId + '/vacancies', );
    commit('setObjectIdVacancies', object_id_vacancies);

  },
  async fetchObjectIdHistory({commit}, requestId) {

    const object_id_history = await this.$axios.get('/objects/' + requestId + '/history', );
    commit('setObjectIdHistory', object_id_history);

  },
  async putStatus({commit, dispatch}, {requestId, status}) {
    await this.$axios.put('/objects/' + requestId + '/' + status,
      {},
      {
        headers: {
          'Content-Type': 'application/json',
        },
      })
      .then((response) => {
        dispatch('fetchObjectId', requestId);
        commit('response/setSuccess', {type: 'success', text: 'Объект успешно обновлен',}, {root: true});
        setTimeout(function () {
          commit('response/removeSuccess', null, {root: true});
        }, 2000);
      })
      .catch((error) => {
        console.log(error);
      });
  },
}

export const mutations = {
  setRequest(state, object_id) {
    state.object_id = object_id.data.data;
  },
  setObjectIdRequests(state, object_id_requests) {
    state.object_id_requests = object_id_requests.data.data;
  },
  setObjectIdServices(state, {object_id_services, concat}) {
    if(concat){
      state.object_id_services = state.object_id_services.concat(object_id_services.data.data);
    }
    else{
      state.object_id_services = state.object_id_services;
    }

  },
  setObjectIdVacancies(state, object_id_vacancies) {
    state.object_id_vacancies = object_id_vacancies.data.data;
  },
  setObjectIdHistory(state, object_id_history) {
    state.object_id_history = object_id_history.data.data;
  },
}

