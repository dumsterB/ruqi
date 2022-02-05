<template>
  <div>
    <Header :content="client_id.name" :size="title_size" :isnew="false" :isback="true"/>
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
                <FormBuilder :meta="meta.meta_object_info" @updateFiled="updateFiled"/>
              </div>
            </v-form>
          </v-tab-item>
          <v-tab-item>
            <v-form ref="form_part_1" v-model="valid" lazy-validation>
              <div class="form-part">
                <FormBuilder :meta="meta.meta_object_doc" @updateFiled="updateFiled"/>
              </div>
            </v-form>
          </v-tab-item>
          <v-tab-item>
            <v-form ref="form_part_2" v-model="valid" lazy-validation>
              <div class="form-part">
                <FormBuilder :meta="meta.meta_object_objects" @updateFiled="updateFiled"/>
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
      title: 'Создание нового клиента',
      title_size: 'large',
      title_create: false,
      title_page_create: '',
      tabs_list: [
        'Данные', 'Документы', 'Объекты',
      ],
      tab: null,
      nextButtonsText: [
        'Добавить документы',
        'указать объекты',
        'Сохранить'
      ],
      meta: {
        meta_object_info: [
          {
            type: 'FTypeText',
            label: 'Полное наименование организации',
            col: 12,
            name: 'name',
            validation: ['required'],
            value: ''
          },
          {
            type: 'FTypeSelectUIID',
            label: 'Вид контрагента',
            col: 12,
            name: 'object_spec',
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
            label: 'Юридический адрес',
            col: 12,
            name: 'legal_address',
            validation: ['required'],
            value: ''
          },
          {
            type: 'FTypeText',
            label: 'Почтовый адрес',
            col: 12,
            name: 'post_address',
            validation: ['required'],
            value: ''
          },
          {
            type: 'FTypeText',
            label: 'ОГРН',
            col: 6,
            name: 'ogrn',
            validation: ['required'],
            value: ''
          },
          {
            type: 'FTypeText',
            label: 'ОКАТО',
            col: 6,
            name: 'okato',
            validation: ['required'],
            value: ''
          },
          {
            type: 'FTypeText',
            label: 'ИНН',
            col: 4,
            name: 'inn',
            validation: ['required'],
            value: ''
          },
          {
            type: 'FTypeText',
            label: 'КПП',
            col: 4,
            name: 'kpp',
            validation: ['required'],
            value: ''
          },
          {
            type: 'FTypeText',
            label: 'БИК',
            col: 4,
            name: 'bik',
            validation: ['required'],
            value: ''
          },
          {
            type: 'FTypeText',
            label: 'Расчетный счет',
            col: 6,
            name: 'payment_account',
            validation: ['required'],
            value: ''
          },
          {
            type: 'FTypeText',
            label: 'Корреспондентский счёт',
            col: 6,
            name: 'cor_account',
            validation: ['required'],
            value: ''
          },
          {
            type: 'FTypeText',
            label: 'Банк',
            col: 12,
            name: 'bank',
            validation: ['required'],
            value: ''
          },
          {
            type: 'FTypeText',
            label: 'Генеральный директор',
            col: 12,
            name: 'general_manager',
            validation: ['required'],
            value: ''
          },
          {
            type: 'FTypeText',
            label: 'Электронная почта',
            col: 12,
            name: 'object_contact_email',
            validation: ['required' ,'email'],
            value: ''
          },
          {
            type: 'FTypeText',
            label: 'Телефон',
            col: 12,
            name: 'object_contact_phone',
            validation: ['required' ,'phone'],
            value: ''
          },

        ],
        meta_object_doc: [
          {
            type: 'FTypeFile',
            label: 'Паспорт - основной разворот',
            col: 12,
            name: 'doc_pass_01',
            value: ''
          },
          {
            type: 'FTypeFile',
            label: 'Паспорт - страница регистрации',
            col: 12,
            name: 'doc_pass_02',
            value: ''
          },
        ],
        meta_object_objects: [
          {
            type: 'FTypeSelectUIID',
            label: '',
            col: 12,
            id: 'object_entity',
            name: 'object_entity',
            params: {
              options: [],
              item_text: 'name',
              label: 'Не выбрано',
            },
            validation: 'required',
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
    client_id(){
      return this.$store.getters['client_id/client_id'];
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
    ...mapActions('client_id', ['fetchClientId',]),
    ...mapActions('client_id', ['putRequest',]),

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
        this.putRequest({uuid: this.client_id.uuid, body: newRequet});
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
  async created() {
    await this.fetchClientId(this.$route.params.id);

    this.meta.meta_object_info[1].params.options = this.specializations;
    this.meta.meta_object_objects[0].params.options = this.objects;

    this.meta.meta_object_info[0].value = this.client_id.name;
    this.meta.meta_object_info[1].value = this.client_id.specialization;
    this.meta.meta_object_info[2].value = this.client_id.legal_address;
    this.meta.meta_object_info[3].value = this.client_id.address;
    this.meta.meta_object_info[4].value = this.client_id.ogrn;
    this.meta.meta_object_info[5].value = this.client_id.okato;
    this.meta.meta_object_info[6].value = this.client_id.inn;
    this.meta.meta_object_info[7].value = this.client_id.kpp;
    this.meta.meta_object_info[8].value = this.client_id.bik;
    this.meta.meta_object_info[9].value = this.client_id.payment_account;
    this.meta.meta_object_info[10].value = this.client_id.correspondent_account;
    this.meta.meta_object_info[11].value = this.client_id.bank;
    this.meta.meta_object_info[12].value = this.client_id.gen_director;
    this.meta.meta_object_info[13].value = this.client_id.mail;
    this.meta.meta_object_info[14].value = this.client_id.phone;

    this.meta.meta_object_info.map(f => {
      Vue.set(this.formValues, f.name, f.value);
    })
    this.meta.meta_object_objects.map(f => {
      Vue.set(this.formValues, f.name, f.value);
    })

  }
}
</script>

<style lang="scss" scoped>



</style>