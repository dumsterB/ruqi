<template lang="pug">

.notifications__tab
  .notifications__wrapper
    .notifications__header
      .notifications__haupt-titel {{ hauptTitel }}
    .notifications__body
      .notifications__wrapper__body
        Switcher.mix-switcher__mb(
          v-for="event in events" :key="event.uuid"
          :id="event.uuid"
          :stay="event.status"
          :label="event.label"
        )

</template>

<script>

  import Switcher from '@/components/UI/switcher';

  export default {

    components : {
      Switcher,
    },

    data ()
    {
      return {
        hauptTitel : 'Уведомлять о событиях',
        switch1: true,
        switch2: false,

        events : [
          { uuid : '1', status : true, label : "Доступна новая заявка на объекте", },
          { uuid : '2', status : true, label : "Появился новый объект в моем месте", },
          { uuid : '3', status : false, label : "Заканчивается время набора на заявку", },
          { uuid : '4', status : true, label : "Доступна новая заявка на объекте", },
          { uuid : '5', status : false, label : "Появился новый объект в моем месте", },
          { uuid : '6', status : false, label : "Заканчивается время набора на заявку", },
        ],

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

      changePlanStatus ( event )
      {
        let uuid = event.target.getAttribute( 'data-uuid' );

        console.log( 'Der Status vom Schalter ist geändert: ' + uuid );
      },
    }

  }

</script>

<style lang="scss" scoped>

.notifications__tab
{
  /* OBJECTS STYLES START */
    .notifications__wrapper
    {
      padding : 32px;
      background: #F6FBFF;
      border: 1px solid #E2E4E5;
      box-sizing: border-box;
      border-radius: 30px;

      .notifications__header {
        margin-bottom: 24px;
      }

      .notifications__body
      {
        .notifications__wrapper__body
        {
          width: 533px;
        }
      }
    }

    .notifications__haupt-titel
    {
      font-style: normal;
      font-weight: 600;
      font-size: 20px;
      line-height: 28px;
      color: #263043;
    }
  /* OBJECTS STYLES END */

  /* MIXINS STYLES START */
    .mix-switcher__mb
    {
      margin-bottom: 24px;

      &:last-child{
        margin-bottom: 0px;
      }
    }
  /* MIXINS STYLES END */
}

</style>
