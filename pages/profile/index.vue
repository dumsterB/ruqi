<template lang="pug">

.konto-seite
  .header
    Header( :content="header.title" :size="header.title_size" :isnew="false" :isback="true" )

  .body
    .wrapper
      .tabs-wrapper
        v-tabs.konto-edit__tabs
          v-tab(
            v-for="( tab, index ) in tabs.titles" :key="index"
            v-model="tabs.active_tab"
            align-with-title
            @click="handlers().onTabClicked( { index } )"
          ) {{ tab }}

        v-tabs-items( v-model="tabs.active_tab" )
          v-tab-item
            General
          v-tab-item
            PaymentDetails
          v-tab-item
            Professions
          v-tab-item
            OperatingSchedule
          v-tab-item
            Documents
          v-tab-item
            Notifications
          v-tab-item
            Password

      .actions-block
        backOrConfirmEdit.back-or-confirmEdit__block(
          @onBackClick="handlers().onBackClick()"
          @onConfirmClick="handlers().onConfirmClick()"
        )

</template>

<script>

  import { mapActions, mapGetters, } from 'vuex';
  import General            from "@/components/profileTabs/general";
  import PaymentDetails     from "@/components/profileTabs/paymentDetails";
  import Professions        from "@/components/profileTabs/professions";
  import OperatingSchedule  from "@/components/profileTabs/operatingSchedule";
  import Documents          from "@/components/profileTabs/documents";
  import Notifications      from "@/components/profileTabs/notifications";
  import Password           from "@/components/profileTabs/password";
  import backOrConfirmEdit  from '@/components/UI/backOrConfirmEdit';

  export default {

    components : {
      General,
      PaymentDetails,
      Professions,
      OperatingSchedule,
      Documents,
      Notifications,
      Password,
      backOrConfirmEdit,
    },

    data ()
    {
      return {
        header : {
          title_size  : 'large',
          title       : 'Редактировать профиль',
        },

        tabs : {
          titles : [
            'Общее',
            'Платежные данные',
            'Профессии',
            'График работ',
            'Документы',
            'Уведомления',
            'Пароль',
          ],

          active_tab  : 0,
        },
      }
    },

    methods : {
      ...mapActions( 'user', [ 'uploadUserData', ] ),

      getters ()
      {
        return {}
      },

      setters ()
      {
        return {

          /**
           *
           * @param { object } payload
           * {
           *    @param { int } tab : 2,
           * }
           */
          setActiveTab : ( payload = {} ) => {
            this.tabs.active_tab = payload.tab;
          },
        }
      },

      handlers ()
      {
        return {

          /**
           *
           * @param { object } payload
           * {
           *    @param { int } index : 2,
           * }
           */
          onTabClicked : ( payload = {} ) => {
            console.log( payload );
            this.setters().setActiveTab( { tab : payload.index } );
          },

          onBackClick : () => {
            console.log( 'onBackClick', this.tabs.active_tab );
          },

          onConfirmClick : () => {
            console.log( 'onConfirmClick', this.tabs.active_tab );

            this.uploadUserData();
          },
        }
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

<style lang="scss">

.konto-seite
{
  /* OBJECTS STYLES START */
    .header {}

    .body
    {
      .wrapper
      {
        .tabs-wrapper
        {
          width: 800px;
          max-width: 800px;

          .konto-edit__tabs
          {
            max-width: 750px;
            margin-bottom: 48px;
          }
        }
      }
    }

    .back-or-confirmEdit__block
    {
      padding-left: 15px;
    }

    .actions-block
    {
      margin-top: 32px;
    }
  /* OBJECTS STYLES END */

  /* MIXINS STYLES START */
    .v-tab
    {
      font-style: normal;
      font-weight: 600;
      font-size: 16px;
      line-height: 22px;
      text-transform: none;

      &.v-tab--active
      {
        color: #0082DE;
      }
    }
  /* MIXINS STYLES END */
}

</style>
