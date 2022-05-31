<template lang="pug">
.rq-tasks__executor-search
  .mobile
    mContentDisplayController
    mTasksFilter

  .desktop
    h1 Поиск работы
    TasksFilter
    ContentDisplayController

  TasksList(:tasks="tasks")
</template>

<script>
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
  computed: {},
  watch: {},
  methods: {
    /* GETTERS */
    /* SETTERS */
    /* HANDLERS */
    /* HELPERS */
  },

  data() {
    return {
      tasks: [
        {
          description: "тест",
          hours_left: 696,
          minutes_left: 57,
          name: "Подработка кладовщиком на складе полный день вторая строка",
          raiting: 4,
          start_date: "2022-04-01T09:00:00.000000Z",
          until_date: "2022-04-01T09:00:00.000000Z",
          object: {
            name: "Багрепорт 2",
            uuid: "19e737ec-a6c8-449b-bad0-e22c1853c4eb",
          },
          payment: {
            current: null,
            period: "за смену",
            value: "1800",
          },
        },
        {
          description: "тест",
          hours_left: 696,
          minutes_left: 57,
          name: "5 Сборщиков на 31.04",
          raiting: 4,
          start_date: "2022-04-01T09:00:00.000000Z",
          until_date: "2022-04-01T09:00:00.000000Z",
          object: {
            name: "Багрепорт 2",
            uuid: "19e737ec-a6c8-449b-bad0-e22c1853c4eb",
          },
          payment: {
            current: null,
            period: "за смену",
            value: "1800",
          },
        },
        {
          description: "тест",
          hours_left: 696,
          minutes_left: 57,
          name: "Подработка кладовщиком на складе полный день вторая строка",
          raiting: 4,
          start_date: "2022-04-01T09:00:00.000000Z",
          until_date: "2022-04-01T09:00:00.000000Z",
          object: {
            name: "Багрепорт 2",
            uuid: "19e737ec-a6c8-449b-bad0-e22c1853c4eb",
          },
          payment: {
            current: null,
            period: "за смену",
            value: "1800",
          },
        },
      ],
    }
  },
  created() {},
  mounted() {},
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
