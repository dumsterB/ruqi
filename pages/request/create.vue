<template>
  <div>
    <Breadcrumbs/>
    <Header :content="title" :size="title_size" :isnew="false" :isback="true"/>
    <v-tabs
      v-model="tab"
      class="form-tabs"
    >
      <v-tab v-for="(item, index) in tabs_list"
             :key="index">
        {{ item }}
      </v-tab>
    </v-tabs>
    <div class="wrap-form">
      <v-form
        ref="form"
        v-model="valid"
        lazy-validation
      >
        <v-window v-model="tab">
          <v-tab-item>
            <div class="form-part">
              <div class="form-part-title">
                Объект
              </div>
              <FormBuilder :meta="meta_object_name"/>
            </div>

            <div class="form-part">
              <div class="form-part-title">
                Информация о заявке
              </div>
              <div class="form-part-description">
                Краткое описание что сюда писать, например напишите в наименовании общедоступное название и примерное
                расположение.
              </div>
              <FormBuilder :meta="meta_object_info"/>
            </div>
            <div class="form-part">

              <div class="form-part-title">
                Расположение
              </div>
              <div class="form-part-description">
                Краткое описание что сюда писать
              </div>
              <FormBuilder :meta="meta_object_location"/>
            </div>
          </v-tab-item>
          <v-tab-item>
            <div class="form-part min-padding">
              <div class="form-part-title">
                Виды работ и оплата
              </div>
              <div class="form-part-description">
                Краткое описание что сюда писать, например напишите в наименовании общедоступное название и примерное
                расположение.
              </div>
              <v-row class="ma-0">
                <v-col
                  cols="12"
                  lg="5"
                  class="pl-0 pb-0"
                >
                  <div class="form-part-label">Наименование работ</div>

                </v-col>
                <v-col
                  cols="12"
                  lg="5"
                  class="pl-0 pb-0"
                >
                  <div class="form-part-label">Стоимость</div>

                </v-col>
                <v-col
                  cols="12"
                  lg="2"
                  class="pl-0 pb-0"
                >
                  <div class="form-part-label">Нужно человек</div>

                </v-col>
                <FormBuilder :meta="meta_object_pay" @removeItem="removeItem"/>
                <a href="#" @click.prevent="addTypeWork" class="add_link">Добавить вид работ</a>
              </v-row>

            </div>
          </v-tab-item>
          <v-tab-item>
            <div class="form-part">
              <FormBuilder :meta="meta_object_contact"/>
            </div>
            <AddFormPart :text="addContactPersText"/>
          </v-tab-item>
          <v-tab-item>
            <div class="form-part">
              <div class="form-part-label">Ответственные менеджеры</div>
              <FormBuilder :meta="meta_object_responsible"
                           @removeItem="removeItem"/>
              <a href="#" @click.prevent="addResponsible" class="add_link">Добавить ответственного</a>
            </div>
          </v-tab-item>

          <FNavigation :indexTab="tab" :nextButtonsText="nextButtonsText" @nextFromButton="nextFromButton"
                       @prevFromButton="prevFromButton"/>

        </v-window>
      </v-form>
    </div>
  </div>
</template>

<script>
import Breadcrumbs from "@/components/Breadcrambs";
import AddFormPart from "@/components/AddFormPart";
import FNavigation from "@/components/FNavigation";

export default {
  components: {FNavigation, AddFormPart, Breadcrumbs},
  data() {
    return {
      title: 'Создание новой заявки',
      title_size: 'large',
      title_create: false,
      title_page_create: '',
      tabs_list: [
        'Общее', 'Оплата и ставки', 'Контакты', 'Ответственные'
      ],
      tab: null,
      nextButtonsText: [
        'Указать стоимость работ',
        'указать контактных лиц',
        'Добавить ответственных',
        'опубликовать заявку'
      ],
      meta_object_name: [
        {
          type: 'FTypeSelect',
          label: 'Наименование объекта',
          col: 12,
          id: 'object_name',
          name: 'object_name',
          params: {
            options: [
              'Item 1',
              'Item 2',
              'Item 3',
              'Item 4',
            ],
          }
        },
      ],
      meta_object_info: [
        {
          type: 'FTypeText',
          label: 'Название заявки',
          col: 12,
          id: 'object_id',
          name: 'object_id',
        },
        {
          type: 'FTypeSelect',
          label: 'Категория',
          col: 12,
          id: 'object_cat',
          name: 'object_cat',
          params: {
            options: [
              'Складская логистика',
              'Item 2',
              'Item 3',
              'Item 4',
            ],
          }
        },
        {
          type: 'FTypeDate',
          label: 'Начало работ',
          col: 4,
          id: 'object_start_date',
          name: 'object_start_date',
        },
        {
          type: 'FTypeDate',
          label: 'Окончание работ',
          col: 4,
          id: 'object_end_date',
          name: 'object_end_date',
        },
        {
          type: 'FTypeSelect',
          label: 'Тип смены',
          col: 12,
          id: 'object_work_shift',
          name: 'object_work_shift',
          params: {
            options: [
              'Дневная',
              'Ночная',
            ],
          }
        },
        {
          type: 'FTypeTextarea',
          label: 'Описание',
          col: 12,
          id: 'object_desc',
          name: 'object_desc',
        },

      ],
      meta_object_location: [
        {
          type: 'FTypeText',
          label: 'Область, край',
          col: 12,
          id: 'object_region',
          name: 'object_region',
        },
        {
          type: 'FTypeText',
          label: 'Город',
          col: 12,
          id: 'object_city',
          name: 'object_city',
        },
        {
          type: 'FTypeTextarea',
          label: 'Предлагаемая схема проезда',
          col: 12,
          id: 'object_driving_directions',
          name: 'object_driving_directions',
        },
      ],
      meta_object_contact: [
        {
          type: 'FTypeText',
          label: 'ФИО',
          col: 12,
          id: 'object_contact_fio',
          name: 'object_contact_fio',
        },
        {
          type: 'FTypeText',
          label: 'Должность',
          col: 12,
          id: 'object_contact_post',
          name: 'object_contact_post',
        },
        {
          type: 'FTypeText',
          label: 'Телефон',
          col: 12,
          id: 'object_contact_phone',
          name: 'object_contact_phone',
        },
        {
          type: 'FTypeText',
          label: 'Email',
          col: 12,
          id: 'object_contact_email',
          name: 'object_contact_email',
        },
      ],
      meta_object_responsible: [
        {
          type: 'FTypeText',
          label: '',
          icon: 'mdi-account',
          col: 12,
          id: 'object_resp',
          name: 'object_resp',
          remove: true,
        },
      ],
      meta_object_pay: [
        {
          type: 'FTypePayGroup',
          label: '',
          icon: '',
          col: 12,
          id: 'object_pay_group',
          name: 'object_pay_group',
          remove: true,
        },
        {
          type: 'FTypePayGroup',
          label: '',
          icon: '',
          col: 12,
          id: 'object_pay_group2',
          name: 'object_pay_group2',
          remove: true,
        },
        {
          type: 'FTypePayGroup',
          label: '',
          icon: '',
          col: 12,
          id: 'object_pay_group',
          name: 'object_pay_group',
          remove: true,
        },
      ],
      valid: true,
      name: '',
      nameRules: [
        v => !!v || 'Name is required',
        v => (v && v.length <= 10) || 'Name must be less than 10 characters',
      ],
      email: '',
      emailRules: [
        v => !!v || 'E-mail is required',
        v => /.+@.+\..+/.test(v) || 'E-mail must be valid',
      ],
      select: null,
      items: [
        'Item 1',
        'Item 2',
        'Item 3',
        'Item 4',
      ],
      date: (new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10),
      dateFormatted: this.formatDate((new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10)),
      menu1: false,
      menu2: false,
      addContactPersText: 'Добавить контактное лицо',

    }
  },
  computed: {
    computedDateFormatted() {
      return this.formatDate(this.date)
    },
  },

  watch: {
    date(val) {
      this.dateFormatted = this.formatDate(this.date)
    },
  },
  methods: {
    validate() {
      this.$refs.form.validate()
    },
    reset() {
      this.$refs.form.reset()
    },
    resetValidation() {
      this.$refs.form.resetValidation()
    },
    formatDate(date) {
      if (!date) return null

      const [year, month, day] = date.split('-')
      return `${month}/${day}/${year}`
    },
    parseDate(date) {
      if (!date) return null

      const [month, day, year] = date.split('/')
      return `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`
    },
    addResponsible() {
      this.meta_object_responsible.push({
        type: 'FTypeText',
        label: '',
        icon: 'mdi-account',
        col: 12,
        id: '',
        name: '',
        remove: true
      });
    },
    removeItem(index) {
      this.meta_object_responsible.splice(index, 1);
    },
    addTypeWork() {
      this.meta_object_pay.push({
        type: 'FTypePayGroup',
        label: '',
        icon: '',
        col: 12,
        id: 'object_pay_group',
        name: 'object_pay_group',
        remove: true,
      });
    },
    nextFromButton() {
      if (this.tab < this.tabs_list.length - 1) {
        this.tab += 1;
      }
    },
    prevFromButton() {
      this.tab -= 1;
    },
  },
}
</script>

<style lang="scss" scoped>

@import '../../assets/scss/colors';


</style>
