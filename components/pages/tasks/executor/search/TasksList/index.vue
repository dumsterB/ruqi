<template lang="pug">
.rq-ptestl
  TasksList
    template( v-slot:desktop )
      div.rq-ctwsr__row(
        v-for="task in tasks"
        :class="['testld-item']"
      )
        div(data-index="0")
          div {{ task.info.name }}

        div(data-index="1")
          div {{ task.my_status_name }}

        div(data-index="2")
          div {{ task.info.payment.value }}

        div(data-index="3")
          div {{ task.info.description }}

        div(data-index="4")
          div {{ task.info.name }}

        div(data-index="5")
          v-menu(
              bottom
              rounded="10"
              offset-y
              nudge-bottom="10"
              left
            )
              template(v-slot:activator="{ on }")
                v-btn(icon v-on="on")
                  v-icon mdi-dots-vertical

              v-card
                v-list-item-content.justify-start
                  .mx-auto.text-left
                    .actions
                      .action
                        .action-item {{ 'action-item' }}
                        .action-item {{ 'action-item' }}
                        .action-item {{ 'action-item' }}
</template>

<script>
import TasksList from '@/components/composite/TableWithSeparatedRows';

export default {
  components: {
    TasksList,
  },
  props: {
    tasks: {
      type: Array,
      required: true,
    }
  },
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
  mounted() {
    console.debug('mounted TasksList', this.tasks);
  },
}
</script>

<style lang="scss">
.testld-item {
  display: table-row;
  align-items: center;

  &>div {
    display: table-cell;
    vertical-align: middle;

    &>[data-index="0"] {
      width: 100%;
      display: flex;
      justify-content: center;
      flex-wrap: nowrap;
      align-content: center;
      align-items: center;
      flex-direction: column;
    }

    &>[data-index="1"] {
      width: 100%;
      display: flex;
      justify-content: center;
      color: #05111A;
    }

    &>[data-index="2"] {
      width: 100%;
      display: flex;
      justify-content: center;
    }

    &>[data-index="3"] {
      width: 100%;
      display: flex;
      justify-content: center;
    }

    &>[data-index="4"] {
      width: 100%;
      display: flex;
      justify-content: center;
    }

    &>[data-index="5"] {
      width: 100%;
      display: flex;
      justify-content: center;
    }

    &>[data-index="6"] {
      width: 100%;
      display: flex;
      justify-content: center;
      cursor: pointer;
    }

    &>[data-index="7"] {
      width: 100%;
      display: flex;
      justify-content: center;
    }

    &>[data-index="8"] {
      width: 100%;
      display: flex;
      justify-content: center;
    }
  }
}
</style>
