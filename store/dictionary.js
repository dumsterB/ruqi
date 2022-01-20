export const state = () => ({
  clients: [],
  organizations: [],
  objectType: [],
  dispatchers: [],
  managers: [],
  regions: [],
})

export const getters = {
  clients(state) {
    return state.clients;
  },
  organizations(state) {
    return state.organizations;
  },
  objectType(state) {
    return state.objectType;
  },
  dispatchers(state) {
    return state.dispatchers;
  },
  managers(state) {
    return state.managers;
  },
  regions(state) {
    return state.regions;
  },
}

export const actions = {
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
  async fetchRegions({commit}) {

    const regions = await this.$axios.get('/dictionary/regions', {
      headers: {
        "Authorization": "Bearer eb5e61886e9a766273b4ea87ad67844c5e5ee22a8e22bffce0225151dfc5eaf3"
      }
    });
    commit('setRegions', regions)
  },
}

export const mutations = {
  setClients(state, clients) {
    state.clients = clients.data.data;
  },
  setOrganizations(state, organizations) {
    state.organizations = organizations.data.data;
  },
  setObjectType(state, objectType) {
    state.objectType = objectType.data.data;
  },
  setDispatchers(state, dispatchers) {
    state.dispatchers = dispatchers.data.data;
  },
  setManagers(state, managers) {
    state.managers = managers.data.data;
  },
  setRegions(state, regions) {
    state.regions = regions.data.data;
  },
}

