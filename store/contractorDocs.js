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
  async getDocuments ( ctx, uuid )
  {
    console.log( 'getDocuments' );
    console.log( uuid );

    const documents = await this.$axios.get( `/dispatcher/contractors/${ uuid }/docs` );

    ctx.commit( 'updateDocuments', documents.data.data );

    console.debug( 'Documents:' ); // FIXME // TODO es muss später entfernt werden
    console.debug( documents ); // FIXME // TODO es muss später entfernt werden
  },
}

export const mutations = {
  updateDocuments ( state, documents )
  {
    state.documents = documents;
  },
}
