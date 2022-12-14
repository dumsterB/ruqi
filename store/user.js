export const state = () => ({
  user: {
    settings: {},
    visibility_sections: [],
  },
  password: {
    oldPass: {
      value: null,
    },

    newPass: {
      value: null,
      isValid: false,
    },

    RepeatNewPass: {
      value: null,
      isValid: false,
    },
  },
  userTasks: [],
  userWorks: [],
  searchTasks: [],
  searchTasksLastPage: 0,
  searchTasksTotal: 0,
  tasksLastPage: 0,
  tasksTotal: 0,
  workdLastPage: 0,
  worksTotal: 0,
  userTasksParams: {},
  validation: {},
  userAuthorizationStatus: null,
  userBanners: [],
});

export const getters = {
  user(state) {
    return state.user;
  },
  password(state) {
    return state.password;
  },
  userTasks(state) {
    return state.userTasks;
  },
  userWorks(state) {
    return state.userWorks;
  },
  tasksLastPage(state) {
    return state.tasksLastPage;
  },
  tasksTotal(state) {
    return state.tasksTotal;
  },
  searchTasks(state) {
    return state.searchTasks;
  },
  searchTasksLastPage(state) {
    return state.searchTasksLastPage;
  },
  searchTasksTotal(state) {
    return state.searchTasksTotal;
  },
  userTasksParams(state) {
    return state.userTasksParams;
  },
  validation(state) {
    return state.validation;
  },
  userAuthorizationStatus(state) {
    return state.userAuthorizationStatus;
  },
  userBanners(state) {
    return state.userBanners;
  }
}

export const actions = {
  /* FETCHERS */
  async fetchUser({ commit }) {
    const response = await this.$axios.get('user/my');

    commit('updateUserData', response?.data?.data);
  },

  async fetchUserTasks({ commit }, {params, concat}) {
    console.debug('fetchSearchTasks', params); // DELETE

    const tasks = await this.$axios.get('user/my/tasks', {
      params: params
    });
    commit('updateUserTasks', {tasks: tasks, concat: concat});

  },

  async fetchUserWorks({ commit }, {params, concat}) {

    const tasks = await this.$axios.get('user/my/tasks/accepted', {
      params: params
    });
    commit('updateUserWorks', {tasks: tasks, concat: concat});

  },

  async fetchSearchTasks({ commit }, {params, concat}) {
    console.debug('fetchSearchTasks', params); // DELETE

    const search_tasks = await this.$axios.get('user/tasks/search', {
      params: params
    });
    commit('updateSearchTasks', {search_tasks: search_tasks, concat: concat});

  },

  async fetchBanners({ commit }, ) {
    const banners = await this.$axios.get('user/banners');

    commit('updateBanners', banners);

  },

  async requestTask({commit, dispatch}, {task_uuid, params, concat}) {
    await this.$axios.post('/user/tasks/'+task_uuid+'/request',
      { headers: {
          'Content-Type': 'application/json',
        },
      })
      .then((response) => {
        console.log(response);
        dispatch('fetchSearchTasks', {params: params, concat: concat});
        commit('response/setSuccess', {type: 'success', text: '???? ???????????????????????? ???? ????????????', }, {root: true});
        setTimeout(function() {
          commit('response/removeSuccess', null, { root: true });
        }, 2000);
      })
      .catch((error) => {
        console.log(error);
      });
  },

  async acceptInviteTask({commit, dispatch}, {task_uuid, params, concat}) {
    await this.$axios.put('/user/tasks/'+task_uuid+'/accept-invite',)
      .then((response) => {
        console.log(response);
        dispatch('fetchUserTasks', {params: {}, concat: false});
        commit('response/setSuccess', {type: 'success', text: '???? ?????????????? ??????????????????????', }, {root: true});
        setTimeout(function() {
          commit('response/removeSuccess', null, { root: true });
        }, 2000);
      })
      .catch((error) => {
        console.log(error);
      });
  },

  async cancelTask({commit, dispatch}, {task_uuid, params, concat}) {
    await this.$axios.put('/user/tasks/'+task_uuid+'/cancel',)
      .then((response) => {
        console.log(response);
        dispatch('fetchUserTasks', {params: {}, concat: false});
        dispatch('fetchUserWorks', {params: {}, concat: false});
        commit('response/setSuccess', {type: 'success', text: '???? ???????????????? ????????????', }, {root: true});
        setTimeout(function() {
          commit('response/removeSuccess', null, { root: true });
        }, 2000);
      })
      .catch((error) => {
        console.log(error);
      });
  },

  async refuseTask({commit, dispatch}, {task_uuid, params, concat}) {
    await this.$axios.put('/user/tasks/'+task_uuid+'/refused',)
      .then((response) => {
        console.log(response);
        dispatch('fetchUserTasks', {params: {}, concat: false});
        dispatch('fetchUserWorks', {params: {}, concat: false});
        commit('response/setSuccess', {type: 'success', text: '???? ???????????????????? ???? ????????????', }, {root: true});
        setTimeout(function() {
          commit('response/removeSuccess', null, { root: true });
        }, 2000);
      })
      .catch((error) => {
        console.log(error);
      });
  },


  /* SETTERS */
  async setUserData({ commit }, payload) {
    commit('updateUserData', payload);
  },
  async setUserValidation({ commit }, payload) {
    commit('updateUserValidation', payload);
  },
  async setPasswordStore({ commit }, payload) {
    commit('updatePasswordStore', payload);
  },
  async setUserTasksParams({ commit }, payload = {}) {
    commit('updateUserTasksParams', payload);
  },
  async resetUserWorkTimeDaysStore({ commit, state, }, payload = {}) {
    commit(
      'updateUserData',

      {
        work_times: {
          ...state.user.work_times,
          two: false,
          three: false,
          individual: false,
          monday: false,
          tuesday: false,
          wednesday: false,
          thursday: false,
          friday: false,
          saturday: false,
          sunday: false,
        }
      }
    );
  },
  async setUserAuthorizationStatus({ commit, }, { status, }) {
    commit('updateUserAuthorizationStatus', { status });
  },

  /* OTHER ACTIONS */
  async uploadUserData({ state }) {
    return await this.$axios.put('user/settings', state.user);
  },
  async changeUserPassword({ commit }, payload) {
    commit(
      'updatePasswordStore',

      {
        oldPass: {
          value: null,
        },

        newPass: {
          value: null,
          isValid: false,
        },

        RepeatNewPass: {
          value: null,
          isValid: false,
        },
      },
    );

    return await this.$axios.put('auth/change_password', payload);
  },
  async validateUserData({ state }, payload = {}) {
    /* FIRST NAME VALIDATE START */
    if (!(typeof this.$validation.requiredField(state.user.firstname) === 'number')) {
      throw new Error('???????? "??????" ?????????????????????? ?? ????????????????????');
    }
    /* FIRST NAME VALIDATE END */

    /* MIDDLE NAME VALIDATE START */
    if (!(typeof this.$validation.requiredField(state.user.middlename) === 'number')) {
      throw new Error('???????? "??????????????" ?????????????????????? ?? ????????????????????');
    }
    /* MIDDLE NAME VALIDATE END */

    /* CITY VALIDATE START */
    if (!(typeof this.$validation.requiredField(state.user.settings.city) === 'number')) {
      throw new Error('???????? "??????????" ?????????????????????? ?? ????????????????????');
    }
    /* CITY VALIDATE END */

    /* PHONE VALIDATE START */
    if (!(typeof this.$validation.phoneFormat(state.user.settings.contact_phone) === 'boolean')) {
      throw new Error('???????? "??????????????" ?????????????????? ??????????????????????');
    }
    /* PHONE VALIDATE END */

    /* EMAIL VALIDATE START */
    if (!(typeof this.$validation.emailFormat(state.user.settings.contact_email) === 'boolean')) {
      throw new Error('???????? "Email" ?????????????????? ??????????????????????');
    }
    /* EMAIL VALIDATE END */

    /* BANK CARD VALIDATE START */
    if (state.user.settings.type_payment === '???????????????????? ??????????') {
      if (!(typeof this.$validation.cardNumberFormat(state.user.settings.bank_card) === 'boolean')) {
        throw new Error('???????? "?????????? ??????????" ?????????????????? ??????????????????????');
      }
    }
    /* BANK CARD VALIDATE END */

    /* INN VALIDATE START */
    console.log('validateUserData: ', typeof this.$validation.innFormat(state.user.settings.inn)); // DELETE

    if (!(typeof this.$validation.innFormat(state.user.settings.inn) === 'boolean')) {
      throw new Error('???????? "??????" ?????????????????? ??????????????????????');
    }
    /* INN VALIDATE END */

    /* KPP VALIDATE START */
    if (!(typeof this.$validation.kppFormat(state.user.settings.kpp) === 'boolean')) {
      throw new Error('???????? "??????" ?????????????????? ??????????????????????');
    }
    /* KPP VALIDATE END */

    /* BIC VALIDATE START */
    if (!(typeof this.$validation.bicFormat(state.user.settings.bik) === 'boolean')) {
      throw new Error('???????? "??????" ?????????????????? ??????????????????????');
    }
    /* BIC VALIDATE END */

    /* PAYMENT ACCOUNT VALIDATE START */
    if (!(typeof this.$validation.paymentAccountFormat(state.user.settings.payment_account) === 'boolean')) {
      throw new Error('???????? "?????????????????? ????????" ?????????????????? ??????????????????????');
    }
    /* PAYMENT ACCOUNT VALIDATE END */

    /* CORRESPONDENT ACCOUNT VALIDATE START */
    if (!(typeof this.$validation.correspondentAccountFormat(state.user.settings.correspondent_account) === 'boolean')) {
      throw new Error('???????? "?????????????????????????????????? ????????" ?????????????????? ??????????????????????');
    }
    /* CORRESPONDENT ACCOUNT VALIDATE END */

    /* BANK VALIDATE START */
    if (!(typeof this.$validation.requiredField(state.user.settings.bank) === 'number')) {
      throw new Error('???????? "????????" ?????????????????????? ?? ????????????????????');
    }
    /* BANK VALIDATE END */

    /* DOCUMENT SNILS START */
    if (!(typeof this.$validation.requiredField(state.user.settings.document_snils) === 'number')) {
      throw new Error('???????? "??????????" ?????????????????????? ?? ????????????????????');
    }
    /* DOCUMENT SNILS END */

    /* DOCUMENT INN START */
    if (!(typeof this.$validation.innFormat(state.user.settings.document_inn) === 'boolean')) {
      throw new Error('???????? "?????????????????????????? ??????" ?????????????????? ??????????????????????');
    }
    /* DOCUMENT INN END */
  },
}

export const mutations = {
  updateUserData(state, payload) {
    state.user = {
      ...state.user,
      ...payload,
    };
  },
  updateUserValidation(state, payload) {
    state.validation = {
      ...state.validation,
      ...payload,
    };
  },
  updatePasswordStore(state, payload) {
    state.password = {
      ...state.password,
      ...payload,
    };
  },
  updateUserTasks(state, {tasks, concat}) {
    if (concat) {
      state.userTasks = state.userTasks.concat(tasks.data.data);
    } else {
      state.userTasks = tasks.data.data;
    }

    state.tasksLastPage = tasks.data.meta.last_page;
    state.tasksTotal = tasks.data.meta.total;

  },

  updateUserWorks(state, {tasks, concat}) {
    if (concat) {
      state.userWorks = state.userWorks.concat(tasks.data.data);
    } else {
      state.userWorks = tasks.data.data;
    }

    state.worksLastPage = tasks.data.meta.last_page;
    state.worksTotal = tasks.data.meta.total;

  },

  updateSearchTasks(state, {search_tasks, concat}) {
    if (concat) {
      state.searchTasks = state.searchTasks.concat(search_tasks.data.data);
    } else {
      state.searchTasks = search_tasks.data.data;
    }

    state.searchTasksLastPage = search_tasks.data.meta.last_page;
    state.searchTasksTotal = search_tasks.data.meta.total;

  },
  updateUserTasksParams(state, userTasksParams) {
    state.userTasksParams = userTasksParams;
  },
  updateUserAuthorizationStatus(state, { status, }) {
    state.userAuthorizationStatus = status;
  },

  updateBanners(state, banners) {
    state.userBanners = banners.data.data;
  },
}

