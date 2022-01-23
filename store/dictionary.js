export const state = () => (
  {
    regions         : [],
    specializations : [],
    clients         : [],
    organizations   : [],
    objectType      : [],
    dispatchers     : [],
    managers        : [],
  }
)

export const mutations = {
  setRegions ( state, regions )
  {
    state.regions = regions;
  },

  setSpecializations ( state, specializations )
  {
    state.specializations = specializations;
  },

  setClients( state, clients )
  {
    state.clients = clients.data.data;
  },

  setOrganizations( state, organizations )
  {
    state.organizations = organizations.data.data;
  },

  setObjectType( state, objectType )
  {
    state.objectType = objectType.data.data;
  },

  setDispatchers( state, dispatchers )
  {
    state.dispatchers = dispatchers.data.data;
  },

  setManagers( state, managers )
  {
    state.managers = managers.data.data;
  },
}


export const actions = {
  async fetchRegions ( ctx )
  {
    const regions = await this.$axios.get(
      `https://cdn.ruqi.maxber.ru/api/v1/dictionary/regions`,

      {
        headers : {
          "Authorization" : "Bearer a1c7c07794281f1ff168e19116c2d66b011bd61437dba46655a2cf581b90eb68", //FIXME need refactoring ( Rasulov )
        },
      },
    );

    ctx.commit( 'setRegions', regions.data.data );

    console.debug( 'fetchRegions' ); // FIXME // TODO es muss später entfernt werden
    console.debug( regions.data.data ); // FIXME // TODO es muss später entfernt werden
  },

  async fetchSpecializations ( ctx )
  {
    const specializations = await this.$axios.get(
      `https://cdn.ruqi.maxber.ru/api/v1/dictionary/specializations`,

      {
        headers : {
          "Authorization" : "Bearer a1c7c07794281f1ff168e19116c2d66b011bd61437dba46655a2cf581b90eb68", //FIXME need refactoring ( Rasulov )
        },
      },
    );

    ctx.commit( 'setSpecializations', specializations.data.data );

    console.debug( 'fetchSpecializations' ); // FIXME // TODO es muss später entfernt werden
    console.debug( specializations.data.data ); // FIXME // TODO es muss später entfernt werden
  },

  async fetchClients({commit}) {

    const clients = await this.$axios.get('/dictionary/accounts', {
      headers: {
        "Authorization": "Bearer eb5e61886e9a766273b4ea87ad67844c5e5ee22a8e22bffce0225151dfc5eaf3"
      }
    });
    commit('setClients', clients)
  },

  async fetchOrganizations({commit}) {

    const organizations = await this.$axios.get('/dictionary/organizations', {
      headers: {
        "Authorization": "Bearer eb5e61886e9a766273b4ea87ad67844c5e5ee22a8e22bffce0225151dfc5eaf3"
      }
    });
    commit('setOrganizations', organizations)
  },

  async fetchObjectType({commit}) {

    const objectType = await this.$axios.get('/dictionary/object-type', {
      headers: {
        "Authorization": "Bearer eb5e61886e9a766273b4ea87ad67844c5e5ee22a8e22bffce0225151dfc5eaf3"
      }
    });
    commit('setObjectType', objectType)
  },

  async fetchDispatchers({commit}) {

    const dispatchers = await this.$axios.get('/dictionary/dispatchers', {
      headers: {
        "Authorization": "Bearer eb5e61886e9a766273b4ea87ad67844c5e5ee22a8e22bffce0225151dfc5eaf3"
      }
    });
    commit('setDispatchers', dispatchers)
  },

  async fetchManagers({commit}) {

    const managers = await this.$axios.get('/dictionary/managers', {
      headers: {
        "Authorization": "Bearer eb5e61886e9a766273b4ea87ad67844c5e5ee22a8e22bffce0225151dfc5eaf3"
      }
    });
    commit('setManagers', managers)
  },
}

export const getters = {
  regions ( state )
  {
    return state.regions;
  },

  specializations ( state )
  {
    return state.specializations;
  },

  clients( state )
  {
    return state.clients;
  },

  organizations( state )
  {
    return state.organizations;
  },

  objectType( state )
  {
    return state.objectType;
  },

  dispatchers( state )
  {
    return state.dispatchers;
  },

  managers( state )
  {
    return state.managers;
  },
}