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
        console.log(params,'data form private')
        const executor = await this.$axios.post('auth/signup', {
            lastname: params.name,
            firstname: params.surname,
            middlename: params.middlename,
            phone: params.phone,
            birthday: params.birthday,
            type: "contractor"
        })
         .then((response) => {
            commit('setExecutors', response.data.data)
            commit('response/setSuccess', {type: 'success', text: 'Исполнитель успешно создан', }, {root: true});
            setTimeout(function() {
                commit('response/removeSuccess', null, { root: true });
            }, 2000);
        /*    setTimeout(function() {
                self.$router.push('/employees/');
            }, 3000);*/

        })
            .catch((error) => {
                commit('response/setSuccess', {type: 'error', text: 'Заполните поля', }, {root: true});
                setTimeout(function() {
                    commit('response/removeSuccess', null, { root: true });
                }, 3000);
                console.log(error);
            });
    },
    async confirmPassword(){

    },

}
export const mutations = {
    setExecutors(state, payload) {
        state.executors = payload.data.data;
    },
}