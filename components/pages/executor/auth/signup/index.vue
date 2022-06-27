<template>
  <div>
    <div class="tabs">
      <div class="content mt-3" v-if="current_page !== 8">
        <v-container fluid>
          <v-row class="desktop">
            <div v-for="(tab, item) of tabs" :key="tab.title">
              <div class="tab">
                Шаг {{ item + 1 }}
                <br />
                <strong
                  class="mt-1"
                  :class="tab.active ? '' : 'text-lightgrey'"
                  >{{ tab.title }}</strong
                >
                <v-progress-linear
                  class="mt-2 mr-1"
                  color="success"
                  :value="tab.value"
                ></v-progress-linear>
              </div>
            </div>
          </v-row>
          <v-row class="mobile">
            <v-col
              v-for="(tab, item) of tabs"
              :key="tab.title"
              v-if="tab.mobile"
              cols="12"
            >
              <div class="d-block text-center">
                Шаг {{ item + 1 }}
                <br />
                <strong
                  class="mt-1"
                  :class="tab.active ? '' : 'text-lightgrey'"
                  >{{ tab.title }}</strong
                >
              </div>
            </v-col>
          </v-row>
          <v-container class="mobile">
            <v-row class="tab_row" v-for="(tab, item) of tabs" :key="tab.title">
              <div class="tab d-flex">
                <v-progress-linear
                  class="mobile-linear"
                  color="success"
                  :value="tab.value"
                ></v-progress-linear>
              </div>
            </v-row>
          </v-container>
        </v-container>
      </div>
      <div class="tabs-content">
        <v-container class="tab-content">
          <private-information
            @checkboxHandler="checkboxHandler"
            :agree="agree"
            :form="form"
            @pageHandler="pageHandler"
            v-if="current_page === 0"
          ></private-information>
          <sms
            :agree="form.agree"
            :email="form.email"
            :phone="form.phone"
            @pageHandler="pageHandler"
            v-if="current_page === 1"
          ></sms>
          <create-password
            :agree="form.agree"
            :phone="form.phone"
            :email="form.email"
            :password="password"
            @pageHandler="pageHandler"
            v-if="current_page === 2"
          ></create-password>
          <electronic-document
            @pageHandler="pageHandler"
            v-if="current_page === 3"
          ></electronic-document>
          <position-selector
            @pageHandler="pageHandler"
            v-if="current_page === 4"
          ></position-selector>
          <address-page
            @pageHandler="pageHandler"
            v-if="current_page === 5"
          ></address-page>
          <upload-document
            @pageHandler="pageHandler"
            v-if="current_page === 6"
          ></upload-document>
          <payment-information
            @pageHandler="pageHandler"
            v-if="current_page === 7"
          ></payment-information>
          <finish v-if="current_page === 8"></finish>
        </v-container>
      </div>
    </div>
  </div>
</template>

<script>
import PrivateInformation from "./tabs/PrivateInformation";
import Sms from "./tabs/Sms";
import CreatePassword from "./tabs/CreatePassword";
import ElectronicDocument from "./tabs/ElectronicDocument";
import PositionSelector from "./tabs/PositionSelector";
import UploadDocument from "./tabs/UploadDocument";
import paymentInformation from "./tabs/PaymentInformation";
import Finish from "./tabs/Finish";
import Address from "./tabs/Address";
export default {
  props: {},
  components: {
    "private-information": PrivateInformation,
    "create-password": CreatePassword,
    "electronic-document": ElectronicDocument,
    "position-selector": PositionSelector,
    "upload-document": UploadDocument,
    "payment-information": paymentInformation,
    "address-page": Address,
    finish: Finish,
    sms: Sms,
  },
  data() {
    return {
      power: 78,
      current_tab: "private-information",
      current_page: 0,
      form: {
        name: "",
        surname: "",
        middle_name: "",
        sex: "",
        birth_date: "",
        phone: "+7",
        email: null,
        agree: false,
      },
      pages: {
        tab1: "private-information",
        tab2: "sms",
        tab3: "create-password",
        tab4: "create-password",
        tab5: "electronic-document",
        tab6: "position-selector",
        tab7: "upload-document",
        tab8: "payment-information",
        tab9: "finish",
      },
      tabs: [
        {
          title: "Личные данные",
          tab: 0,
          value: "",
          active: true,
          mobile: true,
        },
        {
          title: "Создание пароля",
          tab: 0,
          value: "",
          active: false,
          mobile: false,
        },
        {
          title: "Соглашение ЭДО",
          tab: 3,
          value: "",
          active: false,
          mobile: false,
        },
        {
          title: "Выбор профессий",
          tab: 4,
          value: "",
          active: false,
          mobile: false,
        },
        { title: "Адресса", value: "", tab: 5, active: false, mobile: false },
        {
          title: "Загрузка документов",
          tab: 6,
          value: "",
          active: false,
          mobile: false,
        },
        {
          title: "Платежные данные",
          tab: 7,
          value: "",
          active: false,
          mobile: false,
        },
      ],
      agree: false,
      password: "",
    };
  },
  methods: {
    pageHandler(val, helper) {
      if (helper === "back") {
        this.current_page = val;
        this.$forceUpdate();
      } else if (val === "finish") {
        this.current_page = 8;
        return true;
      } else {
        if (val == 1) {
          this.current_page = val;
          this.tabs.map((ell) => {
            ell.mobile = false;
          });
          this.tabs[val - 1].active = true;
          this.tabs[val - 1].mobile = true;
          this.tabs[0].value = 50;
        } else if (val == 2) {
          this.current_page = val;
          this.tabs.map((ell) => {
            ell.mobile = false;
          });
          this.tabs[val - 1].mobile = true;
          this.tabs[val - 1].active = true;
          this.tabs[0].value = 100;
        } else {
          this.current_page = val;
          this.tabs.map((ell) => {
            ell.mobile = false;
          });
          this.tabs[val - 1].mobile = true;
          this.tabs[val - 1].active = true;
          this.tabs[val - 2].value = 100;
        }
      }
    },
    checkboxHandler(val) {
      this.agree = val;
    },
    componentHandler() {
      let tab = this.$route.query.tab || "0";
      let active = this.tabs.find((ell) => ell.tab == tab || 0);
      this.current_page = active.tab;
      if (this.current_page === 3) {
        this.tabs[0].value = 100;
        this.tabs[1].value = 100;
        this.tabs[2].value = 100;
        this.tabs[0].active = true;
        this.tabs[1].active = true;
        this.tabs[2].active = true;
        this.tabs[2].active = true;
      }else if(this.current_page === 4){
        this.tabs[0].value = 100;
        this.tabs[1].value = 100;
        this.tabs[2].value = 100;
        this.tabs[3].value = 100;
        this.tabs[0].active = true;
        this.tabs[1].active = true;
        this.tabs[2].active = true;
        this.tabs[2].active = true;
        this.tabs[3].active = true;
      }else if(this.current_page === 5){
        this.tabs[0].value = 100;
        this.tabs[1].value = 100;
        this.tabs[2].value = 100;
        this.tabs[3].value = 100;
        this.tabs[4].value = 100;
        this.tabs[0].active = true;
        this.tabs[1].active = true;
        this.tabs[2].active = true;
        this.tabs[2].active = true;
        this.tabs[3].active = true;
        this.tabs[4].active = true;
      }else if(this.current_page === 6){
        this.tabs[0].value = 100;
        this.tabs[1].value = 100;
        this.tabs[2].value = 100;
        this.tabs[3].value = 100;
        this.tabs[4].value = 100;
        this.tabs[5].value = 100;
        this.tabs[0].active = true;
        this.tabs[1].active = true;
        this.tabs[2].active = true;
        this.tabs[2].active = true;
        this.tabs[3].active = true;
        this.tabs[4].active = true;
        this.tabs[5].active = true;
      }
      else if(this.current_page === 7){
        this.tabs[0].value = 100;
        this.tabs[1].value = 100;
        this.tabs[2].value = 100;
        this.tabs[3].value = 100;
        this.tabs[4].value = 100;
        this.tabs[5].value = 100;
        this.tabs[6].value = 100;
        this.tabs[0].active = true;
        this.tabs[1].active = true;
        this.tabs[2].active = true;
        this.tabs[2].active = true;
        this.tabs[3].active = true;
        this.tabs[4].active = true;
        this.tabs[5].active = true;
        this.tabs[6].active = true;
      }
      else if(this.current_page === 7){
        this.tabs[0].value = 100;
        this.tabs[1].value = 100;
        this.tabs[2].value = 100;
        this.tabs[3].value = 100;
        this.tabs[4].value = 100;
        this.tabs[5].value = 100;
        this.tabs[6].value = 100;
        this.tabs[7].value = 100;
        this.tabs[0].active = true;
        this.tabs[1].active = true;
        this.tabs[2].active = true;
        this.tabs[2].active = true;
        this.tabs[3].active = true;
        this.tabs[4].active = true;
        this.tabs[5].active = true;
        this.tabs[6].active = true;
        this.tabs[7].active = true;
      }
    },
  },
  mounted() {
    this.componentHandler();
  },
};
</script>

<style>
.tab {
  width: 180px;
  margin-left: 5px;
  margin-right: 8px;
}
.tab-content {
  padding-left: 300px;
  padding-right: 250px;
}
.mobile {
  display: none;
}
.desktop {
  margin-right: auto;
  margin-left: auto;
  justify-content: center;
  display: flex;
  margin-top: 20px;
}
@media (max-width: 1000px) {
  .tab-content {
    padding-left: 5px;
    padding-right: 5px;
  }
  .tab {
    width: 25px;
  }
  .desktop {
    display: none;
  }
  .mobile {
    display: flex !important;
  }
}
.main_text_executor {
  font-size: 44px;
  font-weight: 700;
}
.input_label {
  font-size: 16px;
  line-height: 20px;
  font-weight: 600;
}
.btn-primary {
  background: #0082de !important;
  border-radius: 8px;
  height: 45px !important;
  width: 100%;
  margin-top: 15px;
}
.theme--dark.v-btn.v-btn--disabled.v-btn--has-bg {
  color: grey !important;
  background: lightgrey !important;
}
.btn-secondary {
  background: #f2f6f9 !important;
  border-radius: 8px;
  height: 45px !important;
  width: 100%;
}
.text-lightgrey {
  color: #9398a1;
}
.mobile-linear {
  width: 25px !important;
  display: flex;
}
.tabs {
  overflow: hidden;
}
.tab_row {
  margin-top: 12px;
  margin-left: 5px;
}
</style>
