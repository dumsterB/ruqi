<template>
  <div class="contractor-extended">
    <div class="wrapper">
      <div class="content">
        <UserMainInfo :user_type="user_type" />
        <UserAdditionalInfo :user_type="user_type"/>
      </div>
    </div>
  </div>
</template>

<script>

  import { mapState, mapActions, mapGetters, mapMutations } from 'vuex';
  import { CONTRACTOR }                                     from '@/constants/';

  export default {
    name : 'contractor-extended',

    components  : {},

    computed : {
      ...mapGetters( 'contractors', [ 'contractor', ] ),
    },

    data ()
    {
      return {
        user_type : CONTRACTOR,
      }
    },

    methods : {
      ...mapActions( 'contractors', [ 'getContractor', 'getContractorTasks' ] ),
      ...mapActions( 'contractorDocs', [ 'getDocuments', ] ),

      init ()
      {
        this.getContractor( this.$route.params.id );
        this.getContractorTasks( this.$route.params.id );
        this.getDocuments( this.$route.params.id );
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
