export const state = () => (
  {
    user : {
      settings : {},
      visibility_sections : [],
    },

    password : {
      oldPass : {
        value : null,
      },

      newPass : {
        value : null,
        isValid : false,
      },

      RepeatNewPass : {
        value : null,
        isValid : false,
      },
    },

    userTasks : [],
    userTasksParams : {},
    validation : {},
  }
);

export const getters = {
  user ( state )
  {
    return state.user;
  },

  password ( state )
  {
    return state.password;
  },

  userTasks ( state )
  {
    return state.userTasks;
  },

  userTasksParams ( state )
  {
    return state.userTasksParams;
  },

  validation ( state )
  {
    return state.validation;
  },
}

export const actions = {
  async fetchUser ( { commit } )
  {
    const response = await this.$axios.get( 'user/my' );

    console.log( 'fetchUser', response );

    commit( 'updateUserData', response?.data?.data );
  },

  async setUserData ( { commit }, payload )
  {
    commit( 'updateUserData', payload );
  },

  async setUserValidation ( { commit }, payload )
  {
    commit( 'updateUserValidation', payload );
  },

  async uploadUserData ( { state } )
  {
    return await this.$axios.put( 'user/settings', state.user );
  },

  async setPasswordStore ( { commit }, payload )
  {
    commit( 'updatePasswordStore', payload );
  },

  async changeUserPassword ( { commit }, payload )
  {
    commit(
      'updatePasswordStore',

      {
        oldPass : {
          value : null,
        },

        newPass : {
          value : null,
          isValid : false,
        },

        RepeatNewPass : {
          value : null,
          isValid : false,
        },
      },
    );

    return await this.$axios.put( 'auth/change_password', payload );
  },

  async fetchUserTasks ( { commit, state }, payload = {} )
  {
    const response = await this.$axios.get(
      'user/my/tasks',

      {
        params : {
          ...state.userTasksParams,

          mode : 'map',
        }
      }
    );

    console.log( 'fetchUserTasks', response ); // DELETE

    commit( 'updateUserTasks', response?.data?.data );
  },

  async setUserTasksParams ( { commit }, payload = {} )
  {
    commit( 'updateUserTasksParams', payload );
  },

  async resetUserWorkTimeDaysStore ( { commit, state, }, payload = {} )
  {
    commit(
      'updateUserData',

      {
        work_times : {
          ...state.user.work_times,
          two : false,
          three : false,
          individual : false,
          monday : false,
          tuesday : false,
          wednesday : false,
          thursday : false,
          friday : false,
          saturday : false,
          sunday : false,
        }
      }
    );
  },
}

export const mutations = {
  updateUserData ( state, payload )
  {
    state.user = {
      ...state.user,
      ...payload,
    };
  },

  updateUserValidation ( state, payload )
  {
    state.validation = {
      ...state.validation,
      ...payload,
    };
  },

  updatePasswordStore ( state, payload )
  {
    state.password = {
      ...state.password,
      ...payload,
    };
  },

  updateUserTasks ( state, userTasks )
  {
    state.userTasks = userTasks;
  },

  updateUserTasksParams ( state, userTasksParams )
  {
    state.userTasksParams = userTasksParams;
  },
}

