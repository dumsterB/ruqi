<template lang="pug">

.applications
  .table-display-settings

  .table-applications
    .table-list-style
      v-data-table(
        :headers="headers"
        :items="tasks"
        class="applications-table"
        item-key="uuid"
        :item-class="rowClass"
        show-select
        hide-default-footer
        hide-default-header
      )
        template( v-slot:item.name="{ item }" )
          div
            span.request-i
            span( class="color-black" ) {{ item.name }}

        template( v-slot:item.rating="{ item }" )
          span( class="request-pay" ) {{ item.payment.value }}

        template( v-slot:item.tasks="{ item }" ) {{ item.object.name }}

        template( v-slot:item.address="{ item }" ) {{ 'qwer' }}

        template( v-slot:item.actions="{ item }" )
          div( class="d-flex justify-end" )
            v-menu( bottom rounded="10" offset-y nudge-bottom="10" )
              template( v-slot:activator="{ on }" )
                v-btn.icon( v-on="on" class="mix-edit-btn" )
                  v-icon mdi-dots-vertical

              v-card
                v-list-item-content( class="justify-start" )
                  div( class="mx-auto text-left" )
                    nuxt-link( :to="'/request/'+ item.uuid +'/edit/'" )
                      span Редактировать

</template>

<script>

  import { mapState, mapActions, mapGetters, mapMutations } from 'vuex';
  import { CONTRACTOR, EMPLOYEE }                           from '@/constants/'

  export default {

    components : {},

    props : {
      user_type : {
        type      : String,
        required  : true,
      },
    },

    computed : {
      tasks ()
      {
        switch ( this.user_type )
        {
          case CONTRACTOR :
          return this.$store.getters[ 'contractors/contractorTasks' ];

          case EMPLOYEE :
          return this.$store.getters[ 'employee_id/employee_id_tasks' ];

          default :
          return {};
        }
      },
    },

    data ()
    {
      return {
        headers : [
          {text: 'Фио',       value: 'name', width: '16px'},
          {text: 'Телефон',   value: 'rating'},
          {text: 'Должность', value: 'tasks'},
          {text: '',          value: 'address', },
          {text: '',          value: 'actions', sortable: false},
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

      rowClass( item )
      {
        const rowClass = 'applications-row';

        return rowClass;;
      }
    }

  }

</script>

<style lang="scss">

/* OBJECTS STYLES START */
  .applications-table
  {
    background-color  : unset !important;

    .v-data-table__empty-wrapper
    {
      background-color  : #FFFFFF;
    }
  }

  .applications-row
  {
    background-color  : #FFFFFF !important;
  }
/* OBJECTS STYLES END */

</style>
