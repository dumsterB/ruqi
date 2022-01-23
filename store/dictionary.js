export const state = () => (
  {
    regions         : [],
    specializations : [],
  }
)

export const mutations = {
  setRegions ( state, regions )
  {
    state.regions = regions;
  },

  setSpecializations ( state, specializations )
  {
    state.specializations = specializations;
  },
}

export const actions = {
  async fetchRegions ( ctx )
  {
    const regions = await this.$axios.get(
      `https://cdn.ruqi.maxber.ru/api/v1/dictionary/regions`,

      {
        headers : {
          "Authorization" : "Bearer a1c7c07794281f1ff168e19116c2d66b011bd61437dba46655a2cf581b90eb68", //FIXME need refactoring ( Rasulov )
        },
      },
    );

    ctx.commit( 'setRegions', regions.data.data );

    console.debug( 'fetchRegions' ); // FIXME // TODO es muss später entfernt werden
    console.debug( regions.data.data ); // FIXME // TODO es muss später entfernt werden
  },

  async fetchSpecializations ( ctx )
  {
    const specializations = await this.$axios.get(
      `https://cdn.ruqi.maxber.ru/api/v1/dictionary/specializations`,

      {
        headers : {
          "Authorization" : "Bearer a1c7c07794281f1ff168e19116c2d66b011bd61437dba46655a2cf581b90eb68", //FIXME need refactoring ( Rasulov )
        },
      },
    );

    ctx.commit( 'setSpecializations', specializations.data.data );

    console.debug( 'fetchSpecializations' ); // FIXME // TODO es muss später entfernt werden
    console.debug( specializations.data.data ); // FIXME // TODO es muss später entfernt werden
  },
}

export const getters = {
  regions ( state )
  {
    return state.regions;
  },

  specializations ( state )
  {
    return state.specializations;
  },
}