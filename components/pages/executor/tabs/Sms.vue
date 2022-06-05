<template>
  <div class="sms">
    <v-container>
      <div v-if="agree===false">
        <h2>Введите код из sms</h2>
        <p>Мы выслали SMS с кодом на номер {{phone}}</p>
      </div>
      <div v-else>
        <h2>Введите код из email</h2>
        <p>Мы выслали SMS с кодом на почту  {{email}}</p>
      </div>
      <div class="code mt-10">
        <input id="first" class="inputStyle" placeholder="-" v-model="code[0]" type="text"/>
        <input id="second" class="inputStyle" placeholder="-" v-model="code[1]" type="text"/>
        <input id="third" class="inputStyle" placeholder="-" v-model="code[2]" type="text"/>
        <input id="forth" class="inputStyle" placeholder="-" v-model="code[3]"  type="text"/>
        <input id="fifth"class="inputStyle" placeholder="-" v-model="code[4]"  type="text"/>
        </div>
      <p class="mt-10 text-grey" v-if="countDown > 1">Выслать код заново можно будет через    {{ countDown }} секунд.</p>
      <v-btn elevation="0" class="mt-10" @click="smsHandler" v-else>Выслать код заново</v-btn>
      <div class="mt-10">
        <v-btn  elevation="0" class="btn-secondary"> <span class="btn-title">Назад</span> </v-btn>
        <v-btn dark elevation="0" class="btn-primary" @click="next(2)"><span class="btn-title">Далее</span> </v-btn>
      </div>
    </v-container>
  </div>
</template>

<script>
import {mapActions} from "vuex";

export default {
  name: "Sms",
  props:{
    phone:{
      required:true
    },
    email:{
      required:true
    },
    agree:{
      type:Boolean,
      required:true,
    }
  },
  data(){
    return{
      smsCode:'',
      code:new Array(5),
      codeId:['first','second','third','forth','fifth'],
      interval:0,
      timerEnabled: true,
      countDown: 10
    }
  },
  methods:{
    ...mapActions('executor',['confirmPassword']),
    countDownTimer () {
      if (this.countDown > 0) {
        setTimeout(() => {
          this.countDown -= 1
          this.countDownTimer()
        }, 1000)
      }
    },
    smsHandler(){
      this.countDown = 10
      this.countDownTimer()
    },
    next(val){
      this.$emit('pageHandler',val)
      if(this.agree){
        let obj={
          code_confirm: this.smsCode,
          email: this.email
        }
        this.confirmPassword(obj)
      }else{
        let obj={
          code_confirm: this.smsCode,
          phone: this.phone
        }
        this.confirmPassword(obj)
      }
    }
  },
  created () {
    this.countDownTimer()
  }
}
</script>

<style scoped>

.inputStyle {
  width: 8%;
  height: 50px;
  text-align: center;
  border: 1px solid lightgrey;
  margin-right: 5px;
  margin-left: 5px;
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
}
</style>