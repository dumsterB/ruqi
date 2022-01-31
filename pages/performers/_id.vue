<template>
  <div class="contractor-extended">
    <h1>Исполнитель {{ contractor.fullname }}</h1>
  </div>
</template>

<script>

  import { mapState, mapActions, mapGetters, mapMutations } from 'vuex';

  export default {
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


<style lang="scss">

/* OBJECTS STYLES START */
/* OBJECTS STYLES END */

/* MIXINS STYLES START */
  .ruqi, #app {
    background-color  : #F2FAFF;
  }
/* OBJECTS STYLES END */

</style>
