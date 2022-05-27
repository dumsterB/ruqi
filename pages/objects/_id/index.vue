<template lang="pug">
  .inner-object-page
    v-container
      v-row.d-flex.pa-4.action-row.align-center(no-gutters)
        v-col(cols="10")
          v-tabs.form-tabs-minify.mt-1(v-model="tab", hide-slider, height="36")
            v-tab(v-for="(item, index) in tabs_list", :key="index") {{ item }}

        v-col.d-flex.justify-end(cols="2")
          v-select.select-status(
            v-model="selectStatus",
            :items="selectStatusOptions",
            item-text="title",
            item-value="id",
            single-line,
            outlined,
            filled,
            hide-details="true",
            return-object,
            color="E5F3FC",
            @input="changeStatus(selectStatus.id)"
          )
            template(slot="selection", slot-scope="data")
              v-icon.select-status-icon(:color="data.item.color", size="8px") mdi-circle
              span.select-status-title {{ data.item.title }}

            template(slot="item", slot-scope="data")
              v-icon.select-status-icon(:color="data.item.color", size="8px") mdi-circle
              span.select-status-title {{ data.item.title }}

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

      v-divider

      v-row.d-flex(no-gutters)
        v-col(cols="12")
          v-window(v-model="tab")
            v-tab-item(eager)
              .filter-row.d-flex.pa-5.justify-space-between(:class="{ 'search-is-focus': isSearchFocus }")
                .filter-row-left.d-flex
                  v-btn.btn-blue.add(
                    text,
                    height="48",
                    outlined,
                    @click="addService"
                  )
                    v-icon mdi-plus
                    span добавить услугу

                  TableFilter.ml-8(v-if="service_filters.length" :fields="service_filters" :headers="headers_services_filter" @applyFilter="applyFilter('fetchServiceParams', 'options', ...arguments)" @blurSearch="blurSearch" @focusSearch="focusSearch")

                .filter-row-right
                  .container-object-nds
                    .nds-title ндс текущий
                    .nds-value {{ object_id.vat }}%

              .table-row(v-infinite-scroll="loadMore")
                .table-list-style-minify
                  v-data-table.elevation-0(
                    :headers="headers_services",
                    :items="object_id_services",

                    hide-default-footer,
                    show-select,
                    disable-pagination
                    :options.sync="options"

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
                              .mx-auto.text-left.card-action
                                a(
                                  @click.prevent="editService(item.uuid, object_id.uuid)"
                                )
                                  v-icon mdi-pencil-outline
                                  span Редактировать

                              .mx-auto.text-left.card-action
                                a(@click.prevent="isConfirmModalService = 1, removedUUID = item.uuid")
                                  v-icon mdi-close-box-outline
                                  span Удалить

                    template(v-slot:item.description="{ item }")
                      .description {{ previewText(item.description) }}

                    template(v-slot:item.rate="{ item }")
                      .price {{ item.rate }} p.

                    template(v-slot:item.rate_with_vat="{ item }")
                      .rate
                        .rate-title {{ item.rate_with_vat }}
                        .rate-icon(v-if="item.rates && item.rates.length")
                          v-menu(
                            bottom,
                            offset-y,
                            nudge-bottom="10",
                            content-class="rate-menu"
                          )
                            template(v-slot:activator="{ on }")
                              v-btn(icon, v-on="on")
                                v-icon(color="#7A91A9", width="24") mdi-filter-variant

                            v-card
                              v-list-item-content.justify-start
                                .rate-list.mx-auto.text-left
                                  .rate-list-item(v-for="el in item.rates" :class="[el.difference == '=' ? 'current' : '']")
                                    .rate-item-title(v-if="el.difference == '='") Текущая
                                    .rate-list-item-date {{ parseDate({ date: el.start_date, type: 'date' }) }}
                                    .rate-list-item-price(
                                      :class="[el.rate > item.rate_with_vat ? 'up' : 'down']"
                                    )
                                      v-icon(v-if="el.rate < item.rate_with_vat && el.difference != '='") mdi-menu-down
                                      v-icon(v-if="el.rate > item.rate_with_vat && el.difference != '='") mdi-menu-up
                                      span {{ el.rate }}

                                  .rate-list-item-edit
                                    a(
                                      @click.prevent="editService(item.uuid, object_id.uuid)"
                                    )
                                      span Редактировать

                  FooterTable.my-8(
                    :itemsPerPage="itemsPerPage",
                    :pageCount="pageCountService",
                    :page="page",
                    @setItemsPerPage="setItemsPerPage",
                    @setCurrentPage="setCurrentPage"
                  )

            v-tab-item(eager)
              .filter-row.d-flex.pa-5.justify-space-between(:class="{ 'search-is-focus': isSearchFocus }")
                .filter-row-left.d-flex
                  v-btn.btn-blue.add(
                    text,
                    height="48",
                    outlined,
                    @click="addVacancy",
                    :disabled="isActiveAddVacancy"
                  )
                    v-icon mdi-plus
                    span добавить вакансию

                  TableFilter.ml-8.mr-5(v-if="vacancy_filters.length" :fields="vacancy_filters" :headers="headers_vacancies_filter" @applyFilter="applyFilter('fetchVacancyParams', 'headerOptionsVacancy', ...arguments)" @blurSearch="blurSearch" @focusSearch="focusSearch")

                .filter-row-right
                  .container-object-nds
                    .nds-title ндс текущий
                    .nds-value {{ object_id.vat }}%

              .table-row
                .table-list-style-minify
                  v-data-table.elevation-0(
                    :headers="headers_vacancies",
                    :items="object_id_vacancies",
                    hide-default-footer,
                    show-select,
                    disable-pagination
                    :options.sync="headerOptionsVacancy"
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
                              .mx-auto.text-left.card-action
                                a(@click.prevent="editVacancy(item.uuid)")
                                  v-icon mdi-pencil-outline
                                  span Редактировать

                              .mx-auto.text-left.card-action
                                a(@click.prevent="isConfirmModalVacancy = 1, removedUUID = item.uuid")
                                  v-icon mdi-close-box-outline
                                  span Удалить

                    template(v-slot:item.service="{ item }")
                      span {{ previewText(item.service.name) }}

                    template(v-slot:item.gender="{ item }")
                      span {{ item.gender == 'male' ? 'м' : item.gender == 'female' ? 'ж' : 'все' }}

                    template(v-slot:item.age="{ item }")
                      span {{ item.age_from }} - {{ item.age_to }}

                    template(v-slot:item.rate_with_vat="{ item }")
                      .rate
                        .rate-title {{ item.rate_with_vat }}
                        .rate-icon(v-if="item.rates && item.rates.length")
                          v-menu(
                            bottom,
                            offset-y,
                            nudge-bottom="10",
                            content-class="rate-menu"
                          )
                            template(v-slot:activator="{ on }")
                              v-btn(icon, v-on="on")
                                v-icon(color="#7A91A9", width="24") mdi-filter-variant

                            v-card
                              v-list-item-content.justify-start
                                .rate-list.mx-auto.text-left
                                  .rate-list-item(v-for="el in item.rates" :class="[el.difference == '=' ? 'current' : '']")
                                    .rate-item-title(v-if="el.difference == '='") Текущая
                                    .rate-list-item-date {{ parseDate({ date: el.start_date, type: 'date' }) }}
                                    .rate-list-item-price(
                                      :class="[el.rate > item.rate_with_vat ? 'up' : 'down']"
                                    )
                                      v-icon(v-if="el.rate < item.rate_with_vat && el.difference != '='") mdi-menu-down
                                      v-icon(v-if="el.rate > item.rate_with_vat && el.difference != '='") mdi-menu-up
                                      span {{ el.rate }}

                                  .rate-list-item-edit
                                    a(@click.prevent="editVacancy(item.uuid)") Редактировать

            v-tab-item(eager)
              .filter-row.d-flex.pa-5.justify-space-between(:class="{ 'search-is-focus': isSearchFocus }")
                .filter-row-left.d-flex
                  v-btn.btn-blue.add(text, height="48", outlined, @click="addTask")
                    v-icon mdi-plus
                    span новая заявка

                  TableFilter.ml-8.mr-5(:fields="task_filters" :headers="headers_tasks_filter" @applyFilter="applyFilter('fetchTaskParams', 'headerOptionsTask', ...arguments)" @blurSearch="blurSearch" @focusSearch="focusSearch")



              .table-row
                .table-list-style.minify-header
                  .minify-header-substrate

                  v-data-table.elevation-0(
                    :headers="headers",
                    :items="object_id_requests",
                    hide-default-footer,
                    show-select,
                    disable-pagination
                    :options.sync="headerOptionsTask"
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
                              .mx-auto.text-left.card-action
                                a(@click.prevent="editTask(item.uuid)")
                                  v-icon mdi-pencil-outline
                                  span Редактировать

                    template(v-slot:item.name="{ item }")
                      div(@click="openRequest(item.uuid)")
                        span.request-i
                        span.color-black {{ item.name }}

                    template(v-slot:item.pay="{ item }")
                      span.request-pay {{ item.payment.value }} {{ item.payment.current }} / {{ item.payment.period }}

                    template(v-slot:item.date="{ item }")
                      div(v-if="item.end_date") {{ parseDate({ date: item.end_date.substr(0, 10), type: 'date' }) }}

                    template(v-slot:item.completion="{ item }")
                      Occupationbar(
                        :completed="item.completion.completed",
                        :total="item.completion.total"
                      )

            v-tab-item(eager)
              v-container.object-info-container
                v-row
                  v-col(cols="12")
                    .object-info
                      v-row(no-gutters)
                        v-col.d-flex.justify-space-between(cols="12")
                          .object-info-header Данные объекта
                          .object-info-link
                            nuxt-link(
                              :to="'/objects/' + object_id.uuid + '/edit'"
                            ) Редактировать

                      v-row(no-gutters)
                        v-col(cols="12")
                          v-divider

                      v-row(no-gutters)
                        v-col(cols="12")
                          .object-info-row.d-flex.justify-space-between
                            .object-info-title Клиент
                            .object-info-value(v-if="object_id.account") {{ object_id.account.name }}

                          .object-info-row.d-flex.justify-space-between
                            .object-info-title Наше юр.лицо
                            .object-info-value(v-if="object_id.organization") {{ object_id.organization.name }}

                          .object-info-row.d-flex.justify-space-between
                            .object-info-title Название объекта
                            .object-info-value {{ object_id.name }}

                          .object-info-row.d-flex.justify-space-between
                            .object-info-title Вид объекта
                            .object-info-value(v-if="object_id.type") {{ object_id.type.name }}

                          .object-info-row.d-flex.justify-space-between
                            .object-info-title Специализация
                            .object-info-value(v-if="object_id.specialization") {{ object_id.specialization.name }}

                          .object-info-row.d-flex.justify-space-between
                            .object-info-title График работы
                            .object-info-value 8:00 - 18:00

                          .object-info-row.d-flex.flex-column
                            .object-info-title Описание
                            .object-info-value {{ object_id.description }}

                      v-row(no-gutters)
                        v-col(cols="12")
                          v-divider

                      v-row(no-gutters)
                        v-col.d-flex.justify-space-between.mb-8(cols="12")
                          .object-info-header Ответственные

                      v-row(no-gutters)
                        v-col(cols="12")
                          Contact(:contacts="object_id.managers")
                          Contact(:contacts="object_id.dispatchers")

            v-tab-item(eager)
              v-container.object-info-container
                v-row
                  v-col(cols="12")
                    .object-info
                      v-row(no-gutters)
                        v-col.d-flex.justify-space-between(cols="12")
                          .object-info-header Контакты
                          .object-info-link
                            nuxt-link(
                              :to="'/objects/' + object_id.uuid + '/edit'"
                            ) Редактировать

                      v-row(no-gutters)
                        v-col(cols="12")
                          v-divider

                      v-row(no-gutters)
                        v-col(cols="12")
                          Contact(
                            :contacts="object_id.contacts",
                            isSingleNameField="true"
                          )

            v-tab-item(eager)
              .table-row
                .table-list-style-nospacing.px-6
                  .minify-header-substrate

                  v-data-table.elevation-0.table-history(
                    :headers="headers_history",
                    :items="object_id_history",
                    item-key="uuid",
                    :page.sync="page",
                    :items-per-page="itemsPerPageTable",
                    hide-default-footer
                  )
                    template(v-slot:item.created_at="{ item }")
                      .table-history-date
                        div(v-if="item.created_at") {{ parseDate({ date: item.created_at.substr(0, 10), type: 'date' }) }}
                        div {{ item.created_at.substring(11, 19) }}

                    template(v-slot:item.author="{ item }")
                      .table-history-author(v-if="item.author") {{ item.author.name }}

                    template(v-slot:item.task="{ item }")
                      span(v-if="item.task") {{ item.task.name }}

                    template(v-slot:item.description="{ item }")
                      .table-history-change
                        .table-history-change-item(v-for="el in item.description")
                          div {{el.field}} - {{el.value}}

    Confirm(
      :isConfirmModal="isConfirmModal",
      :content="confirmModalContent",
      @confirmRemove="confirmRemove"
    )
    Confirm(
      :isConfirmModal="isConfirmModalService",
      :content="confirmModalContentService",
      @confirmRemove="confirmRemoveService"
    )
    Confirm(
      :isConfirmModal="isConfirmModalVacancy",
      :content="confirmModalContentVacancy",
      @confirmRemove="confirmRemoveVacancy"
    )
</template>

<script>
import {mapState, mapActions, mapGetters, mapMutations} from "vuex";
import Contact from "@/components/object/Contact";
import TableFilter from "@/components/composite/TableFilter";

export default {
  props: [],
  components: {Contact, TableFilter},
  data() {
    return {
      coords: [54, 39],
      title_size: "large",
      title_create: false,
      title_page_create: "",
      tabs_list: [
        "Услуги",
        "Вакансии",
        "Заявки",
        "Данные",
        "Контакты",
        "История",
      ],
      tab: 0,
      selectStatus: null,
      selectStatusOptions: [
        {
          id: "active",
          title: "Активен",
          color: "#71D472",
        },
        {
          id: "confirm",
          title: "Подтверждение",
          color: "#fad126",
        },
        {
          id: "inactive",
          title: "Неактивен",
          color: "#dadada",
        },
      ],
      avatarColor: "#36B368",
      avatarColorManager: "#D6D0FE",
      avatarRounded: "rounded",
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
        {
          id: "history",
          title: "История изменений",
          icon: "timer-sand-empty",
        },
      ],
      activeAction: null,
      itemSortStatus: ["Все", "Работает", "Готов к работе", "Неактивен"],
      page: 1,
      pageCountService: 0,
      pageCount: 0,
      itemsPerPage: 20,
      servicesPageCount: 1,
      vacanciesPageCount: 1,
      selectedItems: [],
      activeSelectAll: 0,
      activeSelectBtn: 0,
      property1: true,
      property2: true,
      searchText: "",
      avatarBorderRadius: "rounded",
      headers: [
        {text: "", value: "actions", sortable: false},
        {text: "Название", align: "start", value: "name"},
        {text: "Ставка", value: "pay"},
        {text: "Статус", value: "status", width: "184px"},
        {text: "Набор до", value: "date", width: "132px"},
        {text: "Наполнение", value: "completion", width: "152px"},
      ],
      headers_tasks_filter: [

      ],
      headers_services: [
        {
          text: "",
          value: "actions",
          sortable: false,
          width: "30px",
          class: "actions",
          align: "center",
        },
        {text: "Описание", value: "description", width: "200px"},
        {text: "Цена", value: "rate", width: "140px"},
        {text: "Цена с ндс", value: "rate_with_vat", width: "180px"},
        {text: "Норматив", value: "standart", width: "140px"},
        {text: "Юнит", value: "unit"},
      ],
      headers_services_filter: [
        {field: 'standart', translit: 'Норматив'},
        {field: 'rate', translit: 'Цена', unit: 'р.'},
        {field: 'rate_with_vat', translit: 'Цена с ндс', unit: 'р.'},
        {field: 'unit', translit: 'Юнит',},
        {field: 'age', translit: 'Возраст',},
      ],
      headers_vacancies: [
        {
          text: "",
          value: "actions",
          sortable: false,
          width: "30px",
          class: "actions",
          align: "center",
        },
        {text: "Вакансия", value: "name", width: "200px"},
        {text: "Услуга", value: "service", width: "200px"},
        {text: "пол", value: "gender", width: "120px"},
        {text: "возраст", value: "age", width: "120px"},
        {text: "ставка текущая", value: "rate", width: "140px"},
        {text: "ставка плановая", value: "rate_with_vat", width: "140px"},
      ],
      headers_vacancies_filter: [
        {field: 'driver_license', translit: 'Права'},
        {field: 'medical_book', translit: 'Медкнижка'},
        {field: 'stacker_license', translit: 'Права управления штабелером'},
        {field: 'patent', translit: 'Патент'},
        {field: 'rate', translit: 'Ставка текущая', unit: 'р.'},
        {field: 'rate_with_vat', translit: 'Ставка плановая', unit: 'р.'},
        {field: 'gender', translit: 'Пол'},
        {field: 'age', translit: 'Возраст'},
      ],
      headers_history: [
        {text: "Дата", value: "created_at", width: "120px"},
        {text: "Автор", value: "author", width: "200px"},
        {text: "Объект", value: "object",},
        {text: "Изменение", value: "description"},
      ],
      isConfirmModal: false,
      isConfirmModalService: false,
      isConfirmModalVacancy: false,
      removedUUID: '',
      confirmModalContent: {
        title: "Удалить этот объект?",
        description: "",
        text_btn_ok: "Удалить",
        text_btn_cancel: "Отмена",
      },
      confirmModalContentService: {
        title: "Удалить услугу?",
        description: "",
        text_btn_ok: "Удалить",
        text_btn_cancel: "Отмена",
      },
      confirmModalContentVacancy: {
        title: "Удалить вакансию?",
        description: "",
        text_btn_ok: "Удалить",
        text_btn_cancel: "Отмена",
      },
      fetchServiceParams: {
        "page": 1,
        "per_page": 15
      },
      fetchVacancyParams: {
        "page": 1,
        "per_page": 15
      },
      fetchTaskParams: {
        "page": 1,
        "per_page": 15
      },
      totalDesserts: 0,
      desserts: [],
      loading: true,
      options: {},
      headerOptionsVacancy: {},
      headerOptionsTask: {},
      isSearchFocus: false,
    };
  },
  watch: {
    options: {
      handler() {
        this.getDataFromApi('fetchServiceParams', 'options', 'fetchObjectIdServices');
      },
      deep: true,
    },
    headerOptionsVacancy: {
      handler() {
        this.getDataFromApi('fetchVacancyParams', 'headerOptionsVacancy', 'fetchObjectIdVacancies');
      },
      deep: true,
    },
    headerOptionsTask: {
      handler() {
        this.getDataFromApi('fetchTaskParams', 'headerOptionsTask', 'fetchObjectIdRequest');
      },
      deep: true,
    },

  },
  computed: {
    ...mapGetters("breadcrumbs", ["BREADCRUMBS"]),

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
    object_id() {
      return this.$store.getters["object_id/object_id"];
    },
    object_id_requests() {
      return this.$store.getters["object_id/object_id_requests"];
    },
    object_id_services() {
      return this.$store.getters["object_id/object_id_services"];
    },
    object_id_vacancies() {
      return this.$store.getters["object_id/object_id_vacancies"];
    },
    object_id_history() {
      return this.$store.getters["object_id/object_id_history"];
    },
    service_filters() {
      return this.$store.getters["object_id/service_filters"];
    },
    vacancy_filters() {
      return this.$store.getters["object_id/vacancy_filters"];
    },
    task_filters() {
      return this.$store.getters["object_id/task_filters"];
    },
    activeSelectBtnOption() {
      switch (this.activeSelectBtn) {
        case 0:
          return {
            text: "выделить все",
            icon: "mdi-checkbox-blank-circle-outline",
          };
        case 1:
          return {text: "снять выделение", icon: "mdi-check-circle-outline"};
        default:
          return {};
      }
    },
    isActiveAddVacancy() {
      if (this.object_id_services && this.object_id_services.length) {
        return false;
      } else {
        return true;
      }
    },
  },
  methods: {
    ...mapActions("object_id", ["fetchObjectId"]),
    ...mapActions("object_id", ["fetchObjectIdRequest"]),
    ...mapActions("object_id", ["fetchObjectIdServices"]),
    ...mapActions("object_id", ["fetchObjectIdVacancies"]),
    ...mapActions("object_id", ["fetchObjectIdHistory"]),
    ...mapActions("object_id", ["putStatus"]),
    ...mapActions("object_id", ["resetObjectState"]),
    ...mapActions("service_id", ["removeService"]),
    ...mapActions("vacancy_id", ["removeVacancy"]),
    ...mapActions("objects", ["removeRequest"]),
    ...mapActions("breadcrumbs", ["initBreadcrumbs", "setBreadcrumbs"]),
    ...mapActions('objects', ['removeRequest',]),

    openRequest(id) {
      this.$router.push("/tasks/" + id);
    },
    updateSearchText(value) {
      this.searchText = value;
    },
    openTimesheet() {
      this.$router.push("/objects/" + this.$route.params.id + "/timesheet");
    },
    selectAll(val) {
      this.activeSelectBtn = +!this.activeSelectBtn;
      if (this.activeSelectAll == 0) {
        this.$refs.dataTable.toggleSelectAll(val);
        this.activeSelectAll += 1;
      } else {
        this.$refs.dataTable.toggleSelectAll();
        this.activeSelectAll = 0;
      }
    },
    changeStatus(status) {
      this.putStatus({requestId: this.object_id.uuid, status: status});
      this.selectStatus = status;
    },
    setItemsPerPage(value) {
      this.itemsPerPage = value;
    },
    setCurrentPage(value) {
      this.page = value;
    },
    closeCreateEditForm(type) {
      this[type] = 0;
    },
    addService() {
      this.$router.push({
        name: "objects-id-service",
        params: {ServiceId: "", objectId: this.object_id.uuid},
      });
    },
    editService(ServiceId) {
      /*this.$router.push({
        name: "objects-id-service-id",
        params: {ServiceId: ServiceId, objectId: this.object_id.uuid},
      });*/
      this.$router.push('/objects/' + this.object_id.uuid + '/service/' + ServiceId);
    },
    addVacancy() {
      this.$router.push({
        name: "objects-id-vacancy",
        params: {VacancyId: "", objectId: this.object_id.uuid},
      });
    },
    editVacancy(VaсancyId) {
      /*this.$router.push({
        name: "objects-id-vacancy",
        params: {VacancyId: VaсancyId, objectId: this.object_id.uuid},
      });*/
      this.$router.push('/objects/' + this.object_id.uuid + '/vacancy/' + VaсancyId);
    },
    addTask() {
      this.$router.push({
        name: "tasks-create",
        params: {objectId: this.object_id.uuid},
      });
    },
    editTask(TaskId) {
      this.$router.push("/tasks/" + TaskId + "/edit");
    },
    selectAction(val) {
      if (val == "edit") {
        this.$router.push("/objects/" + this.$route.params.id + "/edit");
      } else if (val == "delete") {
        this.isConfirmModal = true;
      } else if (val == "history") {
        this.tab = 5;
      }
    },
    confirmRemove(confirm) {
      if (confirm) {
        this.removeRequest(this.object_id.uuid);
      }
      this.isConfirmModal = false;
    },
    confirmRemoveService(confirm) {
      if (confirm) {
        this.removeService({object_uuid: this.object_id.uuid, service_uuid: this.removedUUID});
      }
      this.isConfirmModalService = false;
    },
    confirmRemoveVacancy(confirm) {
      if (confirm) {
        this.removeVacancy({object_uuid: this.object_id.uuid, vacancy_uuid: this.removedUUID});
      }
      this.isConfirmModalVacancy = false;
    },
    parseDate: (payload = {}) => {
      let date = payload.date.split("-");

      if (payload.type === "date") {
        return `${date[2]}.${date[1]}.${date[0]}`;
      }
    },
    loadMore() {
      this.fetchServiceParams.page += 1;
      this.fetchServiceParams.sort = this.options.sortBy[0];
      this.fetchServiceParams.order = this.options.sortDesc[0] ? 'asc' : 'desc';

      const params = this.fetchServiceParams;
      this.fetchObjectIdServices({requestId: this.$route.params.id, params: params, concat: true, unit: false});

    },
    getDataFromApi(fetchParams, watcherParams, action) {
      this.loading = true;

      const params = {
        "settings": {
          "value": this[fetchParams].value ,
          "sort":  this[watcherParams].sortBy[0],
          "order": this[watcherParams].sortDesc[0] ? 'asc' : 'desc',
          "filters": this[fetchParams].filters,
        }
      };

      this[action]({
        requestId: this.$route.params.id,
        params: params,
        concat: false,
        unit: false
      }).then(data => {
        this.loading = false;
        this[fetchParams].page = 1;
        console.log('пришел ответ')
      })
    },
    applyFilter(fetchParams, watcherParams, filter, search) {
      this[fetchParams].value = search;
      this[fetchParams].filters = filter;

      let params = {
        "settings": {
          "value": search,
          "sort":  this[watcherParams].sortBy[0],
          "order": this[watcherParams].sortDesc[0] ? 'asc' : 'desc',
          "filters": filter
        }
      };
      console.log('params-----', filter, params);
      if (this.tab == 0) {
        this.fetchObjectIdServices({requestId: this.$route.params.id, params: params, concat: false, unit: false})
      } else if (this.tab == 1) {
        this.fetchObjectIdVacancies({requestId: this.$route.params.id, params: params, concat: false, unit: false})
      }else if (this.tab == 2) {
        this.fetchObjectIdRequest({requestId: this.$route.params.id, params: params, concat: false, unit: false})
      }

    },
    previewText(value){
      if (value && value.length > 56){
        return value.substring(0, 56) + '...';
      }
      else{
        return value;
      }
    },
    focusSearch() {
      this.isSearchFocus = 1;
    },
    blurSearch(){
      this.isSearchFocus = 0;
    }
  },
  beforeDestroy() {
    /*console.debug(
      "beforeDestroy 999",
      this.$route.meta.title,
      this.BREADCRUMBS
    );*/
    this.setBreadcrumbs({
      crumbs: this.BREADCRUMBS.slice(0, this.BREADCRUMBS.length - 1),
    });
  },
  async created() {

    if (this.$route.params.activeTab != undefined) {
      this.tab = this.$route.params.activeTab;
    }

    await this.resetObjectState();

    await this.fetchObjectId(this.$route.params.id);
    await this.fetchObjectIdRequest({
      requestId: this.$route.params.id,
      params: {"page": 1},
      concat: false,
      unit: true
    });
    await this.fetchObjectIdServices({
      requestId: this.$route.params.id,
      params: {"page": 1},
      concat: false,
      unit: true
    });
    await this.fetchObjectIdVacancies({
      requestId: this.$route.params.id,
      params: {"page": 1},
      concat: false,
      unit: true
    });
    await this.fetchObjectIdHistory(this.$route.params.id);

    this.selectStatus = this.object_id.status;
    this.$route.meta.title = this.object_id.name;

    this.initBreadcrumbs(this.$route.fullPath);
  },
  async mounted() {
  },
};
</script>

<style lang="scss">
@import "../../../assets/scss/colors";

.ruqi.page--objects-id {
  padding: 0;
  background: #f5f5f5;

  .theme--light.v-application {
    background: #f5f5f5;
  }

  .inner-object-page {
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

.inner-object-page {
  background: #fff;

  .action-row {
    .v-select {
      max-width: 175px;
    }

    .v-text-field--enclosed .v-input__append-inner {
      margin-top: 13px;
    }

    .select-status {
      .select-status-icon {
        margin-right: 6px;
      }

      .select-status-title {
        color: #666;
      }
    }

    .v-text-field {
      fieldset {
        border-radius: 10px;
      }
    }

    .v-select__slot {
      height: 48px;
    }

    .v-text-field--outlined > .v-input__control > .v-input__slot,
    .theme--light.v-text-field--filled > .v-input__control > .v-input__slot {
      min-height: 48px;
    }
  }

  .card-actions {
    margin-left: 12px;
  }
}

.table-history {
  .table-history-author {
    color: $blue;
  }

  .table-history-element {
    color: $black;
  }

  .table-history-change,
  .table-history-date {
    font-weight: 400;
    text-align: left;
  }
}


.request-i {
  display: inline-block;
  width: 10px;
  height: 10px;
  background: $green;
  margin-right: 8px;
  border-radius: 10px;
}

.request-pay {
  background: $light_blue;
  color: $blue;
  padding: 7px 8px;
  border-radius: 6px;
  font-size: 14px;
  font-weight: 700;
}

.select-status-icon {
  margin-right: 6px;
}

.select-status-title {
  color: #666;
}

.container-object-nds {
  padding: 6px 16px;
  border: 1px solid $table-border-color;
  border-radius: 6px;
  height: 48px;

  .nds-title {
    color: $grey;
    font-weight: 700;
    font-size: 12px;
    text-transform: uppercase;
  }

  .nds-value {
    font-weight: 600;
    font-size: 16px;
    color: #666;
    line-height: 1;
  }
}

.object-info-container {
  background: whitesmoke;
  padding: 24px;
}

.object-info {
  padding: 24px 20px;
}

.card-actions-menu a {
  display: block;
}

</style>

