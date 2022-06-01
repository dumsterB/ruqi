<template lang="pug">
.rq-tasks__executor-search
  .mobile
    .mobile__header
      mContentDisplayController

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

export default {
  components: {
    ContentDisplayController,
    mContentDisplayController,
    TasksFilter,
    mTasksFilter,
    TasksList,
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
      background: #0082DE;
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
