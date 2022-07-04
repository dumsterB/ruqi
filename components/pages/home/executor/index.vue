<template lang="pug">
  .rq-home-executor
    .rq-home-executor__mobile.mb-4
      .rq-home-executor__mobile__header
        .rq-home-executor__mobile__header-container
          mUserbar.rq-home-executor__mobile__header-userbar(:widgets="widgets" :profile="profile")
          .rq-home-executor__mobile__header-widgetbar
          mContentDisplayController.rq-home-executor__mobile__header-display-ctrl(@clickOnTab="clickOnTab")

    .rq-home-executor__desktop
      Userbar.rq-home-executor__desktop-userbar(:widgets="widgets" :profile="profile")

      v-divider.mt-12.mb-8

      TasksTabs.rq-home-executor__desktop__content-display-ctrl(:tabs="tabs" @clickOnTab="clickOnTab")

    v-row(no-gutters).rq-home-executor__desktop
      v-col(cols="12")
        .tasks-list-header-wrapper.d-flex.justify-space-between(v-if="tasksTab == 0 && userWorks.length || tasksTab == 1 && userTasks.length")
          .tasks-list-header {{ title[tasksTab] }}
          .tasks-list-view-all
            nuxt-link(to="/tasks/contractor") Смотреть все

    v-row(no-gutters).rq-home-executor__desktop
      v-col(cols="12")
        Banner(:banners="userBanners")

    v-row(no-gutters)
      v-col(cols="12")
        v-window(v-model="tasksTab")
          v-tab-item(eager)
            TasksList.tasks-executor-search--task-list(:tasks="userWorks" :actions="actions" @callAction="callAction" v-if="userWorks.length")
            TasksEmpty(title="Пока нет предстоящих работ" description="Мы сформировали акты выполненных работ, вам нужно подписать их чтобы получить деньги." v-else)

          v-tab-item(eager)
            TasksList.tasks-executor-search--task-list(:tasks="userTasks" :actions="actions" @callAction="callAction" v-if="userTasks.length")
            TasksEmpty(title="Пока нет заявок" description="Мы сформировали акты выполненных работ, вам нужно подписать их чтобы получить деньги." v-else)


</template>

<script>
import {mapActions, mapGetters,} from 'vuex';
import ContentDisplayController from '@/components/pages/tasks/executor/search/ContentDisplayController/desktop';
import mContentDisplayController from '@/components/pages/home/executor/ContentDisplayController/mobile';
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
      {text: "Принять", icon: "mdi-check", action: '', status: ['invited']},
      {text: "Отказаться", icon: "mdi-close-box-outline", action: '', status: ['working', 'accepted', 'invited']},
      {text: "Отменить", icon: "mdi-close-box-outline", action: '', status: ['requested']},
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
    userTasks() {
      return this.$store.getters["user/userTasks"];
    },
    tasksLastPage() {
      return this.$store.getters["user/tasksLastPage"];
    },
    tasksTotal() {
      return this.$store.getters["user/tasksTotal"];
    },
    userWorks() {
      return this.$store.getters["user/userWorks"];
    },
    worksLastPage() {
      return this.$store.getters["user/worksLastPage"];
    },
    worksTotal() {
      return this.$store.getters["user/worksTotal"];
    },
    userBanners() {
      return this.$store.getters["user/userBanners"];
    },
    widgets(){
      return this.$store.getters['executor/widgets']
    },
    profile(){
      return this.$store.getters['executor/profile']
    }
  },

  watch: {},
  methods: {
    ...mapActions('user', [
      'fetchUserTasks',
      'fetchUserWorks',
      'fetchBanners',
      'acceptInviteTask',
      'requestTask',
      'cancelTask'
    ]),
    ...mapActions('executor',['fetchWidgets','fetchProfile','fetchAvaibility']),

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

  async created() {
    await this.fetchUserTasks({params: {}, concat: false});
    await this.fetchUserWorks({params: {}, concat: false});
    await this.fetchBanners();
    await this.fetchWidgets();
    await this.fetchProfile();
    await this.fetchAvaibility()

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
