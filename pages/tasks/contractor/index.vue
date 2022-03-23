<template lang="pug">
.contractor-applications__container
  Header( :content="title" :size="title_size" :isnew="false" :isback="false" )

  v-row.haupt-tabs__container
    v-tabs( v-model="tab_haupt" )
      v-tab( @click="handlers().onTaskTypeTabClick( { type : 'active' } )" ) Активные
      v-tab( @click="handlers().onTaskTypeTabClick( { type : 'responded' } )" ) Откликнулся
      v-tab( @click="handlers().onTaskTypeTabClick( { type : 'completed' } )" ) Завершенные

  v-row.table-filter-row
    v-col( cols="3" )
      v-select.sort-select(
        :items="sortActive"
        v-model="active"
        prefix="Порядок:"
        outlined
        hide-details="true"
        item-text="name"
        item-value="id"
        @change="handlers().onSortSelectChange( { $event } )"
      )

    v-col( cols="9" class="d-flex justify-end align-center" )
      Search( :searchText="searchText" @updateSearchText="onSearchInput" )
      .map-tabs
        .map-tab.list(
          :class="{ 'active' : !tab_list_map }"
          @click="handlers().onMapTabClick( { tab : 0 } )"
        )
          svg( width="20" height="18" viewBox="0 0 20 18" fill="none" xmlns="http://www.w3.org/2000/svg" )
            path(
              v-if="!tab_list_map"
              d="M0 0.993C0.00183004 0.730378 0.1069 0.479017 0.292513 0.293218C0.478126 0.107418 0.72938 0.00209465 0.992 0H19.008C19.556 0 20 0.445 20 0.993V17.007C19.9982 17.2696 19.8931 17.521 19.7075 17.7068C19.5219 17.8926 19.2706 17.9979 19.008 18H0.992C0.728813 17.9997 0.476497 17.895 0.290489 17.7088C0.104482 17.5226 -1.33455e-07 17.2702 0 17.007V0.993ZM9 2H2V16H9V2ZM11 2V16H18V2H11ZM12 4H17V6H12V4ZM12 7H17V9H12V7Z" fill="#0082DE"
            )
            path(
              v-else
              d="M0 0.993C0.00183004 0.730378 0.1069 0.479017 0.292513 0.293218C0.478126 0.107418 0.72938 0.00209465 0.992 0H19.008C19.556 0 20 0.445 20 0.993V17.007C19.9982 17.2696 19.8931 17.521 19.7075 17.7068C19.5219 17.8926 19.2706 17.9979 19.008 18H0.992C0.728813 17.9997 0.476497 17.895 0.290489 17.7088C0.104482 17.5226 -1.33455e-07 17.2702 0 17.007V0.993ZM9 2H2V16H9V2ZM11 2V16H18V2H11ZM12 4H17V6H12V4ZM12 7H17V9H12V7Z" fill="#7A91A9"
            )
          .titel Списком
        .map-tab.map(
          :class="{ 'active' : tab_list_map }"
          @click="handlers().onMapTabClick( { tab : 1 } )"
        )
          svg( width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" )
            path(
              v-if="tab_list_map"
              d="M13 3L7 1M7 17L1.79 18.737C1.69973 18.7671 1.60358 18.7754 1.5095 18.761C1.41542 18.7467 1.32611 18.7101 1.24893 18.6544C1.17175 18.5988 1.10893 18.5255 1.06565 18.4408C1.02236 18.356 0.999861 18.2622 1 18.167V3.433C1.00003 3.30714 1.03963 3.18447 1.11321 3.08236C1.18679 2.98025 1.29062 2.90386 1.41 2.864L7 1V17ZM7 17L13 19L7 17ZM7 17V1V17ZM13 19L18.59 17.137C18.7095 17.0971 18.8135 17.0205 18.8871 16.9182C18.9607 16.8159 19.0002 16.693 19 16.567V1.832C19 1.73692 18.9774 1.6432 18.934 1.55857C18.8907 1.47394 18.8278 1.40083 18.7507 1.34526C18.6735 1.28969 18.5843 1.25325 18.4902 1.23895C18.3962 1.22465 18.3002 1.23289 18.21 1.263L13 3V19ZM13 19V3V19Z" stroke="#0082DE" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"
            )
            path(
              v-else
              d="M13 3L7 1M7 17L1.79 18.737C1.69973 18.7671 1.60358 18.7754 1.5095 18.761C1.41542 18.7467 1.32611 18.7101 1.24893 18.6544C1.17175 18.5988 1.10893 18.5255 1.06565 18.4408C1.02236 18.356 0.999861 18.2622 1 18.167V3.433C1.00003 3.30714 1.03963 3.18447 1.11321 3.08236C1.18679 2.98025 1.29062 2.90386 1.41 2.864L7 1V17ZM7 17L13 19L7 17ZM7 17V1V17ZM13 19L18.59 17.137C18.7095 17.0971 18.8135 17.0205 18.8871 16.9182C18.9607 16.8159 19.0002 16.693 19 16.567V1.832C19 1.73692 18.9774 1.6432 18.934 1.55857C18.8907 1.47394 18.8278 1.40083 18.7507 1.34526C18.6735 1.28969 18.5843 1.25325 18.4902 1.23895C18.3962 1.22465 18.3002 1.23289 18.21 1.263L13 3V19ZM13 19V3V19Z" stroke="#7A91A9" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"
            )
          .titel На карте

  v-window( v-model="tab_list_map" )
    v-tab-item
      .table-list-style
        v-data-table(
          v-model="selected"
          :headers="headers"
          :items="userTasks"
          class="elevation-0"
          item-key="uuid"
          :page.sync="page"
          :items-per-page="itemsPerPageTable"
          @page-count="pageCount = $event"
          hide-default-footer
        )
          template( v-slot:item.name="{ item }" )
            div.color-black( @click="handlers().onNameTaskClick( { uuid : item.uuid } )" )
              span.request-i {{ item.info.name }}

          template( v-slot:item.payment="{ item }" )
            .payment( :class="{ close : userTaskStatus === 'close' }" )
              .wrapper
                span.value {{ `${ item.info.payment.value || '0' } р. / смена` }}

          template( v-slot:item.object="{ item }" )
            .color-black {{ item.info.object.name }}

          template( v-slot:item.work_begin="{ item }" )
            div {{ helpers().parseDate( { date : item.info.start_date } ) }}

          template( v-slot:item.actions="{ item }" )
            v-menu(
              bottom
              rounded="10"
              offset-y
              nudge-bottom="10"
              left
            )
              template( v-slot:activator="{ on }" )
                v-btn( icon v-on="on" )
                  v-icon mdi-dots-vertical
              v-card
                v-list-item-content.justify-start
                  .mx-auto.text-left
                    nuxt-link( :to="'/objects/'+ item.uuid +'/edit/'" )
                      span Редактировать
                    v-divider.my-3
                    a( href="#" @click.prevent="removeRequest(item.uuid)" ) Удалить
      FooterTable(
        :itemsPerPage="itemsPerPage"
        :pageCount="pageCount"
        :page="page"
        @setItemsPerPage="setItemsPerPage"
        @setCurrentPage="setCurrentPage"
      )
    v-tab-item
      v-row.mt-11
        v-col( cols="12" )
          Map(
            :center_coords="coords"
            :markers="userTasks"
            :entity="'contractor'"
            zoom="8"
            height="546"
          )
</template>

<script>

  import {mapState, mapActions, mapGetters, mapMutations} from 'vuex';
  import _ from 'lodash';

  export default {
    components : {},

    async fetch ( { store } ) {
      if (store.getters['specializations/specializations'].length === 0) {
        await store.dispatch('specializations/fetch')
      }
      if (store.getters['dictionary/regions'].length === 0) {
        await store.dispatch('dictionary/fetchRegions')
      }
    },

    data() {
      return {
        title: 'Мои заявки',
        title_size: 'big',
        title_create: false,
        title_page_create: 'create',
        sortSpecializations: [],
        sortRegions: [],
        sortActive: [
          {
            id : 0,
            name : 'Сначала ближайшие (по локации)',
          },

          {
            id : 1,
            name : 'Сначала дорогие (по стоимости ставки)',
          },

          {
            id : 2,
            name : 'Сначала ближайший старт работ (по дате старта)',
          },
        ],
        defSort: [{name: 'Все', uuid: '0000'}],
        specialization: '',
        region: '',
        active: '',
        searchText: '',
        selectObject: null,
        page: 1,
        pageCount: 0,
        itemsPerPage: 5,
        selected: [],
        avatarColor: '#EFCD4F',
        headers: [
          {text: 'Название', align: 'start', value: 'name',},
          {text: 'оплата', value: 'payment'},
          {text: 'Объект', value: 'object'},
          {text: 'Начало работ', value: 'work_begin'},
          {text: '', value: 'actions', sortable: false, align: 'right'},
        ],
        tab_haupt : null,
        tab_list_map: null,
        coords: [45.04, 38.98],

        userTaskStatus : 'open',
      }
    },

    created ()
    {
      this.sortSpecializations = this.defSort.concat(this.specializations);
      this.sortRegions = this.defSort.concat(this.regions);
    },

    methods: {
      ...mapActions( 'user', [ 'fetchUserTasks', 'setUserTasksParams', ] ),

      ...mapActions('objects', ['fetchObjects',]),
      ...mapActions('objects', ['fetchObjectsMap',]),
      ...mapActions('objects', ['removeRequest',]),
      ...mapActions('specializations', ['fetch',]),
      ...mapActions('dictionary', ['fetchRegions',]),

      updateSearchText(value) {
        console.log( 'updateSearchText', this );
      },

      filter() {
        const newRequet = this.postBody;
        if (this.tab == 0) {
          this.fetchObjects(newRequet);
        } else if (this.tab == 1) {
          this.fetchObjectsMap(newRequet);
        }
      },

      setItemsPerPage(value) {
        this.itemsPerPage = value;
      },

      setCurrentPage(value) {
        this.page = value;
      },

      helpers ()
      {
        return {
          parseDate : ( payload = {} ) => {
            let day   = payload.date.split( 'T' )[ 0 ].split( '-' )[ 2 ];
            let month = payload.date.split( 'T' )[ 0 ].split( '-' )[ 1 ];
            let year  = payload.date.split( 'T' )[ 0 ].split( '-' )[ 0 ];
            let time  = `${ payload.date.split( 'T' )[ 1 ].split( ':' )[ 0 ] }:${ payload.date.split( 'T' )[ 1 ].split( ':' )[ 1 ] }`;

            return `${ day }.${ month }.${ year } ${ time }`;
          }
        }
      },

      handlers ()
      {
        return {
          onTaskTypeTabClick : async ( payload = {} ) => {
            console.log( 'onTaskTypeTabClick', payload ); // DELETE

            console.log( 'objects_map', this.objects_map );

            switch ( payload.type ) {
              case 'active' :
                await this.setUserTasksParams( { type : 'accepted', status : 'open', } );
                await this.fetchUserTasks();

                this.userTaskStatus = 'open';
              break;

              case 'responded' :
                await this.setUserTasksParams( { type : 'requested', } );
                await this.fetchUserTasks();

                this.userTaskStatus = 'open';
              break;

              case 'completed' :
                await this.setUserTasksParams( { type : 'accepted', status : 'close', } );
                await this.fetchUserTasks();

                this.userTaskStatus = 'close';
              break;

              default:
              break;
            }
          },

          onSortSelectChange : async ( payload = {} ) => {
            console.log( 'onSortSelectChange', payload ); // DELETE

            switch ( payload.$event )
            {
              case 0 :
                  await this.setUserTasksParams( { distance : 1, date : 0, } );
                  await this.fetchUserTasks();
              break;

              case 2 :
                await this.setUserTasksParams( { distance : 0, date : 1, } );
                await this.fetchUserTasks();
              break;

              default :
              break;
            }
          },

          onNameTaskClick : ( payload = {} ) => {
            this.$router.push(
              {
                name : "tasks-contractor-id",
                params : {
                  id : payload.uuid,
                }
              }
            );
          },

          onMapTabClick : ( payload = {} ) => {
            this.tab_list_map = payload.tab;
          },
        }
      },

      onSearchInput : _.debounce(
        function( payload = {} ) {
          this.setUserTasksParams( { ...this.userTasksParams, search : payload } ).then(
            () => {
              this.fetchUserTasks();
            }
          );
        },

        400
      ),
    },

    computed: {
      objects() {
        return this.$store.getters['objects/objects'];
      },
      objects_map() {
        return this.$store.getters['objects/objects_map'];
      },
      specializations() {
        return this.$store.getters['specializations/specializations'];
      },
      regions() {
        return this.$store.getters['dictionary/regions'];
      },
      itemsPerPageTable() {
        if (this.itemsPerPage) {
          return parseInt(this.itemsPerPage, 10)
        } else {
          return 1;
        }
      },
      postBody() {
        let type;
        let specialization = this.specialization,
          region = this.region;
        if (specialization == 'Все') {
          specialization = '';
        }
        if (region == 'Все') {
          region = '';
        }
        if (this.tab == 1) {
          type = 'map';
        }
        let postBody = {
          "specialization": specialization,
          "region": region,
          "active": this.active,
          "sort": "city",
          "order": "asc",
          "type": type
        }
        console.log(postBody);
        return postBody;
      },

      ...mapGetters( 'user', [ 'userTasks', 'userTasksParams', ] ),
    },

    async mounted() {
      await this.setUserTasksParams( { type : 'accepted', status : 'open', } );
      await this.fetchUserTasks();
    },
  }

</script>

<style lang="scss">

@import '@/assets/scss/colors';


.v-divider {
  margin: 24px 0;
}

/* OBJECTS STYLES START */
  .haupt-tabs__container
  {
    width: max-content !important;
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
    width           : max-content;

    &.close
    {
      background : #F2F4F5;

      .value
      {
        color : #7A91A9 !important;
      }
    }

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

  .sort-select
  {
    .item
    {
      width   : 245px;
      height  : 44px;

      .v-input__slot
      {
        margin        : 0 !important;
        background    : #FFFFFF;
        border        : 1px solid #D5DEE8 !important;
        box-sizing    : border-box;
        border-radius : 10px;
        box-shadow    : unset !important;
      }
    }
  }

  .map-tabs
  {
    display: flex;
    flex-direction: row;
    flex-wrap: nowrap;
    align-content: center;
    justify-content: flex-start;
    align-items: center;

    background: #E9F6FF;
    border-radius: 9px;
    padding: 4px;

    .map-tab
    {
      display: flex;
      flex-direction: row;
      flex-wrap: nowrap;
      align-content: center;
      justify-content: flex-start;
      align-items: center;

      cursor: pointer;
      color : #7A91A9;
      padding: 10px;

      &.active
      {
        background: #FFFFFF;
        border-radius: 5px;

        color : #0082DE !important;
      }

      .titel
      {
        margin-left: 10px;
      }
    }
  }
/* OBJECTS STYLES END */

</style>
