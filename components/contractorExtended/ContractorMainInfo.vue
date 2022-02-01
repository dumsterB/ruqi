<template>
  <div class="contractor-main-info">
    <div class="wrapper">
      <div class="header">
        <div class="contractor">
          <div class="view">
            <ContractorAvatar
              :first_name="contractor.firstname"
              :last_name="contractor.lastname"
            />

            <ContractorRating class="contractor-rating" />
          </div>

          <div class="bio">
            <div class="name">
              {{ `${contractor.firstname} ${contractor.lastname}` }}
            </div>

            <div class="id">
              {{ `ID ${contractor.number}` }}
            </div>

            <div class="age-and-city">
              <div class="age">
                37 лет
              </div>

              <div class="city">
                Краснодар
              </div>
            </div>

            <div class="registration-date">
              Зарегистрирован 27 января 2019
            </div>
          </div>

          <div class="doc-сonfirm-status">
            <div class="confirmed">
              <img src="../../assets/img/doc-status-success.svg" alt="Документы подтверждены" class="logo">

              <span class="title-txt">
                Документы подтверждены
              </span>
            </div>

            <div class="not-confirmed">
              <img src="../../assets/img/doc-status-success.svg" alt="Документы не подтверждены" class="logo">

              <span class="title-txt">
                Документы не подтверждены
              </span>
            </div>
          </div>

          <div class="connect-methods">
            <div class="wrapper">
              <div class="call">
                <img src="../../assets/img/call.svg" alt="Позвонить" class="logo">
              </div>

              <div class="email">
                <img src="../../assets/img/email.svg" alt="Отправить письмо" class="logo">
              </div>

              <div class="chat">
                <img src="../../assets/img/chat.svg" alt="Написать в чат" class="logo">
              </div>
            </div>
          </div>
        </div>


      </div>

      <div class="body">
        <v-divider></v-divider>

        <div class="specialization"></div>

        <div class="contact-info"></div>
      </div>

      <div class="footer">
        <div class="actions-panel">
          <div class="action-edit"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

  import { mapState, mapActions, mapGetters, mapMutations } from 'vuex';

  export default {
    computed : {
      ...mapGetters( 'contractors', [ 'contractor', ] ),
    },
  }

</script>

<style lang="scss" scoped>

/* OBJECTS STYLES START */
  .contractor-main-info
  {
    background-color  : #FFFFFF;
    border            : 1px solid #E0E0E0;
    box-sizing        : border-box;
    border-radius     : 30px;

    .wrapper
    {
      padding: 32px 24px 24px 24px;

      .header
      {
        .contractor
        {
          .view, .bio, .doc-сonfirm-status, .connect-methods
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

          .doc-сonfirm-status
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
    }
  }

  .contractor-rating
  {
    margin-top  : -15px;
    z-index     : 2;
  }
/* OBJECTS STYLES END */

</style>
