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
                  Информация об объекте
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
              <div class="form-part">
                <div class="form-part-label">Наше юр.лицо</div>
                <FormBuilder :meta="meta.meta_object_entity" @updateFiled="updateFiled"/>
              </div>
              <div class="form-part">
                <div class="form-part-label">Менеджеры</div>
                <FormBuilder :meta="meta.meta_object_manager" @removeItem="removeItem" @updateFiled="updateFiled"/>
                <a href="#" @click.prevent="addResponsible('manager')" class="add_link">Добавить менеджера</a>
              </div>
              <div class="form-part">
                <div class="form-part-label">Диспетчеры</div>
                <FormBuilder :meta="meta.meta_object_dispatchers" @removeItem="removeItem" @updateFiled="updateFiled"/>
                <a href="#" @click.prevent="addResponsible('dispatchers')" class="add_link">Добавить диспетчера</a>
              </div>
            </v-form>
          </v-tab-item>
          <v-tab-item>
            <v-form ref="form_part_2" v-model="valid" lazy-validation>
              <div class="form-part form-part-contact"
                   v-for="(item, index) in meta.meta_object_contact"
                   :key="index">
                <a v-show="index != 0" href="#" @click.prevent="removeItem(index, 'meta_object_contact')"
                   class="remove-item">
                  <img src="/img/ico_close.svg" alt="Удалить">
                </a>
                <FormBuilder :meta="item" @updateFiled="updateFiled"/>
              </div>
              <AddFormPart :text="addContactPersText" @addFormPart="addFormPart"/>
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
      // await store.dispatch('objects/fetchObjects')
    }
    if (store.getters['specializations/specializations'].length === 0) {
      await store.dispatch('specializations/fetch')
    }
    if (store.getters['dictionary/dispatchers'].length === 0) {
      await store.dispatch('dictionary/fetchDispatchers')
    }
    if (store.getters['dictionary/managers'].length === 0) {
      await store.dispatch('dictionary/fetchManagers')
    }
    if (store.getters['dictionary/clients'].length === 0) {
      await store.dispatch('dictionary/fetchClients')
    }
    if (store.getters['dictionary/organizations'].length === 0) {
      await store.dispatch('dictionary/fetchOrganizations')
    }
    if (store.getters['dictionary/objectType'].length === 0) {
      await store.dispatch('dictionary/fetchObjectType')
    }
  },
  data() {
    return {
      formValues: {},
      title: 'Создание нового объекта',
      title_size: 'large',
      title_create: false,
      title_page_create: '',
      tabs_list: [
        'Общее', 'Ответственные', 'Контактные лица',
      ],
      tab: null,
      nextButtonsText: [
        'Указать ответственных',
        'указать контактных лиц',
        'создать объект'
      ],
      meta: {
        meta_object_info: [
          {
            type: 'FTypeSelectUIID',
            label: 'Клиент',
            col: 12,
            id: 'object_client',
            name: 'object_client',
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
            label: 'Название объекта',
            col: 12,
            id: 'object',
            name: 'object',
            validation: ['required'],
            value: ''
          },
          {
            type: 'FTypeSelectUIID',
            label: 'Вид объекта',
            col: 12,
            id: 'object_type',
            name: 'object_type',
            params: {
              options: [],
              item_text: 'name',
              label: 'Не выбрано'
            },
            validation: 'required',
            value: ''
          },
          {
            type: 'FTypeSelectUIID',
            label: 'Специализация',
            col: 12,
            id: 'object_spec',
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
        meta_object_entity: [
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
        meta_object_manager: [
          {
            type: 'FTypeSelectUIID',
            icon: 'mdi-account',
            label: '',
            col: 12,
            id: 'object_manager',
            name: 'object_manager_0',
            remove: true,
            params: {
              options: [],
              item_text: 'fullname',
              label: 'Не выбрано',
            },
            parent_array: 'meta_object_manager',
            validation: 'required',
            value: '',
          },
        ],
        meta_object_dispatchers: [
          {
            type: 'FTypeSelectUIID',
            icon: 'mdi-account',
            label: '',
            col: 12,
            id: 'object_dispatchers',
            name: 'object_dispatchers_0',
            remove: true,
            params: {
              options: [],
              item_text: 'fullname',
              label: 'Не выбрано',
            },
            parent_array: 'meta_object_dispatchers',
            validation: 'required',
            value: '',
          },
        ],

      },
      valid: true,
      select: null,
      addContactPersText: 'Добавить контактное лицо',
      formHasErrors: false,
    }
  },
  computed: {
    specializations() {
      return this.$store.getters['specializations/specializations'];
    },
    dispatchers() {
      return this.$store.getters['dictionary/dispatchers'];
    },
    managers() {
      return this.$store.getters['dictionary/managers'];
    },
    clients() {
      return this.$store.getters['dictionary/clients'];
    },
    organizations() {
      return this.$store.getters['dictionary/organizations'];
    },
    objectType() {
      return this.$store.getters['dictionary/objectType'];
    },
    postBody() {
      let contacts = [];

      for (let i = 0; i < this.meta.meta_object_contact.length; i++) {
        contacts.push(
          {
            "fullname": this.formValues['object_contact_fio_' + i],
            "position": this.formValues['object_contact_post_' + i],
            "phone": this.formValues['object_contact_phone_' + i],
            "email": this.formValues['object_contact_email_' + i],
          }
        )
      }

      let managers = [];

      for (let i = 0; i < this.meta.meta_object_manager.length; i++) {
        let name = this.meta.meta_object_manager[i].name;
        managers.push(
          this.formValues[name]
        )
      }

      let dispatchers = [];

      for (let i = 0; i < this.meta.meta_object_dispatchers.length; i++) {
        let name = this.meta.meta_object_dispatchers[i].name;
        dispatchers.push(
          this.formValues[name]
        )
      }

      let postBody = {
        "name": this.formValues.object,
        "organization": this.formValues.object_client,
        "type": this.formValues.object_type,
        "specialization": this.formValues.object_spec,
        "description": this.formValues.object_desc,
        "region": this.formValues.object_region,
        "city": this.formValues.object_city,
        "scheme": this.formValues.object_driving_directions,
        "account": this.formValues.object_entity,
        "managers": managers,
        "dispatchers": dispatchers,
        "contacts": contacts
      };

      console.log(postBody);
      return postBody;
    },
  },
  methods: {
    ...mapActions('objects', ['fetchObjects',]),
    ...mapActions('specializations', ['fetchSpecializations',]),
    ...mapActions('dictionary', ['fetchDispatchers',]),
    ...mapActions('dictionary', ['fetchManagers',]),
    ...mapActions('objects', ['createRequest',]),
    ...mapActions('dictionary', ['fetchClients',]),
    ...mapActions('dictionary', ['fetchOrganizations',]),

    addResponsible(resp_name, isInit = false) {

      let flag = false;

      if (!isInit) {
        let name = this.meta['meta_object_' + resp_name][this.meta['meta_object_' + resp_name].length - 1].name;
        if (!this.meta['meta_object_' + resp_name].length) {
          flag = false;
        } else if (!this.formValues[name]) {
          flag = true;
        }
        if (flag) {
          return;
        }
      }

      let resp = [];

      switch (resp_name) {
        case 'manager' :
          resp = this.managers;
          break;

        case 'dispatchers' :
          resp = this.dispatchers;
          break;
      }

      this.meta['meta_object_' + resp_name].push(
        {
          type: 'FTypeSelectUIID',
          icon: 'mdi-account',
          label: '',
          col: 12,
          name: 'object_' + resp_name + '_' + this.meta['meta_object_' + resp_name].length,
          remove: true,
          params: {
            options: resp,
            item_text: 'fullname',
            label: 'Не выбрано'
          },
          parent_array: 'meta_object_' + resp_name,
          validation: 'required',
          value: '',
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
            validation: ['required', 'phone'],
          },
          {
            type: 'FTypeText',
            label: 'Email',
            col: 12,
            id: 'object_contact_email',
            name: 'object_contact_email_' + this.meta.meta_object_contact.length,
            validation: ['required', 'email'],
          },
        ],
      );
    },
    removeItem(index, array) {
      if (index >= 0 || this.meta[array].length > 1) {
        this.meta[array].splice(index, 1);
        delete this.formValues[`${array.replace('meta_', '')}_${index}`];
      }
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
    updateFiledResp(field, value, index, parent_array) {
      this.formValues[field] = value;
      this.meta[parent_array][index].value = value;
    },
  },
  created() {

    this.meta.meta_object_info.map(f => {
      Vue.set(this.formValues, f.name, f.value);
    })
    this.meta.meta_object_location.map(f => {
      Vue.set(this.formValues, f.name, f.value);
    })
    this.meta.meta_object_contact.map(subarray => subarray.map(f => {
      Vue.set(this.formValues, f.name, f.value);
    }));
    this.meta.meta_object_dispatchers.map(f => {
      Vue.set(this.formValues, f.name, f.value);
    })
    this.meta.meta_object_manager.map(f => {
      Vue.set(this.formValues, f.name, f.value);
    })

    this.meta.meta_object_info[0].params.options = this.organizations;
    this.meta.meta_object_entity[0].params.options = this.clients;
    this.meta.meta_object_info[2].params.options = this.objectType;
    this.meta.meta_object_info[3].params.options = this.specializations;
    this.meta.meta_object_manager[0].params.options = this.managers;
    this.meta.meta_object_dispatchers[0].params.options = this.dispatchers;
  }
}
</script>

<style lang="scss" scoped>

@import '../../assets/scss/colors';

.wrapp-alert{
  position: fixed;
  width: 100%;
  bottom: 0;
  left: 0;

  .v-alert{
    margin: 0;
  }
}

</style>
