<template lang="pug">
.rq-tasks__executor-search
  mContentDisplayController
  TasksFilter
  ContentDisplayController
  mTasksFilter
  TasksList
  mTasksList
</template>

<script>
import ContentDisplayController from '@/components/pages/tasks/executor/desktop/ContentDisplayController';
import mContentDisplayController from '@/components/pages/tasks/executor/mobile/mContentDisplayController';
import TasksFilter from '@/components/pages/tasks/executor/desktop/TasksFilter';
import mTasksFilter from '@/components/pages/tasks/executor/mobile/mTasksFilter';
import TasksList from '@/components/pages/tasks/executor/desktop/TasksList';
import mTasksList from '@/components/pages/tasks/executor/mobile/mTasksList';

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

}
</style>
