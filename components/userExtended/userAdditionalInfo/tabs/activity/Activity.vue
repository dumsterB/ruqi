<template lang="pug">

.activity
  TableDisplaySettings( :sort_select_items="sort_select_items" )

  .table-activity
    .table-list-activity
      v-data-table(
        :headers="headers"
        :items="activities"
        class="activity-table"
        item-key="uuid"
        :item-class="rowClass"
        hide-default-footer
        hide-default-header
      )
        template( v-slot:item.date="{ item }" )
          .date-activity
            .date {{ item.date }}
            .time {{ item.time }}

        template( v-slot:item.name="{ item }" )
          .name-activity
            .titel {{ item.name }}
            .untertitel {{ item.id }}

        template( v-slot:item.status="{ item }" )
          .status-activity {{ item.status }}

        template( v-slot:item.activity="{ item }" )
          .activity-crt
            .from {{ item.from }}
            .logo
              img.arrow-logo( src="@/assets/img/arrow-right.svg" )
            .to {{ item.to }}

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
          {text: 'date',      value: 'date', width: '16px'},
          {text: 'name',   value: 'name'},
          {text: 'status',    value: 'status'},
          {text: 'activity',      value: 'activity', },
        ],

        sort_select_items : ['по рейтингу', 'Bar', 'Fizz', 'Buzz'],

        activities : [
          {
            date : '26.10.2021',
            time : '17:01:47',
            name : 'Требуются кладовщики на склад 5/2',
            id   : '000023424',
            status : 'Статус',
            from : 'Неактивна',
            to  : 'Активна'
          },

          {
            date : '26.10.2021',
            time : '17:01:47',
            name : 'Требуются кладовщики на склад 5/2',
            id   : '000023424',
            status : 'Статус',
            from : 'Неактивна',
            to  : 'Активна'
          },

          {
            date : '26.10.2021',
            time : '17:01:47',
            name : 'Требуются кладовщики на склад 5/2',
            id   : '000023424',
            status : 'Статус',
            from : 'Неактивна',
            to  : 'Активна'
          },

          {
            date : '26.10.2021',
            time : '17:01:47',
            name : 'Требуются кладовщики на склад 5/2',
            id   : '000023424',
            status : 'Статус',
            from : 'Неактивна',
            to  : 'Активна'
          },

          {
            date : '26.10.2021',
            time : '17:01:47',
            name : 'Требуются кладовщики на склад 5/2',
            id   : '000023424',
            status : 'Статус',
            from : 'Неактивна',
            to  : 'Активна'
          },

          {
            date : '26.10.2021',
            time : '17:01:47',
            name : 'Требуются кладовщики на склад 5/2',
            id   : '000023424',
            status : 'Статус',
            from : 'Неактивна',
            to  : 'Активна'
          },

          {
            date : '26.10.2021',
            time : '17:01:47',
            name : 'Требуются кладовщики на склад 5/2',
            id   : '000023424',
            status : 'Статус',
            from : 'Неактивна',
            to  : 'Активна'
          },

          {
            date : '26.10.2021',
            time : '17:01:47',
            name : 'Требуются кладовщики на склад 5/2',
            id   : '000023424',
            status : 'Статус',
            from : 'Неактивна',
            to  : 'Активна'
          },

          {
            date : '26.10.2021',
            time : '17:01:47',
            name : 'Требуются кладовщики на склад 5/2',
            id   : '000023424',
            status : 'Статус',
            from : 'Неактивна',
            to  : 'Активна'
          },

          {
            date : '26.10.2021',
            time : '17:01:47',
            name : 'Требуются кладовщики на склад 5/2',
            id   : '000023424',
            status : 'Статус',
            from : 'Неактивна',
            to  : 'Активна'
          },

          {
            date : '26.10.2021',
            time : '17:01:47',
            name : 'Требуются кладовщики на склад 5/2',
            id   : '000023424',
            status : 'Статус',
            from : 'Неактивна',
            to  : 'Активна'
          },

          {
            date : '26.10.2021',
            time : '17:01:47',
            name : 'Требуются кладовщики на склад 5/2',
            id   : '000023424',
            status : 'Статус',
            from : 'Неактивна',
            to  : 'Активна'
          },

          {
            date : '26.10.2021',
            time : '17:01:47',
            name : 'Требуются кладовщики на склад 5/2',
            id   : '000023424',
            status : 'Статус',
            from : 'Неактивна',
            to  : 'Активна'
          },

          {
            date : '26.10.2021',
            time : '17:01:47',
            name : 'Требуются кладовщики на склад 5/2',
            id   : '000023424',
            status : 'Статус',
            from : 'Неактивна',
            to  : 'Активна'
          },
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
        const rowClass = 'activity-row';

        return rowClass;;
      }
    }

  }

</script>

<style lang="scss">

/* OBJECTS STYLES START */
  .activity-table
  {
    background-color  : unset !important;

    .v-data-table__wrapper
    {
      background    : #FFFFFF;
      border        : 1px solid #E0E0E0;
      box-sizing    : border-box;
      box-shadow    : 0px 6px 73px rgba(0, 0, 0, 0.07);
      border-radius : 14px;
    }

    .v-data-table__empty-wrapper
    {
      background-color  : #FFFFFF;
    }

    .activity-row
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

      .text-start
      {
        padding: 16px 25px !important;

        &:last-child
        {
          padding-right : 90px !important;
        }
      }
    }

    .date-activity
    {
      font-weight: normal;
      font-size: 16px;
      line-height: 125%;
      color: #7A91A9;
    }

    .name-activity
    {
      width: 230px;
      font-style: normal;
      font-weight: 600;

      .titel
      {
        white-space   : nowrap;
        overflow      : hidden;
        text-overflow : ellipsis;

        font-size: 16px;
        line-height: 125%;

        color: #0082DE;
      }

      .untertitel
      {
        font-size: 14px;
        line-height: 18px;
        color: #7A91A9;
      }
    }

    .status-activity
    {
      font-style  : normal;
      font-weight : 600;
      font-size   : 16px;
      line-height : 125%;
      color       : #272833;

      width: 140px;
    }

    .activity-crt
    {
      display: flex;
      flex-direction: row;
      flex-wrap: nowrap;
      align-content: center;
      justify-content: center;
      align-items: center;

      .logo
      {
        display: flex;
        flex-direction: column;
        flex-wrap: nowrap;
        align-content: center;
        justify-content: center;
        align-items: center;
        margin: 0 16px;
      }

      .from, .to
      {
        font-style: normal;
        font-weight: normal;
        font-size: 16px;
        line-height: 125%;
        color: #7A91A9;
      }
    }
  }


/* OBJECTS STYLES END */

</style>
