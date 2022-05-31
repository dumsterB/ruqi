<template lang="pug">
.rq-tasks__executor-search
  .mobile
    mContentDisplayController
    mTasksFilter

  .desktop
    h1 Поиск работы
    TasksFilter
    ContentDisplayController

  TasksList(:tasks="searchTasks")
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
    ...mapActions( 'user', [
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
  }

  .mobile {
    display: none;
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
