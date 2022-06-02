export const state = () => ({
  executors: ['executorsssss']
})
export const getters = {
    executors(state) {
        return state.executors;
    },
}
export const actions = {
    async createExecutor({ commit }, params) {
        console.log(params,'data form private') // delete
        await this.$axios.post('auth/signup', {
            lastname: params.name,
            firstname: params.surname,
            middlename: params.middle_name,
            phone: params.phone,
            birthday: params.birth_date,
            gender:params.sex,
            type: "contractor"
        })
         .then((response) => {
            commit('setExecutors', response.data.data)
            commit('response/setSuccess', {type: 'success', text: 'Исполнитель успешно создан', }, {root: true});
            setTimeout(function() {
                commit('response/removeSuccess', null, { root: true });
            }, 2000);
        })
            .catch((error) => {
                commit('response/setSuccess', {type: 'error', text: 'Заполните поля', }, {root: true});
                setTimeout(function() {
                    commit('response/removeSuccess', null, { root: true });
                }, 3000);
                console.log(error);
            });
    },
    async confirmPassword({ commit }, params){
    await this.$axios.put('auth/confirm',params)
        .then((response) => {
            commit('response/setSuccess', {type: 'success', text: 'Исполнитель успешно создан', }, {root: true});
            setTimeout(function() {
                commit('response/removeSuccess', null, { root: true });
            }, 2000);
        })
        .catch((error) => {
            commit('response/setSuccess', {type: 'error', text: 'Заполните поля', }, {root: true});
            setTimeout(function() {
                commit('response/removeSuccess', null, { root: true });
            }, 3000);
            console.log(error);
        });
    },

}
export const mutations = {
    setExecutors(state, payload) {
        state.executors = payload.data.data;
    },
}