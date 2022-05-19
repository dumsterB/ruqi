<template lang="pug">

  .add-service
    v-row.d-flex.pa-5.align-center.action-row(no-gutters)
      v-col(cols="10")
        .header-dialog {{ title }}

      v-col.d-flex.justify-end(cols="2")
        v-btn.btn-blue.add(text height="48" outlined @click="createServiceHandler")
          span {{ submitBtnText }}

        v-btn.add.ml-4(text height="48" outlined @click="closeCreateEditForm")
          span закрыть

    v-container.object-info-container
      v-row
        v-col(cols="12")
          .object-info
            v-row.object-info-row-rate
              v-col(cols="12")
                .wrap-form
                  v-form(ref="form_part_0" v-model="valid" lazy-validation)
                    .form-part-single
                      .form-part-title Данные
                      FormBuilder(:meta="meta.meta_object_service" @updateFiled="updateFiled")
                      v-btn.btn-blue.mt-6(text :disabled="disabled" height="48" outlined  @click="createServiceHandler") {{ submitBtnText }}

            v-row.object-info-row-rate
              v-col(cols="12" v-if="$route.params.ServiceId")
                .wrap-form
                  v-divider.my-8
                  .form-part-title Ставки
                  a.add-field.my-8(@click.prevent="isAddingRate = true")
                    v-icon(color="#0082DE" size="24") mdi-plus-circle
                    span Добавить плановое значение

            v-row(no-gutters)
              v-col(cols="12" v-if="$route.params.ServiceId")
                .wrap-form
                  .form-part-single.form-rate
                    v-row.flex-column.new-rate.px-5(no-gutters v-show="isAddingRate")
                      .form-rate-title Введите новое значение
                      Rate( prefix_name="new" :isNew="true" @updateFiled="updateFiled" @setRate="setRate")

                    v-row.flex-column.px-5(no-gutters v-show="service_id.rates && service_id.rates.length")
                      .form-rate-title.mb-6 Следующие значения

                      div(v-if="service_id.rates && service_id.rates.length")
                        div(v-for="(rate, index) in service_id.rates")
                          Rate( :prefix_name="index" :isNew="false"
                            @updateFiled="updateFiled"
                            :rate_value="rate.rate" :date_value="rate.start_date"  :key="rate.rate + '_' +index"
                            @deleteRate="deleteRate(rate.uuid)" @putRate="putRate(index, rate.uuid)")
                          v-row
                            v-col(cols="12")
                              v-divider.mt-6.mb-8


</template>

<script>
import Vue from "vue";
import Rate from "@/components/composite/Rate";
import {mapActions} from "vuex";

export default {
  meta: {
    title: "Услуга",
  },
  components: {Rate},
  data() {
    return {
      valid: true,
      formValues: {},
      disabled: false,
      meta: {
        meta_object_service: [
          {
            type: 'FTypeSelectUIID',
            label: 'Категория',
            col: 12,
            name: 'object_category',
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
            label: 'Наименование',
            col: 12,
            name: 'object_vacancy',
            validation: ['required'],
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
          {
            type: 'FTypeSelect',
            label: 'Юнит',
            col: 4,
            name: 'object_unit',
            params: {
              options: [
                'шт', 'часы', 'палеты', 'пики', 'линии'
              ],
              item_text: 'name',
              label: 'Не выбрано'
            },
            validation: 'required',
            value: 'шт'
          },
          {
            type: 'FTypeText',
            label: 'Норматив',
            col: 4,
            name: 'object_norma',
            validation: [],
            value: '0'
          },
        ],
        meta_object_rate: [
          [
            {
              type: 'FTypeLabel',
              label: 'Введите новое значение',
              col: 12,
              name: 'object_new_rate',
              parent_array: 'meta_object_rate',
              params: {},
              validation: [],
              value: '',
            },
            {
              type: 'FTypeText',
              label: 'ставка',
              icon: '',
              col: 4,
              name: 'object_rate_rate_0',
              remove: false,
              parent_array: 'meta_object_rate',
              value: '',
              params: {
                readonly: false
              },
            },
            {
              type: 'FTypeDate',
              label: 'действует с',
              col: 4,
              name: 'object_rate_date_0',
              validation: 'required',
              parent_array: 'meta_object_rate',
              value: '',
              params: {
                time: false
              },
            },
          ],
        ],
      },
      rates: [],
      isAddingRate: false
    }
  },
  computed: {
    specializations() {
      return this.$store.getters['specializations/specializations'];
    },
    service_id() {
      return this.$store.getters['service_id/service_id'];
    },
    title() {
      if (this.$route.params.ServiceId) {
        return 'Карточка услуги: ' + this.service_id.name;
      } else {
        return 'Добавить услугу'
      }
    },
    submitBtnText() {
      if (this.$route.params.ServiceId) {
        return 'сохранить изменения';
      } else {
        return 'создать услугу'
      }
    },
    postBody() {
      let postBody = {
        "specialization": {
          "uuid": this.formValues.object_category
        },
        "name": this.formValues.object_vacancy,
        "description": this.formValues.object_desc,
        "standart": this.formValues.object_norma,
        "unit": this.formValues.object_unit,
      };

      console.log(postBody);
      return postBody;
    },
    postRate() {
      let postRate = {
        "rate": this.formValues.object_rate_rate_new,
        "start_date": this.formValues.object_rate_date_new,
      };
      console.log(postRate);
      return postRate;
    },

  },
  methods: {
    ...mapActions('specializations', ['fetch',]),
    ...mapActions('service_id', ['createService',]),
    ...mapActions('service_id', ['putService',]),
    ...mapActions('service_id', ['fetchServiceId',]),
    ...mapActions('rate', ['createServiceRate',]),
    ...mapActions('rate', ['putServiceRate',]),
    ...mapActions('rate', ['removeServiceRate',]),


    closeCreateEditForm() {
      this.$router.go(-1);
    },
    updateFiled(field, value) {
      this.formValues[field] = value;
      console.log(field, value);
    },
    updateFiledinArray(index_block, field, value, index, parent_array) {
      this.formValues[field] = value;
      this.meta[parent_array][index_block][index].value = value;
    },
    removeItem(index, array) {
      if (index != 0 || this.meta[array].length > 1) {
        this.meta[array].splice(index, 1);
      }
    },
    createServiceHandler() {
      let formPart = 'form_part_0',
        object_uuid = this.$route.params.objectId,
        service_uuid = this.$route.params.ServiceId;
      this.$refs[formPart].validate();
      this.$nextTick(() => {
        if (this.valid) {
          const newRequest = JSON.stringify(this.postBody);
          console.log(newRequest);

          if (this.$route.params.ServiceId) {
            this.putService({body: newRequest, object_uuid: object_uuid, service_uuid: service_uuid});
          }else{
            this.createService({newRequest: newRequest, object_uuid: object_uuid});
          }
        } else {
          let el = this.$el.querySelector(".v-messages.error--text:first-of-type");
          this.$vuetify.goTo(el);
        }
      });
    },
    setRate() {
      let object_uuid = this.$route.params.objectId,
        service_uuid = this.$route.params.ServiceId;

      const newRequest = JSON.stringify(this.postRate);
      console.log(newRequest);
      this.createServiceRate({newRequest: newRequest, object_uuid: object_uuid, service_uuid: service_uuid});
    },
    deleteRate(uuid) {
      let object_uuid = this.$route.params.objectId,
        service_uuid = this.$route.params.ServiceId;
      this.removeServiceRate({object_uuid: object_uuid, service_uuid: service_uuid, rate_uuid: uuid});
    },
    putRate(index, uuid) {
      let putRate = {
          "rate": this.formValues['object_rate_rate_' + index],
          "start_date": this.formValues['object_rate_date_' + index],
        },
        object_uuid = this.$route.params.objectId,
        service_uuid = this.$route.params.ServiceId;

      const newRequet = JSON.stringify(putRate);
      console.log(newRequet);
      this.putServiceRate({body: newRequet, object_uuid: object_uuid, service_uuid: service_uuid, rate_uuid: uuid});
    }
  },
  async created() {

    await this.fetch();
    this.meta.meta_object_service[0].params.options = this.specializations;

    if (this.$route.params.ServiceId) {
      await this.fetchServiceId({objectId: this.$route.params.objectId, ServiceId: this.$route.params.ServiceId});

      this.meta.meta_object_service[0].value = this.service_id.specialization.uuid;
      this.meta.meta_object_service[1].value = this.service_id.name;
      this.meta.meta_object_service[2].value = this.service_id.description;
      this.meta.meta_object_service[3].value = this.service_id.unit;
      this.meta.meta_object_service[4].value = this.service_id.standart;
    }

    if (this.$route.params.ServiceId) {
      this.$route.meta.title = 'Карточка услуги: ' + this.service_id.name;
    } else {
      this.$route.meta.title = 'Добавить услугу';
    }

    this.meta.meta_object_service.map(f => {
      Vue.set(this.formValues, f.name, f.value);
    })
    this.meta.meta_object_rate.map(subarray => subarray.map(f => {
      Vue.set(this.formValues, f.name, f.value);
    }));


  },
}
</script>

<style lang="scss">

@import '/assets/scss/colors.scss';

.ruqi.page--objects-id-service {
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

.add-service {
  .action-row {
    background: #fff;

    .header-dialog {
      font-weight: 600;
      font-size: 20px;
    }
  }

  .object-info{
    padding: 24px 0;
  }

  .object-info-container {
    background: whitesmoke;
    padding: 24px;

    .object-info-header {
      font-size: 20px;
    }
  }

  .form-rate-title {
    font-weight: 600;
    margin: 16px 0;
  }

  .new-rate {
    background: #E5EFFF;
    padding-bottom: 20px;
  }

}


</style>
