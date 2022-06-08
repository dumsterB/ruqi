<template>
<div>
  <v-container>
   <h2>Платежная информация</h2>
    <p>Значимость этих проблем настолько очевидна, что начало повседневной работы по формированию позиции требуют.</p>
    <div class="access-content">
      <div class="d-flex">
        <img src="@/assets/img/attention.svg" alt="">
        <strong class="ml-2">Где взять платежные реквизиты моей карты?</strong>
      </div>
      <div class="ml-6">
      <p>Мы подготовили краткие инструкции как найти платежные реквизиты в личных кабинетах популярных банков</p>
      <div class="d-flex mt-3">
        <img src="@/assets/img/External_Link.svg" alt="">
        <a href="" class="link">Сбербанк инструкция</a>
      </div>
      <div class="d-flex mt-3">
        <img src="@/assets/img/External_Link.svg" alt="">
        <a href="" class="link">Тинькоф инструкция</a>
      </div>
      <div class="d-flex mt-3">
        <img src="@/assets/img/External_Link.svg" alt="">
        <a href="" class="link">Альфабанк инструкция</a>
      </div>
      </div>
    </div>
    <div>
      <div class="d-flex">
        <v-checkbox>
        </v-checkbox>
        <p class="mt-5">Являюсь самозанятым</p>
      </div>
      <p class="text-grey" style="margin-top: -15px">Если карта чужая то мы можем платить по карте , но не можем на <br> чужие реквизиты</p>
    </div>
    <div>
      <v-row>
        <v-col cols="5">
          <p>ИНН</p>
          <v-text-field v-model="settings.inn" dense outlined></v-text-field>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12">
          <p>Способ оплаты</p>
          <v-select dense v-model="settings.type_payment" outlined placeholder="Расчетный счет"></v-select>
        </v-col>
      </v-row>
      <v-row>
        <v-col col="5">
          <p>Номер счета</p>
          <v-text-field v-model="settings.payment_account" dense outlined></v-text-field>
        </v-col>
        <v-col col="4">
          <p>БИК</p>
          <v-text-field  v-model="settings.bik" placeholder="044521234" dense outlined></v-text-field>
        </v-col>
      </v-row>
      <v-row>
        <v-col col="12">
          <p>Банк</p>
          <v-text-field v-model="settings.bank" placeholder="Московский банк ПАО Сбербанк г. Москва" dense outlined></v-text-field>
          <p>ФИО получателя</p>
          <v-text-field v-model="settings.payment_fullname" placeholder="Московский банк ПАО Сбербанк г. Москва" dense outlined></v-text-field>
        </v-col>
      </v-row>
    </div>
    <div>
      <div class="d-flex">
        <v-checkbox>
        </v-checkbox>
        <p class="mt-5">Карта принадлежит мне</p>
      </div>
      <p class="text-grey" style="margin-top: -15px">Если карта чужая то мы можем платить по карте , но не можем <br> на чужие реквизиты</p>
    </div>
    <v-btn  elevation="0" class="btn-secondary" @click="next(6)"> <span class="btn-title">Назад</span> </v-btn>
    <v-btn  elevation="0" class="btn-secondary" @click="next(8)"> <span class="btn-title">Заполнить позже</span> </v-btn>
    <v-btn dark elevation="0" class="btn-primary" @click="next(8)"><span class="btn-title">Далее</span> </v-btn>
  </v-container>
</div>
</template>

<script>
import {mapActions} from "vuex";

export default {
  name: "PaymentInformation",
  data() {
    return {
      settings:{
        inn: '',
        bik: '',
        bank: '',
        type_payment: 'visa',
        payment_account: '',
        payment_fullname: '',
      }
    }
  },
  methods: {
    ...mapActions('executor',['setPayment']),
    next(val){
      this.$emit('pageHandler', val)
      this.setPayment(this.settings)
    },
    back(val){
      this.$emit('pageHandler',val , 'back')
    }
  },
  mounted(){
  }
}
</script>

<style scoped>
.access-content{
  background: #F5F7F9;
  border-radius: 16px;
  height: 100%;
  padding: 20px;
}
.link{
  text-decoration: none;
  font-weight: 700;
}
.text-grey{
  color: #8692A6;
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
  margin-top: 15px;
}
</style>