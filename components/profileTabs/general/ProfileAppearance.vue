<template lang="pug">

.profile-appearance
  .wrapper
    .header
      .haupt-titel {{ hauptTitel }}
    .body
      .wrapper__body
        .profile-photo
          uploadPhotoInput( :title="inputTitles.profile_photo" :slug="slugs.profile_photo" )
        .profile-cover
          selectSingle.profile-cover__list(
            :id="'cover-view'"
            :options="[ 'aa', 'bb', 'cc', 'dd' ]"
            :title="selectTitles.coverTitle"
          )
          .cover-view
            .view-titel {{ selectTitles.viewTitle }}
            .view-block

</template>

<script>

  import uploadPhotoInput from '@/components/UI/uploadPhotoInput';
  import selectSingle from '@/components/UI/selectSingle';

  export default {

    components : {
      uploadPhotoInput,
      selectSingle,
    },

    data ()
    {
      return {
        hauptTitel : 'Внешний вид профиля',
        inputTitles : {
          profile_photo : 'Фото профиля',
        },

        selectTitles : {
          coverTitle : 'Обложка',
          viewTitle : 'Просмотр',
        },

        slugs : {
          profile_photo : 'profile_photo',
        },
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

<style lang="scss">

.profile-appearance
{
  /* OBJECTS STYLES START */
    .wrapper
    {
      padding : 32px;
      background: #F6FBFF;
      border: 1px solid #E2E4E5;
      box-sizing: border-box;
      border-radius: 30px;

      .header {
        margin-bottom: 24px;
      }

      .body
      {
        .wrapper__body
        {
          width: 533px;
        }
      }
    }

    .profile-photo
    {
      margin-bottom: 24px;
    }

    .haupt-titel
    {
      font-style: normal;
      font-weight: 600;
      font-size: 20px;
      line-height: 28px;
      color: #263043;
    }

    .profile-cover
    {
      display: flex;
      flex-direction: row;
      flex-wrap: nowrap;
      align-content: center;
      justify-content: flex-start;

      .profile-cover__list
      {
        width: 180px;

        fieldset
        {
          background: #FFFFFF;
          border: 1px solid #E2E4E5;
          box-sizing: border-box;
          border-radius: 4px !important;
        }
      }

      .cover-view
      {
        margin-left: 24px;

        .view-titel
        {
          font-style: normal;
          font-weight: normal;
          font-size: 16px;
          line-height: 20px;
          color: #263043;
          opacity: 0.5;
          margin-bottom: 16px;
        }

        .view-block
        {
          width: 130px;
          height: 44px;
          background: #0082DE;
          opacity: 0.2;
          border-radius: 6px;
        }
      }
    }
  /* OBJECTS STYLES END */

  /* MIXINS STYLES START */
    .v-select__selection.v-select__selection--comma, .v-icon.notranslate.mdi
    {
      color : #000000!important;
    }
  /* MIXINS STYLES END */
}

</style>
