export const state = () => ({
    recover_sms_email: '',
});
export const getters = {
    recover_sms_email(state){
        return state.recover_sms_email
    }
};
export const actions = {
    async signIn({ commit }, params) {
        await this.$axios
            .post("auth/login", {
                phone_or_email: params.phone_or_email,
                password: params.password,
            })
            .then((response) => {
                commit(
                    "response/setSuccess",
                    { type: "success", text: "Супер манаджер успешно зашел" },
                    { root: true }
                );
                setTimeout(function () {
                    commit("response/removeSuccess", null, { root: true });
                }, 2000);
            })
            .catch((error) => {
                commit(
                    "response/setSuccess",
                    { type: "error", text: "Заполните поля" },
                    { root: true }
                );
                setTimeout(function () {
                    commit("response/removeSuccess", null, { root: true });
                }, 3000);
                console.log(error);
            });
    },
    async recoverEmail({ commit }, params) {
        await this.$axios
            .put("auth/forgot", {
                email: params,
                type: "super-manager",
            })
            .then((response) => {
                commit('SET_EMAIL_RECOVER',params)
                commit(
                    "response/setSuccess",
                    { type: "success", text: "Исполнитель успешно создан" },
                    { root: true }
                );
                setTimeout(function () {
                    commit("response/removeSuccess", null, { root: true });
                }, 2000);
            })
            .catch((error) => {
                commit(
                    "response/setSuccess",
                    { type: "error", text: "Заполните поля" },
                    { root: true }
                );
                setTimeout(function () {
                    commit("response/removeSuccess", null, { root: true });
                }, 3000);
                console.log(error);
            });
    },
    async codeRepeat({commit, state},params){
        await this.$axios.put('/auth/signup/code-repeat',{email: params})
            .then((response) => {
                commit(
                    "response/setSuccess",
                    { type: "success", text: "Исполнитель успешно создан" },
                    { root: true }
                );
                setTimeout(function () {
                    commit("response/removeSuccess", null, { root: true });
                }, 2000);
            })
            .catch((error) => {
                commit(
                    "response/setSuccess",
                    { type: "error", text: "Заполните поля" },
                    { root: true }
                );
                setTimeout(function () {
                    commit("response/removeSuccess", null, { root: true });
                }, 3000);
                console.log(error);
            });
    },
    async confirmPassword({ commit, state }, params) {
        await this.$axios
            .put("auth/confirm", {
                email: state.recover_sms_email,
                code_confirm: params,
            })
            .then((response) => {
                commit(
                    "response/setSuccess",
                    { type: "success", text: "Исполнитель успешно создан" },
                    { root: true }
                );
                setTimeout(function () {
                    commit("response/removeSuccess", null, { root: true });
                }, 2000);
            })
            .catch((error) => {
                commit(
                    "response/setSuccess",
                    { type: "error", text: "Заполните поля" },
                    { root: true }
                );
                setTimeout(function () {
                    commit("response/removeSuccess", null, { root: true });
                }, 3000);
                console.log(error);
            });
    },
    async createPassword({ commit }, params) {
        await this.$axios
            .put("auth/password", params)
            .then((response) => {
                commit(
                    "response/setSuccess",
                    { type: "success", text: "Пароль успешно создан" },
                    { root: true }
                );
                setTimeout(function () {
                    commit("response/removeSuccess", null, { root: true });
                }, 2000);
                return (response && response.data) || {};
            })
            .catch((error) => {
                commit(
                    "response/setSuccess",
                    { type: "error", text: "Заполните поля" },
                    { root: true }
                );
                setTimeout(function () {
                    commit("response/removeSuccess", null, { root: true });
                }, 3000);
                console.log(error);
                return error;
            });
    },
}
export const mutations = {
    SET_EMAIL_RECOVER(state,payload){
        state.recover_sms_email = payload
    }
}
