<template>
<div class="create_password">
  <v-container>
    <h2>Придумайте пароль</h2>
    <p>Значимость этих проблем настолько очевидна, что начало повседневной работы по формированию позиции требуют</p>
    <v-form ref="form_part_0" v-model="valid" lazy-validation>
      <div class="form-part">
        Пароль
        <v-text-field
            outlined
            class="mt-2"
            v-model="password"
            dense
            single-line
        ></v-text-field>
      </div>
      <div class="form-part">
        Пароль повторно
        <v-text-field
            outlined
            class="mt-2"
            v-model="password"
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
      <v-btn  elevation="0" class="btn-secondary"> <span class="btn-title">Назад</span> </v-btn>
      <v-btn dark elevation="0" class="btn-primary" @click="next(3)"><span class="btn-title">Далее</span> </v-btn>
    </v-form>
  </v-container>
</div>
</template>

<script>
export default {
  name: "CreatePassword",
  props:{
    password:{
    }
  },
  methods:{
    next(val){
    this.$emit('pageHandler',val)
    }
  }
}
</script>

<style scoped>
.text-grey{
  color: #9398A1;
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