<template>
  <div class="tabs">
    <div class="content mt-8">
      <v-container>
        <v-row>
          <v-col v-for="(tab ,item) of tabs" :key="tab.title" cols="12" lg="2" md="2" xl="2">
          <div class="tab" >
           Шаг {{item + 1}}
            <br>
           <strong class="mt-1">{{tab.title}}</strong>
            <v-progress-linear class="mt-2 " color="success" value="0"></v-progress-linear>
          </div>
          </v-col>
        </v-row>
      </v-container>

    </div>
    <div class="tabs-content">
      <v-container class="tab-content">
          <private-information @pageHandler="pageHandler"></private-information>
      </v-container>
    </div>
  </div>
</template>

<script>
import PrivateInformation from "@/components/executor/tabs/PrivateInformation";
export default {
  components:{
   'private-information': PrivateInformation
  },
  data(){
    return{
      power: 78,
      current_page: 1,
      tabs:[
        {title:'Личные данные', value:''},
        {title:'Создание пароля', value:''},
        {title:'Соглашение ЭДО', value:''},
        {title:'Выбор профессий', value:''},
        {title:'Загрузка документов', value:''},
        {title:'Платежные данные', value:''}
      ]
    }
  },
  methods:{
    pageHandler(val){
      this.current_page = val
    }
  }
}
</script>

<style scoped>
.tab{
  width: 180px;
  margin-left: 10px;
  margin-right: 10px;
}
.tab-content{
  padding-left: 300px;
  padding-right: 250px;
}
</style>