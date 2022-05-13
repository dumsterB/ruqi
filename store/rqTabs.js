export const state = () => ({
  rqTabsTasksNode: [{
    name: "Все заявки",
    routeName: "tasks",
    params: {},
    isNode: true,
  }],
  rqTabsTasksPinned: [
    {
      name: "Тестовая компонент копия копия",
      routeName: "tasks-id",
      params: {
        id: "9351d2ac-06d4-4c82-9897-26ee83b5980f"
      },
      isPinned: true,
      isActive: false,
    },
    {
      name: "Тестовая компонент копия копия 2",
      routeName: "tasks-id",
      params: {
        id: "08266bd3-b4d1-4b25-b89b-17f474906d3c"
      },
      isPinned: true,
      isActive: false,
    },
  ],
  rqTabsTasksNew: [],
});
export const getters = {
  RQ_TABS_TASKS(state) {
    return [
      ...state.rqTabsTasksNode,
      ...state.rqTabsTasksPinned,
      ...state.rqTabsTasksNew,
    ];
  }
};
export const actions = {
  addRqTabsTaskNew({ commit, state }, { route }) {
    console.debug('addRqTabsTaskNew', route); // DELETE

    if (
      !state.rqTabsTasksPinned.filter(tabPinned => tabPinned.params.id === route.params.id).length
    ) {
      commit('updateRqTabsTasksNew', {
        name: route.meta.title,
        routeName: route.name,
        params: route.params,
        isPinned: false,
        isActive: false,
      });
    }
  },
  deleteRqTabsTaskNew({ commit }, payload) {
    console.debug('addRqTabsTaskNew', payload); // DELETE
  },
  addRqTabsTaskPinned({ commit }, payload) {
    console.debug('addRqTabsTaskPinned', payload); // DELETE
  },
  deleteRqTabsTaskPinned({ commit }, payload) {
    console.debug('deleteRqTabsTaskPinned', payload); // DELETE
  },
};
export const mutations = {
  updateRqTabsTasksNew(state, rqTabsTasksNew) {
    console.debug('updateRqTabsTasksNew', rqTabsTasksNew); // DELETE

    state.rqTabsTasksNew = [rqTabsTasksNew];
  },
};

