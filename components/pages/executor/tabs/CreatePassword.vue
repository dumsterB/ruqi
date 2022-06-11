<template>
<div class="create_password">
  <v-container>
    <p class="main_text_executor">Придумайте пароль</p>
    <p>Значимость этих проблем настолько очевидна, что начало повседневной работы по формированию позиции требуют</p>
    <v-form ref="form" v-model="valid" lazy-validation>
      <div class="form-part">
       <p class="input_label">Пароль</p>
        <v-text-field
            outlined
            class="mt-2"
            :rules="inputRules"
            v-model="password"
            dense
            single-line
        ></v-text-field>
      </div>
      <div class="form-part">
        <p class="input_label">   Пароль повторно</p>
        <v-text-field
            outlined
            :rules="[(password === confirm_password) || 'Пароль не совподает']"
            class="mt-2"
            v-model="confirm_password"
            dense
            single-line
        ></v-text-field>
      </div>
      <p class="text-grey">
        Требования к паролю: <br>
        длина — не менее 8 символов; <br>
        заглавные буквы; <br>
        строчные буквы; <br>
        цифры или специальные символы: %, #, $ и другие.</p>
      <v-btn  elevation="0" class="btn-secondary" @click="back(1)"> <span class="btn-title">Назад</span> </v-btn>
      <v-btn dark elevation="0" class="btn-primary" :disabled="!disableHandler" @click="next(3)"><span class="btn-title">Далее</span> </v-btn>
    </v-form>
  </v-container>
</div>
</template>

<script>
import {mapActions, mapGetters} from "vuex";

export default {
  name: "CreatePassword",
  props:{
    email:{},
    phone:{},
    agree:{},
  },
  data(){
    return{
      valid:false,
      confirm_password:null,
      password: '',
      inputRules: [v => !!v || 'Заполните поля'],
    }
  },
  methods:{
    ...mapActions('executor', ['createPassword']),
    validate () {
      this.$refs.form.validate()
    },
    next(value){
      let data ={
      password:this.password,
      phone: this.phone,
      email:this.email
      }
      if(this.agree){
        delete data.phone
      }else{
        delete data.email
      }
      this.createPassword(data)
      if(this.requestSuccess.type === 'success'){
        this.$emit('pageHandler',value)
      }else{
        this.validate()
      }

    },
    back(val){
      this.$emit('pageHandler',val , 'back')
    }
  },
  computed:{
    ...mapGetters('response',['requestSuccess']),
    disableHandler(){
      return this.password === this.confirm_password
    }
  }
}
</script>

<style scoped>
.text-grey{
  color: #9398A1;
}
.theme--dark.v-btn.v-btn--disabled.v-btn--has-bg {
  color: lightgrey !important;
  background: #0082de!important;
}
</style>