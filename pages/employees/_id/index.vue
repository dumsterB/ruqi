<template>
  <div class="contractor-extended">
    <div class="wrapper">
      <div class="content">
        {{employee_id}}
        <UserMainInfo :user_type="user_type" />
        <UserAdditionalInfo />
      </div>
    </div>
  </div>
</template>

<script>

import { mapState, mapActions, mapGetters, mapMutations } from 'vuex';
import { EMPLOYEE }                                     from '@/constants/'

export default {
  name : 'employee-extended',

  components  : {},

  computed : {
    ...mapGetters( 'employee_id', [ 'employee_id', ] ),
  },

  data ()
  {
    return {
      user_type : EMPLOYEE,
    }
  },

  methods : {
    ...mapActions( 'employee_id', [ 'fetchEmployees' ] ),

    init ()
    {
      this.fetchEmployees( this.$route.params.id );
      //this.getContractorTasks( this.$route.params.id );
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
