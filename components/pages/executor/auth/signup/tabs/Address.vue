<template>
  <div>
    <v-container>
      <p class="main_text_executor">Адреса</p>
      <p>
        Значимость этих проблем настолько очевидна, что начало повседневной
        работы по формированию позиции требуют
      </p>
      <v-form ref="form" v-model="valid" lazy-validation>
        <div class="mt-5">
          <h3>Укажите место проживания</h3>
          <p class="input_label">Место основного проживания</p>
          <div
            v-for="(filed, index) in meta.meta_filter_row_1"
            :key="index"
            :style="{ maxWidth: filed.max_width + 'px' }"
          >
            <FTypeSearchAutocomplete
              :name="filed.name"
              :icon="filed.icon"
              :params="filed.params"
              @input="input"
              :validation="filed.validation"
              :value="filed.value"
              @setItemsList="setRegionList"
            ></FTypeSearchAutocomplete>
          </div>
          <h3 class="mt-5">Укажите место проживания</h3>
          <p>
            Введите название населенного пункта город, районом или метро,
            откуда хотели бы получать предложения о работе
          </p>
          <p class="input_label">Дополнительный адрес 1</p>
          <div
              v-for="(filed, index) in meta.meta_filter_row_1"
              :key="index"
              :style="{ maxWidth: filed.max_width + 'px' }"
          >
            <FTypeSearchAutocomplete
                :name="filed.name"
                :icon="filed.icon"
                :params="filed.params2"
                @input="input2"
                :validation="filed.validation"
                :value="filed.value"
                @setItemsList="setRegionList"
            ></FTypeSearchAutocomplete>
          </div>
          <br>
          <v-divider></v-divider>
          <p class="mt-3 input_label">Дополнительный адрес 1</p>
          <div
              v-for="(filed, index) in meta.meta_filter_row_1"
              :key="index"
              :style="{ maxWidth: filed.max_width + 'px' }"
          >
            <FTypeSearchAutocomplete
                :name="filed.name"
                :icon="filed.icon"
                :params="filed.params2"
                @input="input3"
                :validation="filed.validation"
                :value="filed.value"
                @setItemsList="setRegionList"
            ></FTypeSearchAutocomplete>
          </div>
          <!--          <a href="" class="link">Добавить адрес</a>-->
          <div class="access-content d-flex mt-5">
            <img src="@/assets/img/attention.svg" alt="" />
            <strong class="ml-2" style="font-weight: 600; margin-bottom: -10px"
              >Вы всегда можете добавить, удалить или изменить основной и
              дополнительные адреса в личном кабинете.</strong
            >
          </div>
        </div>
      </v-form>
      <div class="mt-5">
        <v-btn elevation="0" class="btn-secondary" @click="back(4)">
          <span class="btn-title">Назад</span>
        </v-btn>
        <v-btn
          dark
          elevation="0"
          class="btn-primary"
          :disabled="!disableHandler"
          @click="next(6)"
          ><span class="btn-title" style="color: white">Далее</span>
        </v-btn>
      </div>
    </v-container>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import FTypeSearchAutocomplete from "@/components/FTypeSearchAutocomplete";
import Vue from "vue";

export default {
  components: {
    "f-type-search-autocomplete": FTypeSearchAutocomplete,
  },
  data() {
    return {
      address: "",
      address_extra: "",
      address_extra_2: "",
      valid: false,
      inputRules: [(v) => !!v || "Заполните поле"],
      formValues: {},

      meta: {
        meta_filter_row_1: [
          {
            type: "FTypeSearchAutocomplete",
            label: "",
            col: 3,
            name: "region",
            validation: [],
            value: "",
            icon: "mdi-magnify",
            params: {
              placeholder: "Введите адрес",
              clearable: true,
              dense: true,
              filled: false,
              states: [],
              loading: false,
              label: "",
            },
            params2: {
              placeholder: "Например: Зеленоград, Ленинский район",
              clearable: true,
              dense: true,
              filled: false,
              states: [],
              loading: false,
              label: "",
            },
            max_width: "100%",
          },
        ],
      },
    };
  },
  methods: {
    input(value) {
      this.address = value;
      console.log(value , 'first')
    },
    input2(value){
      this.address_extra = value
    },
    input3(value){
      this.address_extra_2 = value
    },
    ...mapActions("executor", ["setAddress"]),
    ...mapActions("dictionary", ["fetchAddress"]),

    async setRegionList(region) {
      this.formValues.region = region;

      this.meta.meta_filter_row_1[0].params.loading = true;

      await this.fetchAddress({ region: region });

      this.meta.meta_filter_row_1[0].params.states = this.addresses;
      this.meta.meta_filter_row_1[0].params.loading = false;
    },
    validate() {
      this.$refs.form.validate();
    },
    back(value) {
      this.$emit("pageHandler", value, "back");
      this.$router.push({path: this.$route.fullPath, query: {tab: '4'} });
    },
    async next(value) {
      let data = [
        this.address,
        this.address_extra,
        this.address_extra_2,
      ];
      let params = data.filter((ell) => ell.length > 1);
      await this.setAddress(params);
      if (this.requestSuccess.type === "success") {
        this.$emit("pageHandler", value);
      } else {
        this.validate();
      }
      this.$router.push({path: this.$route.fullPath, query: {tab: '6'} });
    },

    sendFilter() {
      console.log(this.postBody);

      this.$emit("sendFilter", this.postBody);
    },
    clearFields() {
      this.$refs.form.reset();

      this.meta.meta_filter_row_1.map((f) => {
        Vue.set(this.formValues, f.name, null);
      });
      this.meta.meta_filter_row_2.map((f) => {
        Vue.set(this.formValues, f.name, null);
      });

      this.$emit("sendFilter", this.postBody);
    },
  },
  computed: {
    ...mapGetters("response", ["requestSuccess"]),
    disableHandler() {
      return this.address
    },
    postBody() {
      let postBody = {
          settings: {
            filters: [],
          },
        },
        list_params = ["region", "radius", "subscribe", "working"];

      for (let i = 0; i < list_params.length; i++) {
        if (this.formValues[list_params[i]]) {
          postBody[list_params[i]] = this.formValues[list_params[i]];
        }
      }

      if (this.formValues.lastname) {
        postBody.settings.value = this.formValues.lastname;
      }

      if (
        this.formValues.professions &&
        this.formValues.professions.length > 0
      ) {
        postBody.professions = JSON.stringify(this.formValues.professions);
      }

      if (this.formValues.rate) {
        postBody.settings.filters.push({
          field: "rate",
          type: "range",
          value: { to: this.formValues.rate },
        });
      }

      if (this.formValues.trust) {
        postBody.settings.filters.push({
          field: "trust",
          type: "range",
          value: { from: this.formValues.trust },
        });
      }

      if (this.formValues.age_from || this.formValues.age_to) {
        postBody.settings.filters.push({
          field: "age",
          type: "range",
          value: { from: this.formValues.age_from, to: this.formValues.age_to },
        });
      }

      if (this.formValues.activity && this.formValues.activity.length > 0) {
        postBody.settings.filters.push({
          field: "last_active",
          type: "list",
          value: this.formValues.activity,
        });
      }

      if (this.formValues.rank && this.formValues.rank.length > 0) {
        postBody.settings.filters.push({
          field: "rank",
          type: "list",
          value: this.formValues.rank,
        });
      }

      return postBody;
    },

    addresses() {
      return this.$store.getters["dictionary/address"];
    },
  },
  created() {
    this.meta.meta_filter_row_1.map((f) => {
      Vue.set(this.formValues, f.name, f.value);
    });
  },
};
</script>

<style scoped>
.link {
  text-decoration: none;
  margin-top: 10px;
  font-weight: 600;
}
.access-content {
  background: #f5f7f9;
  border-radius: 16px;
  height: 100%;
  padding: 30px;
}
.theme--dark.v-btn.v-btn--disabled.v-btn--has-bg {
  color: grey !important;
  background: lightgrey !important;
}
.btn-title{
  font-weight: 700;
}



</style>
<style>
.form-search-autocomplete .v-input{
  z-index: 0!important;
}
</style>
