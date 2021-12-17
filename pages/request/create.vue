<template>
  <div>
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
              <FormBuilder :meta="meta.meta_object_name" @updateFiled="updateFiled"/>
            </div>

            <div class="form-part">
              <div class="form-part-title">
                Информация о заявке
              </div>
              <div class="form-part-description">
                Краткое описание что сюда писать, например напишите в наименовании общедоступное название и примерное
                расположение.
              </div>
              <FormBuilder :meta="meta.meta_object_info" @updateFiled="updateFiled"/>
            </div>
            <div class="form-part">

              <div class="form-part-title">
                Расположение
              </div>
              <div class="form-part-description">
                Краткое описание что сюда писать
              </div>
              <FormBuilder :meta="meta.meta_object_location" @updateFiled="updateFiled"/>
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
                <FormBuilder :meta="meta.meta_object_pay" @removeItem="removeItem" @updateFiled="updateFiled"/>
                <a href="#" @click.prevent="addTypeWork" class="add_link">Добавить вид работ</a>
              </v-row>

            </div>
          </v-tab-item>
          <v-tab-item>
            <div class="form-part"
                 v-for="(item, index) in meta.meta_object_contact"
                 :key="index">
              <FormBuilder :meta="item" @updateFiled="updateFiled"/>
            </div>
            <AddFormPart :text="addContactPersText" @addFormPart="addFormPart"/>
          </v-tab-item>
          <v-tab-item>
            <div class="form-part">
              <div class="form-part-label">Диспетчеры</div>
              <FormBuilder :meta="meta.meta_object_responsible" @removeItem="removeItem" @updateFiled="updateFiled"/>
              <a href="#" @click.prevent="addResponsible" class="add_link">Добавить диспетчера</a>
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

import Vue from "vue";

export default {
  async fetch({store}) {
    if (store.getters['objects/objects'].length === 0) {
      await store.dispatch('objects/fetch')
    }
    if (store.getters['specializations/specializations'].length === 0) {
      await store.dispatch('specializations/fetch')
    }
    if (store.getters['dispatchers/dispatchers'].length === 0) {
      await store.dispatch('dispatchers/fetch')
    }
  },
  data() {
    return {
      formValues: {},
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
      meta: {
        meta_object_name: [
          {
            type: 'FTypeSelectUIID',
            label: 'Наименование объекта',
            col: 12,
            id: 'object_name',
            name: 'object_name',
            params: {
              options: [],
              item_text: 'name',
            },
            validation: 'required'
          },
        ],
        meta_object_info: [
          {
            type: 'FTypeText',
            label: 'Название заявки',
            col: 12,
            id: 'object_id',
            name: 'object_id',
            validation: 'required',
          },
          {
            type: 'FTypeSelectUIID',
            label: 'Категория',
            col: 12,
            id: 'object_cat',
            name: 'object_cat',
            params: {
              options: [],
              item_text: 'name',
            },
            validation: 'required',
          },
          {
            type: 'FTypeDate',
            label: 'Начало работ',
            col: 4,
            id: 'object_start_date',
            name: 'object_start_date',
            validation: 'required',
          },
          {
            type: 'FTypeDate',
            label: 'Окончание работ',
            col: 4,
            id: 'object_end_date',
            name: 'object_end_date',
            validation: 'required',
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
            },
            validation: 'required',
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
            validation: 'required',
          },
          {
            type: 'FTypeText',
            label: 'Город',
            col: 12,
            id: 'object_city',
            name: 'object_city',
            validation: 'required',
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
          [
            {
              type: 'FTypeText',
              label: 'ФИО',
              col: 12,
              id: 'object_contact_fio',
              name: 'object_contact_fio_0',
              validation: 'required',
            },
            {
              type: 'FTypeText',
              label: 'Должность',
              col: 12,
              id: 'object_contact_post',
              name: 'object_contact_post_0',
              validation: 'required',
            },
            {
              type: 'FTypeText',
              label: 'Телефон',
              col: 12,
              id: 'object_contact_phone',
              name: 'object_contact_phone_0',
              validation: 'required|phone',
            },
            {
              type: 'FTypeText',
              label: 'Email',
              col: 12,
              id: 'object_contact_email',
              name: 'object_contact_email_0',
              validation: 'required|email',
            },
          ],
        ],
        meta_object_responsible: [
          {
            type: 'FTypeSelectUIID',
            icon: 'mdi-account',
            label: '',
            col: 12,
            id: 'object_resp',
            name: 'object_resp_0',
            remove: true,
            params: {
              options: [],
              item_text: 'fullname',
            },
            parent_array: 'meta_object_responsible',
            validation: 'required',
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
            parent_array: 'meta_object_pay',
            validation: 'required',
          },
        ],
      },
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
    objects() {
      return this.$store.getters['objects/objects']
    },
    specializations() {
      return this.$store.getters['specializations/specializations']
    },
    dispatchers() {
      return this.$store.getters['dispatchers/dispatchers']
    },
    postBody() {
      let postBody = {
        "name": "Требуются грузчики в Магнит",
        "description": "Подробное описание задачи.",
        "start_date": "2021-11-03",
        "end_date": "2021-11-04",
        "until_date": "2021-11-01",
        "object": "89900f92-eff8-4989-9c06-968776fe1f34",
        "specialization": "9209129f-52cb-42d2-aff7-b18525345c10",
        "region": "Московская область",
        "city": "Москва",
        "schema": "test",
        "contacts": [
          {
            "fullname": "Иванов Иван Иванович",
            "position": "Координатор",
            "phone": "8 800 555 66 77",
            "email": "ivaov@mail.ru"
          },
          {
            "fullname": "Иванов Иван Иванович",
            "position": "Координатор",
            "phone": "8 800 555 66 77",
            "email": "ivaov@mail.ru"
          }
        ],
        "dispatchers": [
          "e19e332e-2db2-4830-8e62-252f3fca541e",
          "ce23e853-6405-46a7-bfc2-2f460efc7a79"
        ],
        "works": [
          {
            "name": "Кладовщик",
            "payment": 400,
            "currency": "RUB",
            "requires_people": 20
          },
          {
            "name": "Грузчик",
            "payment": 300,
            "currency": "RUB",
            "requires_people": 40
          }
        ]
      };
      /*let postBody = {
        "name": this.formValues.object_id,
        "description": this.formValues.object_desc,
        "start_date": "2021-12-17",
        "end_date": "2021-12-18",
        "until_date": "2021-12-18",
        "object": "89900f92-eff8-4989-9c06-968776fe1f34",
        "specialization": "9209129f-52cb-42d2-aff7-b18525345c10",
        "region": "Московская область",
        "city": "Москва",
        "schema": "test",
        "contacts": [
          {
            "fullname": "Иванов Иван Иванович",
            "position": "Координатор",
            "phone": "8 800 555 66 77",
            "email": "ivaov@mail.ru"
          },
          {
            "fullname": "Иванов Иван Иванович",
            "position": "Координатор",
            "phone": "8 800 555 66 77",
            "email": "ivaov@mail.ru"
          }
        ],
        "dispatchers": [
          "e19e332e-2db2-4830-8e62-252f3fca541e",
          "ce23e853-6405-46a7-bfc2-2f460efc7a79"
        ],
        "works": [
          {
            "name": "Кладовщик",
            "payment": 400,
            "currency": "RUB",
            "requires_people": 20
          },
          {
            "name": "Грузчик",
            "payment": 300,
            "currency": "RUB",
            "requires_people": 40
          }
        ]
      }; */
      return postBody;
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
      let dispatchers = this.dispatchers;
      this.meta.meta_object_responsible.push({
          type: 'FTypeSelectUIID',
          icon: 'mdi-account',
          label: '',
          col: 12,
          id: 'object_resp',
          name: 'object_resp_' + this.meta.meta_object_responsible.length,
          remove: true,
          params: {
            options: dispatchers,
            item_text: 'fullname',
          },
          parent_array: 'meta_object_responsible',
          validation: 'required',
        },
      );
    },
    addFormPart() {
      this.meta.meta_object_contact.push(
        [
          {
            type: 'FTypeText',
            label: 'ФИО',
            col: 12,
            id: 'object_contact_fio',
            name: 'object_contact_fio_' + this.meta.meta_object_contact.length,
            validation: 'required',
          },
          {
            type: 'FTypeText',
            label: 'Должность',
            col: 12,
            id: 'object_contact_post',
            name: 'object_contact_post_' + this.meta.meta_object_contact.length,
            validation: 'required',
          },
          {
            type: 'FTypeText',
            label: 'Телефон',
            col: 12,
            id: 'object_contact_phone',
            name: 'object_contact_phone_' + this.meta.meta_object_contact.length,
            validation: 'required|phone',
          },
          {
            type: 'FTypeText',
            label: 'Email',
            col: 12,
            id: 'object_contact_email',
            name: 'object_contact_email_' + this.meta.meta_object_contact.length,
            validation: 'required|email',
          },
        ],
      );
    },
    removeItem(index, array) {
      if (index != 0) {
        this.meta[array].splice(index, 1);
      }
    },
    addTypeWork() {
      this.meta.meta_object_pay.push({
        type: 'FTypePayGroup',
        label: '',
        icon: '',
        col: 12,
        id: 'object_pay_group',
        name: 'object_pay_group',
        remove: true,
        parent_array: 'meta_object_pay'
      });
    },
    nextFromButton() {
      if (this.tab < this.tabs_list.length - 1) {
        this.tab += 1;
      }
      else{
        const str = JSON.stringify(this.postBody);
        console.log(str);
        this.$axios.post('https://cdn.ruqi.maxber.ru/api/v1/manager/tasks',
          str,
          {
          headers: {
            "Authorization": "Bearer eb5e61886e9a766273b4ea87ad67844c5e5ee22a8e22bffce0225151dfc5eaf3",
            'Content-Type': 'application/json',
          },

        })
          .then((response) => {
            console.log(response);
          })
          .catch((error) => {
            console.log(error);
          });
      }
    },
    prevFromButton() {
      this.tab -= 1;
    },
    updateFiled(field, value) {
      this.formValues[field] = value;
      console.log(field ,value);
    },
  },
  created() {

    this.meta.meta_object_name[0].params.options = this.objects;
    this.meta.meta_object_info[1].params.options = this.specializations;
    this.meta.meta_object_responsible[0].params.options = this.dispatchers;

    this.meta.meta_object_name.map(f => {
      Vue.set(this.formValues, f.name, null);
    })
    this.meta.meta_object_info.map(f => {
      Vue.set(this.formValues, f.name, null);
    })
    this.meta.meta_object_location.map(f => {
      Vue.set(this.formValues, f.name, null);
    })
    this.meta.meta_object_contact.map(subarray => subarray.map(f => {
      Vue.set(this.formValues, f.name, null);
    }));
    this.meta.meta_object_responsible.map(f => {
      Vue.set(this.formValues, f.name, null);
    })
    this.meta.meta_object_pay.map(f => {
      Vue.set(this.formValues, f.name, null);
    })
  }
}
</script>

<style lang="scss" scoped>

@import '../../assets/scss/colors';


</style>
