<template lang="pug">
.user-main-info
  .wrapper
    .header
      .user
        .view
          ContractorAvatar( :first_name="user.firstname" :last_name="user.lastname" )
          ContractorRating( user-rating )

        .bio
          .name {{ `${user.firstname} ${user.lastname}` }}

          .id( v-if="helpers().isContractor( { user : user_type } )" ) {{ `ID ${user.number}` }}

          .age-and-city( v-if="helpers().isContractor( { user : user_type } )" )
            .age 37 лет
            .city Краснодар

          .registration-date {{ `Зарегистрирован ${getters().getRegDate( { created_at : user.created_at } )}` }}

        .doc-confirm-status
          .confirmed
            img.logo( src="../../assets/img/doc-status-success.svg" alt="Документы подтверждены" )
            span.title-txt Документы подтверждены

          .not-confirmed
            img.logo( src="../../assets/img/doc-status-success.svg" alt="Документы не подтверждены" )
            span.title-txt Документы не подтверждены

        .connect-methods
          .wrapper
            .call
              img.logo( src="../../assets/img/call.svg" alt="Позвонить" )

            .email
              img.logo( src="../../assets/img/email.svg" alt="Отправить письмо" )

            .chat
              img.logo( src="../../assets/img/chat.svg" alt="Написать в чат" )

    .body
      v-divider

      .parameter.mix-specializations
        .p-name.mix-specialization-name Специализация

        .p-value
          .specialization-list
            .specialization-item( v-for="specialization in user.specializations" :key="specialization-uuid" )
              .s-text {{ specialization.name }}

      v-divider

      .contact-info
        .parameter
          .p-name Номер телефона

          .p-value {{ user.phone }}

        .parameter
          .p-name Whatsapp

          .p-value {{ user.whatsapp }}

        .parameter
          .p-name Email

          .p-value {{ user.email }}

    .footer
      .actions-panel
        .action-edit
          .action-edit-txt Редактировать профиль
</template>

<script>

  import { mapState, mapActions, mapGetters, mapMutations } from 'vuex';
  import { CONTRACTOR, EMPLOYEE }                           from '@/constants/';

  export default {
    props : {
      user_type : {
        type      : String,
        required  : true,
      },
    },

    data ()
    {
      return {}
    },

    computed : {
      user ()
      {
        switch ( this.user_type )
        {
          case CONTRACTOR :
          return this.$store.getters[ 'contractors/contractor' ];

          case EMPLOYEE :
          return this.$store.getters[ 'employee_id/employee_id' ];

          default :
          return {};
        }
      },
    },

    methods : {
      getters ()
      {
        return {
          /**
           *
           * @param { object } params
           * {
           *    created_at : "2021-12-15T11:39:40.000000Z",
           * }
           */
          getRegDate : ( params = {} ) => {
            console.debug( 'getRegDate' );

            if ( !params.created_at )
            {
              return '';
            }

            console.debug( params.created_at.split( 'T' )[ 0 ].split( '-' ) );

            let splitedCreat_at = params.created_at.split( 'T' )[ 0 ].split( '-' );

            return `${ splitedCreat_at[ 2 ] } ${ this.helpers().parseMonth( { month : splitedCreat_at[ 1 ] } ) } ${ splitedCreat_at[ 0 ] }`;
          },
        }
      },

      helpers ()
      {
        return {

          /**
           *
           * @param { object } params
           * {
           *    month : "12" || "01" || "09",
           * }
           */
          parseMonth : ( params = {} ) => {
            switch ( params.month )
            {
              case '01' :
              return 'января';

              case '02' :
              return 'февраля';

              case '03' :
              return 'марта';

              case '04' :
              return 'апреля';

              case '05' :
              return 'мая';

              case '06' :
              return 'июня';

              case '07' :
              return 'июля';

              case '08' :
              return 'августа';

              case '09' :
              return 'сентября';

              case '10' :
              return 'октября';

              case '11' :
              return 'ноября';

              case '12' :
              return 'декабря';

              default :
              return '';
            }
          },

          isContractor : ( params = {} ) => {
            console.debug( 'helpers : isContractor', params, CONTRACTOR );

            switch ( params.user )
            {
              case CONTRACTOR :
                console.debug( 'CONTRACTOR' );
              return true;

              default :
                console.debug( 'DEFAULT' );
              return false;
            }
          },
        }
      },
    },
  }

</script>

<style lang="scss" scoped>

/* OBJECTS STYLES START */
  .user-main-info
  {
    background-color  : #FFFFFF;
    border            : 1px solid #E0E0E0;
    box-sizing        : border-box;
    border-radius     : 30px;
    max-width         : 330px;

    .wrapper
    {
      padding: 32px 24px 24px 24px;

      .header
      {
        .user
        {
          .view, .bio, .connect-methods, .doc-confirm-status
          {
            display         : flex;
            flex-direction  : column;
            flex-wrap       : nowrap;
            align-content   : center;
            justify-content : center;
            align-items     : center;
          }

          .view
          {
            margin-bottom : 24px;
          }

          .bio
          {
            margin-bottom : 24px;

            .name
            {
              font-weight   : 600;
              font-size     : 26px;
              line-height   : 125%;
              color         : #263043;
              margin-bottom : 8px;
            }

            .id
            {
              font-weight   : 600;
              font-size     : 16px;
              line-height   : 28px;
              color         : #263043;
              margin-bottom : 16px;
            }

            .age-and-city
            {
              display         : flex;
              flex-direction  : row;
              flex-wrap       : nowrap;
              align-content   : center;
              justify-content : center;
              align-items     : center;

              font-weight : 600;
              font-size   : 16px;
              line-height : 125%;
              color       : #000000;

              margin-bottom : 8px;

              .city
              {
                margin-left : 24px;
              }
            }

            .registration-date
            {
              font-weight : normal;
              font-size   : 14px;
              line-height : 125%;
              color       : #000000;
            }
          }

          .doc-confirm-status
          {
            font-size   : 14px;
            line-height : 28px;
            color       : #263043;

            margin-bottom : 31px;

            .confirmed, .not-confirmed
            {
              display         : flex;
              flex-direction  : row;
              flex-wrap       : nowrap;
              align-content   : center;
              justify-content : flex-start;
              align-items     : center;
            }

            .title-txt
            {
              margin-left : 10px;
            }
          }

          .connect-methods
          {
            margin-bottom : 24px;

            .wrapper
            {
              display         : flex;
              flex-direction  : row;
              flex-wrap       : nowrap;
              align-content   : center;
              justify-content : center;
              align-items     : center;

              .logo
              {
                width   : 24px;
                height  : 24px;
              }

              .call, .email, .chat
              {
                width: 40px;
                height: 40px;
                display: flex;
                flex-wrap: nowrap;
                align-content: center;
                justify-content: center;
                align-items: center;
              }

              .email
              {
                margin  : 0px 32px;
              }
            }
          }
        }
      }

      .body
      {
        margin-bottom : 73px;

        .contact-info
        {
          margin-top  : 24px;
        }
      }

      .footer
      {
        .actions-panel
        {
          .action-edit
          {
            display         : flex;
            flex-direction  : column;
            align-items     : center;

            width   : 282px;
            height  : 40px;
            left    : 24px;
            top     : 850px;
            padding : 12px 16px;

            background    : #0082DE;
            border-radius : 8px;
            cursor        : pointer;

            .action-edit-txt
            {
              font-weight     : bold;
              font-size       : 14px;
              line-height     : 125%;
              text-transform  : uppercase;
              color           : #FFFFFF;
            }
          }
        }
      }
    }
  }

  .user-rating
  {
    margin-top  : -15px;
    z-index     : 2;
  }

  .parameter
  {
    font-weight   : 600;
    font-size     : 16px;
    line-height   : 125%;
    margin-bottom : 24px;

    &:last-child
    {
      margin-bottom : 0;
    }

    .p-name
    {
      color         : #7A91A9;
      margin-bottom : 8px;
    }

    .p-value
    {
      color : #263043;
    }
  }

  .specialization-list
  {
    display         : flex;
    flex-direction  : row;
    flex-wrap       : wrap;
    align-content   : center;
    justify-content : flex-start;
    align-items     : center;

    .specialization-item
    {
      padding       : 6px 16px;
      margin-right  : 8px;
      margin-bottom : 8px;
      background    : #F1F9FF;
      border-radius : 19px;

      &:last-child
      {
        margin-right : 0;
      }

      .s-text
      {
        font-weight     : 600;
        font-size       : 12px;
        line-height     : 125%;
        letter-spacing  : 0.02em;
        text-transform  : uppercase;
        color           : #0082DE;
      }
    }
  }
/* OBJECTS STYLES END */

/* MIXINS STYLES START */
  .mix-specializations
  {
    margin  : 24px 0px;;
  }

  .mix-specialization-name
  {
    margin-bottom : 16px !important;
  }
/* MIXINS STYLES END */

</style>
