export const state = () => ({
  response: {
    status: false,
    text: '',
    type: 'error'
  },
})

export const getters = {
  requestSuccess(state) {
    return state.response;
  },
}


export const actions = {

}

export const mutations = {
  setSuccess(state, { type, text }){
    state.response.status = true;
    state.response.type = type;
    state.response.text = text;
  },
  removeSuccess(state){
    state.response.status = false;
  }
}

