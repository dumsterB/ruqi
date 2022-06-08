export const state = () => ({
  executors: [],
  specializations:[],
  document:'',

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
            email:params.email,
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
        console.log(params)
        await this.$axios.put('auth/password',{password:params})
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
    async setSpecializations({ commit },params){
        console.log(params)
        await this.$axios.put('user/settings',{ professions:{ ...params } })
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
    async createDocument({ commit }, params){
        await this.$axios.post('user/documents', params)
            .then((response) => {
                console.log(response.data)
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
    async setPassport({commit}, params){
        await this.$axios.post(`user/documents/${params.uuid}`,)
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
    async setPayment({commit}, params){
        await this.$axios.put(`user/settings`,
            {
                settings:{
                  inn: params.inn,
                  bik: params.bik,
                  bank: params.bank,
                  type_payment: params.type_payment,
                  payment_fullname: params.payment_fullname,
                  payment_account: params.payment_account,
                  location_address: 'fewfew'
                }
             }
            )
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
   async setAddress({ commit }, params){
        await this.$axios.put(`user/settings`, { addresses:[...params]})
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
    }

}
export const mutations = {
    setSpecializations(state,payload){
       state.specializations = payload.data.data
    },
    setDocument(state,payload){
        state.document = payload
    }
}