<template lang="pug">
.rq-tasks__executor-search
  mContentDisplayController
  h1.desktop Поиск работы
  TasksFilter.desktop

  .desktop
    ContentDisplayController

  mTasksFilter
  TasksList
  mTasksList
</template>

<script>
import ContentDisplayController from '@/components/pages/tasks/executor/search/desktop/ContentDisplayController';
import mContentDisplayController from '@/components/pages/tasks/executor/search/mobile/mContentDisplayController';
import TasksFilter from '@/components/pages/tasks/executor/search/desktop/TasksFilter';
import mTasksFilter from '@/components/pages/tasks/executor/search/mobile/mTasksFilter';
import TasksList from '@/components/pages/tasks/executor/search/desktop/TasksList';
import mTasksList from '@/components/pages/tasks/executor/search/mobile/mTasksList';

export default {
  components: {
    ContentDisplayController,
    mContentDisplayController,
    TasksFilter,
    mTasksFilter,
    TasksList,
    mTasksList,
  },
  props: {},
  computed: {},
  watch: {},
  methods: {
    /* GETTERS */
    /* SETTERS */
    /* HANDLERS */
    /* HELPERS */
  },

  data() {
    return {}
  },
  created() {},
  mounted() {},
}
</script>

<style lang="scss">
.rq-tasks__executor-search {
  .desktop {
    display: block;
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
