<template lang="pug">

.personal-data__tab
  .wrapper
    .header
      .haupt-titel {{ hauptTitel }}
    .body
      .wrapper__body
        .haupt-data
          Input.mix-input.haupt-data__input(
            :params="{ ...textInputDefaultSettings, hauptTitel : inputTitles.firstname, value : user.firstname }"
            @input_change="setters().setFirstName( { event : $event } )"
          )
          Input.mix-input.haupt-data__input(
            :params="{ ...textInputDefaultSettings, hauptTitel : inputTitles.secondname, value : user.middlename }"
            @input_change="setters().setMiddleName( { event : $event } )"
          )
          Input.mix-input.haupt-data__input(
            :params="{ ...textInputDefaultSettings, hauptTitel : inputTitles.thirdname, value : user.lastname }"
            @input_change="setters().setLastName( { event : $event } )"
          )

        .birthday
          dateInputWithTitle.birthday__input( :title="inputTitles.birthday" )

        .sex
          .titel {{ inputTitles.sex }}
          v-radio-group(
            row
            :value="user.gender"
            @change="setters().setGender( { event : $event } )"
          )
            v-radio( value="male" label="Мужской" color="info" )
            v-radio( value="female" label="Женский" color="info" )
        .city
          Input.mix-input.city__input(
            :params="{ ...textInputDefaultSettings, hauptTitel : inputTitles.city, value : user.city }"
            @input_change="setters().setCity( { event : $event } )"
          )

        .contact-info
          Input.mix-input.contact-info__input.phone(
            :params="{ ...textInputDefaultSettings, hauptTitel : inputTitles.phone, value : user.settings.contact_phone }"
            @input_change="setters().setContactPhone( { event : $event } )"
          )
          Input.mix-input.contact-info__input(
            :params="{ ...textInputDefaultSettings, hauptTitel : inputTitles.email, value : user.settings.contact_email }"
            @input_change="setters().setContactEmail( { event : $event } )"
          )

</template>

<script>

  import { mapActions, mapGetters, } from 'vuex';
  import textInputWithTitle from '@/components/UI/textInputWithTitle';
  import dateInputWithTitle from '@/components/UI/dateInputWithTitle';
  import Input from '@/components/UI/input';

  export default {

    components : {
      textInputWithTitle,
      dateInputWithTitle,
      Input,
    },

    data ()
    {
      return {
        hauptTitel : 'Личные данные',

        inputTitles : {
          firstname : 'Имя',
          secondname : 'Фамилия',
          thirdname : 'Отчество',
          birthday : 'Дата рождения',
          sex : 'Пол',
          city : 'Город',
          phone : 'Телефон',
          email : 'Электронная почта',
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
      ...mapGetters( 'user', [ 'user', ] ),
    },

    methods : {
      ...mapActions( 'user', [ 'setUserData', ] ),

      getters ()
      {
        return {}
      },

      setters ()
      {
        return {
          setFirstName : ( payload = {} ) => {
            console.log( 'setFirstName', payload ); // DELETE log muss weg

            this.setUserData( { firstname : payload.event } );
          },

          setMiddleName : ( payload = {} ) => {
            console.log( 'setMiddleName', payload ); // DELETE log muss weg

            this.setUserData( { middlename : payload.event } );
          },

          setLastName : ( payload = {} ) => {
            console.log( 'setLastName', payload ); // DELETE log muss weg

            this.setUserData( { lastname : payload.event } );
          },

          setGender : ( payload = {} ) => {
            console.log( 'setGender', payload ); // DELETE log muss weg

            this.setUserData( { gender : payload.event } );
          },

          setCity : ( payload = {} ) => {
            console.log( 'setCity', payload ); // DELETE log muss weg

            this.setUserData( { city : payload.event } );
          },

          setContactPhone : ( payload = {} ) => {
            console.log( 'setContactPhone', payload ); // DELETE log muss weg

            this.setUserData( { settings : { ...this.user.settings, contact_phone : payload.event } } );
          },

          setContactEmail : ( payload = {} ) => {
            console.log( 'setContactEmail', payload ); // DELETE log muss weg

            this.setUserData( { settings : { ...this.user.settings, contact_email : payload.event } } );
          },
        }
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
    },

    mounted ()
    {
      console.log( 'this.user', this.user);
    },
  }

</script>

<style lang="scss">

.personal-data__tab
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

    .haupt-titel
    {
      font-style: normal;
      font-weight: 600;
      font-size: 20px;
      line-height: 28px;
      color: #263043;
    }

    .haupt-data
    {
      .haupt-data__input
      {
        margin-bottom: 24px;
      }
    }

    .birthday {
      margin-bottom: 24px;

      .birthday__input
      {
        width: 180px;

        fieldset
        {
          border-radius: 4px;
        }
      }
    }

    .sex
    {
      .titel
      {
        font-style: normal;
        font-weight: 600;
        font-size: 16px;
        line-height: 125%;
        color: #263043;
        margin-bottom: 16px;
      }
    }

    .city
    {
      margin-bottom: 24px;
    }

    .contact-info
    {
      display: grid;
      grid-template-columns: 40% 60%;

      .phone
      {
        margin-right: 24px;
      }
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
