<template lang="pug">
.rq-home-executor
  .mobile
    .mobile__header
      .mobile__header-container
        mUserbar.mobile__header-userbar
        .mobile__header-widgetbar
        mContentDisplayController.mobile__header-display-ctrl

  .desktop
    Userbar.desktop-userbar
    ContentDisplayController.desktop__content-display-ctrl

  TasksList.search__task-list(:tasks="searchTasks")
</template>

<script>
import { mapActions, mapGetters, } from 'vuex';
import ContentDisplayController from '@/components/pages/tasks/executor/search/ContentDisplayController/desktop';
import mContentDisplayController from '@/components/pages/tasks/executor/search/ContentDisplayController/mobile';
import TasksFilter from '@/components/pages/tasks/executor/search/TasksFilter/desktop';
import mTasksFilter from '@/components/pages/tasks/executor/search/TasksFilter/mobile';
import mSearchLine from '@/components/pages/tasks/executor/search/SearchLine';

import TasksList from './TasksList';
import Userbar from './Userbar/desktop';
import mUserbar from './Userbar/mobile';


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
  },

  props: {},
  data: () => ({}),
  computed: {
    ...mapGetters('user', [
      'searchTasks',
    ]),
  },

  watch: {},
  methods: {
    ...mapActions('user', [
      'fetchSearchTasks',
    ]),

    /* GETTERS */
    /* SETTERS */
    /* HANDLERS */
    /* HELPERS */
  },

  created() {
    this.fetchSearchTasks()
  },
  mounted() { },
}
</script>

<style lang="scss">
.rq-home-executor {
  .desktop {
    display: block;
    //max-width: 1272px;

    &-userbar {
      margin-top: 28px;
    }

    &__content-display-ctrl {
      margin-top: 32px;
    }
  }

  .mobile {
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
          width: 344px;
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

  @media screen and (max-width: 768px) {
    .desktop {
      display: none;
    }

    .mobile {
      display: block;
    }
  }
}
</style>
