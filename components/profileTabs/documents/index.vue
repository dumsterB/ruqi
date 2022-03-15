<template lang="pug">

.documents-tab__container
  .documents-tab__wrapper
    .documents-tab__header
      .documents-tab__haupt-titel {{ hauptTitel }}
    .documents-tab__body
      .documents-tab__wrapper__body
        .photo-documents
          uploadPhotoInput.photo-document.passport_main_spread(
            :title="photoDocuments.passport_main_spread.title"
            :slug="photoDocuments.passport_main_spread.slug"
            :params="{ mode : !!getters().getDocumentBySlug( { slug : 'passport' } ).length, photo : getters().getDocumentBySlug( { slug : 'passport' } ),  }"
          )
          uploadPhotoInput.photo-document.passport_registration_page(
            :title="photoDocuments.passport_registration_page.title"
            :slug="photoDocuments.passport_registration_page.slug"
          )
          uploadPhotoInput.photo-document.photo_with_passport(
            :title="photoDocuments.photo_with_passport.title"
            :slug="photoDocuments.photo_with_passport.slug"
          )
          Input.photo-document.photo_with_passport.mix-input(
            v-show="false"
            :params="{ ...textInputDefaultSettings, hauptTitel : photoDocuments.snils.title, }"
          )

</template>

<script>

  import { mapActions, mapGetters, } from 'vuex';
  import uploadPhotoInput from '@/components/UI/uploadPhotoInput';
  import Input from '@/components/UI/input';

  export default {

    components : {
      uploadPhotoInput,
      Input,
    },

    props : {},

    data ()
    {
      return {
        hauptTitel : 'Фото документов',

        photoDocuments : {
          passport_main_spread        : { title : 'Паспорт - основной разворот', slug  : 'passport_main_spread', },
          passport_registration_page  : { title : 'Паспорт - страница регистрации', slug  : 'passport_registration_page', },
          photo_with_passport         : { title : 'Фото с паспортом', slug  : 'photo_with_passport', },
          snils                       : { title : 'СНИЛС', slug  : 'snils', },
          inn_certificate             : { title : 'Свидетельство ИНН', slug  : 'inn_certificate', },
          medical_book                : { title : 'Медицинская книжка', slug  : 'medical_book', },
          stacker_driving_license     : { title : 'Права на управление  штабелером', slug  : 'stacker_driving_license', },
        },

        textInputDefaultSettings : {
          type : 'text',
          value : '',
          hauptTitel : '',
          solo : true,
          hint : '',
        },
      }
    },

    computed : {
      ...mapGetters( 'userDocs', [ 'documents', ] ),
    },

    methods : {
      ...mapActions( 'userDocs', [ 'fetchDocuments', ] ),

      getters ()
      {
        return {
          getDocumentBySlug : ( payload = {} ) => {
            console.debug( 'getDocumentBySlug', payload ); // DELETE

            return this.documents.filter( doc => doc.slug === payload.slug );
          },
        }
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

      init ()
      {
        this.fetchDocuments();
      },

      bindActions (){},
    },

    mounted ()
    {
      this.init();
    },
  }

</script>

<style lang="scss">

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
    .mix-input
    {
      .v-input__slot
      {
        margin: 0 !important;
        box-shadow: none !important;

        height: 48px;
        background: #FFFFFF;
        border: 1px solid #E2E4E5;
        box-sizing: border-box;
        border-radius: 4px;
      }
    }
  /* MIXINS STYLES END */
}

</style>
