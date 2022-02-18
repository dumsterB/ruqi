<template lang="pug">

.documents-tab__container
  .documents-tab__wrapper
    .documents-tab__header
      .documents-tab__haupt-titel {{ hauptTitel }}
    .documents-tab__body
      .documents-tab__wrapper__body
        .photo-document(
          v-for="( photoDocument, index ) in photoDocuments" :key="index"
          :class="photoDocument.slug"
        )
          uploadPhotoInput( :title="photoDocument.title" :slug="photoDocument.slug" )

</template>

<script>

  import uploadPhotoInput from '@/components/UI/uploadPhotoInput';

  export default {

    components : {
      uploadPhotoInput,
    },

    props : {},

    data ()
    {
      return {
        hauptTitel : 'Фото документов',

        photoDocuments : [
          { title : 'Паспорт - основной разворот', slug  : 'passport_main_spread', },
          { title : 'Паспорт - страница регистрации', slug  : 'passport_registration_page', },
          { title : 'Фото с паспортом', slug  : 'photo_with_passport', },
          { title : 'СНИЛС', slug  : 'snils', },
          { title : 'Свидетельство ИНН', slug  : 'inn_certificate', },
          { title : 'Медицинская книжка', slug  : 'medical_book', },
          { title : 'Права на управление  штабелером', slug  : 'stacker_driving_license', },
        ],
      }
    },

    methods : {
      getters ()
      {
        return {}
      },

      setters ()
      {
        return {}
      },

      handlers ()
      {
        return {}
      },

      helpers ()
      {
        return {}
      },

      init (){},

      bindActions (){},
    }

  }

</script>

<style lang="scss" scoped>

.documents-tab__container
{
  /* OBJECTS STYLES START */
    .documents-tab__wrapper
    {
      padding : 32px;
      background: #F6FBFF;
      border: 1px solid #E2E4E5;
      box-sizing: border-box;
      border-radius: 30px;

      .documents-tab__header {
        margin-bottom: 24px;
      }

      .documents-tab__body
      {
        .documents-tab__wrapper__body
        {
          width: 533px;
        }
      }
    }

    .documents-tab__haupt-titel
    {
      font-style: normal;
      font-weight: 600;
      font-size: 20px;
      line-height: 28px;
      color: #263043;
    }

    .documents-tab__description
    {
      font-style: normal;
      font-weight: normal;
      font-size: 14px;
      line-height: 16px;
      color: #7A91A9;
      margin-bottom: 24px;
    }

    .photo-document
    {
      margin-bottom: 24px;
    }
  /* OBJECTS STYLES END */

  /* MIXINS STYLES START */
  /* MIXINS STYLES END */
}

</style>
