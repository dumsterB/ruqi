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
          <v-tab-item >
            <v-form ref="form_part_0" v-model="valid" lazy-validation>
              <div class="form-part">
                <div class="form-part-title">
                  Объект
                </div>
                <FormBuilder :meta="meta.meta_object_name" @updateFiled="updateFiled"/>
                <div>{{ formValues.object_id}}</div>
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
          <v-tab-item>
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
                  <FormBuilder :meta="meta.meta_object_pay" @removeItem="removeItem" @updateFiled="updateFiled"/>
                  <a href="#" @click.prevent="addTypeWork" class="add_link">Добавить вид работ</a>
                </v-row>

              </div>
            </v-form>
          </v-tab-item>
          <v-tab-item>
            <v-form ref="form_part_2" v-model="valid" lazy-validation>
              <div class="form-part"
                   v-for="(item, index) in meta.meta_object_contact"
                   :key="index">
                <FormBuilder :meta="item" @updateFiled="updateFiled"/>
              </div>
              <AddFormPart :text="addContactPersText" @addFormPart="addFormPart"/>
            </v-form>
          </v-tab-item>
          <v-tab-item>
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
        :value="alert"
        type="success"
        dismissible
        transition="fade-transition">
        Ваша заявка успешно создана.
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
      /* meta: {
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
            validation: ['required'],
            params: {
              value: ''
            },
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
              value: ''
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
            params: {
              value: ''
            },
          },
          {
            type: 'FTypeDate',
            label: 'Окончание работ',
            col: 4,
            id: 'object_end_date',
            name: 'object_end_date',
            validation: 'required',
            params: {
              value: ''
            },
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
              value: ''
            },
          },
          {
            type: 'FTypeTextarea',
            label: 'Описание',
            col: 12,
            id: 'object_desc',
            name: 'object_desc',
            params: {
              value: ''
            },
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
          },
          {
            type: 'FTypeText',
            label: 'Город',
            col: 12,
            id: 'object_city',
            name: 'object_city',
            validation: ['required'],
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
              validation: ['required'],
            },
            {
              type: 'FTypeText',
              label: 'Должность',
              col: 12,
              id: 'object_contact_post',
              name: 'object_contact_post_0',
              validation: ['required'],
            },
            {
              type: 'FTypeText',
              label: 'Телефон',
              col: 12,
              id: 'object_contact_phone',
              name: 'object_contact_phone_0',
              validation: ['required' ,'phone'],
            },
            {
              type: 'FTypeText',
              label: 'Email',
              col: 12,
              id: 'object_contact_email',
              name: 'object_contact_email_0',
              validation: ['required' ,'email'],
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
            validation: [],
          },
        ],
      },*/
      valid: true,
      select: null,
      addContactPersText: 'Добавить контактное лицо',
      alert: false,
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
          this.formValues['object_resp_0'+i]
        )
      }
      dispatchers.push(
        "e19e332e-2db2-4830-8e62-252f3fca541e",
        "ce23e853-6405-46a7-bfc2-2f460efc7a79"
      )

      let postBody = {
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
      return postBody;
    },
    meta(){
       let meta = {
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
            validation: ['required'],
            params: {
              value: this.request_id.name
            },
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
              value: ''
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
            params: {
              value: ''
            },
          },
          {
            type: 'FTypeDate',
            label: 'Окончание работ',
            col: 4,
            id: 'object_end_date',
            name: 'object_end_date',
            validation: 'required',
            params: {
              value: ''
            },
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
              value: ''
            },
          },
          {
            type: 'FTypeTextarea',
            label: 'Описание',
            col: 12,
            id: 'object_desc',
            name: 'object_desc',
            params: {
              value: ''
            },
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
            params: {
              value: this.request_id.region
            },

          },
          {
            type: 'FTypeText',
            label: 'Город',
            col: 12,
            id: 'object_city',
            name: 'object_city',
            validation: ['required'],
            params: {
              value: this.request_id.city
            },
          },
          {
            type: 'FTypeTextarea',
            label: 'Предлагаемая схема проезда',
            col: 12,
            id: 'object_driving_directions',
            name: 'object_driving_directions',
            params: {
              value: this.request_id.region
            },
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
            },
            {
              type: 'FTypeText',
              label: 'Должность',
              col: 12,
              id: 'object_contact_post',
              name: 'object_contact_post_0',
              validation: ['required'],
            },
            {
              type: 'FTypeText',
              label: 'Телефон',
              col: 12,
              id: 'object_contact_phone',
              name: 'object_contact_phone_0',
              validation: ['required' ,'phone'],
            },
            {
              type: 'FTypeText',
              label: 'Email',
              col: 12,
              id: 'object_contact_email',
              name: 'object_contact_email_0',
              validation: ['required' ,'email'],
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
            validation: [],
          },
        ],
      };
       return meta;
    }
  },
  methods: {
    ...mapActions('objects', ['fetchObjects',]),
    ...mapActions('specializations', ['fetchSpecializations',]),
    ...mapActions('dispatchers', ['fetchDispatchers',]),
    ...mapActions('requests', ['createRequest',]),
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
          },
          {
            type: 'FTypeText',
            label: 'Должность',
            col: 12,
            id: 'object_contact_post',
            name: 'object_contact_post_' + this.meta.meta_object_contact.length,
            validation: ['required'],
          },
          {
            type: 'FTypeText',
            label: 'Телефон',
            col: 12,
            id: 'object_contact_phone',
            name: 'object_contact_phone_' + this.meta.meta_object_contact.length,
            validation: ['required' ,'phone'],
          },
          {
            type: 'FTypeText',
            label: 'Email',
            col: 12,
            id: 'object_contact_email',
            name: 'object_contact_email_' + this.meta.meta_object_contact.length,
            validation: ['required' ,'email'],
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
        let formPart = 'form_part_'+ this.tab;
        this.$refs[formPart].validate();

        this.$nextTick(() => {
          if (this.valid){
            this.tab += 1;
          }
          else{
            let el = this.$el.querySelector(".v-messages.error--text:first-of-type");
            this.$vuetify.goTo(el);
          }
        });
      }
      else{
        const newRequet = JSON.stringify(this.postBody);
        console.log(newRequet);
        this.createRequest(newRequet);
      }
    },
    prevFromButton() {
      this.tab -= 1;
    },
    updateFiled(field, value) {
      this.formValues[field] = value;
    },
  },
  async created() {
    await this.fetchRequestId(this.$route.params.id);

    this.meta.meta_object_name[0].params.options = this.objects;
    this.meta.meta_object_info[1].params.options = this.specializations;
    this.meta.meta_object_responsible[0].params.options = this.dispatchers;
    this.meta.meta_object_info[0].params.value = this.request_id.name;


  },
  async mounted() {


    /*this.meta.meta_object_name.map(f => {
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
    })*/
  }
}
</script>

<style lang="scss" scoped>

@import '../../../assets/scss/colors';

.wrapp-alert{
  position: fixed;
  width: 100%;
  bottom: 0;
}

</style>
