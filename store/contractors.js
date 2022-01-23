export const state = () => (
  {
    contractors : [],
    contractor  : {},
    filters     : {
      region          : '',
      specialization  : '',
      professions     : '',
      payments        : '',
    },
  }
)

export const mutations = {
  setContractors ( state, contractors )
  {
    state.contractors = contractors;
  },

  setContractor ( state, contractor )
  {
    state.contractor = contractor;
  },

  setFilterRegion ( state, region )
  {
    state.filters.region = region;
  },

  setFilterSpecialization ( state, specialization )
  {
    state.filters.specialization = specialization;
  },

  setFilterProfessions ( state, professions )
  {
    state.filters.professions = professions;
  },

  setFilterPayments ( state, payments )
  {
    state.filters.payments = payments;
  },
}

export const actions = {

  async getContractors ( ctx )
  {
    console.debug( 'filters' );
    console.debug( ctx.state.filters );

    const contractors = await this.$axios.get(
      '/dispatcher/contractors',

      {
        headers : {
          "Authorization" : "Bearer a1c7c07794281f1ff168e19116c2d66b011bd61437dba46655a2cf581b90eb68", //FIXME need refactoring ( Rasulov )
        },

        params  : ctx.state.filters,
      },
    );

    ctx.commit( 'setContractors', contractors.data.data );

    console.debug( 'getContractors' );
    console.debug( contractors.data.data );
  },

  async getContractor ( ctx, uuid )
  {
    const contractor = await this.$axios.get(
      `/dispatcher/contractors/${uuid}`,

      {
        headers : {
          "Authorization" : "Bearer a1c7c07794281f1ff168e19116c2d66b011bd61437dba46655a2cf581b90eb68", //FIXME need refactoring ( Rasulov )
        },
      },
    );

    ctx.commit( 'setContractor', contractor.data.data );

    console.debug( 'getContractor' ); // FIXME // TODO es muss später entfernt werden
    console.debug( contractor.data.data ); // FIXME // TODO es muss später entfernt werden
  },

  /**
   * This method resets the performer's card data.
   * 
   * @param { object } ctx default 
   */
  resetContractor ( ctx )
  {
    ctx.commit( 'setContractor', {} );
  },

  /**
   * 
   * @param { vuex }    ctx 
   * @param { object }  params
   * {
   *  @param { array }  contractors
   *  @param { string } taskId
   * }
   */
  async inviteContractorsToVacancy ( ctx, params = {} )
  {
    console.debug( 'inviteContractorsToVacancy params' ); //TODO //FIXME muss weg
    console.debug( params ); //TODO //FIXME muss weg

    if ( params.contractors && params.taskId )
    {
      if ( params.contractors.length )
      {
        return this.$axios.post(
          `/dispatcher/tasks/${params.taskId}/contractors/invite`,

          params.contractors,

          {
            headers : {
              "Authorization" : "Bearer a1c7c07794281f1ff168e19116c2d66b011bd61437dba46655a2cf581b90eb68", //FIXME need refactoring ( Rasulov )
            },
          },
        );
      }
    }
  },

  setFilterRegion ( ctx, region )
  {
    ctx.commit( 'setFilterRegion', region );
  },

  setFilterSpecialization ( ctx, specialization )
  {
    ctx.commit( 'setFilterSpecialization', specialization );
  },

  setFilterProfessions ( ctx, professions )
  {
    ctx.commit( 'setFilterProfessions', professions );
  },

  setFilterPayments ( ctx, payments )
  {
    ctx.commit( 'setFilterPayments', payments );
  },
}

export const getters = {
  contractors ( state )
  {
    return state.contractors;
  },

  contractor ( state )
  {
    return state.contractor;
  },
}