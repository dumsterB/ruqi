<template lang="pug">
  .inner-tasks-page
    v-container
      v-row.d-flex(no-gutters)
        v-col(cols="12")
          .filter-row.d-flex.pa-5.justify-space-between(:class="{ 'search-is-focus': isSearchFocus }")
            .filter-row-left.d-flex
              v-btn.btn-blue.add(text, height="48", outlined, @click="addTask")
                v-icon mdi-plus
                span новая заявка

              TasksFilter.ml-8(:status_list="status_list" v-if="status_list" @applyFilter="applyFilter('fetchTaskParams', 'headerOptionsTask', ...arguments)")

              TableFilter.ml-8.mr-5(v-if="tasks_filters.length"
                :fields="tasks_filters"
                :headers="headers_tasks_filter"
                name="filter_tasks"
                page_uuid="tasks"
                @applyFilter="applyFilter('fetchTaskParams', 'headerOptionsTask', ...arguments)" @blurSearch="blurSearch" @focusSearch="focusSearch")

              .filter-col-after-left
                TableGroupAction(v-if="selectedItems.length"
                  :actions="groupListAction" :selected="selectedItems"
                  @selectAction="isConfirmModal = true" @clearSelected="clearSelected")

          .table-row(v-infinite-scroll="loadMore")
            .table-list-style.minify-header
              .minify-header-substrate

              v-data-table.elevation-0(
                :headers="headers",
                :items="requests",
                item-key="uuid"
                hide-default-footer,
                show-select,
                disable-pagination
                :options.sync="headerOptionsTask"
                v-model="selectedItems"
              )
                template(v-slot:item.actions="{ item }")
                  .d-flex.justify-end.card-actions
                    v-menu(
                      bottom,
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
                          .mx-auto.text-left.card-action.card-action-task(v-for="action in actions_tasks")
                            div(v-if="detectedPin(action.action, item.uuid)")
                              v-menu(
                                open-on-hover right offset-x
                                v-if="action.sub_actions"
                                content-class="card-actions-menu"
                              )
                                template(v-slot:activator="{ on, attrs }")
                                  a.d-flex.justify-space-between(v-bind="attrs" v-on="on")
                                    div
                                      v-icon {{ action.icon }}
                                      span {{ action.text }}
                                    v-icon mdi-menu-right
                                v-card
                                  v-list-item-content.justify-start
                                    .mx-auto.text-left.card-action(v-for="(sub_action, index) in action.sub_actions" :key="index")
                                      a.select-status(@click.prevent="callAction(action.action, [item.uuid], sub_action.params)")
                                        v-icon(:color="sub_action.color") {{ sub_action.icon }}
                                        span.select-status-title {{ sub_action.text }}

                              a(@click.prevent="callAction(action.action, [item.uuid])" v-else)
                                v-icon {{ action.icon }}
                                span {{ action.text }}

                template(v-slot:item.name="{ item }")
                  div.d-flex.align-center(@click="openRequest(item.uuid)")
                    v-icon(color="#BCC8D4").mr-2 {{ returnIconShift(item.shift)}}
                    span {{ item.name }}

                template(v-slot:item.object="{ item }")
                  span {{ item.object.name }}

                template(v-slot:item.status="{ item }")
                  TaskStatus(:status_alias="item.status")

                template(v-slot:item.rate="{ item }")
                  span.request-pay(v-if="item.rate") {{ item.rate }} р. / смену

                template(v-slot:item.until_date="{ item }")
                  .task-date(v-if="item.until_date")
                    .date {{ parseDate({ date: item.until_date.substr(0, 10), type: 'date' }) }}
                    .time {{ item.until_date.substr(11, 5) }}

                template(v-slot:item.completion="{ item }")
                  Occupationbar(
                    :completed="item.completion.completed",
                    :total="item.completion.total"
                  )





    Confirm(
      :isConfirmModal="isConfirmModal",
      :content="confirmModalContent",
      @confirmRemove="confirmRemove"
    )


</template>

<script>
import {mapState, mapActions, mapGetters, mapMutations} from "vuex";
import TableFilter from "@/components/composite/TableFilter";
import TableGroupAction from "@/components/composite/TableGroupAction";
import TaskStatus from "@/components/pages/tasks/TaskStatus";
import TasksFilter from "@/components/pages/tasks/TasksFilter";

export default {
  meta: {
    title: "Заявки",
  },
  components: {TableFilter, TableGroupAction, TaskStatus, TasksFilter},
  data() {
    return {
      title: "Заявки",
      title_size: "big",
      title_create: true,
      title_page_create: "create",
      defSort: [{name: "Все", uuid: "0000"}],
      selectObject: null,
      sortObject: [],
      page: 1,
      pageCount: 0,
      itemsPerPage: 5,
      selected: [],
      avatarColor: "#EFCD4F",
      headers: [
        {
          text: "",
          value: "actions",
          sortable: false,
          width: "30px",
          class: "actions",
          align: "center",
        },
        {text: "название заявки", align: "start", value: "name"},
        {text: "Ставка", value: "rate"},
        {text: "Объект", value: "object"},
        {text: "Статус", value: "status", width: "184px"},
        {text: "Набор", value: "until_date", width: "132px"},
        {text: "Наполнение", value: "completion", width: "152px"},
      ],
      headers_tasks_filter: [
        {field: 'rate', translit: 'Ставка', unit: 'р.'},
        {field: 'percent', translit: 'Наполнение', unit: '%'},
      ],
      headerOptionsTask: {},
      groupListAction: [
        {text: 'Удалить', action: 'delete'},
      ],
      selectedItems: [],
      isSearchFocus: 0,
      isConfirmModal: false,
      confirmModalContent: {
        title: "Удалить?",
        description: "",
        text_btn_ok: "Да",
        text_btn_cancel: "Отмена",
      },
      removedUUID: '',
      fetchTaskParams: {
        "page": 1,
        "per_page": 15
      },
      actions_tasks: [
        {text: "Закрепить", icon: "mdi-pin-outline", action: 'onPinTabClicked'},
        {text: "Открепить", icon: "mdi-pin-off-outline", action: 'onUnpinTabClicked'},
        {text: "Создать копию", icon: "mdi-content-copy", action: 'copyTask'},
        {text: "Перейти к объекту", icon: "mdi-exit-to-app", action: 'goToObject'},
        {text: "Пометить на удаление", icon: "mdi-close-box-outline", action: 'markForDeletion'},
        {text: "История изменений", icon: "mdi-timer-sand-empty", action: 'goToHistory'},
        {text: "Редактировать", icon: "mdi-pencil-outline", action: 'editTask'},
        {
          text: "Изменить статус", icon: "mdi-email-outline", action: 'editStatus',
          sub_actions: [
            {text: "Ведется набор", icon: "mdi-circle", params: 'isRecruiting', color: '#F4D150'},
            {text: "Набор завершен", icon: "mdi-circle", params: 'recruitmentCompleted', color: '#71D472'},
            {text: "Потверждение выхода", icon: "mdi-circle", params: 'working', color: '#D7D7D7'},
            {text: "Работы завершены", icon: "mdi-circle", params: 'workingCompleted', color: '#7B61FF'},
            {text: "Согласование", icon: "mdi-circle", params: 'agreement', color: '#EB4D3D'},
            {text: "Завершена", icon: "mdi-circle", params: 'completed', color: '#71D472'},
          ],
        },
      ],
      meta_filters: [
        {
          type: 'FTypeSelectUIID',
          label: '',
          col: 4,
          name: 'filter_status',
          params: {
            options: [
              {name: 'Создана', uuid: '1'},
              {name: 'В работе', uuid: '2'},
            ],
            item_text: 'name',
            label: 'Не выбрано'
          },
          validation: [],
          value: ''
        },
        {
          type: 'FTypeDatePeriod',
          label: '',
          col: 5,
          name: 'filter_period',
          validation: [],
          value: ''
        },
      ]
    };
  },
  computed: {
    ...mapGetters("rqTabs", [
      'RQ_TABS_TASKS',
    ]),

    user() {
      return this.$store.getters["user/user"];
    },

    isCreate() {
      if (this.user.type == "superManager" || this.user.type == "manager") {
        return true;
      } else {
        return false;
      }
    },

    requests() {
      return this.$store.getters["requests/requests"];
    },

    tasks_filters_server() {
      return this.$store.getters["requests/tasks_filters"];
    },

    tasks_filters() {
      const filters = this.tasks_filters_server,
        new_filters = filters.filter(obj => obj.field != 'status' && obj.field != 'until_date');

      return new_filters;
    },

    status_list(){
      const filters = this.tasks_filters_server,
      status_list = filters.filter(obj => obj.field == 'status');

       if(status_list.length > 0){
         return status_list[0].options;
       }else{
         return [];
       }
    },

    objects() {
      return this.$store.getters["objects/objects"];
    },

    itemsPerPageTable() {
      if (this.itemsPerPage) {
        return parseInt(this.itemsPerPage, 10);
      } else {
        return 1;
      }
    },

    postBody() {
      let object = this.selectObject;
      console.log(object);
      if (object == "0000") {
        object = "";
      }
      let postBody = {
        object: object,
        sort: "name",
        order: "asc",
      };
      console.log(postBody);
      return postBody;
    },

    selectedItemsUUID() {
      let uuids = [];

      for (let i = 0; i < this.selectedItems.length; i++) {
        uuids.push(this.selectedItems[i].uuid);
      }

      return JSON.stringify(uuids);
    },

  },

  watch: {
    headerOptionsTask: {
      handler() {
        this.getDataFromApi('fetchTaskParams', 'headerOptionsTask', 'fetch');
      },
      deep: true,
    },

  },

  methods: {
    ...mapActions("requests", ['fetch', 'copyRequest', 'removeRequest',]),
    ...mapActions("request_id", ["putStatus"]),
    ...mapActions("objects", ['fetchObjects']),
    ...mapActions("rqTabs", [
      'addRqTabsTaskNew',
      'setRqTabsTaskActive',
      'pinRqTabTasks',
      'unPinRqTabTasks',
      'setRqTabTasksList',
      'closeRqTabTasks'
    ]),

    openRequest(id) {
      this.$router.push("/tasks/" + id);
    },

    setItemsPerPage(value) {
      this.itemsPerPage = value;
    },

    setCurrentPage(value) {
      this.page = value;
    },

    filter() {
      const newRequet = this.postBody;
      this.fetch({params: newRequet});
    },

    addTask() {
      this.$router.push('/tasks/create');
    },

    applyFilter(fetchParams, watcherParams, filter, search) {
      this[fetchParams].value = search;
      this[fetchParams].filters = filter;

      let sorting = this[watcherParams].sortBy[0];

      let params = {
        "settings": {
          "value": search,
          //"sort": this[watcherParams].sortBy[0]  ? this[watcherParams].sortBy[0] : 'name',
          //"order": this[watcherParams].sortDesc[0] ? 'asc' : 'desc',
          "filters": filter
        }
      };

      if (sorting){
        params.settings.sort = this[watcherParams].sortBy[0];
        params.settings.order = this[watcherParams].sortDesc[0] ? 'asc' : 'desc';
      }

      console.log('params-----', filter, params, );

      this.fetch({params: params, concat: false, unit: false});
    },

    getDataFromApi(fetchParams, watcherParams, action) {

      let sorting = this[watcherParams].sortBy[0];

      console.log('"filters": this[fetchParams].filters', this[fetchParams].filters);

      let params = {
        "settings": {
          "value": this[fetchParams].value,
          //"sort": this[watcherParams].sortBy[0],
          //"order": this[watcherParams].sortDesc[0] ? 'asc' : 'desc',
          "filters": this[fetchParams].filters,
        }
      };

      if (sorting){
        params.settings.sort = this[watcherParams].sortBy[0];
        params.settings.order = this[watcherParams].sortDesc[0] ? 'asc' : 'desc';
      }

      this[action]({
        params: params,
        concat: false,
        unit: false
      }).then(data => {
        this[fetchParams].page = 1;
        console.log('пришел ответ')
      })
    },

    clearSelected() {
      this.selectedItems = [];
    },

    confirmRemove(confirm) {
      if (confirm) {
        this.removeRequest(this.selectedItemsUUID);
      }
      this.isConfirmModal = false;
    },

    focusSearch() {
      this.isSearchFocus = 1;
    },

    blurSearch() {
      this.isSearchFocus = 0;
    },

    loadMore() {

      let fetchParams = 'fetchTaskParams',
        sortOptions = 'headerOptionsTask',
        action = 'fetch';

      this[fetchParams].page += 1;
      this[fetchParams].sort = this[sortOptions].sortBy[0];
      this[fetchParams].order = this[sortOptions].sortDesc[0] ? 'asc' : 'desc';

      const params = this[fetchParams];

      this[action]({requestId: this.$route.params.id, params: params, concat: true, unit: false});

    },

    parseDate: (payload = {}) => {
      let date = payload.date.split("-");

      if (payload.type === "date") {
        return `${date[2]}.${date[1]}`;
      }
    },

    async updateFiled(field, value) {
      //this.formValues[field] = value;
      console.log(field, value)

      await this.fetch({
        params: {},
        concat: false,
        unit: true
      });

    },

    returnIconShift(shift) {
      if (shift == 'Дневная') {
        return 'mdi-white-balance-sunny';
      } else {
        return 'mdi-moon-waning-crescent';
      }
    },

    callAction(action, uuids, params) {
      console.log(action, uuids);
      this[action](uuids, params);
    },

    editTask(TaskId) {
      this.$router.push("/tasks/" + TaskId[0] + "/edit");
    },

    markForDeletion(TaskId){
      this.removeRequest([TaskId]);
    },

    goToObject(uuids){

      let task = this.requests.filter(obj => obj.uuid == uuids);
      if(task.length > 0){
        let object_uuid = task[0].object.uuid;
        this.$router.push("/objects/" + object_uuid);
      }
    },

    goToHistory(uuids){
      this.$router.push("/tasks/" + uuids[0] + "/history");
    },

    async editStatus(uuids, status) {
      await this.putStatus({requestId: uuids, status: status});
      this.fetch({params: {}, concat: false, unit: true});
    },

    copyTask(uuids) {
      this.copyRequest(uuids[0]);
    },

    async onPinTabClicked(uuids) {
      let fullPath = '/tasks/' + uuids[0],
        name = this.requests.filter(obj => obj.uuid == uuids[0])[0].name;

      let route = {
        path: fullPath,
        meta: {
          title: name
        },
        name: 'tasks-id',
        params: {
          id: uuids[0]
        },
        isPinned: false,
        isActive: true,
      }

      await this.addRqTabsTaskNew({route: route});
      await this.setRqTabsTaskActive({route: route});
      await this.pinRqTabTasks({rqTabTasks: uuids[0]});
    },

    async onUnpinTabClicked(uuids) {

      let fullPath = '/tasks/' + uuids[0],
        name = this.requests.filter(obj => obj.uuid == uuids[0])[0].name;

      let route = {
        path: fullPath,
        meta: {
          title: name
        },
        name: 'tasks-id',
        params: {
          id: uuids[0]
        },
        isPinned: false,
        isActive: true,
      }

      await this.unPinRqTabTasks({rqTabTasks: route});
      await this.closeRqTabTasks();

    },

    detectedPin(action, uuid){
      if(action != 'onPinTabClicked' && action != 'onUnpinTabClicked'){
        return true;
      }else{
        let isPinTask = this.RQ_TABS_TASKS.filter(obj => obj.params.id == uuid);

        if (action == 'onPinTabClicked' && isPinTask.length){
          return false;
        }else if(action == 'onPinTabClicked' && !isPinTask.length){
          return true;
        }

        if (action == 'onUnpinTabClicked' && isPinTask.length){
          return true;
        }
      }
    }

  },


  created() {
   // this.setRqTabsTaskActive({route: this.$route});
    this.setRqTabTasksList();
  },

  async mounted() {
    await this.fetch({params: {}, concat: false, unit: true});
    await this.fetchObjects();


    this.sortObject = this.defSort.concat(this.objects);
  },
};
</script>

<style lang="scss">
@import "../../assets/scss/colors";

.ruqi.page--tasks {
  padding: 0;
  background: #f5f5f5;

  .theme--light.v-application {
    background: #f5f5f5;
  }

  .inner-tasks-page {
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

  .card-actions-menu {
    .card-action-task{
      margin-bottom: 0;

      > div {
        margin-bottom: 12px;
      }
    }
  }

}

.request-pay {
  background: $light_blue;
  color: $blue;
  padding: 7px 8px;
  border-radius: 6px;
  font-size: 14px;
  font-weight: 700;
}

.select-status{
  display: flex;
  align-items: center;

  .v-icon{
    font-size: 11px;
  }
}

</style>
