export const state = () => (
  {
    user : {
      settings : {}
    },
  }
);

export const getters = {
  user ( state )
  {
    return state.user;
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

  async uploadUserData ()
  {
    return await this.$axios.put( 'user/settings' );
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
}

