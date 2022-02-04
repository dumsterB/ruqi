<template lang="pug">

.average-rate
  .wrapper
    .header
      h3.titel {{ titles.header }}

    .body
      .rate
        .value {{ `1000 p.` }}

      .histograms
        .wrapper
          .histogram
            .value {{ '500' }}

          .histogram
            .value {{ '500' }}

</template>

<script>

  export default {

    components : {},

    data ()
    {
      return {
        titles : {
          header          : 'Благонадежность',
          appInvitations  : 'Приглашений на заявку',
          absenteeism     : 'Невыходы',
        },
      }
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

/* OBJECTS STYLES START */
  .average-rate
  {
    background      : #FFFFFF;
    border          : 1px solid #E0E0E0;
    box-sizing      : border-box;
    border-radius   : 30px;
    padding         : 24px;
    padding-bottom  : 50px;

    .wrapper
    {
      .header
      {
        margin-bottom : 11px;

        .titel
        {
          font-weight : bold;
          font-size   : 22px;
          line-height : 125%;
          color       : #263043;
        }
      }

      .body {}
    }
  }

  .rate
  {
    .value
    {
      font-style  : normal;
      font-weight : 600;
      font-size   : 40px;
      line-height : 125%;
      color       : #0082DE;
    }
  }

  .histogram
  {
    //transform     : rotate( -90deg );
    background    : #F2F4F5;
    border-radius : 40px;

    .value
    {
      font-weight : 600;
      font-size   : 16px;
      line-height : 125%;
      color       : #263043;
    }
  }
/* OBJECTS STYLES END */

</style>
