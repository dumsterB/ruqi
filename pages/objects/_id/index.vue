<template lang="pug">
  .inner-object-page
    v-container
      v-row.d-flex.pa-5.action-row(no-gutters)
        v-col(cols="10")
          v-tabs.form-tabs-minify(v-model="tab" hide-slider height="36" )
            v-tab(v-for="(item, index) in tabs_list" :key="index") {{ item }}

        v-col.d-flex.justify-end(cols="2")
          v-select.select-status(v-model="selectStatus"
            :items="selectStatusOptions"
            item-text="title"
            item-value="id"
            single-line
            outlined
            filled
            hide-details="true"
            return-object
            color="E5F3FC"
            @input="changeStatus(selectStatus.id)")

            template(slot="selection" slot-scope="data")
              v-icon.select-status-icon(:color="data.item.color" size="8px") mdi-circle
              span.select-status-title {{ data.item.title }}

            template(slot="item" slot-scope="data")
              v-icon.select-status-icon(:color="data.item.color" size="8px") mdi-circle
              span.select-status-title {{ data.item.title }}

          .card-actions
            v-menu(bottom offset-y nudge-bottom="10" content-class="card-actions-menu")
              template(v-slot:activator="{ on }")
                v-btn.actions-btn(icon v-on="on" height="48px" width="48px")
                  v-icon mdi-dots-horizontal

              v-card
                v-list-item-content.justify-start
                  div.mx-auto.text-left
                    .card-action(v-for="action in listAction")
                      a(@click.prevent="selectAction(action.id)")
                        v-icon mdi-{{ action.icon}}
                        span {{ action.title}}

      v-divider

      v-row.d-flex(no-gutters)
        v-col(cols="12")
          v-window(v-model="tab")
            v-tab-item(eager)
              .filter-row.d-flex.pa-5.justify-space-between
                .filter-row-left.d-flex
                  v-btn.btn-blue.add(text height="48" outlined @click="addService")
                    v-icon mdi-plus
                    span добавить услугу

                  v-icon.mx-8 mdi-filter-outline

                .container-object-nds
                  .nds-title ндс текущий
                  .nds-value {{ object_id.vat }}%

              .table-row
                .table-list-style-minify
                  v-data-table(:headers="headers_services"
                    :items="object_id_services.data"
                    class="elevation-0"
                    item-key="uuid"
                    :page.sync="page"
                    :items-per-page="itemsPerPageTable"
                    @page-count="pageCountService = $event"
                    hide-default-footer
                    show-select
                    :search="searchText")

                    template(v-slot:item.actions="{ item }")
                      div.d-flex.justify-end.card-actions
                        v-menu(bottom rounded="10" offset-y nudge-bottom="10" content-class="card-actions-menu")
                          template(v-slot:activator="{ on }")
                            v-btn.actions-btn(icon v-on="on")
                              v-icon mdi-dots-horizontal

                          v-card
                            v-list-item-content.justify-start
                              div.mx-auto.text-left.card-action
                                a(@click.prevent="editService(item.uuid, object_id.uuid)")
                                  v-icon mdi-pencil-outline
                                  span Редактировать

                              div.mx-auto.text-left.card-action
                                a(@click.prevent="isConfirmModalService = 1")
                                  v-icon mdi-close-box-outline
                                  span Удалить

                    template(v-slot:item.rate="{ item }")
                      .price  {{ item.rate }} p.

                    template(v-slot:item.rate_with_vat="{ item }")
                      .rate
                        .rate-title {{ item.rate_with_vat }}
                        .rate-icon(v-if="item.rate_indicator")
                          v-menu(bottom offset-y nudge-bottom="10" content-class="rate-menu")
                            template(v-slot:activator="{ on }")
                              v-btn(icon v-on="on")
                                v-icon(color="#7A91A9" width="24") mdi-filter-variant

                            v-card
                              v-list-item-content.justify-start
                                div.rate-list.mx-auto.text-left
                                  div.rate-list-item(v-for="el in item.rates")
                                    .rate-list-item-date  {{ helpers().parseDate( { date : el.start_date, type : 'date', } ) }}
                                    .rate-list-item-price(:class="[el.rate > item.rate_with_vat  ? 'up' : 'down']")
                                      v-icon(v-if="el.rate < item.rate_with_vat") mdi-menu-down
                                      v-icon(v-if="el.rate > item.rate_with_vat") mdi-menu-up
                                      span {{ el.rate }}

                                  div.rate-list-item-edit
                                    a(@click.prevent="editService(item.uuid, object_id.uuid)")
                                      span Редактировать


                  FooterTable(:itemsPerPage="itemsPerPage" :pageCount="pageCountService" :page="page"
                    @setItemsPerPage="setItemsPerPage" @setCurrentPage="setCurrentPage")

            v-tab-item(eager)
              .filter-row.d-flex.pa-5.justify-space-between
                v-btn.btn-blue.add(text height="48" outlined @click="addVacancy" :disabled="isActiveAddVacancy")
                  v-icon mdi-plus
                  span добавить вакансию

                .container-object-nds
                  .nds-title ндс текущий
                  .nds-value {{ object_id.vat }}%

              .table-row
                .table-list-style-minify
                  v-data-table(:headers="headers_vacancies"
                    :items="object_id_vacancies.data"
                    class="elevation-0"
                    item-key="uuid"
                    :page.sync="page"
                    :items-per-page="itemsPerPageTable"
                    hide-default-footer
                    show-select
                    :search="searchText")

                    template(v-slot:item.actions="{ item }")
                      div.d-flex.justify-end.card-actions
                        v-menu(bottom rounded="10" offset-y nudge-bottom="10" content-class="card-actions-menu")
                          template(v-slot:activator="{ on }")
                            v-btn.actions-btn(icon v-on="on")
                              v-icon mdi-dots-horizontal

                          v-card
                            v-list-item-content.justify-start
                              div.mx-auto.text-left.card-action
                                a(@click.prevent="editVacancy(item.uuid)")
                                  v-icon mdi-pencil-outline
                                  span Редактировать

                              div.mx-auto.text-left.card-action
                                a(@click.prevent="isConfirmModalVacancy = 1")
                                  v-icon mdi-close-box-outline
                                  span Удалить

                    template(v-slot:item.service="{ item }")
                      span {{ item.description }}

                    template(v-slot:item.gender="{ item }")
                      span {{item.gender == 'male'  ? 'ж' : 'м'}}

                    template(v-slot:item.age="{ item }")
                      span {{ item.age_from }} - {{ item.age_to}}

                    template(v-slot:item.rate_with_vat="{ item }")
                      .rate
                        .rate-title {{ item.rate_with_vat }}
                        .rate-icon(v-if="item.rate_indicator")
                          v-menu(bottom offset-y nudge-bottom="10" content-class="rate-menu")
                            template(v-slot:activator="{ on }")
                              v-btn(icon v-on="on")
                                v-icon(color="#7A91A9" width="24") mdi-filter-variant

                            v-card
                              v-list-item-content.justify-start
                                div.rate-list.mx-auto.text-left
                                  div.rate-list-item(v-for="el in item.rates")
                                    .rate-list-item-date  {{ helpers().parseDate( { date : el.start_date, type : 'date', } ) }}
                                    .rate-list-item-price(:class="[el.rate > item.rate_with_vat  ? 'up' : 'down']")
                                      v-icon(v-if="el.rate < item.rate_with_vat") mdi-menu-down
                                      v-icon(v-if="el.rate > item.rate_with_vat") mdi-menu-up
                                      span {{ el.rate }}

                                  div.rate-list-item-edit
                                    a(@click.prevent="editVacancy(item.uuid)") Редактировать


            v-tab-item(eager)
              .filter-row.d-flex.pa-5.justify-space-between
                v-btn.btn-blue.add(text height="48" outlined @click="addTask")
                  v-icon mdi-plus
                  span новая заявка

              .table-row
                .table-list-style.minify-header
                  .minify-header-substrate

                  v-data-table(:headers="headers"
                    :items="object_id_requests"
                    class="elevation-0"
                    item-key="table_1"
                    :page.sync="page"
                    :items-per-page="itemsPerPageTable"
                    @page-count="pageCount = $event"
                    hide-default-footer
                    show-select
                    :search="searchText")

                    template(v-slot:item.actions="{ item }")
                      div.d-flex.justify-end.card-actions
                        v-menu(bottom rounded="10" offset-y nudge-bottom="10" content-class="card-actions-menu")
                          template(v-slot:activator="{ on }")
                            v-btn.actions-btn(icon v-on="on")
                              v-icon mdi-dots-horizontal

                          v-card
                            v-list-item-content.justify-start
                              div.mx-auto.text-left.card-action
                                a(@click.prevent="editTask(item.uuid)")
                                  v-icon mdi-pencil-outline
                                  span Редактировать

                    template(v-slot:item.name="{ item }")
                      div(@click="openRequest(item.uuid)")
                        span.request-i
                        span.color-black {{ item.name }}

                    template(v-slot:item.pay="{ item }")
                      span.request-pay {{ item.payment.value }} {{ item.payment.current }} / {{ item.payment.period }}


                    template( v-slot:item.date="{ item }")
                      div(v-if="item.end_date") {{  helpers().parseDate( { date : item.end_date.substr(0, 10), type : 'date', } ) }}

                    template( v-slot:item.completion="{ item }")
                      Occupationbar(:completed="item.completion.completed" :total="item.completion.total")

            v-tab-item(eager)
              v-container.object-info-container
                v-row
                  v-col(cols="12")
                    .object-info
                      v-row(no-gutters)
                        v-col.d-flex.justify-space-between(cols="12")
                          .object-info-header Данные объекта
                          .object-info-link
                            nuxt-link(:to="'/objects/'+ object_id.uuid +'/edit'") Редактировать

                      v-row(no-gutters)
                        v-col(cols="12")
                          v-divider

                      v-row(no-gutters)
                        v-col(cols="12")
                          .object-info-row.d-flex.justify-space-between
                            .object-info-title Клиент
                            .object-info-value(v-if="object_id.account") {{ object_id.account.name}}

                          .object-info-row.d-flex.justify-space-between
                            .object-info-title Наше юр.лицо
                            .object-info-value(v-if="object_id.organization") {{ object_id.organization.name}}

                          .object-info-row.d-flex.justify-space-between
                            .object-info-title Название объекта
                            .object-info-value {{ object_id.name}}

                          .object-info-row.d-flex.justify-space-between
                            .object-info-title Вид объекта
                            .object-info-value(v-if="object_id.type")  {{ object_id.type.name}}

                          .object-info-row.d-flex.justify-space-between
                            .object-info-title Специализация
                            .object-info-value(v-if="object_id.specialization")  {{ object_id.specialization.name}}

                          .object-info-row.d-flex.justify-space-between
                            .object-info-title График работы
                            .object-info-value 8:00 - 18:00

                          .object-info-row.d-flex.flex-column
                            .object-info-title Описание
                            .object-info-value {{ object_id.description}}

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
                            nuxt-link(:to="'/objects/'+ object_id.uuid +'/edit'") Редактировать

                      v-row(no-gutters)
                        v-col(cols="12")
                          v-divider

                      v-row(no-gutters)
                        v-col(cols="12")
                          Contact(:contacts="object_id.contacts" isSingleNameField="true")


            v-tab-item(eager)
              .table-row
                .table-list-style-nospacing.px-6
                  .minify-header-substrate

                  v-data-table(:headers="headers_history"
                    :items="object_id_history"
                    class="elevation-0 table-history"
                    item-key="uuid"
                    :page.sync="page"
                    :items-per-page="itemsPerPageTable"
                    hide-default-footer)

                    template(v-slot:item.created_at="{ item }")
                      .table-history-date
                        div(v-if="item.created_at") {{  helpers().parseDate( { date : item.created_at.substr(0, 10), type : 'date', } ) }}
                        div {{ item.created_at.substring(11, 19) }}

                    template(v-slot:item.author="{ item }")
                      .table-history-author(v-if="item.author") {{ item.author.name}}

                    template(v-slot:item.task="{ item }")
                      span(v-if="item.task") {{ item.task.name}}

                    template(v-slot:item.description="{ item }")
                      .table-history-change {{ item.description}}

    Confirm(:isConfirmModal="isConfirmModal" :content="confirmModalContent" @confirmRemove="confirmRemove")
    Confirm(:isConfirmModal="isConfirmModalService" :content="confirmModalContentService" @confirmRemove="confirmRemoveService")
    Confirm(:isConfirmModal="isConfirmModalVacancy" :content="confirmModalContentVacancy" @confirmRemove="confirmRemoveVacancy")


</template>

<script>

import {mapState, mapActions, mapGetters, mapMutations} from 'vuex';
import Contact from "@/components/object/Contact";

export default {
  props: [],
  components: {Contact},
  data() {
    return {
      coords: [54, 39],
      title_size: 'large',
      title_create: false,
      title_page_create: '',
      tabs_list: [
        'Услуги',
        'Вакансии',
        'Заявки',
        'Данные',
        'Контакты',
        'История',
      ],
      tab: 3,
      selectStatus: null,
      selectStatusOptions: [
        {
          "id": "active",
          "title": 'Активен',
          "color": '#71D472'
        },
        {
          "id": "confirm",
          "title": 'Подтверждение',
          "color": '#fad126'
        },
        {
          "id": "inactive",
          "title": 'Неактивен',
          "color": '#dadada'
        }
      ],
      avatarColor: '#36B368',
      avatarColorManager: '#D6D0FE',
      avatarRounded: 'rounded',
      listAction: [
        {
          "id": "edit",
          "title": 'Редактировать',
          "icon": "pencil-outline"
        },
        {
          "id": "delete",
          "title": 'Удалить',
          "icon": "close-box-outline"
        },
        {
          "id": "history",
          "title": 'История изменений',
          "icon": "timer-sand-empty"
        },
      ],
      activeAction: null,
      itemSortStatus: ['Все', 'Работает', 'Готов к работе', 'Неактивен'],
      page: 1,
      pageCountService: 0,
      pageCount: 0,
      itemsPerPage: 8,
      selectedItems: [],
      activeSelectAll: 0,
      activeSelectBtn: 0,
      property1: true,
      property2: true,
      searchText: '',
      avatarBorderRadius: 'rounded',
      headers: [
        {text: '', value: 'actions', sortable: false},
        {text: 'Название', align: 'start', value: 'name',},
        {text: 'Ставка', value: 'pay',},
        {text: 'Статус', value: 'status', width: '184px'},
        {text: 'Набор до', value: 'date', width: '132px'},
        {text: 'Наполнение', value: 'completion', width: '152px'},
      ],
      headers_services: [
        {text: '', value: 'actions', sortable: false, width: '30px', class: 'actions', align: 'center'},
        {text: 'Описание', value: 'description',},
        {text: 'Цена', value: 'rate', width: '140px'},
        {text: 'Цена с ндс', value: 'rate_with_vat', width: '180px'},
        {text: 'Норматив', value: 'standart', width: '140px'},
        {text: 'Юнит', value: 'unit',},
      ],
      headers_vacancies: [
        {text: '', value: 'actions', sortable: false, width: '30px', class: 'actions', align: 'center'},
        {text: 'Вакансия', value: 'name', width: '200px'},
        {text: 'Услуга', value: 'service'},
        {text: 'пол', value: 'gender', width: '120px'},
        {text: 'возраст', value: 'age', width: '120px'},
        {text: 'ставка текущая', value: 'rate', width: '140px'},
        {text: 'ставка плановая', value: 'rate_with_vat', width: '140px'},
      ],
      headers_history: [
        {text: 'Дата', value: 'created_at', width: '120px'},
        {text: 'Автор', value: 'author', width: '200px'},
        {text: 'Заявка', value: 'task',},
        {text: 'Изменение', value: 'description',},
      ],
      isConfirmModal: false,
      isConfirmModalService: false,
      isConfirmModalVacancy: false,
      confirmModalContent: {
        title: 'Удалить этот объект?',
        description: '',
        text_btn_ok: 'Удалить',
        text_btn_cancel: 'Отмена',
      },
      confirmModalContentService: {
        title: 'Удалить услугу?',
        description: '',
        text_btn_ok: 'Удалить',
        text_btn_cancel: 'Отмена',
      },
      confirmModalContentVacancy: {
        title: 'Удалить вакансию?',
        description: '',
        text_btn_ok: 'Удалить',
        text_btn_cancel: 'Отмена',
      }

    }
  },
  computed: {
    user() {
      return this.$store.getters['user/user']
    },
    itemsPerPageTable() {
      if (this.itemsPerPage) {
        return parseInt(this.itemsPerPage, 10)
      } else {
        return 1;
      }
    },
    object_id() {
      return this.$store.getters['object_id/object_id']
    },
    object_id_requests() {
      return this.$store.getters['object_id/object_id_requests']
    },
    object_id_services() {
      console.log(this.$store.getters['object_id/object_id_services'].data);
      return this.$store.getters['object_id/object_id_services']
    },
    object_id_vacancies() {
      return this.$store.getters['object_id/object_id_vacancies']
    },
    object_id_history() {
      return this.$store.getters['object_id/object_id_history']
    },
    object_id_contacts() {
      return this.object_id.contacts;
    },
    object_id_works() {
      let works_object = this.object_id.works;
      let works = [];
      if (works_object) {
        for (let i = 0; i < works_object.length; i++) {
          let name = works_object[i].name;
          works.push(name);
        }
      }
      return works;
    },
    activeSelectBtnOption() {
      switch (this.activeSelectBtn) {
        case 0 :
          return {text: 'выделить все', icon: 'mdi-checkbox-blank-circle-outline'}
        case 1:
          return {text: 'снять выделение', icon: 'mdi-check-circle-outline'}
        default:
          return {}
      }
    },
    mapCenter() {
      return [this.object_id.lat, this.object_id.lon];
    },
    mapMarker() {
      return [
        {
          "geometry": {
            "type": "Point",
            "coordinates": [this.object_id.lat, this.object_id.lon]
          },
          "properties": {
            "hintContent": this.object_id.name
          },
          "uuid": this.object_id.uuid,
          "info": this.object_id.description
        }
      ]
    },
    isActiveAddVacancy() {
      if(this.object_id_services.data && this.object_id_services.data.length){
        return false;
      }
      else{
        return true;
      }
    },

  },
  methods: {
    ...mapActions('object_id', ['fetchObjectId',]),
    ...mapActions('object_id', ['fetchObjectIdRequest',]),
    ...mapActions('object_id', ['fetchObjectIdServices',]),
    ...mapActions('object_id', ['fetchObjectIdVacancies',]),
    ...mapActions('object_id', ['fetchObjectIdHistory',]),
    ...mapActions('object_id', ['putStatus',]),
    ...mapActions('objects', ['removeRequest',]),
    ...mapMutations('breadcrumbs', ["setBreadcrumbs",]),

    openRequest(id) {
      this.$router.push('/tasks/' + id);
    },
    updateSearchText(value) {
      this.searchText = value;
    },
    openTimesheet() {
      this.$router.push('/objects/' + this.$route.params.id + '/timesheet');
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
      this.$router.push({name: 'objects-id-service', params: {ServiceId: ''}})
    },
    editService(ServiceId) {
      this.$router.push({name: 'objects-id-service', params: {ServiceId: ServiceId}})
    },
    addVacancy() {
      this.$router.push({name: 'objects-id-vacancy', params: {ServiceId: ''}})
    },
    editVacancy(VaсancyId) {
      this.$router.push({name: 'objects-id-vacancy', params: {VaсancyId: VaсancyId}})
    },
    addTask() {
      this.$router.push({name: 'tasks-create', params: {objectId: this.object_id.uuid}})
    },
    editTask(TaskId) {
      this.$router.push('/tasks/' + TaskId + '/edit');
    },
    selectAction(val) {
      if (val == 'edit') {
        this.$router.push('/objects/' + this.$route.params.id + '/edit');
      } else if (val == 'delete') {
          this.isConfirmModal = true;
      } else if (val == 'history') {
        this.tab = 5;
      } else if (val == 'history') {
        this.changeStatus(val);
        this.selectStatus = val;
      }
    },
    confirmRemove(confirm){
      if(confirm){
        console.log('удаляю');
      }
      else{
        console.log('отмена');
      }
      this.isConfirmModal = false;
    },
    confirmRemoveService(confirm){
      this.isConfirmModalService = false;
    },
    confirmRemoveVacancy(confirm){
      this.isConfirmModalVacancy = false;
    },

    helpers() {
      return {
        /**
         *
         * @param { object } params
         * {
         *    date : '2021-12-23T12:59:03.000000Z'
         * }
         */
        parseDate: (payload = {}) => {

          let date = payload.date.split('-');

          if (payload.type === 'date') {
            return `${date[2]}.${date[1]}.${date[0]}`;
          }

        },
      }
    },

  },
  async created() {
    await this.fetchObjectId(this.$route.params.id);
    await this.fetchObjectIdRequest(this.$route.params.id);
    await this.fetchObjectIdServices(this.$route.params.id);
    await this.fetchObjectIdVacancies(this.$route.params.id);
    await this.fetchObjectIdHistory(this.$route.params.id);

    this.selectStatus = this.object_id.status;

    this.$route.meta.title = this.object_id.name;
    this.setBreadcrumbs(this.$route.fullPath);

  },
  async mounted() {


  }
}
</script>

<style lang="scss">

@import '../../../assets/scss/colors';

.ruqi.page--objects-id {
  padding: 0;
  background: #F5F5F5;

  .theme--light.v-application {
    background: #F5F5F5;
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
      max-width: 150px;
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


}

.wrap-composite-header {
  display: flex;
  align-items: center;
  margin-bottom: 28px;

  .composite-header-progress {
    font-size: 24px;
    font-weight: 900;
    color: $blue;
    background: #E9F6FF;
    padding: 10px 9px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 15px;
    margin: 0 20px 0 20px;
    line-height: 1;
    height: 51px;
  }
}

.wrap-composite-details {
  display: flex;
  align-items: center;
  font-size: 16px;
  font-weight: 600;
  color: $grey;
  margin-bottom: 32px;

  > div {
    margin-right: 24px;
  }

  .object {
    color: $black;
    font-weight: 700;
  }
}

.wrap-composite-state {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 11px 24px 11px 0;
  background: white;
  border-radius: 14px;
  box-shadow: 0px 6px 73px rgba(0, 0, 0, 0.07);
  border: 1px solid #e0e0e0;
  margin-bottom: 32px;
  font-weight: 600;

  .v-text-field.v-text-field--solo:not(.v-text-field--solo-flat) > .v-input__control > .v-input__slot {
    box-shadow: none;
    background: $light_blue;
  }

  .theme--light.v-icon {
    color: $blue;
  }

  .bt-time-sheet {
    background: $blue;
    color: white;
    margin-right: 10px;
    border: none;
  }

  .v-select {
    max-width: 200px;
  }

  .v-select__slot {
    height: 48px;
  }

  .v-text-field--filled > .v-input__control > .v-input__slot {
    background: #fff;
  }
}

.table-on-object {
  align-items: center;

  .v-icon {
    margin-right: 5px;
  }
}

.row.dispatchers-header {
  margin: 20px 0 32px 0;
  padding: 4px 0;

  .header {
    font-size: 20px;
    color: $black;
    font-weight: 700;
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


</style>

