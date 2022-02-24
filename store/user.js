export const state = () => (
  {
    user : {},
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
  {},

  async uploadUserData ()
  {
    const response = await this.$axios.put( 'user/settings' );

    console.log( 'fetchUser', response );
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

