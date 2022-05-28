<template>
<div class="position_selector">
<v-container>
   <h2>Выбор профессий</h2>
  <p>Значимость этих проблем настолько очевидна, что начало повседневной работы по формированию позиции требуют</p>
  <div>
    <h3>Выберите виды работ</h3>
    <v-expansion-panels>
      <v-expansion-panel
          v-for="(item,i) in 5"
          :key="i"
      >
        <v-expansion-panel-header>
          Item {{item}}
        </v-expansion-panel-header>
        <v-expansion-panel-content>
          <v-chip class="chip"> profesion + {{ item }}</v-chip>
          <v-chip class="active_chip"> profesion + {{ item }}</v-chip>
        </v-expansion-panel-content>
      </v-expansion-panel>
    </v-expansion-panels>
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
  background: #0082DE;
}
</style>