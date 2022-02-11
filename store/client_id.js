export const state = () => ({
  client_id: [],
  documents: []
})

export const getters = {
  client_id(state) {
    return state.client_id;
  },
  documents(state) {
    return state.documents;
  },
}

export const actions = {
  async fetchClientId({commit}, requestId) {
    const client_id = await this.$axios.get('/super_manager/accounts/' + requestId, {
      headers: {
        "Authorization": "Bearer af2cf5b991716c8fe1d0c6bf9c7a03f6fa088887dd10921d605dad809e2df125"
      }
    });
    commit('setRequest', client_id);
  },

  async getDocs({commit}, requestId) {
    const documents = await this.$axios.get('/super_manager/accounts/' + requestId + '/documents', {
      headers: {
        "Authorization": "Bearer af2cf5b991716c8fe1d0c6bf9c7a03f6fa088887dd10921d605dad809e2df125"
      }
    });
    commit('setDocs', documents);
  },

  async createDoc({commit, dispatch}, {clientId, docName, docFiles}) {
    console.log(docFiles);
    await this.$axios.post('/super_manager/accounts/' + clientId + '/documents/',
      '',
      {
        headers: {
          "Authorization": "Bearer af2cf5b991716c8fe1d0c6bf9c7a03f6fa088887dd10921d605dad809e2df125",
          'Content-Type': 'application/json',
        },
        params: {"document": docName}

      })
      .then((response) => {
        console.log(response, docFiles);
        for (let i = 0; i < docFiles.length; i++) {
          if ( docFiles[i].value){
            dispatch('loadPhoto',  {clientId: clientId, uuid: response.data.data.uuid, docFile: docFiles[i].value});
          }
        }

      })
      .catch((error) => {
        console.log(error);
      });
  },


  async changeDoc({commit, dispatch}, {clientId, docId, docName, docFiles}) {
    console.log(docFiles);
    await this.$axios.put('super_manager/accounts/'+clientId+'/documents/'+docId,
      '',
      {
        headers: {
          "Authorization": "Bearer af2cf5b991716c8fe1d0c6bf9c7a03f6fa088887dd10921d605dad809e2df125",
          'Content-Type': 'application/json',
        },
        params: {"document": docName}

      })
      .then((response) => {
        console.log(response);
        console.log(docFiles);
        for (let i = 0; i < docFiles.length; i++) {
          if(docFiles[i].exist == 'new' && docFiles[i].value){
            dispatch('loadPhoto',  {clientId: clientId, uuid: response.data.data.uuid, docFile: docFiles[i].value});
          }
        }
      })
      .catch((error) => {
        console.log(error);
      });
  },


  async loadPhoto({commit, dispatch}, {clientId, uuid, docFile}) {
    let self = this;
    let formData = new FormData();
    formData.append("file", docFile);

    await this.$axios.put('super_manager/accounts/' + clientId + '/documents/' + uuid + '/uploadImage',
      formData,
      {
        headers: {
          "Authorization": "Bearer af2cf5b991716c8fe1d0c6bf9c7a03f6fa088887dd10921d605dad809e2df125",
          'Content-Type': 'multipart/form-data',
        },
      })
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });
  },


  async removeDoc({commit, dispatch}, {clientId, docId}) {

    await this.$axios.delete('super_manager/accounts/'+clientId+'/documents/'+docId, {
      headers: {
        "Authorization": "Bearer af2cf5b991716c8fe1d0c6bf9c7a03f6fa088887dd10921d605dad809e2df125",
      },
    })
      .then((response) => {
        console.log(response);

      })
      .catch((error) => {
        console.log(error);
      });

  },


  async removePhoto({commit, dispatch}, {clientId, docId, imageId}) {

    await this.$axios.delete('super_manager/accounts/'+clientId+'/documents/'+docId+'/image/'+imageId, {
      headers: {
        "Authorization": "Bearer af2cf5b991716c8fe1d0c6bf9c7a03f6fa088887dd10921d605dad809e2df125",
      },
    })
      .then((response) => {
        console.log(response);

      })
      .catch((error) => {
        console.log(error);
      });

  },

}

export const mutations = {
  setRequest(state, client_id) {
    state.client_id = client_id.data.data;
  },
  setDocs(state, documents) {
    state.documents = documents.data.data;
  },
}

