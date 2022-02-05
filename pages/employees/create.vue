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
            <v-form ref="form_part_0" v-model="valid" lazy-validation>
              <div class="form-part">
                <div class="form-part-title">
                  Данные для регистрации нового пользователя
                </div>
                <div class="form-part-description">
                  Краткое описание что сюда писать, например напишите в наименовании общедоступное название и примерное расположение.
                </div>
                <FormBuilder :meta="meta.meta_object_info" @updateFiled="updateFiled"/>
              </div>
            </v-form>
          </v-tab-item>
          <v-tab-item>
            <v-form ref="form_part_1" v-model="valid" lazy-validation>
              <div class="form-part">
                <div class="form-part-title">
                  Действия доступные пользователю
                </div>
                <div class="form-part-description">
                  Краткое описание что сюда писать, например напишите в наименовании общедоступное название и примерное расположение.
                </div>
                <div class="form-part-label">Действия</div>
                <FormBuilder :meta="meta.meta_object_rights" @updateFiled="updateFiled"/>

                <div class="form-part-label">Оповещения</div>
                <FormBuilder :meta="meta.meta_object_notification" @updateFiled="updateFiled"/>
              </div>
            </v-form>
          </v-tab-item>
          <v-tab-item>
            <v-form ref="form_part_2" v-model="valid" lazy-validation>
              <div class="form-part">

              </div>
            </v-form>
          </v-tab-item>
          <v-tab-item>
            <v-form ref="form_part_3" v-model="valid" lazy-validation>
              <div class="form-part">
                <FormBuilder :meta="meta.meta_object_contact" @updateFiled="updateFiled"/>
              </div>
            </v-form>
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
import {mapState, mapActions, mapGetters, mapMutations} from 'vuex';

export default {
  async fetch({store}) {
    if (store.getters['objects/objects'].length === 0) {
      await store.dispatch('objects/fetchObjects')
    }
    if (store.getters['dictionary/specializations'].length === 0) {
      await store.dispatch('dictionary/fetchSpecializations')
    }

  },
  data() {
    return {
      formValues: {},
      title: 'Создание нового сотрудника',
      title_size: 'large',
      title_create: false,
      title_page_create: '',
      tabs_list: [
        'Общее', 'Права', 'Данные для входа', 'Способы связи',
      ],
      tab: null,
      nextButtonsText: [
        'создать нового пользователя',
        'создать нового пользователя',
        'создать нового пользователя',
        'создать нового пользователя'
      ],
      meta: {
        meta_object_info: [
          {
            type: 'FTypeSelectUIID',
            label: 'Роль',
            col: 8,
            name: 'object_role',
            params: {
              options: [],
              item_text: 'name',
              label: 'Не выбрано'
            },
            validation: 'required',
            value: ''
          },
          {
            type: 'FTypeText',
            label: 'Имя',
            col: 8,
            name: 'firstname',
            validation: ['required'],
            value: ''
          },
          {
            type: 'FTypeText',
            label: 'Фамилия',
            col: 8,
            name: 'lastname',
            validation: ['required'],
            value: ''
          },
          {
            type: 'FTypeText',
            label: 'Описание',
            col: 8,
            name: 'description',
            validation: ['required'],
            value: ''
          },
          {
            type: 'FTypeText',
            label: 'Email',
            col: 12,
            name: 'object_contact_email',
            validation: ['required' ,'email'],
            value: ''
          },
          {
            type: 'FTypeSelectUIID',
            label: 'Назначить на объекты',
            col: 12,
            name: 'object_0',
            params: {
              options: [],
              item_text: 'name',
              label: 'Не выбрано'
            },
            validation: 'required',
            value: ''
          },


        ],
        meta_object_rights: [
          {
            type: 'FTypeSwitch',
            params: {
              label: 'Разрешать пользователю добавлять новых менеджеров',
            },
            col: 12,
            name: 'mor_01',
            value: ''
          },
          {
            type: 'FTypeSwitch',
            params: {
              label: 'Разрешать пользователю добавлять новых менеджеров',
            },
            col: 12,
            name: 'mor_02',
            value: ''
          },
          {
            type: 'FTypeSwitch',
            params: {
              label: 'Разрешать пользователю добавлять новых менеджеров',
            },
            col: 12,
            name: 'mor_03',
            value: ''
          },
        ],
        meta_object_notification: [
          {
            type: 'FTypeSwitch',
            params: {
              label: 'Разрешать пользователю добавлять новых менеджеров',
            },
            col: 12,
            name: 'mor_01',
            value: ''
          },
          {
            type: 'FTypeSwitch',
            params: {
              label: 'Разрешать пользователю добавлять новых менеджеров',
            },
            col: 12,
            name: 'mor_02',
            value: ''
          },
          {
            type: 'FTypeSwitch',
            params: {
              label: 'Разрешать пользователю добавлять новых менеджеров',
            },
            col: 12,
            name: 'mor_03',
            value: ''
          },
        ],
        meta_object_contact: [
          {
            type: 'FTypeText',
            label: 'Телефон',
            col: 8,
            name: 'object_contact_phone',
            validation: ['required' ,'phone'],
            value: ''
          },
          {
            type: 'FTypeText',
            label: 'Email',
            col: 8,
            name: 'object_contact_email',
            validation: ['email'],
            value: ''
          },
          {
            type: 'FTypeText',
            label: 'Whatsapp',
            col: 8,
            name: 'object_contact_whatsapp',
            validation: ['phone'],
            value: ''
          },
          {
            type: 'FTypeText',
            label: 'Telegram',
            col: 8,
            name: 'object_contact_telegram',
            validation: ['phone'],
            value: ''
          },
        ],

      },
      valid: true,
      select: null,
      formHasErrors: false,
    }
  },
  computed: {
    objects() {
      return this.$store.getters['objects/objects'];
    },
    specializations() {
      return this.$store.getters['dictionary/specializations'];
    },
    postBody() {
      let objects = [];
      for (let i = 0; i < this.meta.meta_object_objects.length; i++) {
        objects.push(
          {
          }
        )
      }

      let postBody = {
        "name": this.formValues.name,
        "address": this.formValues.post_address,
        "specialization_uuid": this.formValues.object_spec,
        "legal_address": this.formValues.legal_address,
        "inn": this.formValues.inn,
        "ogrn": this.formValues.ogrn,
        "kpp": this.formValues.kpp,
        "okato": this.formValues.okato,
        "bik": this.formValues.bik,
        "payment_account": this.formValues.payment_account,
        "correspondent_account": this.formValues.cor_account,
        "bank": this.formValues.bank,
        "gen_director": this.formValues.general_manager,
        "mail": this.formValues.object_contact_email,
        "phone": this.formValues.object_contact_phone,
      };

      return postBody;
    },
  },
  methods: {
    ...mapActions('objects', ['fetchObjects',]),
    ...mapActions('dictionary', ['fetchSpecializations',]),
    ...mapActions('clients', ['createRequest',]),

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
       this.createRequest(newRequet);
      }
    },
    prevFromButton() {
      this.tab -= 1;
    },
    updateFiled(field, value) {
      this.formValues[field] = value;
      console.log(field, value);
    },
  },
  created() {

    this.meta.meta_object_info.map(f => {
      Vue.set(this.formValues, f.name, f.value);
    })
    this.meta.meta_object_contact.map(f => {
      Vue.set(this.formValues, f.name, f.value);
    })

    this.meta.meta_object_info[0].params.options = this.specializations;
    this.meta.meta_object_info[5].params.options = this.objects;

  }
}
</script>

<style lang="scss" scoped>

@import '../../assets/scss/colors';


</style>