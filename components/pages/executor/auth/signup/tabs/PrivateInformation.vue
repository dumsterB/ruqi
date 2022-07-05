<template>
  <div class="private_info">
    <v-container>
      <div class="content">
        <p class="main_text_executor">Личные данные</p>
        <p class="mt-4 mb-4">
          Значимость этих проблем настолько очевидна, что начало повседневной
          работы по формированию позиции требует
        </p>
        <v-form ref="form" v-model="valid" lazy-validation>
          <div class="form-part">
            <p class="input_label">Имя</p>
            <v-text-field
              outlined
              class="mt-2"
              v-model="form.name"
              @keypress="isLetter($event)"
              :rules="inputRules"
              dense
              type="text"
              required
              single-line
            ></v-text-field>
          </div>

          <div class="form-part">
            <p class="input_label">Фамилия</p>
            <v-text-field
              outlined
              required
              class="mt-2"
              id="surname"
              dense
              :rules="inputRules"
              @keypress="isLetter($event)"
              v-model="form.surname"
            ></v-text-field>
          </div>

          <div class="form-part">
            <p class="input_label">Отчество</p>
            <v-text-field
              outlined
              required
              id="middle_name"
              class="mt-2"
              v-model="form.middle_name"
              @keypress="isLetter($event)"
              dense
            ></v-text-field>
          </div>
          <div class="form-part">
            <p class="input_label">Пол</p>

            <v-select
              outlined
              class="mt-2"
              required
              dense
              placeholder="Не выбрано"
              :rules="inputRules"
              v-model="form.sex"
              :items="sex_options"
            ></v-select>
          </div>
          <div class="form-part">
            <p class="input_label">Дата рождения</p>
            <v-menu
              ref="menu1"
              v-model="menu1"
              :close-on-content-click="false"
              transition="scale-transition"
              offset-y
              max-width="290px"
              min-width="auto"
            >
              <template v-slot:activator="{ on, attrs }">
                <v-text-field
                  v-model="dateFormatted"
                  :rules="inputRules"
                  label="ДД.ММ.ГГГГ"
                  persistent-hint
                  dense
                  outlined
                  v-bind="attrs"
                  @blur="date = parseDate(dateFormatted)"
                  v-on="on"
                ></v-text-field>
              </template>
              <v-date-picker
                v-model="date"
                :show-current="true"
                no-title
                max="2004-NaN-NaN"
                scrollable
              >
                <v-spacer></v-spacer>
                <v-btn text color="primary" @click="menu1 = false">
                  Отмена
                </v-btn>
                <v-btn text color="primary" @click="$refs.menu1.save(date)">
                  OK
                </v-btn>
              </v-date-picker>
            </v-menu>
          </div>
          <div class="form-part" v-if="!agree">
            <p class="input_label">Телефон</p>

            <v-text-field
              v-model="form.phone"
              class="mt-2"
              type="tel"
              placeholder="+7"
              :rules="phoneRules"
              outlined
              name="phone"
              dense
            ></v-text-field>
          </div>

          <div class="form-part" v-if="agree">
            <p class="input_label">Email</p>
            <v-text-field
              class="mt-2"
              v-model="form.email"
              :rules="emailRules"
              outlined
              placeholder=""
              dense
            ></v-text-field>
          </div>
          <p class="text-danger">
            {{
              requestSuccess.text === "Заполните поле"
                ? " Некорректный номер или Email!"
                : ""
            }}
          </p>
          <div class="form-part-checkbox">
            <div class="d-flex">
              <v-checkbox
                v-model="form.agree"
                @click="checkboxHandler"
              ></v-checkbox>
              <p class="mt-5 input_label">Я не могу получить код по SMS</p>
            </div>
            <v-btn
              elevation="0"
              class="btn-secondary"
              @click="$router.push('/auth/signup/executor/')"
            >
              <span class="btn-title">Назад</span>
            </v-btn>
            <v-btn
              dark
              elevation="0"
              class="btn-primary"
              :disabled="!disableHandler"
              @click="next(1)"
              ><span style="color: white" class="btn-title">Далее</span>
            </v-btn>
            <p class="text-grey text-center mt-3">
              Значимость этих проблем настолько очевидна, что начало
              повседневной работы по формированию позиции требует
            </p>
          </div>
        </v-form>
      </div>
    </v-container>
  </div>
</template>

<script>


import { mapActions, mapGetters } from "vuex";

export default {
  name: "PrivateInformation",
  props: {
    form: {
      type: Object,
      required: true,
      default: {},
    },
    agree: {
      type: Boolean,
    },
  },
  data() {
    return {
      valid: false,
      date:'2004-01-01',
      dateFormatted: "01.01.2004",
      phoneNumber: "",
      dateHelper: new Date(),
      menu: "",
      sex_options: ["мужской", "женский"],
      switcher: false,
      inputRules: [(v) => !!v || "Заполните поле"],
      phoneRules: [
        (v) => !!v || "Заполните поле",
        (v) => (!!v && v.length == 12) || "Некорректный  номер",
        (value) => {
          const pattern =
            /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im;
          return pattern.test(value) || "Некорректный  номер";
        },
      ],
      emailRules: [
        (v) => !!v || "Заполните поле",
        (v) => /.+@.+/.test(v) || "",
      ],
      nowDate: new Date().toISOString().slice(0, 10),
      picker: new Date().toISOString().substr(0, 10),
      landscape: false,
      reactive: false,
      menu1: false,
    };
  },
  methods: {
    ...mapActions("executor", ["createExecutor"]),
    validate() {
      this.$refs.form.validate();
    },
    isLetter(e) {
      let char = String.fromCharCode(e.keyCode);
      if (/^[А-я]+$/.test(char)) return true;
      else e.preventDefault();
    },
    async next(value) {
      if (this.form.agree) {
        delete this.form.phone;
      } else {
        delete this.form.email;
      }
      this.form.birth_date = this.dateFormatted;
      await this.createExecutor(this.form);
      console.log(this.requestSuccess, "request");
      if (this.requestSuccess.type === "success") {
        this.$emit("pageHandler", value);
      } else {
        this.form.email = "";
        this.form.phone = "";
        this.$refs.form.validate();
      }
    },
    checkboxHandler() {
      this.switcher = !this.switcher;
      this.$emit("checkboxHandler", this.switcher);
    },
    formatDate(date) {
      if (!date) return null;
      const [year,month, day] = date.split("-");
        console.log(year ,new Date().toISOString().slice(0, 10))
      return `${day}.${month}.${year}`;
    },
    parseDate(date) {
      if (!date) return null;

      const [month, day, year] = date.split(".");
      return `${year}-${month.padStart(2, "0")}-${day.padStart(2, "0")}`;
    },
  },
  watch: {
    date() {
      this.dateFormatted = this.formatDate(this.date);
    },
  },
  computed: {
    ...mapGetters("response", ["requestSuccess"]),
    computedDateFormatted() {
      return this.formatDate(this.date);
    },
    executors() {
      return this.$store.getters["executor/executors"];
    },
    disableHandler() {
      if (this.agree) {
        return (
          this.form.name &&
          this.form.surname &&
          this.form.email &&
          this.form.sex &&
          this.dateFormatted &&
          this.valid
        );
      } else {
        return (
          this.form.name &&
          this.form.surname &&
          this.form.phone.length === 12 &&
          this.form.sex &&
          this.dateFormatted &&
          this.valid
        );
      }
    },
  },
};
</script>
<style>

</style>
<style scoped>
.text-grey-checkbox {
  color: #8692a6 !important;
  margin-top: -10px;
  font-size: 14px;
}
.v-input__control {
  border: 1px solid lightgrey !important;
}
.btn-primary {
  background: #0082de !important;
  border-radius: 8px;
  height: 45px !important;
  width: 100%;
  margin-top: 15px;
}
.btn-secondary {
  background: #f2f6f9 !important;
  border-radius: 8px;
  height: 45px !important;
  width: 100%;
}
.form-part-title {
  margin-top: -10px;
  margin-bottom: 10px;
}
.text-grey {
  color: #8692a6;
  font-size: 14px;
}

.text-danger {
  color: #ff5252;
}
.btn-title{
  font-weight: 700;
}

</style>
