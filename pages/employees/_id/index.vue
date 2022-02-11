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
    ...mapActions( 'employee_id', [ 'fetchEmployee' ] ),
    ...mapActions( 'employee_id', [ 'fetchEmployeeTasks' ] ),
    ...mapActions( 'employee_id', [ 'fetchEmployeeSupport' ] ),

    init ()
    {
      this.fetchEmployee( this.$route.params.id );
      this.fetchEmployeeTasks( this.$route.params.id );
      this.fetchEmployeeSupport( this.$route.params.id );
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
