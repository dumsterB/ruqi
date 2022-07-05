<template lang="pug">
  .rq-ptestl
    TasksList
      template( v-slot:desktop )
        .table-list-style
          v-data-table(
            :headers="headers"
            :items="tasks"
            item-key="uuid"
            hide-default-footer
            hide-default-header
            disable-pagination
            :options.sync="optionsFilter"
          )
            template( v-slot:item.name="{ item }" )
              div.rq-ptestl__desktop-name
                .rq-ptestl-title.color-black.mb-1 {{ item.name }}
                .rq-ptestl__desktop-date(v-if="item.start_date") {{ parseDate({ date: item.start_date.substr(0, 10), type: 'date' }) }} {{ item.start_date.substring(11, 16) }}

            template( v-slot:item.status="{ item }" )
              Status(:status="item.status")

            template( v-slot:item.rate="{ item }" )
              .color-black(v-if="item.rate") {{ item.rate }} р./смена

            template( v-slot:item.object="{ item }" )
              .object-task-info
                .object-task-info-subscribe
                  v-icon(v-if="item.subscribe" color="#F4D150") mdi-star
                  v-icon(v-if="!item.subscribe" color="#F4D150") mdi-star-outline
                .object-task-info-name {{ item.object.name}}

            template(v-slot:item.professions="{ item }")
              v-menu(
                bottom,
                rounded="10",
                offset-y,
                nudge-bottom="10",
                content-class="card-actions-menu"
                v-if="item.professions && item.professions.length > 0"
              )
                template(v-slot:activator="{ on }")
                  a.professions(v-on="on" @click.prevent) {{ item.professions[0] }}
                    span.count(v-if="item.professions && item.professions.length > 1") + {{item.professions.length - 1}}

                v-card.pa-5(v-if="item.professions && item.professions.length > 1")
                  .simple-list
                    div(v-for="(profession, index) in item.professions.slice(1)", :key="index") {{ profession }}

            template(v-slot:item.actions="{ item }")
              .d-flex.justify-end.card-actions(v-if="actionsList(item.status).length > 0")
                v-menu(
                  bottom,
                  left,
                  rounded="10",
                  offset-y,
                  nudge-bottom="10",
                  content-class="card-actions-menu"
                )
                  template(v-slot:activator="{ on }")
                    v-btn.actions-btn(icon, v-on="on")
                      v-icon mdi-dots-horizontal

                  v-card
                    v-list-item-content.justify-start
                      .mx-auto.text-left.card-action(v-for="action in actionsList(item.status)")

                        a(@click.prevent="callAction(action.action, [item.uuid])")
                          v-icon {{ action.icon }}
                          span {{ action.text }}


      template( v-slot:mobile )

        div(
          v-for="item in tasks"
          class="rq-ctwsr__mobile-card rq-ptestl-card"
        )
          .rq-ptestl-card__fields(v-if="item.name")
            .rq-ptestl-card__fields-item.rq-ptestl__mobile-title {{ item.name }}
            .rq-ptestl-card__fields-item
              Status(:status="item.status")
            .d-flex.rq-ptestl-card__fields-item
              .rq-ptestl__mobile-title-payment {{ item.rate }} р./смена
              .rq-ptestl__mobile-title-date.d-flex
                v-icon(size="18" color="#263043").mr-2 mdi-calendar-blank-outline
                .date(v-if="item.start_date") {{ parseDate({ date: item.start_date.substr(0, 10), type: 'date' }) }} {{ item.start_date.substring(11, 16) }}
            .rq-ptestl-card__fields-item.rq-ptestl__mobile-title-text(v-for="profession in item.professions") {{ profession }}
            .rq-ptestl-card__fields-item.rq-ptestl__mobile-title-object
              .object-task-info
                .object-task-info-subscribe
                  v-icon(v-if="item.subscribe" color="#F4D150") mdi-star
                  v-icon(v-if="!item.subscribe" color="#F4D150") mdi-star-outline
                .object-task-info-name {{ item.object.name}}

          .rq-ptestl-card__actions(v-if="actionsList(item.status).length > 0")
            v-menu(
              bottom
              rounded="10"
              offset-y
              nudge-bottom="10"
              right
              content-class="card-actions-menu"
            )
              template(v-slot:activator="{ on }")
                v-btn.actions-btn(icon, v-on="on")
                  v-icon mdi-dots-horizontal

              v-card
                v-list-item-content.justify-start
                  .mx-auto.text-left.card-action(v-for="action in actionsList(item.status)")

                    a(@click.prevent="callAction(action.action, [item.uuid])")
                      v-icon {{ action.icon }}
                      span {{ action.text }}



</template>

<script>
import TasksList from '@/components/composite/TableWithSeparatedRows';
import Status from '@/components/UI/Status';

export default {
  components: {
    TasksList,
    Status,
  },
  props: {
    tasks: {
      type: Array,
      required: true,
    },
  },

  data() {
    return {
      headers: [
        {text: 'Название', align: 'start', value: 'name',},
        {text: 'status', align: 'start', value: 'status', sortable: false,},
        {text: 'оплата', value: 'rate'},
        {text: 'Профессии', value: 'professions'},
        {text: 'Объект', value: 'object'},
        {text: '', value: 'actions', sortable: false, align: 'right'},
      ],
      optionsFilter: {},
    }
  },

  computed: {},

  watch: {
    optionsFilter: {
      handler() {
        console.log('Serverside sorted .....');
        this.$emit('getDataFromApi', this.optionsFilter);
      },
      deep: true,
    },
  },
  methods: {
    actionsList(status) {
      let actions = [];

      if (status == 'isRecruiting' || !status) {
        actions = [
          {text: "Участвовать", icon: "mdi-check", action: 'requestTaskAction'},
          {text: "Подробнее о заявке", icon: "mdi-clipboard-account-outline", action: 'openDetails'},
        ];
      }
      else if (status == 'open') {
        actions = [
          {text: "Участвовать", icon: "mdi-check", action: 'requestTaskAction'},
        ];
      } else if (status == 'accepted') {
        actions = [
          {text: "Отказаться", icon: "mdi-close-box-outline", action: 'refuseTaskAction', },
        ];
      } else if (status == 'invited') {
        actions = [
          {text: "Принять", icon: "mdi-check", action: 'acceptInviteTaskAction', },
          {text: "Отказаться", icon: "mdi-close-box-outline", action: 'refuseTaskAction', },
        ]
      } else if (status == 'requested') {
        actions = [
          {text: "Отменить", icon: "mdi-close-box-outline", action: 'cancelTaskAction',},
        ];
      }else if (status == 'working') {
        actions = [
          {text: "Отказаться", icon: "mdi-close-box-outline", action: 'refuseTaskAction',},
        ];
      }

      return actions;
    },

    callAction(action, uuid) {
      console.log(action, uuid);
      this.$emit('callAction', {action, uuid})
    },

    parseDate: (payload = {}) => {
      let date = payload.date.split("-");

      if (payload.type === "date") {
        return `${date[2]}.${date[1]}.${date[0]}`;
      }
    },

  },


  created() {
  },
  mounted() {

  },
}
</script>

<style lang="scss">
.rq-ptestl {
  &__desktop {
    &-name {
      min-width: 280px;
      max-width: 382px;
    }
  }

  &__mobile {
    &-title {
      font-style: normal;
      font-weight: 600;
      font-size: 16px;
      line-height: 125%;

      &-object {
        font-size: 14px;
        font-weight: 600;
      }

      &-payment {
        font-weight: 700;
        font-size: 16px;
        color: #263043;
        margin-right: 16px;
      }

      &-date {
        font-weight: 600;
        font-size: 16px;
        color: #263043;
      }

      &-text {
        font-size: 14px;
        line-height: 125%;
        color: #666666;
      }
    }
  }

  &-title {
    white-space: normal;
    font-style: normal;
    font-weight: 600;
    font-size: 16px;
    line-height: 125%;
  }

  &-card {
    display: flex;
    flex-wrap: nowrap;
    flex-direction: row;
    align-content: center;
    justify-content: center;
    width: calc(100% - 32px);
    margin: 0 16px 16px 16px;

    &__fields {
      flex: 1;

      &-item {
        margin-top: 16px;

        &:first-child {
          margin-top: 0;
        }
      }
    }

    &__actions {
    }
  }

  .professions {
    color: #666;
  }

  .object-task-info {
    display: flex;
    align-items: center;
    line-height: 1;

    .object-task-info-subscribe {
      margin-right: 6px;
    }
  }

  .actions-btn{
    background: #fff;
  }

}

</style>
