<template>
<div class="position_selector">
<v-container>
   <h2>Выбор профессий</h2>
  <p>Значимость этих проблем настолько очевидна, что начало повседневной работы по формированию позиции требуют</p>
  <div>
    <h3>Выберите виды работ</h3>
    <v-expansion-panels flat >
      <v-expansion-panel
          class="panels"
          v-for="(item,i) in 5"
          :key="i"
      >
        <v-expansion-panel-header>
          Item {{item}}
        </v-expansion-panel-header>
        <v-expansion-panel-content>
          <v-chip class="chip"> profesion + {{ item }}</v-chip>
          <v-chip class="chip_active"> profesion + {{ item }}</v-chip>
        </v-expansion-panel-content>
      </v-expansion-panel>
    </v-expansion-panels>
  </div>
  <div>
    <div class="access-content mt-10">
      <div class="d-flex" style="margin-top: -25px">
        <img  src="@/assets/img/attention.svg" alt="">
        <p class="ml-2 mt-8"> Некоторые из выбранных Вами профессий требуют загрузки дополнительных документов для подтверждения:</p>
      </div>
      <div class="d-flex">
        <strong>Водитель электроштабелера </strong> <span class="primary-text"> требуются права для управления</span>
      </div>
      <div class="d-flex">
        <strong>Кладовщик </strong> <span class="primary-text"> требуются медицинская книжка</span>
      </div>
      <v-btn  elevation="0" class="btn-secondary"> <span class="btn-title">Назад</span> </v-btn>
      <v-btn dark elevation="0" class="btn-primary" @click="next(5)"><span class="btn-title">Далее</span> </v-btn>
    </div>
  </div>
</v-container>
</div>
</template>

<script>
export default {
  name: "PositionSelector",
  data(){
    return{

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
.chip{
  background: #F1F9FF!important;
  color: #0082DE;
}
.chip_active{
  color: #FFFFFF;
  background: #0082DE!important;
}
.panels{
  border-bottom: 1px solid #EBEBEB;
}
.access-content{
  background: #F5F7F9;
  border-radius: 16px;
  height: 100%;
  padding: 20px;
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
.primary-text{
  color: #0082DE;
  margin-left: 10px;
}
</style>