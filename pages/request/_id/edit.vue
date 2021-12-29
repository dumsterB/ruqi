<template>
  <div>
    <Header :content="request_id.name" :size="title_size" :isnew="false" :isback="true"/>
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
          <v-tab-item eager>
            <v-form ref="form_part_0" v-model="valid" lazy-validation>
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
            </v-form>
          </v-tab-item>
          <v-tab-item eager>
            <v-form ref="form_part_1" v-model="valid" lazy-validation>
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

                  <v-row class="d-flex w-100">
                    <v-col cols="12" :lg="item.col"
                           v-for="(item, index) in meta.meta_object_pay" :key="index">
                      <div class="form-part-label" v-if="item.label">{{ item.label }}</div>
                      <div class="d-flex w-100">
                        <FormBuilder :meta="meta.meta_object_pay[index]" @removeItem="removeItem"
                                     @updateFiled="updateFiled"/>
                        <a href="#" @click.prevent="removeItem(index, 'meta_object_pay')" class="remove-item">
                          <img src="/img/ico_close.svg" alt="Удалить">
                        </a>
                      </div>
                    </v-col>
                  </v-row>

                  <a href="#" @click.prevent="addTypeWork" class="add_link">Добавить вид работ</a>
                </v-row>

              </div>
            </v-form>
          </v-tab-item>
          <v-tab-item eager>
            <v-form ref="form_part_2" v-model="valid" lazy-validation>
              <div class="form-part"
                   v-for="(item, index) in meta.meta_object_contact"
                   :key="index">
                <FormBuilder :meta="item" @updateFiled="updateFiled"/>
              </div>
              <AddFormPart :text="addContactPersText" @addFormPart="addFormPart"/>
            </v-form>
          </v-tab-item>
          <v-tab-item eager>
            <v-form ref="form_part_3" v-model="valid" lazy-validation>
              <div class="form-part">
                <div class="form-part-label">Диспетчеры</div>
                <FormBuilder :meta="meta.meta_object_responsible" @removeItem="removeItem" @updateFiled="updateFiled"/>
                <a href="#" @click.prevent="addResponsible" class="add_link">Добавить диспетчера</a>
              </div>
            </v-form>
          </v-tab-item>

          <FNavigation :indexTab="tab" :nextButtonsText="nextButtonsText" @nextFromButton="nextFromButton"
                       @prevFromButton="prevFromButton"/>

        </v-window>
      </v-form>
    </div>
    <div class="wrapp-alert">
      <v-alert
        :value="requestSuccess.status"
        :type="requestSuccess.type"
        dismissible
        transition="fade-transition">
        {{requestSuccess.text}}
      </v-alert>
    </div>

  </div>

</template>

<script>

import Vue from "vue";
import {mapState, mapActions, mapGetters, mapMutations} from 'vuex';

export default {
  async fetch({store}) {
    if (store.getters['objects/objects'].length === 0) {
      await store.dispatch('objects/fetchObjects')
    }
    if (store.getters['specializations/specializations'].length === 0) {
      await store.dispatch('specializations/fetch')
    }
    if (store.getters['dispatchers/dispatchers'].length === 0) {
      await store.dispatch('dispatchers/fetch')
    }
  },
  /*async asyncData({ store, params }) {
    await store.dispatch("request_id/fetchRequestId", 'ab4309a6-4f29-4ee5-aaf7-6e2becb7f527');
  },*/

  data() {
    return {
      formValues: {},
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
        'Сохранить'
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
            validation: 'required',
            value: ''
          },
        ],
        meta_object_info: [
          {
            type: 'FTypeText',
            label: 'Название заявки',
            col: 12,
            id: 'object_id',
            name: 'object_id',
            validation: ['required'],
            value: ''
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
            value: ''
          },
          {
            type: 'FTypeDate',
            label: 'Начало работ',
            col: 4,
            id: 'object_start_date',
            name: 'object_start_date',
            validation: 'required',
            value: ''
          },
          {
            type: 'FTypeDate',
            label: 'Окончание работ',
            col: 4,
            id: 'object_end_date',
            name: 'object_end_date',
            validation: 'required',
            value: ''
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
            value: ''
          },
          {
            type: 'FTypeTextarea',
            label: 'Описание',
            col: 12,
            id: 'object_desc',
            name: 'object_desc',
            value: ''
          },

        ],
        meta_object_location: [
          {
            type: 'FTypeText',
            label: 'Область, край',
            col: 12,
            id: 'object_region',
            name: 'object_region',
            validation: ['required'],
            value: ''
          },
          {
            type: 'FTypeText',
            label: 'Город',
            col: 12,
            id: 'object_city',
            name: 'object_city',
            validation: ['required'],
            value: ''
          },
          {
            type: 'FTypeTextarea',
            label: 'Предлагаемая схема проезда',
            col: 12,
            id: 'object_driving_directions',
            name: 'object_driving_directions',
            value: ''
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
              validation: ['required'],
              value: ''
            },
            {
              type: 'FTypeText',
              label: 'Должность',
              col: 12,
              id: 'object_contact_post',
              name: 'object_contact_post_0',
              validation: ['required'],
              value: ''
            },
            {
              type: 'FTypeText',
              label: 'Телефон',
              col: 12,
              id: 'object_contact_phone',
              name: 'object_contact_phone_0',
              validation: ['required', 'phone'],
              value: ''
            },
            {
              type: 'FTypeText',
              label: 'Email',
              col: 12,
              id: 'object_contact_email',
              name: 'object_contact_email_0',
              validation: ['required', 'email'],
              value: ''
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
            value: '',
          },
        ],
        meta_object_pay: [
          [
            {
              type: 'FTypeText',
              label: '',
              icon: '',
              col: 5,
              id: 'object_pay_title_0',
              name: 'object_pay_title_0',
              remove: false,
              value: '',
            },
            {
              type: 'FTypeText',
              label: '',
              icon: '',
              col: 2,
              id: 'object_pay_salary_0',
              name: 'object_pay_salary_0',
              remove: false,
              value: '',
            },
            {
              type: 'FTypeSelect',
              label: '',
              col: 3,
              id: 'object_pay_time_0',
              name: 'object_pay_time_0',
              params: {
                options: [
                  'за смену',
                  'за час',
                ],
              },
              value: '',
            },
            {
              type: 'FTypeText',
              label: '',
              icon: '',
              col: 2,
              id: 'object_pay_cw_0',
              name: 'object_pay_cw_0',
              remove: false,
              value: '',
            },
          ],
        ],
      },
      valid: true,
      select: null,
      addContactPersText: 'Добавить контактное лицо',
      formHasErrors: false,
    }
  },
  computed: {
    request_id() {
      return this.$store.getters['request_id/request_id']
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
    requestSuccess() {
      return this.$store.getters['requests/requestSuccess']
    },
    postBody() {
      /*let postBody = {
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
      };*/

      let contacts = [];
      for (let i = 0; i < this.meta.meta_object_contact.length; i++) {
        contacts.push(
          {
            "fullname": this.formValues['object_contact_fio_'+i],
            "position": this.formValues['object_contact_post_'+i],
            "phone": this.formValues['object_contact_phone_'+i],
            "email": this.formValues['object_contact_email_'+i],
          }
        )
      }

      let dispatchers = [];
      for (let i = 0; i < this.meta.meta_object_responsible.length; i++) {
        dispatchers.push(
          this.formValues['object_resp_'+i]
        )
      }
      dispatchers.push(
        "e19e332e-2db2-4830-8e62-252f3fca541e",
        "ce23e853-6405-46a7-bfc2-2f460efc7a79"
      )

      let works = [];
      for (let i = 0; i < this.meta.meta_object_pay.length; i++) {
        works.push(
          {
            "name": this.formValues['object_pay_title_'+i],
            "payment": this.formValues['object_pay_salary_'+i],
            "period": this.formValues['object_pay_time_'+i],
            "requires_people": this.formValues['object_pay_cw_'+i],
          }
        )
      }

      let postBody = {
        "uuid": this.request_id.uuid,
        "name": this.formValues.object_id,
        "description": this.formValues.object_desc,
        "start_date": this.formValues.object_start_date,
        "end_date": this.formValues.object_end_date,
        "until_date": this.formValues.object_end_date,
        "object": this.formValues.object_name,
        "specialization": this.formValues.object_cat,
        "region": this.formValues.object_region,
        "city": this.formValues.object_city,
        "schema": this.formValues.object_driving_directions,
        "contacts": contacts,
        "dispatchers": dispatchers,
        "works": works
      };
      return postBody;
    },
  },
  methods: {
    ...mapActions('objects', ['fetchObjects',]),
    ...mapActions('specializations', ['fetchSpecializations',]),
    ...mapActions('dispatchers', ['fetchDispatchers',]),
    ...mapActions('requests', ['putRequest',]),
    ...mapActions('request_id', ['fetchRequestId',]),

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
            validation: ['required'],
            value: ''
          },
          {
            type: 'FTypeText',
            label: 'Должность',
            col: 12,
            id: 'object_contact_post',
            name: 'object_contact_post_' + this.meta.meta_object_contact.length,
            validation: ['required'],
            value: ''
          },
          {
            type: 'FTypeText',
            label: 'Телефон',
            col: 12,
            id: 'object_contact_phone',
            name: 'object_contact_phone_' + this.meta.meta_object_contact.length,
            validation: ['required', 'phone'],
            value: ''
          },
          {
            type: 'FTypeText',
            label: 'Email',
            col: 12,
            id: 'object_contact_email',
            name: 'object_contact_email_' + this.meta.meta_object_contact.length,
            validation: ['required', 'email'],
            value: '',
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
      this.meta.meta_object_pay.push(
        [
          {
            type: 'FTypeText',
            label: '',
            icon: '',
            col: 5,
            id: 'object_pay_title_' + this.meta.meta_object_pay.length,
            name: 'object_pay_title_' + this.meta.meta_object_pay.length,
            remove: false,
            value: '',
          },
          {
            type: 'FTypeText',
            label: '',
            icon: '',
            col: 2,
            id: 'object_pay_time',
            name: 'object_pay_salary_' + this.meta.meta_object_pay.length,
            remove: false,
            value: '',
          },
          {
            type: 'FTypeSelect',
            label: '',
            col: 3,
            id: 'object_pay_time',
            name: 'object_pay_time_' + this.meta.meta_object_pay.length,
            params: {
              options: [
                'за смену',
                'за час',
              ],
            },
            value: '',
          },
          {
            type: 'FTypeText',
            label: '',
            icon: '',
            col: 2,
            id: 'object_pay_cw',
            name: 'object_pay_cw_' + this.meta.meta_object_pay.length,
            remove: false,
            value: '',
          },
        ],
      );
    },
    nextFromButton() {
      if (this.tab < this.tabs_list.length - 1) {
        let formPart = 'form_part_' + this.tab;
        this.$refs[formPart].validate();

        this.$nextTick(() => {
          if (this.valid) {
            this.tab += 1;
          } else {
            let el = this.$el.querySelector(".v-messages.error--text:first-of-type");
            this.$vuetify.goTo(el);
          }
        });
      } else {
        const newRequet = JSON.stringify(this.postBody);
        console.log(newRequet);
        this.putRequest({uuid: this.request_id.uuid, body: newRequet});
      }
    },
    prevFromButton() {
      this.tab -= 1;
    },
    updateFiled(field, value) {
      this.formValues[field] = value;
      console.log(value)
    },
    addFileds(length, method) {
      if (length > 1) {
        for (let i = 1; i < length; i++) {
          this[method]();
        }
      }
    }
  },
  async created() {
    await this.fetchRequestId(this.$route.params.id);

    console.log(this.request_id);

    let works_length = this.request_id.works.length,
      contact_length = this.request_id.contacts.length,
      dispatchers_length = this.request_id.dispatchers.length;

    await this.addFileds(works_length, 'addTypeWork');
    await this.addFileds(contact_length, 'addFormPart');
    await this.addFileds(dispatchers_length, 'addResponsible');

    this.meta.meta_object_name[0].params.options = this.objects;
    this.meta.meta_object_name[0].value = this.request_id.object.uuid;

    this.meta.meta_object_info[1].params.options = this.specializations;
    this.meta.meta_object_responsible[0].params.options = this.dispatchers;

    this.meta.meta_object_info[1].value = this.request_id.specialization.uuid;

    let start_date = '';
    if (this.request_id.start_date != null){
      start_date = this.request_id.start_date.substring(0, 10) + ' ' + this.request_id.start_date.substring(11, 16);
    }

    let end_date = '';
    if (this.request_id.start_date != null){
      end_date = this.request_id.start_date.substring(0, 10) + ' ' + this.request_id.start_date.substring(11, 16);
    }

    this.meta.meta_object_info[2].value = start_date;
    this.meta.meta_object_info[3].value = end_date;

    this.meta.meta_object_info[0].value = this.request_id.name;
    this.meta.meta_object_info[5].value = this.request_id.description;

    this.meta.meta_object_location[0].value = this.request_id.location.city;
    this.meta.meta_object_location[1].value = this.request_id.location.region;
    this.meta.meta_object_location[2].value = this.request_id.location.scheme;

    for (let i = 0; i < works_length; i++) {
      this.meta.meta_object_pay[i][0].value = this.request_id.works[i].name;
      this.meta.meta_object_pay[i][1].value = this.request_id.works[i].payment;
      this.meta.meta_object_pay[i][2].value = this.request_id.works[i].period;
      this.meta.meta_object_pay[i][3].value = this.request_id.works[i].requires_people;
    }

    for (let i = 0; i < contact_length; i++) {
      this.meta.meta_object_contact[i][0].value = this.request_id.contacts[i].fullname;
      this.meta.meta_object_contact[i][1].value = this.request_id.contacts[i].position;
      this.meta.meta_object_contact[i][2].value = this.request_id.contacts[i].phone;
      this.meta.meta_object_contact[i][3].value = this.request_id.contacts[i].email;
    }

    for (let i = 0; i < dispatchers_length; i++) {
      this.meta.meta_object_responsible[i].value = this.request_id.dispatchers[i].uuid;
    }

    this.meta.meta_object_name.map(f => {
      Vue.set(this.formValues, f.name, f.value);
    })
    this.meta.meta_object_info.map(f => {
      Vue.set(this.formValues, f.name, f.value);
    })
    this.meta.meta_object_location.map(f => {
      Vue.set(this.formValues, f.name, f.value);
    })
    this.meta.meta_object_contact.map(subarray => subarray.map(f => {
      Vue.set(this.formValues, f.name, f.value);
    }));
    this.meta.meta_object_responsible.map(f => {
      Vue.set(this.formValues, f.name, f.value);
    })
    this.meta.meta_object_pay.map(subarray => subarray.map(f => {
      Vue.set(this.formValues, f.name, f.value);
    }));

  },
  async mounted() {

  }
}
</script>

<style lang="scss" scoped>

@import '../../../assets/scss/colors';

.wrapp-alert {
  position: fixed;
  width: 100%;
  bottom: 0;
  left: 0;

  .v-alert {
    margin: 0;
  }
}

</style>
