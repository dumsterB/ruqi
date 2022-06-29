<template lang="pug">
  .rq-home-executor
    .rq-home-executor__mobile
      .rq-home-executor__mobile__header
        .rq-home-executor__mobile__header-container
          mUserbar.rq-home-executor__mobile__header-userbar
          .rq-home-executor__mobile__header-widgetbar
          mContentDisplayController.rq-home-executor__mobile__header-display-ctrl

    .rq-home-executor__desktop
      Userbar.rq-home-executor__desktop-userbar

      v-divider.mt-12.mb-8

      TasksTabs.rq-home-executor__desktop__content-display-ctrl(:tabs="tabs" @clickOnTab="clickOnTab")

    v-row(no-gutters)
      v-col(cols="12")
        .tasks-list-header-wrapper.d-flex.justify-space-between(v-if="tasksTab == 1")
          .tasks-list-header {{ title[tasksTab] }}
          .tasks-list-view-all
            nuxt-link(to="/tasks/contractor/search/") Смотреть все

    v-row(no-gutters)
      v-col(cols="12")
        Banner.mt-8

    v-row(no-gutters)
      v-col(cols="12")
        v-window(v-model="tasksTab")
          v-tab-item(eager)
            TasksEmpty

          v-tab-item(eager)
            TasksList.tasks-executor-search--task-list(:tasks="searchTasks" :actions="actions" @callAction="callAction" )


</template>

<script>
import {mapActions, mapGetters,} from 'vuex';
import ContentDisplayController from '@/components/pages/tasks/executor/search/ContentDisplayController/desktop';
import mContentDisplayController from '@/components/pages/tasks/executor/search/ContentDisplayController/mobile';
import TasksFilter from '@/components/pages/tasks/executor/search/TasksFilter/desktop';
import mTasksFilter from '@/components/pages/tasks/executor/search/TasksFilter/mobile';
import mSearchLine from '@/components/pages/tasks/executor/search/SearchLine';

import TasksList from '@/components/pages/tasks/executor/search/TasksList';
import TasksTabs from '@/components/pages/home/executor/TasksTabs';
import TasksEmpty from '@/components/pages/home/executor/TasksEmpty';
import Userbar from './Userbar/desktop';
import mUserbar from './Userbar/mobile';

import Banner from '@/components/composite/Banner';


export default {
  components: {
    ContentDisplayController,
    mContentDisplayController,
    TasksFilter,
    mTasksFilter,
    mSearchLine,
    TasksList,
    Userbar,
    mUserbar,
    TasksTabs,
    TasksEmpty,
    Banner
  },

  props: {},
  data: () => ({
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
    tabs: [
      'Мои работы',
      'Мои заявки'
    ],
    title: [
      'Предстоящие  работы',
      'Мои заявки'
    ],
    tasksTab: 0,
  }),
  computed: {
    searchTasks() {
      return this.$store.getters["user/searchTasks"];
    },
    searchTasksLastPage() {
      return this.$store.getters["user/searchTasksLastPage"];
    },
    searchTasksTotal() {
      return this.$store.getters["user/searchTasksTotal"];
    },
  },

  watch: {},
  methods: {
    ...mapActions('user', [
      'fetchSearchTasks',
    ]),

    callAction({action, uuid}) {
      console.log('callAction ------', action, uuid);
      this[action](uuid);
    },

    requestTaskAction(uuid) {
      this.requestTask(uuid);
    },

    openDetails(uuid) {
      this.$router.push("/tasks/contractor/" + uuid);
    },

    clickOnTab(tab) {
      this.tasksTab = tab;
    },

  },

  created() {
    this.fetchSearchTasks({params: {"type": "accepted"}, concat: false})
  },
  mounted() {
  },
}
</script>

<style lang="scss">

.rq-home-executor {
  &__desktop {
    display: block;

    &-userbar {
      margin-top: 28px;
    }

    &__content-display-ctrl {
      margin-top: 32px;
    }
  }

  &__mobile {
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

      &-container {
        @media screen and (min-width: 370px) {
          width: 370px;
        }

        @media screen and (max-width: 370px) {
          width: 315px;
        }
      }

      &-title {
        &-text {
          font-family: 'Source Sans Pro';
          font-style: normal;
          font-weight: 700;
          font-size: 24px;
          line-height: 125%;
          color: #FFFFFF;
        }

        // @media screen and (min-width: 370px) {
        //   width: 344px;
        // }
        // @media screen and (max-width: 370px) {
        //   width: 315px;
        // }
      }

      &-search {
        margin-top: 16px;
      }

      &-display-ctrl {
        margin-top: 20px;
      }
    }
  }

  .search {
    &__task-list {
      margin-top: 24px;
    }
  }

  .tasks-list-header-wrapper {
    .tasks-list-header {
      font-weight: 700;
      font-size: 22px;
    }

    .tasks-list-view-all {
      a {
        text-decoration: none;
        font-weight: 600;
      }
    }
  }

  @media screen and (max-width: 768px) {
    &__desktop {
      display: none;
    }

    &__mobile {
      display: block;
    }
  }
}
</style>
