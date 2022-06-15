<template lang="pug">
  .inner-task-page
    v-container
      v-row.d-flex.pa-4.action-row(no-gutters)
        v-col.d-flex.w-100.align-center(cols="12")
          .wrap-tabs
            v-tabs.form-tabs-minify(v-model="tab", hide-slider, height="36" )
              v-tab(v-for="(item, index) in tabs_list", :key="index" @click="selectedItems = []") {{ item.title }}
                span.count {{ item.count }}

          .filter-row.d-flex.justify-space-between(:class="{ 'search-is-focus': isSearchFocus }")
            .filter-row-left.d-flex
              TableFilter.ml-8(v-if="request_id_responses_filters.length > 0"
                v-show="tab == 0"
                :fields="request_id_responses_filters"
                :headers="headers_response_filter"
                name="filter_responses"
                :page_uuid="request_id.uuid"
                @applyFilter="applyFilter('fetchResponseParams', 'optionsResponse', ...arguments)" @blurSearch="blurSearch" @focusSearch="focusSearch")

              TableFilter.ml-8(v-if="request_id_selection_filters.length > 0"
                v-show="tab == 1"
                :fields="request_id_selection_filters"
                :headers="headers_response_filter"
                name="filter_selection"
                :page_uuid="request_id.uuid"
                @applyFilter="applyFilter('fetchSelectionParams', 'optionsSelection', ...arguments)" @blurSearch="blurSearch" @focusSearch="focusSearch")

              TableFilter.ml-8(v-if="request_id_invitations_filters.length > 0"
                v-show="tab == 2"
                :fields="request_id_invitations_filters"
                :headers="headers_response_filter"
                name="filter_invitations"
                :page_uuid="request_id.uuid"
                @applyFilter="applyFilter('fetchInvitationsParams', 'optionsInvitations', ...arguments)" @blurSearch="blurSearch" @focusSearch="focusSearch")

              TableFilter.ml-8(v-if="request_id_assigned_filters.length > 0"
                v-show="tab == 3"
                :fields="request_id_assigned_filters"
                :headers="headers_response_filter"
                name="filter_assigned"
                :page_uuid="request_id.uuid"
                @applyFilter="applyFilter('fetchAssignedParams', 'optionsAssigned', ...arguments)" @blurSearch="blurSearch" @focusSearch="focusSearch")

              .filter-col-after-left
                TableGroupAction(v-if="selectedItems.length > 0"
                  :actions="groupListAction" :selected="selectedItems"
                  @selectAction="changeConfirmModalContentAny(true)" @clearSelected="clearSelected")

            .filter-row-right.d-flex
              v-btn.btn-blue.add(
                text,
                height="48",
                outlined,
                @click="openTimesheet"
              )
                span табель

              .card-actions
                v-menu(
                  bottom,
                  offset-y,
                  nudge-bottom="10",
                  content-class="card-actions-menu"
                )
                  template(v-slot:activator="{ on }")
                    v-btn.actions-btn(icon, v-on="on", height="48px", width="48px")
                      v-icon mdi-dots-horizontal

                  v-card
                    v-list-item-content.justify-start
                      .mx-auto.text-left
                        .card-action(v-for="action in listAction")
                          a(@click.prevent="selectAction(action.id)")
                            v-icon mdi-{{ action.icon }}
                            span {{ action.title }}

      v-row.d-flex(no-gutters)
        v-col(cols="12")
          v-window(v-model="tab")
            v-tab-item(eager)
              Responses(:items="request_id_responses" :headers="headers" :options="optionsResponse"  :actions="actions_responses" @callAction="callAction" @setSelected="setSelected")

            v-tab-item(eager)
              Responses(:items="request_id_selection" :headers="headers_selection" :options="optionsResponse" :actions="actions_selection" :isAddElement="true" @addSelection="addArtist"  @callAction="callAction"  @setSelected="setSelected")

            v-tab-item(eager)
              Responses(:items="request_id_invitations" :headers="headers_invitations" :options="optionsResponse"  :actions="actions_invitations"  @callAction="callAction"  @setSelected="setSelected")

            v-tab-item(eager)
              Responses(:items="request_id_assigned" :headers="headers_assigned" :options="optionsResponse"  :actions="actions_assigned"  @callAction="callAction"  @setSelected="setSelected")


</template>

<script>
import {mapState, mapActions, mapGetters, mapMutations} from "vuex";
import Rating from "~/components/Rating";
import TableFilter from "@/components/composite/TableFilter";
import TableGroupAction from "@/components/composite/TableGroupAction";
import Responses from "@/components/pages/tasks/task/extended/Responses";
import Selection from "@/components/pages/tasks/task/extended/Selection";

export default {
  components: {Rating, TableFilter, TableGroupAction, Responses, Selection},
  props: [],
  data() {
    return {
      title: "Нужны кладовщики в Леруа",
      title_size: "large",
      title_create: false,
      title_page_create: "",
      tab: null,
      selectStatus: null,
      selectStatusOptions: [
        {
          id: "active",
          title: "Активна",
        },
        {
          id: "open",
          title: "Открыта",
        },
        {
          id: "close",
          title: "Закрыта",
        },
      ],
      avatarColor: "#36B368",
      avatarColorManager: "#D6D0FE",
      avatarRounded: "rounded",
      selectAction: [
        {
          id: "edit",
          title: "Редактировать",
        },
        {
          id: "copy",
          title: "Копировать",
        },
        {
          id: "delete",
          title: "Удалить",
        },
        {
          id: "close",
          title: "Закрыть",
        },
        {
          id: "open",
          title: "Открыть",
        },
        {
          id: "active",
          title: "Активная",
        },
      ],
      activeAction: null,
      itemSortStatus: ["Все", "Работает", "Готов к работе", "Неактивен"],
      itemSort: ["По рейтингу", "По дате"],
      page: 1,
      pageCount: 0,
      itemsPerPage: 5,
      selected: [],
      property1: true,
      property2: true,
      searchText: "",
      avatarBorderRadius: "rounded",
      headers: [
        {
          text: "",
          value: "actions",
          sortable: false,
          width: "30px",
          class: "actions",
          align: "center",
        },
        {text: "фио", align: "start", value: "fullname"},
        {text: "Возраст", value: "age", width: '112px'},
        {text: "%БН", value: "trust", width: '112px'},
        {text: "ранг", value: "rank", width: '112px'},
        {text: "на объекте", value: "on_object", width: '112px'},
        {text: "Статус", value: "status", width: '150px'},
        {text: "профессия", value: "professions"},
      ],
      headers_selection: [
        {
          text: "",
          value: "actions",
          sortable: false,
          width: "30px",
          class: "actions",
          align: "center",
        },
        {text: "фио", align: "start", value: "fullname"},
        {text: "Возраст", value: "age", width: '112px'},
        {text: "ранг", value: "rank", width: '112px'},
        {text: "%БН", value: "trust", width: '112px'},
        {text: "на объекте", value: "on_object", width: '112px'},
        {text: "Статус набора", value: "status", width: '150px'},
      ],
      headers_invitations: [
        {
          text: "",
          value: "actions",
          sortable: false,
          width: "30px",
          class: "actions",
          align: "center",
        },
        {text: "фио", align: "start", value: "fullname", width: '300px'},
        {text: "Возраст", value: "age", width: '107px'},
        {text: "%БН", value: "trust", width: '128px'},
        {text: "ранг", value: "rank", width: '107px'},
        {text: "Приглашен", value: "communication", width: '184px'},
        {text: "Статус", value: "status", width: '150px'},
      ],
      headers_assigned: [
        {
          text: "",
          value: "actions",
          sortable: false,
          width: "30px",
          class: "actions",
          align: "center",
        },
        {text: "фио", align: "start", value: "fullname", width: '300px'},
        {text: "Возраст", value: "age", width: '107px'},
        {text: "рейтинг", value: "trust", width: '128px'},
        {text: "ранг", value: "rank", width: '107px'},
        {text: "ставка", value: "rate", width: '107px'},
        {text: "Статус выхода", value: "status", width: '184px'},
        {text: "телефон", value: "phone",},
      ],
      headers_history: [
        {text: "Дата", value: "date"},
        {text: "Автор", value: "author"},
        {text: "Элемент", value: "element"},
        {text: "Изменение", value: "change"},
      ],

      actions_responses: [
        {text: "В назначенные", icon: "mdi-check", action: 'appoint'},
        {text: "Отклонить", icon: "mdi-close-box-outline", action: 'reject'},
        {text: "В карточку исполнителя", icon: "mdi-clipboard-account-outline", action: 'openDetails'},
      ],

      actions_selection: [
        {text: "Отправить приглашение", icon: "mdi-email-outline", action: 'invite',
          sub_actions: [
            { text: "SMS", icon: "mdi-message-processing", params: 'sms', },
            { text: "Telegram", icon: "mdi-message-processing", params: 'telegram', }
          ],
        },
        {text: "В карточку исполнителя", icon: "mdi-clipboard-account-outline", action: 'openDetails'},
        {text: "Удалить", icon: "mdi-close-box-outline", action: 'delete'},
      ],

      actions_invitations: [
        {text: "В назначенные", icon: "mdi-check", action: 'appoint'},
        {text: "В карточку исполнителя", icon: "mdi-clipboard-account-outline", action: 'openDetails'},
        {text: "Отправить приглашение", icon: "mdi-email-outline", action: 'invite',
          sub_actions: [
            { text: "SMS", icon: "mdi-message-processing", params: 'sms', },
            { text: "Telegram", icon: "mdi-message-processing", params: 'telegram', }
          ],
        },
      ],

      actions_assigned: [
        {text: "Поставить отказ", icon: "mdi-close-box-outline", action: 'refuse'},
        {text: "Карточка исполнителя", icon: "mdi-clipboard-account-outline", action: 'openDetails'},
        {text: "Можно приезжать", icon: "mdi-check", action: 'accepted'},
      ],

      isSearchFocus: false,

      /* data for Overlay of adding Performers START*/
      addPerformersOverlay: false,
      /* data for Overlay of adding Performers END*/

      dispatchMetod: "fetchRequestIdDispatchers",

      selectedItems: [],
      headers_response_filter: [
        {field: 'trust', translit: 'Благонадежность'},
        {field: 'age', translit: 'Возраст',},
        {field: 'on_object', translit: 'На объекте',},
        {field: 'rank', translit: 'Ранг',},
        {field: 'status', translit: 'Статус',},
      ],
      listAction: [
        {
          id: "edit",
          title: "Редактировать",
          icon: "pencil-outline",
        },
        {
          id: "delete",
          title: "Удалить",
          icon: "close-box-outline",
        },
      ],
      optionsResponse: {},
      optionsSelection: {},
      optionsInvitations: {},
      optionsAssigned: {},
      fetchResponseParams: {
        "page": 1,
        "per_page": 15
      },
      fetchSelectionParams: {
        "page": 1,
        "per_page": 15
      },
      fetchInvitationsParams: {
        "page": 1,
        "per_page": 15
      },
      fetchAssignedParams: {
        "page": 1,
        "per_page": 15
      },

    };
  },

  computed: {
    ...mapGetters("rqTabs", [
      'RQ_TABS_TASKS',
    ]),

    rqTab() {
      // console.debug('cmp RQ_TABS_TASKS', this.RQ_TABS_TASKS, this.$route.params); // DELETE

      const RQ_TABS_TASKS_FILTERED = this.RQ_TABS_TASKS.filter(
        (tab) => tab.params?.id === this.$route.params.id
      );

      return RQ_TABS_TASKS_FILTERED.length ? RQ_TABS_TASKS_FILTERED[0] : null;
    },

    user() {
      return this.$store.getters["user/user"];
    },
    itemsPerPageTable() {
      if (this.itemsPerPage) {
        return parseInt(this.itemsPerPage, 10);
      } else {
        return 1;
      }
    },
    request_id() {
      return this.$store.getters["request_id/request_id"];
    },
    request_id_responses() {
      return this.$store.getters["request_id_dispatchers/request_id_responses"];
    },
    request_id_selection() {
      return this.$store.getters["request_id_dispatchers/request_id_selection"];
    },
    request_id_invitations() {
      return this.$store.getters["request_id_dispatchers/request_id_invitations"];
    },
    request_id_assigned() {
      return this.$store.getters["request_id_dispatchers/request_id_assigned"];
    },
    request_id_responses_filters() {
      return this.$store.getters["request_id_dispatchers/request_id_responses_filters"];
    },
    request_id_selection_filters() {
      return this.$store.getters["request_id_dispatchers/request_id_selection_filters"];
    },
    request_id_invitations_filters() {
      return this.$store.getters["request_id_dispatchers/request_id_invitations_filters"];
    },
    request_id_assigned_filters() {
      return this.$store.getters["request_id_dispatchers/request_id_assigned_filters"];
    },
    request_id_history() {
      return this.$store.getters["request_id_dispatchers/request_id_history"];
    },
    tabContent() {
      if (this.tab < 4) {
        return 0;
      } else if (this.tab == 4) {
        return 1;
      } else if (this.tab == 5) {
        return 2;
      }
    },

    tabs_list() {
      return [
        {title: "Отклики", count: this.request_id_responses.length},
        {title: "Подбор", count: this.request_id_selection.length},
        {title: "Инвайт", count: this.request_id_invitations.length},
        {title: "Назначенные", count: this.request_id_assigned.length},
      ]
    },

    groupListAction() {
      let actions_list = [];

      if (this.tab == 0) {
        actions_list = [
          {text: "В назначенные", icon: "mdi-check", action: 'appoint'},
          {text: "Отклонить", icon: "mdi-close-box-outline", action: 'reject'},
        ]
      } else if (this.tab == 1) {
        actions_list = [
          {text: "Отправить приглашение", icon: "mdi-email-outline", action: 'invite'},
          {text: "Удалить", icon: "mdi-close-box-outline", action: 'delete'},
        ];
      } else if (this.tab == 2) {
        actions_list = [
          {text: "В назначенные", icon: "mdi-check", action: 'appoint'},
          {text: "Отменить", icon: "mdi-close-box-outline", action: 'delete'},
        ];
      } else if (this.tab == 3) {
        actions_list = [
          {text: "Поставить отказ", icon: "mdi-close-box-outline", action: 'refuse'},
          {text: "Можно приезжать", icon: "mdi-check", action: 'accepted'},
        ];
      }

      return actions_list;
    }
  },

  methods: {
    ...mapActions("request_id", ["fetchRequestId", "putStatus"]),
    ...mapActions("request_id_dispatchers", ["fetchRequestIdResponses", "fetchRequestIdSelection", "fetchRequestIdInvitations", "fetchRequestIdAssigned", "fetchRequestIdHistory"]),
    ...mapActions("request_id_dispatchers", ["acceptRequest", "rejectRequest", "appointExecutor", "rejectExecutor", "inviteExecutor", "deleteExecutor", "refuseExecutor", "acceptedExecutor"]),
    ...mapActions("contractors", [
      "getContractors",
      "setFilterRegion",
      "setFilterSpecialization",
      "setFilterProfessions",
      "setFilterPayments",
    ]),
    ...mapActions("requests", ["copyRequest", "removeRequest"]),
    ...mapActions("rqTabs", [
      'addRqTabsTaskNew',
      'setRqTabsTaskActive',
      'pinRqTabTasks',
      'unPinRqTabTasks',
    ]),

    /* HANDLERS */

    onPinTabClicked() {
      this.pinRqTabTasks({rqTabTasks: this.rqTab});
    },

    onUnpinTabClicked() {
      this.unPinRqTabTasks({rqTabTasks: this.rqTab});
    },

    updateSearchText(value) {
      this.searchText = value;
      this.fetchRequestIdResponses({
        requestId: this.$route.params.id,
        params: {name: value},
      });
    },

    openTimesheet() {
      this.$router.push("/tasks/" + this.request_id.uuid + "/timesheet");
    },

    changeStatus(status) {
      this.putStatus({requestId: this.request_id.uuid, status: status});
    },

    setItemsPerPage(value) {
      this.itemsPerPage = value;
    },

    setCurrentPage(value) {
      this.page = value;
    },

    addArtist() {
      this.$router.push("/tasks/" + this.request_id.uuid + "/selection");
    },

    closePerformersOverlay() {

      this.addPerformersOverlay = false;

      this.fetchRequestIdSelection({
        requestId: this.$route.params.id,
      });
      this.fetchRequestId(this.$route.params.id);

      this.setFilterRegion("");
      this.setFilterSpecialization("");
      this.setFilterProfessions("");
      this.setFilterPayments("");
    },

    applyFilter(fetchParams, watcherParams, filter, search) {
      this[fetchParams].value = search;
      this[fetchParams].filters = filter;

      let params = {
        "settings": {
          "value": search,
          /*"sort": this[watcherParams].sortBy[0],
          "order": this[watcherParams].sortDesc[0] ? 'asc' : 'desc',*/
          "filters": filter
        }
      };

      console.log('params-----', filter, params);

      if (this.tab == 0) {
        this.fetchRequestIdResponses({requestId: this.$route.params.id, params: params, concat: false, unit: false})
      } else if (this.tab == 1) {
        this.fetchRequestIdSelection({requestId: this.$route.params.id, params: params, concat: false, unit: false})
      } else if (this.tab == 2) {
        this.fetchRequestIdInvitations({requestId: this.$route.params.id, params: params, concat: false, unit: false})
      }else if (this.tab == 3) {
        this.fetchRequestIdAssigned({requestId: this.$route.params.id, params: params, concat: false, unit: false})
      }
    },

    clearSelected() {
      this.selectedItems = [];
    },

    focusSearch() {
      this.isSearchFocus = 1;
    },

    blurSearch() {
      this.isSearchFocus = 0;
    },

    callAction({action, uuids, params}) {
      console.log('callAction ------', action, uuids);
      this[action](uuids, params);
    },

    setSelected(selected) {
      console.log(selected);
      this.selectedItems = selected;
    },

    appoint(uuids) {
      console.log('В назначенные ------');
      this.appointExecutor({task_uuid: this.$route.params.id, user_uuids: uuids});
    },

    reject(uuids) {
      console.log('Отклонить ------');
      this.rejectExecutor({task_uuid: this.$route.params.id, user_uuids: uuids});
    },

    openDetails(uuids) {
      this.$router.push("/performers/" + uuids[0]);
    },

    invite(uuids, params) {
      this.inviteExecutor({task_uuid: this.$route.params.id, user_uuids: uuids, params: {variant: params}});
    },

    delete(uuids) {
      console.log('Отмена  ------');
      this.deleteExecutor({task_uuid: this.$route.params.id, user_uuids: uuids});
    },

    refuse(uuids) {
      console.log('Отказ ------');
      this.refuseExecutor({task_uuid: this.$route.params.id, user_uuids: uuids});
    },

    accepted(uuids) {
      console.log('Можно приезжать ------');
      this.acceptedExecutor({task_uuid: this.$route.params.id, user_uuids: uuids});
    }

  },
  watch: {
    activeAction: function (val) {
      if (val == "edit") {
        this.$router.push("/tasks/" + this.$route.params.id + "/edit");
      } else if (val == "delete") {
        this.$router.push("/tasks/");
        this.removeRequest(this.$route.params.id);
      } else if (val == "copy") {
        this.copyRequest(this.$route.params.id);
      } else {
        this.changeStatus(val);
        this.selectStatus = val;
      }
    },
    optionsResponse: {
      handler() {
        //this.getDataFromApi('fetchServiceParams', 'options', 'fetchObjectIdServices');
      },
      deep: true,
    },
  },

  async created() {
    await this.fetchRequestId(this.$route.params.id);
    await this.fetchRequestIdResponses({
      requestId: this.$route.params.id,
      params: {"page": 1},
      concat: false,
      unit: true
    });
    await this.fetchRequestIdSelection({
      requestId: this.$route.params.id,
      params: {"page": 1},
      concat: false,
      unit: true
    });
    await this.fetchRequestIdInvitations({
      requestId: this.$route.params.id,
      params: {"page": 1},
      concat: false,
      unit: true
    });
    await this.fetchRequestIdAssigned({
      requestId: this.$route.params.id,
      params: {"page": 1},
      concat: false,
      unit: true
    });
    await this.fetchRequestIdHistory({requestId: this.$route.params.id});

    this.selectStatus = this.request_id.status;

    this.$route.meta.title = this.request_id.name;

    this.addRqTabsTaskNew({route: this.$route}).then(
      () => this.setRqTabsTaskActive({route: this.$route})
    );
  },

  async mounted() {

  },
};
</script>

<style lang="scss">
@import "../../../assets/scss/colors";

.ruqi.page--tasks-id {
  padding: 0;
  background: #f5f5f5;

  .theme--light.v-application {
    background: #f5f5f5;
  }

  .inner-task-page {

    background: #fff;

    > .container {
      padding: 0;
    }
  }

  .v-main__wrap {
    > .container {
      padding: 0;
    }
  }
}

.bt-table-action {
  display: flex;
  align-items: center;
  margin-right: 24px;

  .v-btn {
    box-shadow: none;
    width: 40px;
    height: 40px;
    margin-right: 6px;
  }

  .text {
    font-weight: 700;
    font-size: 14px;
    text-transform: uppercase;
    color: $grey;
  }
}

.action-row {
  height: 80px;
}

.wrap-tabs {
  flex: 0;
}
</style>

