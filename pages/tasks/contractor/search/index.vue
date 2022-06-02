<template lang="pug">
.rq-tasks__executor-search
  .mobile
    .mobile__header
      .mobile__header-title
        .mobile__header-title-text Поиск работы

      mSearchLine.mobile__header-search
      mContentDisplayController.mobile__header-display-ctrl

    mTasksFilter

  .desktop
    h1 Поиск работы
    TasksFilter
    ContentDisplayController.desktop__content-display-ctrl

  TasksList.search__task-list(:tasks="searchTasks")
</template>

<script>
import { mapActions, mapGetters, } from 'vuex';
import ContentDisplayController from '@/components/pages/tasks/executor/search/ContentDisplayController/desktop';
import mContentDisplayController from '@/components/pages/tasks/executor/search/ContentDisplayController/mobile';
import TasksFilter from '@/components/pages/tasks/executor/search/TasksFilter/desktop';
import mTasksFilter from '@/components/pages/tasks/executor/search/TasksFilter/mobile';
import TasksList from '@/components/pages/tasks/executor/search/TasksList';
import mSearchLine from '@/components/pages/tasks/executor/search/SearchLine';

export default {
  components: {
    ContentDisplayController,
    mContentDisplayController,
    TasksFilter,
    mTasksFilter,
    TasksList,
    mSearchLine,
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
.rq-tasks__executor-search {
  .desktop {
    display: block;
    max-width: 1272px;

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

      &-title {
        &-text {
          font-family: 'Source Sans Pro';
          font-style: normal;
          font-weight: 700;
          font-size: 24px;
          line-height: 125%;
          color: #FFFFFF;
        }

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
