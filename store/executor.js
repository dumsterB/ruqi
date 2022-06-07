export const state = () => ({
  executors: [],
  specializations:[],

})
export const getters = {
    specializations(state){
        return state.specializations
    }
}
export const actions = {
    async createExecutor({ commit }, params) {
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
    async createPassword({ commit }, params){
        await this.$axios.post('',{password:params})
            .then((response) => {
                commit('response/setSuccess', {type: 'success', text: 'Исполнитель успешно создан', }, {root: true});
                setTimeout(function() {
                    commit('response/removeSuccess', null, { root: true });
                }, 2000);
                return (response && response.data) || {};
            })
            .catch((error) => {
                commit('response/setSuccess', {type: 'error', text: 'Заполните поля', }, {root: true});
                setTimeout(function() {
                    commit('response/removeSuccess', null, { root: true });
                }, 3000);
                console.log(error);
                return error
            });
    },
    async loadSpecializations({ commit }){
        await this.$axios.get('dictionary/specializations')
            .then((response) => {
                commit('setSpecializations',response)
                commit('response/setSuccess', {type: 'success', text: 'Исполнитель успешно создан', }, {root: true});
                setTimeout(function() {
                    commit('response/removeSuccess', null, { root: true });
                }, 2000);
                return (response && response.data) || {};
            })
            .catch((error) => {
                commit('response/setSuccess', {type: 'error', text: 'Заполните поля', }, {root: true});
                setTimeout(function() {
                    commit('response/removeSuccess', null, { root: true });
                }, 3000);
                console.log(error);
                return error
            });
    },
}
export const mutations = {
    setSpecializations(state,payload){
       state.specializations = payload.data.data
    }
}