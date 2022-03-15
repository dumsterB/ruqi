export const state = () => (
  {
    documents : [],
  }
)

export const getters = {
  documents ( state )
  {
    return state.documents;
  },
}

export const actions = {
  async fetchDocuments ( { commit } )
  {
    console.debug( 'fetchDocuments' ); // DELETE

    const documents = await this.$axios.get( `user/documents` );

    commit( 'updateDocuments', documents.data.data );

    console.debug( 'Documents:' ); // DELETE
    console.debug( documents ); // DELETE
  },
}

export const mutations = {
  updateDocuments ( state, documents )
  {
    state.documents = documents;
  },
}
