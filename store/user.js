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
  }
}

export const mutations = {
  updateUserData ( state, payload )
  {
    state.user = {
      ...state.user,
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

