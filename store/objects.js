export const state = () => ({
  objects: []
})

export const getters = {
  objects: s => s.objects
}


export const actions = {
  async fetch({commit}) {

    const objects = await this.$axios.get('https://cdn.ruqi.maxber.ru/api/v1/dictionary/objects', {
      headers: {
        "Authorization": "Bearer a1c7c07794281f1ff168e19116c2d66b011bd61437dba46655a2cf581b90eb68"
      }
    });
    commit('setObjects', objects)

  }
}

export const mutations = {
  setObjects(state, objects) {
    state.objects = objects.data.data;
    /*state.objects.unshift({
      "uuid": "0000",
      "name": "Все"
    });*/
  }
}

