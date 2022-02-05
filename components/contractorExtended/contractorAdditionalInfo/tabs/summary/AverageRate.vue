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
          .item
            .histogram( :style="{ height : `${ ( 750 / 1000 ) * 100 }%` }" )
              .value {{ '750' }}

          .item
            .histogram( :style="{ height : `${ ( 550 / 1000 ) * 100 }%` }" )
              .value {{ '550' }}

          .item
            .histogram( :style="{ height : `${ ( 800 / 1000 ) * 100 }%` }" )
              .value {{ '800' }}

          .item
            .histogram( :style="{ height : `${ ( 1000 / 1000 ) * 100 }%` }" )
              .value {{ '1000' }}

</template>

<script>

  export default {

    components : {},

    data ()
    {
      return {
        titles : {
          header  : 'Средняя ставка',
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

      .body {
        .histograms
        {
          height  : 150px;

          .wrapper
          {
            display         : flex;
            flex-direction  : row;
            flex-wrap       : nowrap;
            align-content   : center;
            justify-content : flex-start;
            height          : 100%;

            .item
            {
              display         : flex;
              flex-direction  : column;
              flex-wrap       : nowrap;
              align-content   : flex-start;
              justify-content : flex-end;
              margin-right    : 8px;

              &:last-child
              {
                margin-right  : 0;
              }
            }
          }
        }
      }
    }
  }

  .rate
  {
    margin-bottom : 11px;

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
    display         : flex;
    flex-direction  : column;
    flex-wrap       : nowrap;
    align-content   : center;
    justify-content : flex-end;
    align-items     : center;
    background      : #F2F4F5;
    border-radius   : 40px;
    width           : 25px;
    height          : 150px;
    padding         : 10px;

    .value
    {
      font-weight : 600;
      font-size   : 16px;
      line-height : 125%;
      color       : #263043;
      transform   : rotate( -90deg );
    }
  }
/* OBJECTS STYLES END */

</style>
