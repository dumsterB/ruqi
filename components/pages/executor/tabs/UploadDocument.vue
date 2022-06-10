<template>
  <div class="upload_document">
    <v-container>
      <p class="main_text_executor">Загрузка документов</p>
      <p class="mt-4">Значимость этих проблем настолько очевидна, что начало повседневной работы по формированию позиции
        требуют</p>
      <br>
      <div class="d-flex">
        <h2> <strong>1. Паспорт РФ</strong></h2>
        <img class="ml-2" src="@/assets/img/correct.svg" alt="">
      </div>
      <div class="mt-5">
        <div class="form-part">
          <p class="input_label">ФИО в паспорте</p>
          <v-text-field outlined v-model="passport_info" placeholder="Иванов Иван Иванович" class="mt-2" dense
            single-line></v-text-field>
        </div>
        <v-row>
          <v-col cols="6" md="3" lg="3">
            <div class="form-part">
              <p class="input_label">Серия</p>

              <v-text-field outlined v-model="passport_series" class="mt-2" dense single-line></v-text-field>
            </div>
          </v-col>
          <v-col cols="6" md="3" lg="3">
            <div class="form-part">
              <p class="input_label">Номер</p>

              <v-text-field outlined class="mt-2" v-model="passport_number" dense single-line></v-text-field>
            </div>
          </v-col>
          <v-col cols="6" md="3" lg="3">
            <div class="form-part">
              <p class="input_label"> Дата выдачи</p>

              <v-text-field outlined class="mt-2" v-model="passport_date" dense single-line></v-text-field>
            </div>
          </v-col>
          <v-col cols="6" md="3" lg="3">
            <div class="form-part">
              <p class="input_label"> Срок действия</p>

              <v-text-field outlined class="mt-2" v-model="passport_term" dense single-line></v-text-field>
            </div>
          </v-col>
        </v-row>
        <div class="form-part">
          <p class="input_label">Кем выдан</p>

          <v-text-field outlined class="mt-2" v-model="passport_given" dense single-line></v-text-field>
        </div>
        <div style="width: 200px">
          <div class="form-part">
            <p class="input_label">Код подразделения</p>

            <v-text-field outlined class="mt-2" v-model="passport_code" dense single-line></v-text-field>
          </div>
        </div>

      </div>
      <v-divider></v-divider>
      <div class="desktop">
        <div class="mt-5">
          <div class="d-flex">
            <h3><strong> Фото паспорта основной разворот (стр. 1-3)</strong></h3>
            <img class="ml-2" src="@/assets/img/correct.svg" alt="">
          </div>
          <p class="mt-3">На фотографии должны быть отчетливо видны серия, номер, основные данные, фотография. В поле
            зрения не должны попадать пальцы и посторонние предметы.</p>
        </div>
        <div>
          <v-row>
            <v-col>
              <div class=" mt-2  justify-center text-center">
                <vue-dropzone id="fileUpload1" ref="myVueDropzone" @click.prevent="selectFile(0)"
                  @vdropzone-thumbnail="afterAdded1" :options="dropzoneOptions" :useCustomSlot="true">
                  <div class="dropzone-custom-content">
                    <div class="d-block">
                      <img src="@/assets/img/uploader.svg" alt="">
                      <br>
                      <strong>Перетащите сюда файл</strong>
                    </div>
                  </div>
                </vue-dropzone>
                <p class="text-gray">или загрузите фото</p>
                <div class="d-flex">
                  <v-btn elevation="0" @click="selectFile(1)" dark class="btn-primary"><img class="mr-2"
                      src="@/assets/img/File_Blank.svg" alt="">загрузить Из файла</v-btn>
                </div>
              </div>
            </v-col>
            <v-col>
              <img src="@/assets/img/passport_1.svg" alt="">
            </v-col>
          </v-row>
        </div>

        <v-divider class="mt-4"></v-divider>
        <div class="mt-5">
          <h3><strong> Фото паспорта разворот прописка (стр. 3-4)</strong>
            <img class="ml-2" src="@/assets/img/correct.svg" alt="">
          </h3>
          <p class="mt-3">На фотографии должны быть отчетливо видны серия, номер, основные данные, фотография. В поле
            зрения не должны попадать пальцы и посторонние предметы.</p>
        </div>
        <v-row>
          <v-col>
            <div class="mt-2 justify-center text-center">
              <vue-dropzone id="fileUpload2" ref="myVueDropzone" @vdropzone-thumbnail="afterAdded2"
                :options="dropzoneOptions" :useCustomSlot="true">
                <div class="dropzone-custom-content">
                  <div class="d-block">
                    <img src="@/assets/img/uploader.svg" alt="">
                    <br>
                    <strong>Перетащите сюда файл</strong>
                  </div>
                </div>
              </vue-dropzone>
              <p class="text-gray">или загрузите фото</p>
              <div class="d-flex">
                <v-btn elevation="0" @click="selectFile(2)" dark class="btn-primary"><img class="mr-2"
                    src="@/assets/img/File_Blank.svg" alt="">загрузить Из файла</v-btn>
              </div>
            </div>
          </v-col>
          <v-col>
            <img src="@/assets/img/passport_1.svg" alt="">
          </v-col>
        </v-row>
        <v-divider class="mt-4"></v-divider>
        <div class="mt-5">
          <h3><strong>Фото с паспортом</strong>
            <img class="ml-2" src="@/assets/img/correct.svg" alt="">
          </h3>
          <p class="mt-3">На фотографии должны быть отчетливо видны серия, номер, основные данные, фотография. В поле
            зрения не должны попадать пальцы и посторонние предметы.</p>
        </div>
        <v-row>
          <v-col>
            <div class="mt-2 justify-center text-center">
              <vue-dropzone id="fileUpload3" ref="myVueDropzone" @vdropzone-thumbnail="afterAdded3"
                :options="dropzoneOptions" :useCustomSlot="true">
                <div class="dropzone-custom-content">
                  <div class="d-block">
                    <img src="@/assets/img/uploader.svg" alt="">
                    <br>
                    <strong>Перетащите сюда файл</strong>
                  </div>
                </div>
              </vue-dropzone>
              <p class="text-gray">или загрузите фото</p>
              <div class="d-flex">
                <v-btn elevation="0" @click="selectFile(3)" dark class="btn-primary"><img class="mr-2"
                    src="@/assets/img/File_Blank.svg" alt="">загрузить Из файла</v-btn>
              </div>
            </div>
          </v-col>
          <v-col>
            <img src="@/assets/img/passportman.svg" alt="">
          </v-col>
        </v-row>
        <v-divider class="mt-4"></v-divider>
        <div>
          <div class="d-flex mt-15">
            <h2> <strong>2. Дополнительные документы</strong></h2>
            <img class="ml-2" src="@/assets/img/correct.svg" alt="">
          </div>
          <p style="font-weight: 600" class="mt-4">Следующий перечень документов требуется для участия в заявках по
            выбранных Вами профессиям:</p>
          <div class="access-content">
            <div class="d-flex">
              <img style="margin-top: -50px" src="@/assets/img/attention.svg" alt="">
              <p class="ml-2" style="font-weight: 600">Если вы не готовы сейчас предоставить документы нужные для работы
                по этим профессиям, вы можете вернуться к выбору профессий, изменить свой выбор и продолжить
                регистрацию.</p>
            </div>
            <a href="" style="text-decoration: none;font-weight: 600" class="ml-6">Вернуться к выбору профессий</a>
          </div>
        </div>
        <div class="mt-5">
          <h3><strong> Медицинская книжка основной разворот</strong>
            <img class="ml-2" src="@/assets/img/correct.svg" alt="">
          </h3>
          <p class="mt-3">На фотографии должны быть отчетливо видны серия, номер, основные данные, фотография. В поле
            зрения не должны попадать пальцы и посторонние предметы.</p>
        </div>
        <v-row>
          <v-col>
            <div class="mt-2 justify-center text-center">
              <vue-dropzone id="fileUpload4" ref="myVueDropzone" @vdropzone-thumbnail="afterAdded4"
                :options="dropzoneOptions" :useCustomSlot="true">
                <div class="dropzone-custom-content">
                  <div class="d-block">
                    <img src="@/assets/img/uploader.svg" alt="">
                    <br>
                    <strong>Перетащите сюда файл</strong>
                  </div>
                </div>
              </vue-dropzone>
              <p class="text-gray">или загрузите фото</p>
              <div class="d-flex">
                <v-btn elevation="0" @click="selectFile(4)" dark class="btn-primary"><img class="mr-2"
                    src="@/assets/img/File_Blank.svg" alt="">загрузить Из файла</v-btn>
              </div>
            </div>
          </v-col>
          <v-col>
            <img src="@/assets/img/medical_book.svg" alt="">
          </v-col>
        </v-row>
        <v-divider class="mt-4"></v-divider>
        <div class="mt-5">
          <h3><strong> Водительские права</strong>
            <img class="ml-2" src="@/assets/img/correct.svg" alt="">
          </h3>
          <p class="mt-3">На фотографии должны быть отчетливо видны серия, номер, основные данные, фотография. В поле
            зрения не должны попадать пальцы и посторонние предметы.</p>
        </div>
        <v-row>
          <v-col>
            <div class="mt-2 justify-center text-center">
              <vue-dropzone id="fileUpload5" ref="myVueDropzone" @vdropzone-thumbnail="afterAdded5"
                :options="dropzoneOptions" :useCustomSlot="true">
                <div class="dropzone-custom-content">
                  <div class="d-block">
                    <img src="@/assets/img/uploader.svg" alt="">
                    <br>
                    <strong>Перетащите сюда файл</strong>
                  </div>
                </div>
              </vue-dropzone>
              <p class="text-gray">или загрузите фото</p>
              <div class="d-flex">
                <v-btn elevation="0" @click="selectFile(5)" dark class="btn-primary"><img class="mr-2"
                    src="@/assets/img/File_Blank.svg" alt="">загрузить Из файла</v-btn>
              </div>
            </div>
          </v-col>
          <v-col>
            <img src="@/assets/img/driverlicensefront.svg" alt="">
          </v-col>
        </v-row>
        <v-divider class="mt-4"></v-divider>
        <div class="mt-5">
          <h3><strong> Водительские права</strong>
            <img class="ml-2" src="@/assets/img/correct.svg" alt="">
          </h3>
          <p class="mt-3">На фотографии должны быть отчетливо видны серия, номер, основные данные, фотография. В поле
            зрения не должны попадать пальцы и посторонние предметы.</p>
        </div>
        <v-row>
          <v-col>
            <div class="mt-2 justify-center text-center">
              <vue-dropzone id="fileUpload6" ref="myVueDropzone" @vdropzone-thumbnail="afterAdded6"
                :options="dropzoneOptions" :useCustomSlot="true">
                <div class="dropzone-custom-content">
                  <div class="d-block">
                    <img src="@/assets/img/uploader.svg" alt="">
                    <br>
                    <strong>Перетащите сюда файл</strong>
                  </div>
                </div>
              </vue-dropzone>
              <p class="text-gray">или загрузите фото</p>
              <div class="d-flex">
                <v-btn elevation="0" @click="selectFile(6)" dark class="btn-primary"><img class="mr-2"
                    src="@/assets/img/File_Blank.svg" alt="">загрузить Из файла</v-btn>
              </div>
            </div>
          </v-col>
          <v-col>
            <img src="@/assets/img/driverlicense.svg" alt="">
          </v-col>
        </v-row>
      </div>
      <div class="mobile">
        <div class="mt-5">
          <div class="d-flex">
            <h3><strong> Фото паспорта основной разворот (стр. 1-3)</strong></h3>
            <img class="ml-2" src="@/assets/img/correct.svg" alt="">
          </div>
          <p class="mt-3">На фотографии должны быть отчетливо видны серия, номер, основные данные, фотография. В поле
            зрения не должны попадать пальцы и посторонние предметы.</p>
        </div>
        <div>
          <v-row>
            <v-col>
              <div class=" mt-2  justify-center text-center">
                <vue-dropzone id="fileUpload1" ref="myVueDropzone" @click.prevent="selectFile(0)"
                  @vdropzone-thumbnail="afterAdded1" :options="dropzoneOptions" :useCustomSlot="true">
                  <div class="dropzone-custom-content">
                    <div class="d-block">
                      <img src="@/assets/img/uploader.svg" alt="">
                      <br>
                      <strong>Перетащите сюда файл</strong>
                    </div>
                  </div>
                </vue-dropzone>
                <p class="text-gray">или загрузите фото</p>
                <div class="d-flex">
                  <v-btn elevation="0" @click="selectFile(1)" dark class="btn-primary"><img class="mr-2"
                      src="@/assets/img/pics.svg" alt="">загрузить Из файла</v-btn>
                </div>
                <div class="d-flex">
                  <v-btn elevation="0" @click="selectFile(1)" dark class="btn-primary"><img class="mr-2"
                      src="@/assets/img/Camera.svg" alt="">новое фото с камеры</v-btn>
                </div>
              </div>
            </v-col>
            <v-col>
              <img src="@/assets/img/passport_1.svg" alt="">
            </v-col>
          </v-row>
        </div>

        <v-divider class="mt-4"></v-divider>
        <div class="mt-5">
          <h3><strong> Фото паспорта разворот прописка (стр. 3-4)</strong>
            <img class="ml-2" src="@/assets/img/correct.svg" alt="">
          </h3>
          <p class="mt-3">На фотографии должны быть отчетливо видны серия, номер, основные данные, фотография. В поле
            зрения не должны попадать пальцы и посторонние предметы.</p>
        </div>
        <v-row>
          <v-col>
            <div class="mt-2 justify-center text-center">
              <vue-dropzone id="fileUpload2" ref="myVueDropzone" @vdropzone-thumbnail="afterAdded2"
                :options="dropzoneOptions" :useCustomSlot="true">
                <div class="dropzone-custom-content">
                  <div class="d-block">
                    <img src="@/assets/img/uploader.svg" alt="">
                    <br>
                    <strong>Перетащите сюда файл</strong>
                  </div>
                </div>
              </vue-dropzone>
              <p class="text-gray">или загрузите фото</p>
              <div class="d-flex">
                <v-btn elevation="0" @click="selectFile(2)" dark class="btn-primary"><img class="mr-2"
                    src="@/assets/img/File_Blank.svg" alt="">загрузить Из файла</v-btn>
              </div>
            </div>
          </v-col>
          <v-col>
            <img src="@/assets/img/passport_1.svg" alt="">
          </v-col>
        </v-row>
        <v-divider class="mt-4"></v-divider>
        <div class="mt-5">
          <h3><strong>Фото с паспортом</strong>
            <img class="ml-2" src="@/assets/img/correct.svg" alt="">
          </h3>
          <p class="mt-3">На фотографии должны быть отчетливо видны серия, номер, основные данные, фотография. В поле
            зрения не должны попадать пальцы и посторонние предметы.</p>
        </div>
        <v-row>
          <v-col>
            <div class="mt-2 justify-center text-center">
              <vue-dropzone id="fileUpload3" ref="myVueDropzone" @vdropzone-thumbnail="afterAdded3"
                :options="dropzoneOptions" :useCustomSlot="true">
                <div class="dropzone-custom-content">
                  <div class="d-block">
                    <img src="@/assets/img/uploader.svg" alt="">
                    <br>
                    <strong>Перетащите сюда файл</strong>
                  </div>
                </div>
              </vue-dropzone>
              <p class="text-gray">или загрузите фото</p>
              <div class="d-flex">
                <v-btn elevation="0" @click="selectFile(3)" dark class="btn-primary"><img class="mr-2"
                    src="@/assets/img/File_Blank.svg" alt="">загрузить Из файла</v-btn>
              </div>
            </div>
          </v-col>
          <v-col>
            <img src="@/assets/img/passportman.svg" alt="">
          </v-col>
        </v-row>
        <v-divider class="mt-4"></v-divider>
        <div>
          <div class="d-flex mt-15">
            <h2> <strong>2. Дополнительные документы</strong></h2>
            <img class="ml-2" src="@/assets/img/correct.svg" alt="">
          </div>
          <p style="font-weight: 600" class="mt-4">Следующий перечень документов требуется для участия в заявках по
            выбранных Вами профессиям:</p>
          <div class="access-content">
            <div class="d-flex">
              <img style="margin-top: -50px" src="@/assets/img/attention.svg" alt="">
              <p class="ml-2" style="font-weight: 600">Если вы не готовы сейчас предоставить документы нужные для работы
                по этим профессиям, вы можете вернуться к выбору профессий, изменить свой выбор и продолжить
                регистрацию.</p>
            </div>
            <a href="" style="text-decoration: none;font-weight: 600" class="ml-6">Вернуться к выбору профессий</a>
          </div>
        </div>
        <div class="mt-5">
          <h3><strong> Медицинская книжка основной разворот</strong>
            <img class="ml-2" src="@/assets/img/correct.svg" alt="">
          </h3>
          <p class="mt-3">На фотографии должны быть отчетливо видны серия, номер, основные данные, фотография. В поле
            зрения не должны попадать пальцы и посторонние предметы.</p>
        </div>
        <v-row>
          <v-col>
            <div class="mt-2 justify-center text-center">
              <vue-dropzone id="fileUpload4" ref="myVueDropzone" @vdropzone-thumbnail="afterAdded4"
                :options="dropzoneOptions" :useCustomSlot="true">
                <div class="dropzone-custom-content">
                  <div class="d-block">
                    <img src="@/assets/img/uploader.svg" alt="">
                    <br>
                    <strong>Перетащите сюда файл</strong>
                  </div>
                </div>
              </vue-dropzone>
              <p class="text-gray">или загрузите фото</p>
              <div class="d-flex">
                <v-btn elevation="0" @click="selectFile(4)" dark class="btn-primary"><img class="mr-2"
                    src="@/assets/img/File_Blank.svg" alt="">загрузить Из файла</v-btn>
              </div>
            </div>
          </v-col>
          <v-col>
            <img src="@/assets/img/medical_book.svg" alt="">
          </v-col>
        </v-row>
        <v-divider class="mt-4"></v-divider>
        <div class="mt-5">
          <h3><strong> Водительские права</strong>
            <img class="ml-2" src="@/assets/img/correct.svg" alt="">
          </h3>
          <p class="mt-3">На фотографии должны быть отчетливо видны серия, номер, основные данные, фотография. В поле
            зрения не должны попадать пальцы и посторонние предметы.</p>
        </div>
        <v-row>
          <v-col>
            <div class="mt-2 justify-center text-center">
              <vue-dropzone id="fileUpload5" ref="myVueDropzone" @vdropzone-thumbnail="afterAdded5"
                :options="dropzoneOptions" :useCustomSlot="true">
                <div class="dropzone-custom-content">
                  <div class="d-block">
                    <img src="@/assets/img/uploader.svg" alt="">
                    <br>
                    <strong>Перетащите сюда файл</strong>
                  </div>
                </div>
              </vue-dropzone>
              <p class="text-gray">или загрузите фото</p>
              <div class="d-flex">
                <v-btn elevation="0" @click="selectFile(5)" dark class="btn-primary"><img class="mr-2"
                    src="@/assets/img/File_Blank.svg" alt="">загрузить Из файла</v-btn>
              </div>
            </div>
          </v-col>
          <v-col>
            <img src="@/assets/img/driverlicensefront.svg" alt="">
          </v-col>
        </v-row>
        <v-divider class="mt-4"></v-divider>
        <div class="mt-5">
          <h3><strong> Водительские права</strong>
            <img class="ml-2" src="@/assets/img/correct.svg" alt="">
          </h3>
          <p class="mt-3">На фотографии должны быть отчетливо видны серия, номер, основные данные, фотография. В поле
            зрения не должны попадать пальцы и посторонние предметы.</p>
        </div>
        <v-row>
          <v-col>
            <div class="mt-2 justify-center text-center">
              <vue-dropzone id="fileUpload6" ref="myVueDropzone" @vdropzone-thumbnail="afterAdded6"
                :options="dropzoneOptions" :useCustomSlot="true">
                <div class="dropzone-custom-content">
                  <div class="d-block">
                    <img src="@/assets/img/uploader.svg" alt="">
                    <br>
                    <strong>Перетащите сюда файл</strong>
                  </div>
                </div>
              </vue-dropzone>
              <p class="text-gray">или загрузите фото</p>
              <div class="d-flex">
                <v-btn elevation="0" @click="selectFile(6)" dark class="btn-primary"><img class="mr-2"
                    src="@/assets/img/File_Blank.svg" alt="">загрузить Из файла</v-btn>
              </div>
            </div>
          </v-col>
          <v-col>
            <img src="@/assets/img/driverlicense.svg" alt="">
          </v-col>
        </v-row>
      </div>

      <div class="mt-10">
        <v-btn elevation="0" class="btn-secondary" @click="back(5)"> <span class="btn-title">Назад</span> </v-btn>
        <v-btn dark elevation="0" class="btn-primary" @click="next(7)"><span class="btn-title">Далее</span> </v-btn>
      </div>
    </v-container>
  </div>
</template>

<script>
import vue2Dropzone from 'vue2-dropzone'
import 'vue2-dropzone/dist/vue2Dropzone.min.css'
import { mapActions } from "vuex";
export default {
  name: "UploadDocument",
  components: {
    vueDropzone: vue2Dropzone
  },
  data() {
    return {
      filelist: [],
      logo: '',
      passport_number: '',
      passport_info: '',
      passport_code: '',
      passport_series: '',
      passport_given: '',
      passport_date: '',
      passport_term: '',
      files: [],
      passport_1: null,
      dropzoneOptions: {
        url: 'https://httpbin.org/post',
        thumbnailWidth: 200,
        addRemoveLinks: true,
        dictDefaultMessage: "<img class=\"mr-2\" src=\"@/assets/img/File_Blank.svg\" alt=\"\">"
      }
    }
  },
  methods: {
    ...mapActions('executor', ['createDocument', 'setPassport']),
    next(value) {
      this.$emit('pageHandler', value)
      let data = [
        {
          field: 'fullname',
          value: this.passport_info,
        },
        {
          field: 'seria',
          value: this.passport_series
        },
        {
          field: 'seria',
          value: this.passport_series
        },
        {
          field: 'number',
          value: this.passport_number
        },
        {
          field: 'date_of_issue',
          value: this.passport_date
        },
        {
          field: 'validity',
          value: this.passport_term
        },
        {
          field: 'issued',
          value: this.passport_given
        },
        {
          field: "code",
          value: this.passport_code
        }
      ]
      this.createDocument()
      this.setPassport(data)
    },
    back(value) {
      this.$emit('pageHandler', value, 'back')
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
    afterAdded1(e, file, place) {
      console.log(e, file, place)
    },
    afterAdded2(e, file, place) {
      console.log(e, file, place)
    },
    afterAdded3(e, file, place) {
      console.log(e, file, place)
    },
    afterAdded4(e, file, place) {
      console.log(e, file, place)
    },
    afterAdded5(e, file, place) {
      console.log(e, file, place)
    },
    afterAdded6(e, file, place) {
      console.log(e, file, place)
    },
    selectFile(value) {
      document.getElementById("fileUpload" + value).click()
    },
    readFile(e) {
      const input = e.target
      let file = input.files[0];

      let reader = new FileReader();

      reader.readAsDataURL(file);

      reader.onload = (e) => {
        this.logo = e.target.result
      };

      reader.onerror = function () {
        console.log(reader.error);
      };
    },
    drop(event) {
      event.preventDefault();
      console.log(this.$refs.file, event)
    },

  }
}
</script>

<style scoped>
.drag-drop {
  background: #F8F8F8;
  border: 1px dashed #BCBCBC;
  border-radius: 10px;
}

.access-content {
  background: #F5F7F9;
  border-radius: 16px;
  height: 100%;
  padding: 20px;
}

.btn-primary {
  background: #0082DE !important;
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
  color: #9398A1;
  margin-top: 10px;
  font-weight: 700;
}

.btn-primary {
  background: #0082DE !important;
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

#customdropzone .dz-preview .dz-image img {
  display: none !important;
}

#customdropzone .dz-success-mark,
.dz-error-mark,
.dz-remove {
  display: none;
}

.mobile {
  display: none !important;
}

.desktop {
  display: block !important;
}

@media (max-width: 1000px) {
  .desktop {
    display: none;
  }

  .mobile {
    display: block !important;
  }
}
</style>
