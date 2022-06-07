<template>
<div>
  <v-container>
    <h2>Адреса</h2>
    <p>Значимость этих проблем настолько очевидна, что начало повседневной работы по формированию позиции требуют</p>
    <div class="mt-5">
      <h3>Укажите место проживания</h3>
      <p>Место основного проживания</p>
      <v-text-field
          outlined
          class="mt-2"
          placeholder="Введите адрес"
          v-model="address"
          dense
          single-line
      ></v-text-field>
      <h3>Укажите место проживания</h3>
      <p>Введите название населенного пункта город с районом или метро, откуда хотели бы получать предложения о работе</p>
      <p>Дополнительный адрес 1</p>
      <v-text-field
          outlined
          class="mt-2"
          placeholder="Например: Зеленоград, Ленинский район"
          v-model="address_extra"
          dense
          single-line
      ></v-text-field>
      <v-divider></v-divider>
      <p class="mt-3">Дополнительный адрес 1</p>
      <v-text-field
          outlined
          class="mt-2"
          placeholder="Например: Зеленоград, Ленинский район"
          v-model="address_extra"
          dense
          single-line
      ></v-text-field>
      <a href="" class="link">Добавить адрес</a>
      <div class="access-content d-flex mt-5">
        <img src="@/assets/img/attention.svg" alt="">
        <strong class="ml-2" style="font-weight: 600;margin-bottom: -10px">Вы всегда можете добавить, удалить и изменить основной и дополнительные адреса в личном кабинете.</strong>
      </div>
    </div>
    <div class="mt-5">
    <v-btn  elevation="0" class="btn-secondary" @click="back(3)"> <span class="btn-title">Назад</span> </v-btn>
    <v-btn dark elevation="0" class="btn-primary" @click="next( 6 )"><span class="btn-title">Далее</span> </v-btn>
    </div>
  </v-container>
</div>
</template>

<script>
export default {
  data(){
    return{
      address:'',
      address_extra:'',
    }
  },
  methods:{
    back(value){
      this.$emit('pageHandler', value, 'back')
    },
    next(value){
      this.$emit('pageHandler', value)
    }
  }
}
</script>

<style scoped>
.link{
  text-decoration: none;
  margin-top: 10px;
  font-weight: 600;
}
.access-content{
  background: #F5F7F9;
  border-radius: 16px;
  height: 100%;
  padding: 30px;
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