<template lang="pug">

.contractor-additional-info
    v-tabs.additional-info__tabs
      v-tab( v-for="( tab, index ) in tabs" :key="index" v-model="active_tab" align-with-title @click="active_tab = index" ) {{ tab }}

    v-tabs-items( v-model="active_tab" )
      v-tab-item
        Summary

      v-tab-item
        Applications( :user_type="user_type" )

      v-tab-item
        Inquiries

      v-tab-item
        Documentation

      v-tab-item
        Activity

</template>

<script>

  import { CONTRACTOR, EMPLOYEE } from '@/constants/'
  import Summary                  from './tabs/summary/Summary.vue';
  import Applications             from './tabs/applications/Applications.vue';
  import Inquiries                from './tabs/inquiries/Inquiries.vue';
  import Documentation            from './tabs/documentation/Documentation.vue';
  import Activity                 from './tabs/activity/Activity.vue';

  export default {
    components : {
      Summary,
      Applications,
      Inquiries,
      Documentation,
      Activity,
    },


    data ()
    {
      return {
        active_tab  : 0,

        tabs  : [
          'Сводка', 'Заявки', 'Обращения', 'Документы', 'Активность',
        ],

        user_type : CONTRACTOR,
      }
    },
  }
</script>

<style lang="scss" scoped>

  /* OBJECTS STYLES START */
    .contractor-additional-info
    {
      width   : 100%;
      padding : 13px 24px 32px 24px;
    }

    .v-window-item
    {
      background-color  : #EEF9FE;
    }

    .v-tab
    {
      font-style  : normal;
      font-weight : 600;
      font-size   : 16px;
      line-height : 22px;
    }
  /* OBJECTS STYLES END */

  /* MIXINS STYLES START */
    .additional-info__tabs
    {
      margin-bottom : 32px;
    }
  /* MIXINS STYLES END */

</style>
