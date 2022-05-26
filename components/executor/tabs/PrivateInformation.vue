<template>
<div class="private_info">
  <v-container>
      <div class="content">
      <h2>Личные данные</h2>
      <p class="text-grey">Значимость этих проблем настолько очевидна, что начало повседневной работы по формированию позиции требуют</p>
        <v-form ref="form_part_0" v-model="valid" lazy-validation>
          <div class="form-part">
            <div class="form-part-title">
              Имя
            </div>
            <v-text-field
                outlined
                v-model="form.name"
                dense
                single-line
            ></v-text-field>
          </div>
            <div class="form-part-title">
              Фамилия
            </div>
            <v-text-field
                outlined
                dense
                v-model="form.surname"
            ></v-text-field>

            <div class="form-part-title">
              Отчество
            </div>
          <v-text-field
              outlined
              v-model="form.middle_name"
              dense
          ></v-text-field>
            <div class="form-part-title">
              Пол
            </div>
          <v-select
              outlined
              dense
              placeholder="Не выбрано"
              v-model="form.sex"
              :items="form.sex_options"
          ></v-select>
          <div class="form-part-title">
            Дата рождения
          </div>
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
                  v-model="form.date"
                  label="ДД.ММ.ГГГГ"
                  readonly
                  v-bind="attrs"
                  outlined
                  dense
                  v-on="on"
              ></v-text-field>
            </template>
            <v-date-picker
                v-model="form.date"
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
                  @click="$refs.menu.save(form.date)"
              >
                OK
              </v-btn>
            </v-date-picker>
          </v-menu>
          <div class="form-part-title">
            Телефон
          </div>
          <v-text-field
              v-model="form.phone"
              outlined
              placeholder="+7"
              dense
          ></v-text-field>
          <div class="form-part-checkbox">
            <div class="d-flex">
              <v-checkbox
                  v-model="agree"
              ></v-checkbox>
            <p class="mt-5"> Я не могу получить код по SMS</p>
            </div>
            <p class="text-grey-checkbox">
              Выбрав эту опцию вам будет предложено <br>  связаться с менеджером для регистрации по телефону
            </p>
            <v-btn  elevation="0" class="btn-secondary"> <span class="btn-title">Назад</span> </v-btn>
            <v-btn dark elevation="0" class="btn-primary" @click="next('1')"><span class="btn-title">Далее</span> </v-btn>
            <p class="text-grey text-center">Значимость этих проблем настолько очевидна, что начало повседневной работы по формированию позиции требуют</p>
          </div>
        </v-form>
      </div>
  </v-container>

</div>
</template>

<script>
export default {
  name: "PrivateInformation",
  data(){
    return{
      valid:false,
      agree:false,
      menu:'',
      form:{
        name:'',
        surname:'',
        middle_name:'',
        sex_options:['мужской','женский'],
        date:'',
        sex:'',
        birth_date:'',
        phone:'',
      }
    }
  },
  methods:{
    next(value){
      this.$emit('pageHandler',value)
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
</style>