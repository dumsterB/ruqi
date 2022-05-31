<template>
<div class="upload_document">
  <v-container>
    <h2>Загрузка документов</h2>
    <p class="mt-4">Значимость этих проблем настолько очевидна, что начало повседневной работы по формированию позиции требуют</p>
    <br>
    <div class="d-flex">
   <h3> <strong>1. Паспорт РФ</strong></h3>
      <img  class="ml-2" src="@/assets/img/correct.svg" alt="">
    </div>
    <div class="mt-5">
      <div class="form-part">
        ФИО в паспорте
        <v-text-field
            outlined
            placeholder="Иванов Иван Иванович"
            class="mt-2"
            dense
            single-line
        ></v-text-field>
      </div>
      <v-row>
        <v-col>
          <div class="form-part">
            Серия
            <v-text-field
                outlined
                class="mt-2"
                dense
                single-line
            ></v-text-field>
          </div>
        </v-col>
        <v-col>
          <div class="form-part">
            Номер
            <v-text-field
                outlined
                class="mt-2"
                dense
                single-line
            ></v-text-field>
          </div>
        </v-col>
        <v-col>
          <div class="form-part">
            Дата выдачи
            <v-text-field
                outlined
                class="mt-2"
                dense
                single-line
            ></v-text-field>
          </div>
        </v-col>
        <v-col>
          <div class="form-part">
            Срок действия
            <v-text-field
                outlined
                class="mt-2"
                dense
                single-line
            ></v-text-field>
          </div>
        </v-col>
      </v-row>
      <div class="form-part">
        Кем выдан
        <v-text-field
            outlined
            class="mt-2"
            dense
            single-line
        ></v-text-field>
      </div>
      <div style="width: 200px">
        <div class="form-part">
          Код подразделения
          <v-text-field
              outlined
              class="mt-2"
              dense
              single-line
          ></v-text-field>
        </div>
      </div>

    </div>
    <v-divider></v-divider>
    <div class="mt-5">
      <div class="d-flex">
        <h3><strong> Фото паспорта основной разворот (стр. 1-3)</strong></h3>
        <img  class="ml-2" src="@/assets/img/correct.svg" alt="">
      </div>
      <p class="mt-3">На фотографии должны быть отчетливо видны серия, номер, основные данные, фотография. В поле зрения не должны попадать пальцы и посторонние предметы.</p>
    </div>
    <div>
      <v-row>
        <v-col>
          <div  class=" mt-2  justify-center text-center">
            <vue-dropzone id="fileUpload" ref="myVueDropzone"  @vdropzone-thumbnail="afterAdded('first')" :options="dropzoneOptions" :useCustomSlot="true">
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
              <v-btn elevation="0" @click="selectFile()" dark class="btn-primary"><img class="mr-2" src="@/assets/img/File_Blank.svg" alt="">загрузить Из файла</v-btn>
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
      <h3><strong> Фото паспорта разворот прописка (стр. 3-4)</strong></h3>
      <p class="mt-3">На фотографии должны быть отчетливо видны серия, номер, основные данные, фотография. В поле зрения не должны попадать пальцы и посторонние предметы.</p>
    </div>
    <v-row>
      <v-col>
        <div class="mt-2 justify-center text-center">
          <vue-dropzone id="fileUpload1" ref="myVueDropzone"  @vdropzone-thumbnail="afterAdded" :options="dropzoneOptions" :useCustomSlot="true">
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
            <v-btn elevation="0" @click="selectFile()" dark class="btn-primary"><img class="mr-2" src="@/assets/img/File_Blank.svg" alt="">загрузить Из файла</v-btn>
          </div>
        </div>
      </v-col>
      <v-col>
        <img src="@/assets/img/passport_1.svg" alt="">
      </v-col>
    </v-row>
    <v-btn  elevation="0" class="btn-secondary"> <span class="btn-title">Назад</span> </v-btn>
    <v-btn dark elevation="0" class="btn-primary" @click="next(6)"><span class="btn-title">Далее</span> </v-btn>
  </v-container>
</div>
</template>

<script>
import vue2Dropzone from 'vue2-dropzone'
import 'vue2-dropzone/dist/vue2Dropzone.min.css'
export default {
  name: "UploadDocument",
  components:{
    vueDropzone: vue2Dropzone
  },
  data(){
    return{
      filelist: [],
      logo:'',
      files:[],
      passport_1:null,
      dropzoneOptions: {
        url: 'https://httpbin.org/post',
        thumbnailWidth: 200,
        addRemoveLinks: true,
        dictDefaultMessage: "<img class=\"mr-2\" src=\"@/assets/img/File_Blank.svg\" alt=\"\">"
      }
    }
  },
  methods:{
    afterAdded(e,file,place){
      console.log(e,file,place)
    },
    next(val){
      this.$emit('pageHandler',val)
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
    selectFile() {
      document.getElementById("fileUpload1").click()
    },
    readFile(e) {
      const input = e.target
      let file = input.files[0];

      let reader = new FileReader();

      reader.readAsDataURL(file);

      reader.onload = (e) => {
        this.logo = e.target.result
      };

      reader.onerror = function() {
        console.log(reader.error);
      };
    },
    dragleave(event) {
      // Clean up
    },
    drop(event) {
      event.preventDefault();
      console.log(this.$refs.file,event)
    },

  }
}
</script>

<style scoped>
.drag-drop{
  background: #F8F8F8;
  border: 1px dashed #BCBCBC;
  border-radius: 10px;
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
}
.btn-secondary{
  background: white!important;
  border-radius: 8px;
  height: 45px!important;
  width: 100%;
  border: 1px solid lightgrey;
  margin-top: 15px;
}
.text-gray{
  color: #9398A1;
  margin-top: 10px;
  font-weight: 700;
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
#customdropzone .dz-preview .dz-image  img{
 display: none!important;
}
#customdropzone .dz-success-mark, .dz-error-mark, .dz-remove {
  display: none;
}
</style>