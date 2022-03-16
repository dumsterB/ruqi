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
            :params="{ photo : getters().getDocumentMediaBySlug( { slugDocument : PASSPORT, slugMedia : PASSPORT_MAIN_SPREAD, } ), }"
            @delete_media="handlers().onDeleteMedia( { $event, slugDocument : PASSPORT, } )"
            @photo_selected="handlers().onPhotoSelected( { $event, slugDocument : PASSPORT, slugMedia : PASSPORT_MAIN_SPREAD, } )"
          )
          uploadPhotoInput.photo-document.passport_registration_page(
            :title="photoDocuments.passport_registration_page.title"
            :slug="photoDocuments.passport_registration_page.slug"
            :params="{ photo : getters().getDocumentMediaBySlug( { slugDocument : PASSPORT, slugMedia : PASSPORT_REGISTRATION_PAGE, } ), }"
            @delete_media="handlers().onDeleteMedia( { $event, slugDocument : PASSPORT, } )"
            @photo_selected="handlers().onPhotoSelected( { $event, slugDocument : PASSPORT, slugMedia : PASSPORT_REGISTRATION_PAGE, } )"
          )
          uploadPhotoInput.photo-document.photo_with_passport(
            :title="photoDocuments.photo_with_passport.title"
            :slug="photoDocuments.photo_with_passport.slug"
            :params="{ photo : getters().getDocumentMediaBySlug( { slugDocument : PASSPORT, slugMedia : PHOTO_WITH_PASSPORT, } ), }"
            @delete_media="handlers().onDeleteMedia( { $event, slugDocument : PASSPORT, } )"
            @photo_selected="handlers().onPhotoSelected( { $event, slugDocument : PASSPORT, slugMedia : PHOTO_WITH_PASSPORT, } )"
          )
          Input.photo-document.photo_with_passport.mix-input(
            v-show="false"
            :params="{ ...textInputDefaultSettings, hauptTitel : photoDocuments.snils.title, }"
          )

</template>

<script>

  import { mapActions, mapGetters, } from 'vuex';
  import { PASSPORT, PASSPORT_MAIN_SPREAD, PASSPORT_REGISTRATION_PAGE, PHOTO_WITH_PASSPORT, } from '@/constants/';
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

      PASSPORT ()
      {
        return PASSPORT;
      },

      PASSPORT_MAIN_SPREAD ()
      {
        return PASSPORT_MAIN_SPREAD;
      },

      PASSPORT_REGISTRATION_PAGE ()
      {
        return PASSPORT_REGISTRATION_PAGE;
      },

      PHOTO_WITH_PASSPORT ()
      {
        return PHOTO_WITH_PASSPORT;
      },
    },

    methods : {
      ...mapActions( 'userDocs', [ 'fetchDocuments', 'deleteDocumentMedia', 'uploadDocumentMedia', ] ),

      getters ()
      {
        return {
          getDocumentBySlug : ( payload = {} ) => {
            console.debug( 'getDocumentBySlug', payload ); // DELETE

            return this.documents.filter( doc => doc.slug === payload.slug );
          },

          getDocumentMediaBySlug : ( payload = {} ) => {
            console.debug( 'getDocumentMediaBySlug', payload ); // DELETE

            let doc = this.getters().getDocumentBySlug( { slug: payload.slugDocument } );

            if ( doc.length )
            {
              let media = doc[ 0 ].media.filter( media => media.slug === payload.slugMedia );

              if ( media.length )
              {
                return media[ 0 ];
              }
              else
              {
                return false;
              }
            }
            else
            {
              return false;
            }
          },
        }
      },

      setters ()
      {
        return {}
      },

      handlers ()
      {
        return {
          onDeleteMedia : ( payload = {} ) => {
            let documentIndex = this.documents.findIndex(
              doc => doc.slug === payload.slugDocument
            );

            this.deleteDocumentMedia(
              {
                uuidDoc : this.documents[ documentIndex ].uuid,
                uuidMedia : payload.$event.uuid,
              }
            ).then(
              () => {
                this.fetchDocuments();
              }
            );
          },

          onPhotoSelected : ( payload = {} ) => {
            let documentIndex = this.documents.findIndex(
              doc => doc.slug === payload.slugDocument
            );

            console.log( "onPhotoSelected", payload, this.documents[ documentIndex ].uuid, payload.$event ); // DELETE

            this.uploadDocumentMedia(
              {
                uuidDoc     : this.documents[ documentIndex ].uuid,
                media       : payload.$event.photo,
                name_media  : payload.$event.photo_name,
                slug        : payload.slugMedia,
              }
            ).then(
              () => {
                this.fetchDocuments();
              }
            );
          },
        }
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
