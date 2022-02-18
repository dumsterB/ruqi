<template lang="pug">

.password-tab__container
  .password-tab__wrapper
    .password-tab__header
      .password-tab__haupt-titel {{ hauptTitel }}
    .password-tab__body
      .password-tab__wrapper__body
        .password-tab__description
          .description__titel {{ description.titel }}
          ul.description__list
            li.list-punkt {{ description.punkte[ 0 ] }}
            li.list-punkt {{ description.punkte[ 1 ] }}
            li.list-punkt {{ description.punkte[ 2 ] }}
            li.list-punkt {{ description.punkte[ 3 ] }}
        .password-tab__password-settings
          .old-password
            Input( :params="{ ...passInputSettings, hauptTitel : 'Старый пароль' }" )
          .new-password
            Input( :params="{ ...passInputSettings, hauptTitel : 'Новый пароль' }" )
          .new-password.repeat
            Input( :params="{ ...passInputSettings, hauptTitel : 'Повторите пароль' }" )

</template>

<script>

  import Input from '@/components/UI/input';

  export default {

    components : {
      Input,
    },

    data ()
    {
      return {
        hauptTitel : 'Изменить пароль',

        description : {
          titel : 'Придумайте новый пароль с такими требованиями:',
          punkte : [
            'длина — не менее 8 символов;',
            'заглавные буквы;',
            'строчные буквы;',
            'цифры или специальные символы: %, #, $ и другие.',
          ],
        },

        passInputSettings : {
          type : 'password',
          hauptTitel : '',
          solo : true,
          hint : '',
          rules : [
            v => Boolean( v ) || 'Пароль не может быть пустым',
            v => v.length >= 8 || 'Не менее 8 символов',

            v => {
              const regexp = /([0-9])/;

              return !!regexp.test( v ) || 'Пароль должен содержать хотя бы одну цифру';
            },

            v => {
              const regexp = /([!@#$%^&*])/;

              return !!regexp.test( v ) || 'Пароль должен содержать хотя бы один специальный символ';
            },

            v => {
              const regexp = /([a-z])/;

              return !!regexp.test( v ) || 'Пароль должен содержать хотя бы одну строчную букву';
            },

            v => {
              const regexp = /([A-Z])/;

              return !!regexp.test( v ) || 'Пароль должен содержать хотя бы одну заглавную букву';
            },
          ],
        }
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

.password-tab__container
{
  /* OBJECTS STYLES START */
    .password-tab__wrapper
    {
      padding : 32px;
      background: #F6FBFF;
      border: 1px solid #E2E4E5;
      box-sizing: border-box;
      border-radius: 30px;

      .password-tab__header {
        margin-bottom: 24px;
      }

      .password-tab__body
      {
        .password-tab__wrapper__body
        {
          width: 533px;
        }
      }
    }

    .password-tab__haupt-titel
    {
      font-style: normal;
      font-weight: 600;
      font-size: 20px;
      line-height: 28px;
      color: #263043;
    }

    .password-tab__description
    {
      font-style: normal;
      font-weight: normal;
      font-size: 14px;
      line-height: 16px;
      color: #7A91A9;
      margin-bottom: 24px;

      .description__titel
      {
        font-size: 16px;
        line-height: 18px;
        color: #272833;
        margin-bottom: 20px;
      }

      .description__list
      {
        margin-left: 0;
        padding-left: 0;

        .list-punkt
        {
          list-style-type: none;
        }
      }
    }
  /* OBJECTS STYLES END */

  /* MIXINS STYLES START */
    .v-input__control
    {
      .v-input__slot
      {
        box-shadow: none !important;
        background: #FFFFFF !important;
        border: 1px solid #E2E4E5 !important;
        box-sizing: border-box !important;
        border-radius: 4px !important;

        .v-icon
        {
          color: #6F7782 !important;

          &.error--text
          {
            color : #FC3841 !important;
          }
        }
      }
    }
  /* MIXINS STYLES END */
}

</style>
