<template lang="pug">
.tasks-executor-search
  .tasks-executor-search--mobile
    .tasks-executor-search--mobile__header
      .tasks-executor-search--mobile__header-title Поиск работы

      mSearchLine.tasks-executor-search--mobile__header-search
      mContentDisplayController.tasks-executor-search--mobile__header-display-ctrl(
        @clickOnTab="setTasksView"
      )

  .tasks-executor-search--desktop
    h1.mb-8.mt-3 Поиск работы

  TasksFilter(
    :regions="regions"
    :professions="professions"
    :loaderFilter="loaderFilter"
    :mFilterVisibility="mFilterVisibility"
    @showMobFilter="showMobFilter"
    @hideMobFilter="hideMobFilter"
    @apply="applyFilter"
    @reset="resetFilter"
  )

  .tasks-executor-search--desktop
    ContentDisplayController.tasks-executor-search--desktop__content-display-ctrl(
      :count_tasks="searchTasksTotal"
      @clickOnTab="setTasksView"
      @sortTasks="sortTasks"
    )

  .tasks-executor-search--mobile
    .tasks-filter-header Найдено {{ searchTasksTotal }} {{ countTaskTitle }}

  v-tabs-items(v-model="tasksTab")
    v-tab-item
      div(v-infinite-scroll="loadMore")
        TasksList.tasks-executor-search--task-list(:tasks="searchTasks" :actions="actions" @callAction="callAction" )

    v-tab-item
      Map.tasks-executor-search--map(
        :class="[{ 'tasks-executor-search--map': !isMobile && !isTablet }, { 'tasks-executor-search--map_mobile': isMobile || isTablet },]"
        :center_coords="coords"
        :markers="searchTasks"
        :entity="'contractor'"
        zoom="8"
        height="546"
      )
</template>

<script>
import { mapActions, mapGetters, } from 'vuex';
import ContentDisplayController from '@/components/pages/tasks/executor/search/ContentDisplayController/desktop';
import mContentDisplayController from '@/components/pages/tasks/executor/search/ContentDisplayController/mobile';
import TasksFilter from '@/components/pages/tasks/executor/search/TasksFilter';
import TasksList from '@/components/pages/tasks/executor/search/TasksList';
import mSearchLine from '@/components/pages/tasks/executor/search/SearchLine';
import Map from '@/components/Map';

export default {
  components: {
    ContentDisplayController,
    mContentDisplayController,
    TasksFilter,
    TasksList,
    mSearchLine,
    Map,
  },

  props: {},
  data: () => ({
    /* DICTIONARY */
    radii: [
      {
        uuid: '1km',
        name: '1 км',
        value: '1',
      },
      {
        uuid: '10km',
        name: '10 км',
        value: '10',
      },
      {
        uuid: '15km',
        name: '15 км',
        value: '15',
      },
    ],
    regions: [],
    professions: [],
    coords: [45.04, 38.98],

    /* LOADERS */
    loaderFilter: false,

    /* VISIBILITITY STATES */
    mFilterVisibility: false,

    /* COUNTERS */
    tasksTab: 0,

    actions: [
      {text: "Участвовать", icon: "mdi-check", action: 'requestTaskAction'},
      {text: "Подробнее о заявке", icon: "mdi-clipboard-account-outline", action: 'openDetails'},
    ],

    sortField: 'distance',
    sortOrder: 'desc',
    filters: {},
    fetchTaskParams: {
      "page": 1,
      "per_page": 10
    },
  }),
  computed: {
    searchTasks(){
      return this.$store.getters["user/searchTasks"];
    },
    searchTasksLastPage(){
      return this.$store.getters["user/searchTasksLastPage"];
    },
    searchTasksTotal(){
      return this.$store.getters["user/searchTasksTotal"];
    },
    isMobile() {
      return this.$store.getters["platformDetection/IS_MOBILE"];
    },
    isTablet() {
      return this.$store.getters["platformDetection/IS_TABLET"];
    },
    isSmallScreen() {
      return this.$store.getters["platformDetection/IS_SMALL_SCREEN"];
    },
    isLargeScreen() {
      return this.$store.getters["platformDetection/IS_LARGE_SCREEN"];
    },
    isExtraLargeScreen() {
      return this.$store.getters["platformDetection/IS_EXTRA_LARGE_SCREEN"];
    },
    countTaskTitle(){
      let title = 'заявка';

      if(this.searchTasksTotal > 1 && this.searchTasksTotal < 5){
        title =  'заявки';
      }else{
        title = 'заявок';
      }

      return title;
    }
  },

  watch: {},
  methods: {
    ...mapActions('user', [
      'fetchSearchTasks',
      'requestTask'
    ]),
    ...mapActions('dictionary', [
      'fetchRegions',
      'fetcProfessions',
    ]),

    setTasksView(tab) {
      this.tasksTab = tab;
    },

    showMobFilter() {
      console.debug('showMobFilter'); // DELETE

      this.mFilterVisibility = true;
    },

    hideMobFilter() {
      this.mFilterVisibility = false;
    },

    async applyFilter(payload = null) {
      if (!payload) return;

      this.filters = payload;
      this.loaderFilter = true;

      console.debug("applyFilter[CMP]", payload); // DELETE

      await this.fetchSearchTasks({params:payload, concat: false })

      this.loaderFilter = false;
      this.mFilterVisibility = false;
    },
    resetFilter() {
      this.professions = this.professions.map((profession) => ({
        ...profession,
        selected: false,
      }));
    },

    callAction({action, uuid}) {
      console.log('callAction ------', action, uuid);
      this[action](uuid);
    },

    requestTaskAction(uuid){
      this.requestTask(uuid);
    },

    openDetails(uuid) {
      this.$router.push("/tasks/contractor/" + uuid);
    },

    async sortTasks(sort){

      this.sortField = sort;

      if(sort == 'distance' || sort == 'start_date'){
        this.sortOrder = 'desc';
      }else if(sort == 'rate'){
        this.sortOrder = 'asc';
      }

      this.filters.sort = this.sortField;
      this.filters.order = this.sortOrder;

      this.loaderFilter = true;

      await this.fetchSearchTasks({params: this.filters, concat: false});

      this.loaderFilter = false;
    },

    loadMore() {

      if(this.fetchTaskParams.page < this.searchTasksLastPage){
        let fetchParams = 'fetchTaskParams',
          sortOptions = 'headerOptionsTask',
          action = 'fetchSearchTasks';

        this.fetchTaskParams.page += 1;
        this.fetchTaskParams.sort = this.filters.sort
        this.fetchTaskParams.order = this.filters.order

        const params = this[fetchParams];

        this.fetchSearchTasks({params: params, concat: true});
      }else{
        console.log('this is all data ....');
      }

    },


  },

  async created() {
    await this.fetchRegions().then((regions) => {
      this.regions = regions;
    });
    await this.fetcProfessions().then((professions) => {
      this.professions = professions.map((profession) => ({
        ...profession,
        selected: false,
      }));
    });

    await this.fetchSearchTasks({params: this.fetchTaskParams, concat: false});

    if(this.searchTasks.length){
      this.coords = this.searchTasks[0].geometry.coordinates;
    }


  },
  mounted() { },
}
</script>

<style lang="scss">
.tasks-executor-search {
  &--desktop {
    display: block;
    max-width: 1272px;

    h1{
      font-size: 32px;
    }

    &__content-display-ctrl {
      margin-top: 32px;
    }
  }

  &--mobile {
    display: none;

    &__header {
      display: flex;
      flex-direction: column;
      flex-wrap: nowrap;
      align-content: center;
      justify-content: center;
      align-items: center;
      background: #0082DE;
      padding-top: 16px;
      padding-bottom: 32px;

      &-title {
        font-family: 'Source Sans Pro';
        font-style: normal;
        font-weight: 700;
        font-size: 24px;
        line-height: 125%;
        color: #FFFFFF;

        @media screen and (min-width: 370px) {
          width: 344px;
        }

        @media screen and (max-width: 370px) {
          width: 315px;
        }
      }

      &-search {
        margin-top: 16px;
      }

      &-display-ctrl {
        margin-top: 20px;
      }
    }
  }

  &--task-list {
    margin-top: 24px;
  }

  &--map {
    margin-top: 24px;
  }

  @media screen and (max-width: 768px) {
    &--desktop {
      display: none;
    }

    &--mobile {
      display: block;
    }
  }

  .tasks-filter-header{
    font-weight: 700;
    font-size: 16px;
    margin: 24px 16px 0 16px;
  }
}
</style>
