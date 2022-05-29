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
          <div  class=" mt-2  justify-center text-center" id="app">
            <div class="drag-drop pa-4">
              <button class="mt-4"  @click="selectFile()">
                <img height="80" style="margin-left: -15px" src="@/assets/img/uploader.svg" alt="">
                <br>
                <div class="logo-zone mt-3">
                  <div @dragover="dragover" @dragleave="dragleave" @drop="drop">
                    <input type="file"   @change="readFile" hidden ref="input" style="height: 300px"  id="logo-zone-input" class="logo-zone-input" />
                  </div>
                  <button  @click="selectFile()" style="color: #263043;font-weight: 700"  pill>Перетащите сюда файл</button>
                </div>
              </button>
            </div>
            <p class="text-gray">или загрузите фото</p>
            <div class="d-flex">
              <v-btn elevation="0" @click="selectFile()" dark class="btn-primary"><img class="mr-2" src="@/assets/img/File_Blank.svg" alt="">
                загрузить Из файла</v-btn>
            </div>
          </div>
        </v-col>
        <v-col>
          <img  v-if="logo"  style="border-radius: 10px;margin-left: 3px" height="270" class="mt-2" width="220" :src="logo" alt="">
        </v-col>
      </v-row>
      </div>
    <v-divider class="mt-4"></v-divider>
    <div class="mt-5">
      <h3><strong> Фото паспорта разворот прописка (стр. 3-4)</strong></h3>
      <p class="mt-3">На фотографии должны быть отчетливо видны серия, номер, основные данные, фотография. В поле зрения не должны попадать пальцы и посторонние предметы.</p>
    </div>
  </v-container>
</div>
</template>

<script>
export default {
  name: "UploadDocument",
  data(){
    return{
      filelist: [],
      logo:'',
    }
  },
  methods:{
    selectFile() {
      let fileInputElement = this.$refs.input;
      fileInputElement.click();
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
    remove(i) {
      this.filelist.splice(i, 1);
    },
    dragover(event) {
      event.preventDefault();
      // Add some visual fluff to show the user can drop its files
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
</style>