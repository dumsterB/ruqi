<template lang="pug">

.personal-data__tab
  .wrapper
    .header
      .haupt-titel {{ hauptTitel }}
    .body
      .wrapper__body
        .haupt-data
          textInputWithTitle.haupt-data__input( :title="inputTitles.firstname" )
          textInputWithTitle.haupt-data__input( :title="inputTitles.secondname" )
          textInputWithTitle.haupt-data__input( :title="inputTitles.thirdname" )

        .birthday
          dateInputWithTitle.birthday__input( :title="inputTitles.birthday" )

        .sex
          .titel {{ inputTitles.sex }}
          v-radio-group( v-model="row" row )
            v-radio( value="male" label="Мужской" color="info" )
            v-radio( value="female" label="Женский" color="info" )
        .city
          textInputWithTitle.city__input( :title="inputTitles.city" )

        .contact-info
          textInputWithTitle.contact-info__input.phone( :title="inputTitles.phone" )
          textInputWithTitle.contact-info__input( :title="inputTitles.email" )

</template>

<script>

  import textInputWithTitle from '@/components/UI/textInputWithTitle';
  import dateInputWithTitle from '@/components/UI/dateInputWithTitle';

  export default {

    components : {
      textInputWithTitle,
      dateInputWithTitle,
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
}

</style>
