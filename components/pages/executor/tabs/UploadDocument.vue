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
    <h3><strong> Фото паспорта основной разворот (стр. 1-3)</strong></h3>
      <p class="mt-3">На фотографии должны быть отчетливо видны серия, номер, основные данные, фотография. В поле зрения не должны попадать пальцы и посторонние предметы.</p>
    </div>

  </v-container>
</div>
</template>

<script>
export default {
  name: "UploadDocument"
}
</script>

<style scoped>

</style>