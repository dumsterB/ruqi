<template lang="pug">

.summary
  .wrapper
    .work-schedule-wrapper
      WorkSchedule

    .trustworthiness-average_rate-wrapper
      Trustworthiness
      AverageRate

    .favorite-objects-wrapper
      FavoriteObjects

</template>

<script>

  import WorkSchedule     from './WorkSchedule.vue';
  import Trustworthiness  from './Trustworthiness.vue';
  import AverageRate      from './AverageRate.vue';
  import FavoriteObjects  from './FavoriteObjects.vue';

  export default {

    components : {
      WorkSchedule,
      Trustworthiness,
      AverageRate,
      FavoriteObjects,
    },

    data ()
    {
      return {}
    },

    methods : {
      getters ()
      {
        return {}
      },

      setters ()
      {
        return {}
      },

      handlers ()
      {
        return {}
      },

      helpers ()
      {
        return {}
      },

      init (){},

      bindActions (){},
    }

  }

</script>

<style lang="scss" scoped>

.summary
{
  .wrapper
  {
    .work-schedule-wrapper
    {}

    .trustworthiness-average_rate-wrapper
    {
      display         : flex;
      flex-direction  : row;
      flex-wrap       : nowrap;
      align-content   : center;
      justify-content : flex-start;
    }

    .favorite-objects-wrapper
    {}
  }
}

</style>
