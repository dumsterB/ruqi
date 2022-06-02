<template>
  <div>
  <div class="tabs">
    <div class="content mt-3">
      <v-container>
        <v-row class="desktop">
          <v-col v-for="(tab ,item) of tabs" :key="tab.title" cols="12" lg="2" md="2" xl="2">
          <div class="tab" >
           Шаг {{item + 1}}
            <br>
           <strong class="mt-1" :class="tab.active ? '' : 'text-lightgrey'">{{tab.title}}</strong>
            <v-progress-linear class="mt-2 mr-1 " color="success" :value="tab.value"></v-progress-linear>
          </div>
          </v-col>
        </v-row>
        <v-row class="mobile">
          <v-col v-for="(tab ,item) of tabs" :key="tab.title" v-if="tab.mobile"  cols="12" >
            <div class="d-block text-center"   >
                 Шаг {{item + 1}}
                <br>
                <strong class="mt-1" :class="tab.active ? '' : 'text-lightgrey'">{{tab.title}}</strong>
            </div>
          </v-col>
        </v-row>
        <v-row class="mobile">
          <v-col v-for="(tab ,item) of tabs" :key="tab.title"  cols="2" >
            <div class="tab d-block" >
              <v-progress-linear class="mt-2 mobile-linear" color="success" :value="tab.value"></v-progress-linear>
            </div>
          </v-col>
        </v-row>
      </v-container>
    </div>
    <div class="tabs-content">
      <v-container class="tab-content">
          <private-information @checkboxHandler="checkboxHandler" :agree="agree" :form="form" @pageHandler="pageHandler" v-if="current_page === 0"></private-information>
          <sms :agree="agree" :email="form.email" :phone="form.phone" @pageHandler="pageHandler" v-if="current_page === 1"></sms>
          <create-password :password="password"  @pageHandler="pageHandler"  v-if="current_page === 2" ></create-password>
          <electronic-document  @pageHandler="pageHandler" v-if="current_page === 3"></electronic-document>
          <position-selector  @pageHandler="pageHandler" v-if="current_page === 4"></position-selector>
          <upload-document  @pageHandler="pageHandler" v-if="current_page === 5"></upload-document>
          <payment-information @pageHandler="pageHandler" v-if="current_page === 6"></payment-information>
         <finish v-if="current_page === 7"></finish>
      </v-container>
    </div>
  </div>

  </div>
</template>

<script>
import PrivateInformation from "./PrivateInformation";
import Sms from './Sms'
import CreatePassword from "@/components/pages/executor/tabs/CreatePassword";
import ElectronicDocument from "@/components/pages/executor/tabs/ElectronicDocument";
import PositionSelector from "@/components/pages/executor/tabs/PositionSelector";
import UploadDocument from "@/components/pages/executor/tabs/UploadDocument";
import paymentInformation from "@/components/pages/executor/tabs/PaymentInformation";
import Finish from '@/components/pages/executor/tabs/Finish'

export default {
  props:{},
  components:{
     'private-information': PrivateInformation,
     'sms': Sms,
     'create-password':CreatePassword,
     'electronic-document':ElectronicDocument,
     'position-selector' : PositionSelector,
     'upload-document':UploadDocument,
     'payment-information':paymentInformation,
     'finish': Finish
  },
  data(){
    return{
      power: 78,
      current_page:0,
      form:{
        name: '',
        surname: '',
        middle_name: '',
        sex: '',
        birth_date: '',
        phone: '',
        email: null,
      },
      tabs:[
        {title:'Личные данные', value:'',active:true, mobile:true},
        {title:'Создание пароля', value:'',active:false, mobile:false},
        {title:'Соглашение ЭДО', value:'',active:false, mobile:false},
        {title:'Выбор профессий', value:'',active:false, mobile:false},
        {title:'Загрузка документов', value:'',active:false, mobile:false},
        {title:'Платежные данные', value:'',active:false, mobile:false}
      ],
      agree:false,
      password: '',
    }
  },
  methods:{
    pageHandler(val){  // refactor later
      if(val == 1){
        this.current_page = val
        this.tabs.map(ell => {ell.mobile = false})
        this.tabs[val - 1].active = true
        this.tabs[val - 1].mobile = true
        this.tabs[0].value = 50
      }else if(val == 2){
        this.current_page = val
        this.tabs.map(ell => {ell.mobile = false})
        this.tabs[val - 1].mobile = true
        this.tabs[val - 1].active = true
        this.tabs[0].value = 100
      }else{
        this.current_page = val
        this.tabs.map(ell => {ell.mobile = false})
        this.tabs[val - 1].mobile = true
        this.tabs[val - 1].active = true
        this.tabs[val - 2].value = 100
      }
    },
    checkboxHandler(val){
      this.agree=val
    }
  }
}
</script>

<style scoped>
.tab{
  width: 180px;
  margin-left: 5px;
  margin-right: 8px;
}
.tab-content{
  padding-left: 300px;
  padding-right: 250px;
}
.mobile{
  display: none;
}
@media (max-width: 1000px) {
  .tab-content{
    padding-left: 10px;
    padding-right: 10px;
  }
  .desktop{
    display: none;
  }
  .mobile{
    display: flex!important;
  }
}
.text-lightgrey{
 color: #9398A1
}
.mobile-linear{
  width: 40px!important;
}
.tabs{
  overflow: hidden;
}
</style>