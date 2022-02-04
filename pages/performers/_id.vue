<template>
  <div class="contractor-extended">
    <div class="wrapper">
      <div class="content">
        <ContractorMainInfo />
        <ContractorAdditionalInfo />
      </div>
    </div>
  </div>
</template>

<script>

  import { mapState, mapActions, mapGetters, mapMutations } from 'vuex';

  export default {
    name : 'contractor-extended',

    components  : {},

    computed : {
      ...mapGetters( 'contractors', [ 'contractor', ] ),
    },

    data ()
    {
      return {}
    },

    methods : {
      ...mapActions( 'contractors', [ 'getContractor', ] ),

      init ()
      {
        this.getContractor( this.$route.params.id );
      },

      handlers ()
      {
        return {}
      },
    },

    mounted ()
    {
      this.init();
    },
  }

</script>


<style lang="scss" scoped>

/* OBJECTS STYLES START */
  .contractor-extended
  {
    .wrapper
    {
      .content
      {
        display         : flex;
        flex-direction  : row;
        flex-wrap       : nowrap;
        align-content   : center;
        justify-content : flex-start;
      }
    }
  }
/* OBJECTS STYLES END */

/* MIXINS STYLES START */
/* OBJECTS STYLES END */

</style>
