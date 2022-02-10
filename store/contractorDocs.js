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
    const contractor = await this.$axios.get( `/dispatcher/contractors/${uuid}/docs` );

    ctx.commit( 'updateDocuments', contractor.data.data );

    console.debug( 'getDocuments' ); // FIXME // TODO es muss später entfernt werden
    console.debug( contractor.data.data ); // FIXME // TODO es muss später entfernt werden
  },
}

export const mutations = {
  updateDocuments ( state, documents )
  {
    state.documents = documents;
  },
}
