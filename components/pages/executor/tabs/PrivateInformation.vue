<template>
  <div class="private_info">
    <v-container>
      <div class="content">
      <h2>Личные данные</h2>
      <p class="text-grey">Значимость этих проблем настолько очевидна, что начало повседневной работы по формированию позиции требуют</p>
        <v-form ref="form_part_0" v-model="valid" lazy-validation>
            <div class="form-part">
              Имя
              <v-text-field
                  outlined
                  class="mt-2"
                  v-model="form.name"
                  dense
                  single-line
              ></v-text-field>
            </div>

            <div class="form-part">
              Фамилия
              <v-text-field
                  outlined
                  class="mt-2"
                  dense
                  v-model="form.surname"
              ></v-text-field>
            </div>


            <div class="form-part">
              Отчество
              <v-text-field
                  outlined
                  class="mt-2"
                  v-model="form.middle_name"
                  dense
              ></v-text-field>
            </div>
            <div class="form-part">
              Пол
              <v-select
                  outlined
                  class="mt-2"
                  dense
                  placeholder="Не выбрано"
                  v-model="form.sex"
                  :items="sex_options"
              ></v-select>
            </div>
          <div class="form-part">
            Дата рождения
            <v-menu
                ref="menu"
                v-model="menu"
                :close-on-content-click="false"
                :return-value.sync="form.date"
                transition="scale-transition"
                offset-y
                min-width="auto"
            >
              <template v-slot:activator="{ on, attrs }">
                <v-text-field
                    v-model="form.birth_date"
                    label="ДД.ММ.ГГГГ"
                    class="mt-2"
                    readonly
                    v-bind="attrs"
                    outlined
                    dense
                    v-on="on"
                ></v-text-field>
              </template>
              <v-date-picker
                  v-model="form.birth_date"
                  no-title
                  scrollable
              >
                <v-spacer></v-spacer>
                <v-btn
                    text
                    color="primary"
                    @click="menu = false"
                >
                  Cancel
                </v-btn>
                <v-btn
                    text
                    color="primary"
                    @click="$refs.menu.save(form.birth_date)"
                >
                  OK
                </v-btn>
              </v-date-picker>
            </v-menu>

          </div>
          <div class="form-part">
            Телефон
            <v-text-field
                v-model="form.phone"
                class="mt-2"
                outlined
                placeholder="+7"
                dense
            ></v-text-field>
          </div>

          <div class="form-part" v-if="agree">
            Email
            <v-text-field
                class="mt-2"
                v-model="form.email"
                outlined
                placeholder=""
                dense
            ></v-text-field>
          </div>

          <div class="form-part-checkbox">
            <div class="d-flex">
              <v-checkbox
                  v-model="agree"
                  @click="checkboxHandler"
              ></v-checkbox>
            <p class="mt-5"> Я не могу получить код по SMS</p>
            </div>
            <p class="text-grey-checkbox">
              Выбрав эту опцию вам будет предложено <br>  связаться с менеджером для регистрации по телефону
            </p>
            <v-btn  elevation="0" class="btn-secondary"> <span class="btn-title">Назад</span> </v-btn>
            <v-btn dark elevation="0" class="btn-primary" :disabled="!disableHandler" @click="next(1)"><span class="btn-title">Далее</span> </v-btn>
            <p class="text-grey text-center">Значимость этих проблем настолько очевидна, что начало повседневной работы по формированию позиции требуют</p>
          </div>
        </v-form>
      </div>
  </v-container>

</div>
</template>

<script>
import {mapActions, mapGetters} from "vuex";

export default {
  name: "PrivateInformation",
  props:{
    form:{
      type:Object,
      required:true,
      default:{},
    },
    agree:{
      type:Boolean,
    }
  },
  data(){
    return{
      valid:false,
      menu:'',
      sex_options:['мужской','женский'],
      switcher:false
    }
  },
  methods:{
    ...mapActions('executor',['createExecutor']),
    next(value){
      this.$emit('pageHandler',value)
      this.createExecutor(this.form)
    },
    checkboxHandler(){
      this.switcher=!this.switcher
      this.$emit('checkboxHandler',this.switcher)
    },
  },
  computed:{
   executors() {
    return this.$store.getters['executor/executors']
   },
    disableHandler(){
     if(this.agree){
       return this.form.name && this.form.surname  && this.form.email && this.form.sex && this.form.date
     }else{
       return this.form.name && this.form.surname  && this.form.phone && this.form.sex && this.form.date
     }

    }
  }
}
</script>

<style scoped>
.text-grey-checkbox{
  color: #8692A6!important;
  margin-top: -10px;
  font-size: 14px;
}
.v-input__control{
  border: 1px solid lightgrey!important;
}
.btn-primary{
  background: #0082DE!important;
  border-radius: 8px;
  height: 45px!important;
  width: 100%;
  margin-top: 15px;
}
.btn-secondary{
  background: white!important;
  border-radius: 8px;
  height: 45px!important;
  width: 100%;
  border: 1px solid lightgrey;
}
.form-part-title{
  margin-top: -10px;
  margin-bottom: 10px;
}
.text-grey{
  color: #8692A6;
  font-size: 14px;
}
.theme--dark.v-btn.v-btn--disabled.v-btn--has-bg {
background: lightgrey!important;
}

</style>