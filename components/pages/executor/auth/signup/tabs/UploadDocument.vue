<template>
  <div class="upload_document">
    <v-container>
      <p class="main_text_executor">Загрузка документов</p>
      <p class="mt-4">
        Значимость этих проблем настолько очевидна, что начало повседневной
        работы по формированию позиции требуют
      </p>
      <br />
      <div class="d-flex">
        <h2><strong>1. Паспорт РФ</strong></h2>
        <img class="ml-2" src="@/assets/img/correct.svg" alt="" />
      </div>
      <div class="mt-5">
        <div class="form-part">
          <p class="input_label">ФИО в паспорте</p>
          <v-text-field
            outlined
            v-model="passport_info"
            :rules="inputRules"
            placeholder="Иванов Иван Иванович"
            class="mt-2"
            dense
            single-line
          ></v-text-field>
        </div>
        <v-row>
          <v-col cols="6" md="3" lg="3">
            <div class="form-part">
              <p class="input_label">Серия</p>

              <v-text-field
                outlined
                :rules="seriesRules"
                v-model="passport_series"
                class="mt-2"
                counter="4"
                dense
                single-line
              ></v-text-field>
            </div>
          </v-col>
          <v-col cols="6" md="3" lg="3">
            <div class="form-part">
              <p class="input_label">Номер</p>

              <v-text-field
                outlined
                class="mt-2"
                v-model="passport_number"
                :rules="numberRules"
                counter="6"
                dense
                single-line
              ></v-text-field>
            </div>
          </v-col>
          <v-col cols="12" md="3" lg="3">
            <div class="form-part">
              <p class="input_label">Дата выдачи</p>

              <v-menu
                ref="menu1"
                v-model="menu1"
                :close-on-content-click="false"
                :return-value.sync="passport_date"
                transition="scale-transition"
                offset-y
                min-width="auto"
              >
                <template v-slot:activator="{ on, attrs }">
                  <v-text-field
                    outlined
                    class="mt-2"
                    :rules="inputRules"
                    v-model="dateFormatted_date"
                    dense
                    readonly
                    @blur="helper_date = parseDate(dateFormatted_date)"
                    v-bind="attrs"
                    v-on="on"
                    single-line
                  ></v-text-field>
                </template>
                <v-date-picker v-model="helper_date" no-title scrollable>
                  <v-spacer></v-spacer>
                  <v-btn text color="primary" @click="menu1 = false">
                    Отмена
                  </v-btn>
                  <v-btn
                    text
                    color="primary"
                    @click="$refs.menu1.save(helper_date)"
                  >
                    OK
                  </v-btn>
                </v-date-picker>
              </v-menu>
            </div>
          </v-col>
          <v-col cols="12" md="3" lg="3">
            <div class="form-part">
              <p class="input_label">Срок действия</p>
              <v-menu
                ref="menu"
                v-model="menu"
                :close-on-content-click="false"
                :return-value.sync="passport_term"
                transition="scale-transition"
                offset-y
                min-width="auto"
              >
                <template v-slot:activator="{ on, attrs }">
                  <v-text-field
                    outlined
                    class="mt-2"
                    :rules="inputRules"
                    v-model="dateFormatted_given"
                    dense
                    readonly
                    @blur="helper_given = parseDate(dateFormatted_given)"
                    v-bind="attrs"
                    v-on="on"
                    single-line
                  ></v-text-field>
                </template>
                <v-date-picker v-model="helper_given" no-title scrollable>
                  <v-spacer></v-spacer>
                  <v-btn text color="primary" @click="menu = false">
                    Отмена
                  </v-btn>
                  <v-btn
                    text
                    color="primary"
                    @click="$refs.menu.save(helper_given)"
                  >
                    OK
                  </v-btn>
                </v-date-picker>
              </v-menu>
            </div>
          </v-col>
        </v-row>
        <div class="form-part">
          <p class="input_label">Кем выдан</p>

          <v-text-field
            outlined
            class="mt-2"
            v-model="passport_given"
            dense
            :rules="inputRules"
            single-line
          ></v-text-field>
        </div>
        <div style="width: 200px">
          <div class="form-part">
            <p class="input_label">Код подразделения</p>

            <v-text-field
              outlined
              class="mt-2"
              v-model="passport_code"
              :rules="codeRules"
              :prefix="currency"
              dense
              single-line
            ></v-text-field>
          </div>
        </div>
      </div>
      <v-divider></v-divider>
      <div class="desktop">
        <div class="mt-5">
          <div class="d-flex">
            <h3>
              <strong> Фото паспорта основной разворот (стр. 1-3)</strong>
            </h3>
            <img class="ml-2" src="@/assets/img/correct.svg" alt="" />
          </div>
          <p class="mt-3">
            На фотографии должны быть отчетливо видны серия, номер, основные
            данные, фотография. В поле зрения не должны попадать пальцы и
            посторонние предметы.
          </p>
        </div>
        <div>
          <v-row>
            <v-col>
              <div class="mt-2 justify-center text-center">
                <vue-dropzone
                  id="fileUpload1"
                  ref="myVueDropzone"
                  @click.prevent="selectFile(0)"
                  @vdropzone-sending="afterAdded1"
                  :options="dropzoneOptions"
                  :useCustomSlot="true"
                >
                  <div class="dropzone-custom-content">
                    <div class="d-block">
                      <img src="@/assets/img/uploader.svg" alt="" />
                      <br />
                      <strong class="desktop-media"
                        >Перетащите сюда файл</strong
                      >
                    </div>
                  </div>
                </vue-dropzone>
                <p class="text-gray desktop-media">или загрузите фото</p>
                <div class="d-flex desktop-media">
                  <v-btn
                    elevation="0"
                    @click="selectFile(1)"
                    dark
                    class="btn-primary"
                    ><img
                      class="mr-2"
                      src="@/assets/img/File_Blank.svg"
                      alt=""
                    />загрузить Из файла</v-btn
                  >
                </div>
                <div class="d-flex mobile-media">
                  <v-btn
                    elevation="0"
                    @click="selectFile(1)"
                    dark
                    class="btn-primary"
                    ><img
                      class="mr-2"
                      src="@/assets/img/Camera.svg"
                      alt=""
                    />Загрузить Фотографию</v-btn
                  >
                </div>
              </div>
            </v-col>
            <v-col>
              <img src="@/assets/img/passport_1.svg" alt="" />
            </v-col>
          </v-row>
        </div>

        <v-divider class="mt-4"></v-divider>
        <div class="mt-5">
          <h3>
            <strong> Фото паспорта разворот прописка (стр. 3-4)</strong>
            <img class="ml-2" src="@/assets/img/correct.svg" alt="" />
          </h3>
          <p class="mt-3">
            На фотографии должны быть отчетливо видны серия, номер, основные
            данные, фотография. В поле зрения не должны попадать пальцы и
            посторонние предметы.
          </p>
        </div>
        <v-row>
          <v-col>
            <div class="mt-2 justify-center text-center">
              <vue-dropzone
                id="fileUpload2"
                ref="myVueDropzone"
                @click.prevent="selectFile(0)"
                @vdropzone-sending="afterAdded2"
                :options="dropzoneOptions"
                :useCustomSlot="true"
              >
                <div class="dropzone-custom-content">
                  <div class="d-block">
                    <img src="@/assets/img/uploader.svg" alt="" />
                    <br />
                    <strong class="desktop-media">Перетащите сюда файл</strong>
                  </div>
                </div>
              </vue-dropzone>
              <p class="text-gray desktop-media">или загрузите фото</p>
              <div class="d-flex desktop-media">
                <v-btn
                  elevation="0"
                  @click="selectFile(2)"
                  dark
                  class="btn-primary"
                  ><img
                    class="mr-2"
                    src="@/assets/img/File_Blank.svg"
                    alt=""
                  />загрузить Из файла</v-btn
                >
              </div>
              <div class="d-flex mobile-media">
                <v-btn
                  elevation="0"
                  @click="selectFile(2)"
                  dark
                  class="btn-primary"
                  ><img
                    class="mr-2"
                    src="@/assets/img/Camera.svg"
                    alt=""
                  />Загрузить Фотографию</v-btn
                >
              </div>
            </div>
          </v-col>
          <v-col>
            <img src="@/assets/img/passport_2.svg" alt="" />
          </v-col>
        </v-row>
        <v-divider class="mt-4"></v-divider>
        <div class="mt-5">
          <h3>
            <strong>Фото с паспортом</strong>
            <img class="ml-2" src="@/assets/img/correct.svg" alt="" />
          </h3>
          <p class="mt-3">
            На фотографии должны быть отчетливо видны серия, номер, основные
            данные, фотография. В поле зрения не должны попадать пальцы и
            посторонние предметы.
          </p>
        </div>
        <v-row>
          <v-col>
            <div class="mt-2 justify-center text-center">
              <vue-dropzone
                id="fileUpload3"
                ref="myVueDropzone"
                @vdropzone-sending="afterAdded3"
                :options="dropzoneOptions"
                :useCustomSlot="true"
              >
                <div class="dropzone-custom-content">
                  <div class="d-block">
                    <img src="@/assets/img/uploader.svg" alt="" />
                    <br />
                    <strong class="desktop-media">Перетащите сюда файл</strong>
                  </div>
                </div>
              </vue-dropzone>
              <p class="text-gray desktop-media">или загрузите фото</p>
              <div class="d-flex desktop-media">
                <v-btn
                  elevation="0"
                  @click="selectFile(3)"
                  dark
                  class="btn-primary"
                  ><img
                    class="mr-2"
                    src="@/assets/img/File_Blank.svg"
                    alt=""
                  />загрузить Из файла</v-btn
                >
              </div>
              <div class="d-flex mobile-media">
                <v-btn
                  elevation="0"
                  @click="selectFile(3)"
                  dark
                  class="btn-primary"
                  ><img
                    class="mr-2"
                    src="@/assets/img/Camera.svg"
                    alt=""
                  />Загрузить Фотографию</v-btn
                >
              </div>
            </div>
          </v-col>
          <v-col>
            <img src="@/assets/img/passportman.svg" alt="" />
          </v-col>
        </v-row>
        <v-divider class="mt-4"></v-divider>
        <div>
          <div class="d-flex mt-15">
            <h2><strong>2. Дополнительные документы</strong></h2>
            <img class="ml-2" src="@/assets/img/correct.svg" alt="" />
          </div>
          <p style="font-weight: 600" class="mt-4">
            Следующий перечень документов требуется для участия в заявках по
            выбранным Вами профессиям:
          </p>
          <div class="access-content">
            <div class="d-flex">
              <img
                style="margin-top: -50px"
                src="@/assets/img/attention.svg"
                alt=""
              />
              <p class="ml-2" style="font-weight: 600">
                Если вы не готовы сейчас предоставить документы нужные для
                работы по этим профессиям, вы можете вернуться к выбору
                профессий, изменить свой выбор и продолжить регистрацию.
              </p>
            </div>
            <a
              href=""
              style="text-decoration: none; font-weight: 600"
              class="ml-6"
              >Вернуться к выбору профессий</a
            >
          </div>
        </div>
        <div class="mt-5">
          <h3>
            <strong> Медицинская книжка основной разворот</strong>
            <img class="ml-2" src="@/assets/img/correct.svg" alt="" />
          </h3>
          <p class="mt-3">
            На фотографии должны быть отчетливо видны серия, номер, основные
            данные, фотография. В поле зрения не должны попадать пальцы и
            посторонние предметы.
          </p>
        </div>
        <v-row>
          <v-col>
            <div class="mt-2 justify-center text-center">
              <vue-dropzone
                id="fileUpload4"
                ref="myVueDropzone"
                @vdropzone-sending="afterAdded4"
                :options="dropzoneOptions"
                :useCustomSlot="true"
              >
                <div class="dropzone-custom-content">
                  <div class="d-block">
                    <img src="@/assets/img/uploader.svg" alt="" />
                    <br />
                    <strong class="desktop-media">Перетащите сюда файл</strong>
                  </div>
                </div>
              </vue-dropzone>
              <p class="text-gray desktop-media">или загрузите фото</p>
              <div class="d-flex desktop-media">
                <v-btn
                  elevation="0"
                  @click="selectFile(4)"
                  dark
                  class="btn-primary"
                  ><img
                    class="mr-2"
                    src="@/assets/img/File_Blank.svg"
                    alt=""
                  />загрузить Из файла</v-btn
                >
              </div>
              <div class="d-flex mobile-media">
                <v-btn
                  elevation="0"
                  @click="selectFile(4)"
                  dark
                  class="btn-primary"
                  ><img
                    class="mr-2"
                    src="@/assets/img/Camera.svg"
                    alt=""
                  />Загрузить Фотографию</v-btn
                >
              </div>
            </div>
          </v-col>
          <v-col>
            <img src="@/assets/img/medical_book.svg" alt="" />
          </v-col>
        </v-row>
        <v-divider class="mt-4"></v-divider>
        <div class="mt-5">
          <h3>
            <strong> Водительские права</strong>
            <img class="ml-2" src="@/assets/img/correct.svg" alt="" />
          </h3>
          <p class="mt-3">
            На фотографии должны быть отчетливо видны серия, номер, основные
            данные, фотография. В поле зрения не должны попадать пальцы и
            посторонние предметы.
          </p>
        </div>
        <v-row>
          <v-col>
            <div class="mt-2 justify-center text-center">
              <vue-dropzone
                id="fileUpload5"
                ref="myVueDropzone"
                @vdropzone-sending="afterAdded5"
                :options="dropzoneOptions"
                :useCustomSlot="true"
              >
                <div class="dropzone-custom-content">
                  <div class="d-block">
                    <img src="@/assets/img/uploader.svg" alt="" />
                    <br />
                    <strong class="desktop-media">Перетащите сюда файл</strong>
                  </div>
                </div>
              </vue-dropzone>
              <p class="text-gray desktop-media">или загрузите фото</p>
              <div class="d-flex desktop-media">
                <v-btn
                  elevation="0"
                  @click="selectFile(5)"
                  dark
                  class="btn-primary"
                  ><img
                    class="mr-2"
                    src="@/assets/img/File_Blank.svg"
                    alt=""
                  />загрузить Из файла</v-btn
                >
              </div>
              <div class="d-flex mobile-media">
                <v-btn
                  elevation="0"
                  @click="selectFile(5)"
                  dark
                  class="btn-primary"
                  ><img
                    class="mr-2"
                    src="@/assets/img/Camera.svg"
                    alt=""
                  />Загрузить Фотографию</v-btn
                >
              </div>
            </div>
          </v-col>
          <v-col>
            <img src="@/assets/img/driverlicensefront.svg" alt="" />
          </v-col>
        </v-row>
        <v-divider class="mt-4"></v-divider>
        <div class="mt-5">
          <h3>
            <strong> Водительские права</strong>
            <img class="ml-2" src="@/assets/img/correct.svg" alt="" />
          </h3>
          <p class="mt-3">
            На фотографии должны быть отчетливо видны серия, номер, основные
            данные, фотография. В поле зрения не должны попадать пальцы и
            посторонние предметы.
          </p>
        </div>
        <v-row>
          <v-col>
            <div class="mt-2 justify-center text-center">
              <vue-dropzone
                id="fileUpload6"
                ref="myVueDropzone"
                @vdropzone-sending="afterAdded6"
                :options="dropzoneOptions"
                :useCustomSlot="true"
              >
                <div class="dropzone-custom-content">
                  <div class="d-block">
                    <img src="@/assets/img/uploader.svg" alt="" />
                    <br />
                    <strong class="desktop-media">Перетащите сюда файл</strong>
                  </div>
                </div>
              </vue-dropzone>
              <p class="text-gray desktop-media">или загрузите фото</p>
              <div class="d-flex desktop-media">
                <v-btn
                  elevation="0"
                  @click="selectFile(6)"
                  dark
                  class="btn-primary"
                  ><img
                    class="mr-2"
                    src="@/assets/img/File_Blank.svg"
                    alt=""
                  />загрузить Из файла</v-btn
                >
              </div>
              <div class="d-flex mobile-media">
                <v-btn
                  elevation="0"
                  @click="selectFile(6)"
                  dark
                  class="btn-primary"
                  ><img
                    class="mr-2"
                    src="@/assets/img/Camera.svg"
                    alt=""
                  />Загрузить Фотографию</v-btn
                >
              </div>
            </div>
          </v-col>
          <v-col>
            <img
              style="justify-content: center; display: flex"
              src="@/assets/img/driverlicense.svg"
              alt=""
            />
          </v-col>
        </v-row>
      </div>

      <div class="mt-10">
        <v-btn elevation="0" class="btn-secondary" @click="back(5)">
          <span class="btn-title">Назад</span>
        </v-btn>
        <v-btn
          dark
          elevation="0"
          class="btn-primary"
          :disabled="!disableHandler"
          @click="next(7)"
          ><span class="btn-title" style="color: white">Далее</span>
        </v-btn>
      </div>
    </v-container>
  </div>
</template>

<script>
import vue2Dropzone from "vue2-dropzone";
import "vue2-dropzone/dist/vue2Dropzone.min.css";
import { mapActions } from "vuex";
function formatAsCurrency(value, dec) {
  dec = dec || "";
  if (value === null) {
    return "";
  }
  return "" + value.toFixed(dec).replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1-");
}
export default {
  name: "UploadDocument",
  components: {
    vueDropzone: vue2Dropzone,
  },
  data() {
    return {
      filelist: [],
      menu: false,
      menu1: false,
      passport_image1:'',
      passport_image2:'',
      passport_image3:'',
      currency: "",
      initialBalance: null,
      logo: "",
      helper_date: "",
      helper_given: "",
      dateFormatted_date: "",
      dateFormatted_given: "",
      passport_number: "",
      passport_info: "",
      passport_series: "",
      passport_given: "",
      passport_date: "",
      passport_term: "",
      files: [],
      passport_1: null,
      inputRules: [(v) => !!v || "Заполните поле"],
      seriesRules: [
        (v) => (!!v && v.length === 4) || "Некорректная  серия паспорта",
        (v) => !!v || "Заполните поле",
      ],
      numberRules: [
        (v) => (!!v && v.length === 6) || "Некорректный  номер паспорта",
        (v) => !!v || "Заполните поле",
      ],
      codeRules: [
        (v) => (!!v && v.length === 7) || "Некорректный  код подразделения",
        (v) => !!v || "Заполните поле",
      ],
      dropzoneOptions: {
        url: "https://httpbin.org/post",
        thumbnailWidth: 200,
        addRemoveLinks: true,
        dictDefaultMessage:
          '<img class="mr-2" src="@/assets/img/File_Blank.svg" alt="">',
      },
    };
  },
  methods: {
    ...mapActions("executor", [
      "createDocument",
      "setPassport",
      "uploadPassportMainSpread",
      "uploadPassportMedical",
      "uploadDriverLicense",
    ]),
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
    next(value) {
      this.$emit("pageHandler", value);
      let data = [
        {
          field: "fullname",
          value: this.passport_info,
        },
        {
          field: "seria",
          value: this.passport_series,
        },
        {
          field: "seria",
          value: this.passport_series,
        },
        {
          field: "number",
          value: this.passport_number,
        },
        {
          field: "date_of_issue",
          value: this.dateFormatted_date,
        },
        {
          field: "validity",
          value: this.passport_term,
        },
        {
          field: "issued",
          value: this.dateFormatted_given,
        },
        {
          field: "code",
          value: this.passport_code,
        },
      ];
      this.createDocument({ document: "passport" });
      setTimeout(() => {
        this.setPassport(data);
      }, 1000);
      this.$router.push({ path: this.$route.fullPath, query: { tab: "7" } });
    },
    back(value) {
      this.$emit("pageHandler", value, "back");
      this.$router.push({ path: this.$route.fullPath, query: { tab: "5" } });
    },
    onChange() {
      this.filelist = [...this.$refs.file.files];
    },
    remove(i) {
      this.filelist.splice(i, 1);
    },
    dragover(event) {
      event.preventDefault();
    },
    async afterAdded1(file, xhr, formDataArg) {
      let data = {
        slug: "passport_main_spread",
        name_media: "Основной разворот",
      };
      await this.createDocument("passport_media");
      let formData = new FormData();
      formData.append("file", file);
      this.uploadPassportMainSpread({ data, formData });
      this.passport_image1='1'
    },
    async afterAdded2(file, xhr, formDataArg) {
      let data = {
        slug: "passport_registration_page",
        name_media: "Фото паспорта основной разворот (стр. 1-3)",
      };
      await this.createDocument("passport_media");
      let formData = new FormData();
      formData.append("file", file);
      this.uploadPassportMainSpread({ data, formData });
      this.passport_image2='2'
    },
    async afterAdded3(file, xhr, formDataArg) {
      let data = {
        slug: "photo_with_passport",
        name_media: "Фото паспорта разворот прописка (стр. 3-4) ",
      };
      await this.createDocument("passport_media");
      let formData = new FormData();
      formData.append("file", file);
      this.uploadPassportMainSpread({ data, formData });
      this.passport_image3='3'
    },
    async afterAdded4(file, xhr, formDataArg) {
      let data = {
        slug: "medical_book_main_spread",
        name_media: "Медицинская книжка основной разворот",
      };
      await this.createDocument("medical_media");
      let formData = new FormData();
      formData.append("file", file);
      this.uploadPassportMedical({ data, formData });
    },
    async afterAdded5(file, xhr, formDataArg) {
      let data = {
        slug: "stacker_driving_license",
        name_media: "Водительские права",
      };
      await this.createDocument("driver_media");
      let formData = new FormData();
      formData.append("file", file);
      this.uploadDriverLicense({ data, formData });
    },
    async afterAdded6(file, xhr, formDataArg) {
      let data = {
        slug: "stacker_driving_license",
        name_media: "Водительские права",
      };
      await this.createDocument("driver_media");
      let formData = new FormData();
      formData.append("file", file);
      this.uploadDriverLicense({ data, formData });
    },
    selectFile(value) {
      document.getElementById("fileUpload" + value).click();
    },
    readFile(e) {
      const input = e.target;
      let file = input.files[0];

      let reader = new FileReader();

      reader.readAsDataURL(file);

      reader.onload = (e) => {
        this.logo = e.target.result;
      };

      reader.onerror = function () {
        console.log(reader.error);
      };
    },
    drop(event) {
      event.preventDefault();
      console.log(this.$refs.file, event);
    },
  },
  computed: {
    passport_code: {
      get: function () {
        return formatAsCurrency(this.initialBalance, 0);
      },
      set: function (newValue) {
        this.initialBalance = Number(newValue.replace(/[^0-9\.]/g, ""));
      },
    },
    disableHandler() {
      return (
        this.passport_number &&
        this.passport_info &&
        this.passport_code &&
        this.passport_series &&
        this.passport_given &&
        this.passport_date &&
        this.passport_term &&
        this.passport_image1 &&
        this.passport_image2 &&
        this.passport_image3
      );
    },
    computedDateFormatted() {
      return this.formatDate(this.date);
    },
  },
  watch: {
    helper_date() {
      this.dateFormatted_date = this.formatDate(this.helper_date);
    },
    helper_given(){
      this.dateFormatted_given = this.formatDate(this.helper_given)
    }
  },
};
</script>
<style>
.dz-preview .dz-image > img {
  height: 200px;
}
.dropzone {
  padding: 0px 0px;
  height: 250px;
}
</style>
<style scoped>
.drag-drop {
  background: #f8f8f8;
  border: 1px dashed #bcbcbc;
  border-radius: 10px;
}
.access-content {
  background: #f5f7f9;
  border-radius: 16px;
  height: 100%;
  padding: 20px;
}
.btn-primary {
  background: #0082de !important;
  border-radius: 8px;
  height: 45px !important;
  width: 100%;
}
.btn-secondary {
  background: white !important;
  border-radius: 8px;
  height: 45px !important;
  width: 100%;
  border: 1px solid lightgrey;
  margin-top: 15px;
}
.text-gray {
  color: #9398a1;
  margin-top: 10px;
  font-weight: 700;
}
.btn-primary {
  background: #0082de !important;
  border-radius: 8px;
  height: 45px !important;
  width: 100%;
  margin-top: 15px;
}
.btn-secondary {
  background: white !important;
  border-radius: 8px;
  height: 45px !important;
  width: 100%;
  border: 1px solid lightgrey;
}
.dropzone-custom-content {
  text-align: center;
}

.dropzone-custom-title {
  margin-top: 0;
  color: #00b782;
}

.subtitle {
  color: #314b5f;
}

.desktop {
  display: block !important;
}
.mobile-media {
  display: none !important;
}
@media (max-width: 1000px) {
  .mobile-media {
    display: flex !important;
  }
  .desktop-media {
    display: none !important;
  }
}
.btn-title {
  font-weight: 700;
}
</style>
