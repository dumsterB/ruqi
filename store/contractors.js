export const state = () => (
  {
    contractors : [],
    contractor  : {},
    filters     : {
      region          : '',
      specialization  : '',
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
}

export const actions = {

  async getContractors ( ctx )
  {
    let filters = {
      'region'          : ctx.state.filters.region,
      'specialization'  : ctx.state.filters.specialization,
    };

    console.debug( 'filters' );
    console.debug( filters );

    const contractors = await this.$axios.get(
      'https://cdn.ruqi.maxber.ru/api/v1/dispatcher/contractors',

      {
        headers : {
          "Authorization" : "Bearer a1c7c07794281f1ff168e19116c2d66b011bd61437dba46655a2cf581b90eb68", //FIXME need refactoring ( Rasulov )
        },

        params  : filters,
      },
    );

    ctx.commit( 'setContractors', contractors.data.data );

    console.debug( 'getContractors' );
    console.debug( contractors.data.data );
  },

  async getContractor ( ctx, uuid )
  {
    const contractor = await this.$axios.get(
      `https://cdn.ruqi.maxber.ru/api/v1/dispatcher/contractors/${uuid}`,

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
          `https://cdn.ruqi.maxber.ru/api/v1/dispatcher/tasks/${params.taskId}/contractors/invite`,

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