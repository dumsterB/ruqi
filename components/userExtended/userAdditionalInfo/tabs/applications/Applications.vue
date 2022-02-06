<template lang="pug">

.applications
  TableDisplaySettings( :sort_select_items="sort_select_items" )

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

        template( v-slot:item.payment="{ item }" )
          .payment
            .wrapper
              span.value {{ `${ item.payment.value } р. / смена` }}

        template( v-slot:item.object="{ item }" ) {{ item.object.name }}

        template( v-slot:item.date="{ item }" ) {{ helpers().parseDate( { date : item.created_at } ) }}

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
  import { CONTRACTOR, EMPLOYEE }                           from '@/constants/';

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
          {text: 'name',      value: 'name', width: '16px'},
          {text: 'payment',   value: 'payment'},
          {text: 'object',    value: 'object'},
          {text: 'date',      value: 'date', },
          {text: 'actions',   value: 'actions', sortable: false},
        ],

        sort_select_items : ['по рейтингу', 'Bar', 'Fizz', 'Buzz'],
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
        return {

          /**
           *
           * @param { object } params
           * {
           *    date : '2021-12-23T12:59:03.000000Z'
           * }
           */
          parseDate : ( payload = {} ) => {
            let splitedPayloadDate = payload.date.split( 'T' );

            let date = splitedPayloadDate[ 0 ].split( '-' );
            let time = splitedPayloadDate[ 1 ].split( '.' )[ 0 ].split( ':' );

            let result = `${ date[ 2 ] }.${ date[ 1 ] }.${ date[ 0 ] } ${ time[ 0 ] }:${ time[ 1 ] }`;

            return result;
          },
        }
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

    .applications-row
    {
      background-color  : #FFFFFF !important;

      .color-black
      {
        position : relative;

        &::before
        {
          content           : "";
          position          : absolute;
          width             : 10px;
          height            : 10px;
          background-color  : #19A74A;
          border-radius     : 100%;
          left              : -35px;
          top               : 5px;
        }
      }
    }
  }

  .payment
  {
    display         : flex;
    flex-direction  : row;
    flex-wrap       : nowrap;
    align-content   : center;
    justify-content : center;
    align-items     : center;
    background      : #E4F1FA;
    border-radius   : 6px;
    padding         : 7px 8px;

    .wrapper
    {
      display         : flex;
      flex-direction  : column;
      flex-wrap       : nowrap;
      align-content   : center;
      justify-content : center;
      align-items     : center;

      .value
      {
        font-style      : normal;
        font-weight     : bold;
        font-size       : 14px;
        line-height     : 125%;
        letter-spacing  : 0.01em;
        color           : #0082DE;
      }
    }
  }
/* OBJECTS STYLES END */

</style>
