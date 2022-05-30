<template lang="pug">
.rq-twsrd
  v-data-table(
    v-model="selected"
    :headers="headers"
    :items="userTasks"
    item-key="uuid"
    :page.sync="page"
    :items-per-page="itemsPerPageTable"
    hide-default-footer
    hide-default-header
    @page-count="pageCount = $event"
    @update:sort-by="handlers().updateSortBy( { $event } )"
    @update:sort-desc="handlers().updateSortDesc( { $event } )"
  )
    template( v-slot:item.name="{ item }" )
      div.color-black( @click="handlers().onNameTaskClick( { uuid : item.uuid } )" )
        span {{ item.name }}

    template( v-slot:item.status="{ item }" )
      .task-status(
        :class="classStatusObj( { status : item.my_status } )"
      )
        .task-status__wrapper
          .task-status__inner( v-if="!item.my_status" ) {{ 'открыт набор' }}
          .task-status__inner( v-else )
            .task-status__icon( v-if="item.my_status === 'invited'" )
              svg( width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg" )
                path( d="M6.75 12.75V12C6.33579 12 6 12.3358 6 12.75H6.75ZM11.25 12.75H12C12 12.3358 11.6642 12 11.25 12V12.75ZM6.75 13.5H11.25V12H6.75V13.5ZM10.5 12.75V13.5H12V12.75H10.5ZM7.5 13.5V12.75H6V13.5H7.5ZM9 15C8.17157 15 7.5 14.3284 7.5 13.5H6C6 15.1569 7.34315 16.5 9 16.5V15ZM10.5 13.5C10.5 14.3284 9.82843 15 9 15V16.5C10.6569 16.5 12 15.1569 12 13.5H10.5Z" fill="white" )
                path( d="M3.21967 11.0303L2.68934 10.5H2.68934L3.21967 11.0303ZM3.60279 10.6472L4.13312 11.1776H4.13312L3.60279 10.6472ZM14.3972 10.6472L14.9275 10.1169L14.9275 10.1169L14.3972 10.6472ZM14.7803 11.0303L15.3107 10.5L15.3107 10.5L14.7803 11.0303ZM8.99999 2.25L8.99999 3L8.99999 2.25ZM14.25 12H3.75V13.5H14.25V12ZM3.75 12V11.5607H2.25V12H3.75ZM3.75 11.5607L4.13312 11.1776L3.07246 10.1169L2.68934 10.5L3.75 11.5607ZM4.5 10.2918V7.5H3V10.2918H4.5ZM13.5 7.5V10.2918H15V7.5H13.5ZM13.8669 11.1775L14.25 11.5607L15.3107 10.5L14.9275 10.1169L13.8669 11.1775ZM14.25 11.5607V12H15.75V11.5607H14.25ZM14.25 11.5607L14.25 11.5607H15.75C15.75 11.1628 15.592 10.7813 15.3107 10.5L14.25 11.5607ZM13.5 10.2918C13.5 10.624 13.632 10.9426 13.8669 11.1775L14.9275 10.1169C14.9739 10.1633 15 10.2262 15 10.2918H13.5ZM15 7.5C15 4.18629 12.3137 1.49999 8.99998 1.5L8.99999 3C11.4853 2.99999 13.5 5.01471 13.5 7.5H15ZM4.5 7.5C4.5 5.01472 6.51471 3.00001 8.99999 3L8.99998 1.5C5.68628 1.50001 3 4.1863 3 7.5H4.5ZM4.13312 11.1776C4.36803 10.9426 4.5 10.624 4.5 10.2918H3C3 10.2262 3.02606 10.1633 3.07246 10.1169L4.13312 11.1776ZM3.75 11.5607H3.75L2.68934 10.5C2.40804 10.7813 2.25 11.1628 2.25 11.5607H3.75ZM3.75 12H2.25C2.25 12.8284 2.92157 13.5 3.75 13.5V12ZM14.25 13.5C15.0784 13.5 15.75 12.8284 15.75 12H14.25V13.5Z" fill="white" )
                path( d="M13.5137 1.51025C14.5481 2.28974 15.363 3.32382 15.8791 4.5118" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" )
                path( d="M4.48647 1.51025C3.45206 2.28974 2.63715 3.32382 2.12109 4.5118" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" )
            .task-status__title {{ item.my_status_name }}


    template( v-slot:item.payment="{ item }" )
      .payment( :class="{ close: userTaskStatus === 'close' }" )
        .wrapper
          span.value {{ `${ item.payment.value || '0' } р. / смена` }}

    template( v-slot:item.object_name="{ item }" )
      .color-black {{ item.object.name }}

    template( v-slot:item.start_date="{ item }" )
      div {{ parseDate( { date: item.start_date } ) }}

    template(
      v-slot:item.actions="{ item }"
    )
      v-menu(
        bottom
        rounded="10"
        offset-y
        nudge-bottom="10"
        left
      )
        template(
          v-slot:activator="{ on }"
        )
          v-btn(
            v-show="userTaskStatus !== 'close'"
            icon v-on="on"
          )
            v-icon mdi-dots-vertical
        v-card()
          v-list-item-content.justify-start
            .mx-auto.text-left
              .actions
                //- .action(
                //-   v-for="( action, index ) in getters().tableItemIndex( { status : item.my_status  } )" :key="action.slug"
                //-   @click="handlers().onActionClick( { action : action.slug, uuid : item.uuid } )"
                //- )
                //-   .action-item {{ action.name }}
                //-   v-divider.my-3( v-if="index !== getters().tableItemIndex( { status : item.my_status  } ).length - 1" )
</template>

<script>
export default {
  components: {},
  props: {},
  computed: {},
  watch: {},
  methods: {
    /* GETTERS */
    classStatusObj : ( payload = {} ) => {
      return {
        open      : !payload.status,
        requested : payload.status === 'requested',
        rejected  : payload.status === 'rejected',
        accepted  : payload.status === 'accepted',
        invited   : payload.status === 'invited',
      }
    },
    /* SETTERS */
    /* HANDLERS */
    /* HELPERS */
    parseDate : ( payload = {} ) => {
      let day   = payload.date.split( 'T' )[ 0 ].split( '-' )[ 2 ];
      let month = payload.date.split( 'T' )[ 0 ].split( '-' )[ 1 ];
      let year  = payload.date.split( 'T' )[ 0 ].split( '-' )[ 0 ];
      let time  = `${ payload.date.split( 'T' )[ 1 ].split( ':' )[ 0 ] }:${ payload.date.split( 'T' )[ 1 ].split( ':' )[ 1 ] }`;

      return `${ day }.${ month }.${ year } ${ time }`;
    },
  },

  data() {
    return {
      page: 1,
      pageCount: 0,
      itemsPerPage: 5,
      selected: [],
      headers: [
        {text: 'Название', align: 'start', value: 'name',},
        {text: '', align: 'start', value: 'status', sortable: false,},
        {text: 'оплата', value: 'payment'},
        {text: 'Объект', value: 'object_name'},
        {text: 'Начало работ', value: 'start_date'},
        {text: '', value: 'actions', sortable: false, align: 'right'},
      ],

      userTasks: [
        {
          description: "тест",
          hours_left: 696,
          minutes_left: 57,
          name: "5 Сборщиков на 31.04",
          raiting: 4,
          start_date: "2022-04-01T09:00:00.000000Z",
          until_date: "2022-04-01T09:00:00.000000Z",
          object: {
            name: "Багрепорт 2",
            uuid: "19e737ec-a6c8-449b-bad0-e22c1853c4eb",
          },
          payment: {
            current: null,
            period: "за смену",
            value: "1800",
          },
        },
        {
          description: "тест",
          hours_left: 696,
          minutes_left: 57,
          name: "5 Сборщиков на 31.04",
          raiting: 4,
          start_date: "2022-04-01T09:00:00.000000Z",
          until_date: "2022-04-01T09:00:00.000000Z",
          object: {
            name: "Багрепорт 2",
            uuid: "19e737ec-a6c8-449b-bad0-e22c1853c4eb",
          },
          payment: {
            current: null,
            period: "за смену",
            value: "1800",
          },
        },
        {
          description: "тест",
          hours_left: 696,
          minutes_left: 57,
          name: "5 Сборщиков на 31.04",
          raiting: 4,
          start_date: "2022-04-01T09:00:00.000000Z",
          until_date: "2022-04-01T09:00:00.000000Z",
          object: {
            name: "Багрепорт 2",
            uuid: "19e737ec-a6c8-449b-bad0-e22c1853c4eb",
          },
          payment: {
            current: null,
            period: "за смену",
            value: "1800",
          },
        },
      ],
    }
  },
  created() {},
  mounted() {},
}
</script>

<style lang="scss">
.rq-twsrd {}
</style>
