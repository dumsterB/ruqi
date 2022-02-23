<template lang="pug">
.contractor-applications__container
  Header( :content="title" :size="title_size" :isnew="false" :isback="false" )

  v-row.haupt-tabs__container
    v-tabs( v-model="tab_haupt" )
        v-tab Активные
        v-tab Откликнулся
        v-tab Завершенные

  v-row.table-filter-row
    v-col( cols="3" )
      v-select.sort-select(
        :items="sortActive"
        v-model="active"
        prefix="Порядок:"
        outlined
        hide-details="true"
        item-text="title"
        @change="filter('active', active)"
      )

    v-col( cols="9" class="d-flex justify-end" )
      Search( :searchText="searchText" @updateSearchText="updateSearchText" )
      v-tabs.icon-tabs( right height="40" v-model="tab_list_map" )
        v-tab
          img( src="/img/ico_list.svg" alt="list" )
        v-tab
          v-icon( size="24" color="gray" ) mdi-map-outline

  v-window( v-model="tab_list_map" )
    v-tab-item
      .table-list-style
        v-data-table(
          v-model="selected"
          :headers="headers"
          :items="objects"
          class="elevation-0"
          item-key="uuid"
          :page.sync="page"
          :items-per-page="itemsPerPageTable"
          @page-count="pageCount = $event"
          hide-default-footer
        )
          template( v-slot:item.name="{ item }" )
            div.color-black( @click="openRequest(item.uuid)" )
              span.request-i {{ item.name }}

          template( v-slot:item.payment="{ item }" )
            .payment
              .wrapper
                span.value {{ `${ 1000 } р. / смена` }}

          template( v-slot:item.object="{ item }" )
            .color-black {{ item.count_tasks }}

          template( v-slot:item.work_begin="{ item }" )
            div {{ item.region }}, {{ item.city }}

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
          Map( :center_coords="coords" :markers="objects_map" zoom="8" height="546" )
</template>

<script>

  import {mapState, mapActions, mapGetters, mapMutations} from 'vuex';

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
          {title: 'Неделя', value: 1},
          {title: 'Месяц', value: 4},
          {title: 'Полгода ', value: 26},
          {title: 'Год', value: 52},
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
      }
    },

    created() {

      this.sortSpecializations = this.defSort.concat(this.specializations);
      this.sortRegions = this.defSort.concat(this.regions);
    },

    methods: {
      ...mapActions('objects', ['fetchObjects',]),
      ...mapActions('objects', ['fetchObjectsMap',]),
      ...mapActions('objects', ['removeRequest',]),
      ...mapActions('specializations', ['fetch',]),
      ...mapActions('dictionary', ['fetchRegions',]),

      openRequest(id) {
        this.$router.push('/objects/' + id);
      },
      updateSearchText(value) {
        this.searchText = value;
        this.fetchObjects({"name": value});
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
      }

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
      }
    },

    async mounted() {
      await this.fetchObjects();
      await this.fetchObjectsMap({"type": "map"});
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
/* OBJECTS STYLES END */

</style>
