<template lang="pug">
  .login-page.sms
    .wrapper
      .wrapper-x
        .wraper-y
          .login-container
            .wrapper
              .login-logo
                img.auth-logo( src="@/assets/img/auth-logo.png" )
              .auth-form
                .wrapper
                  .haupt-titel
                    .txt Восстановление пароля

                    p.text-grey Мы отправили SMS с кодом <br /> на номер 8(888)888 88 88
                    .input-line.email-num
                      .titel
                        v-otp-input.item.mt-4(  length='4' v-model='sms'   :class="{ 'error-by-signin' : error }" )
                  .actions
                    .action
                      .signin-btn( @click="handlers().signin()" )
                        .titel.btn-text ПРОДОЛЖИТЬ
                      .send-again( @click="handlers().signin()" )
                        .titel.btn-again Отправить повторно через 30 сек

</template>

<script>
export default {
  layout: "empty",
  components: {},

  data() {
    return {
      sms:'',
      error: false,
    };
  },

  methods: {
    getters() {
      return {};
    },

    setters() {
      return {};
    },

    handlers() {
      return {
        signin: async () => {},
      };
    },
    forgot(){
      this.$router.push({name: '/recover/phone'})
    },

    helpers() {
      return {};
    },

    init() {},

    bindActions() {},
  },
};
</script>

<style lang="scss" >
/* OBJECTS STYLES START */

.login-page {
  position: fixed;
  height: 100%;
  width: 100%;
  background-color: #006edf;

  .wrapper,
  .wrapper-x,
  .wraper-y {
    width: 100%;
    height: 100%;
  }

  .wrapper-x {
    display: flex;
    flex-direction: row;
    flex-wrap: nowrap;
    justify-content: center;
    align-content: center;
    align-items: center;
  }

  .wraper-y {
    display: flex;
    flex-direction: column;
    flex-wrap: nowrap;
    align-content: center;
    justify-content: center;
    align-items: center;
  }
}

.login-container {
  .wrapper {
  }
}

.login-logo {
  text-align: center;
  margin-bottom: 40px;

  .auth-logo {
    width: 216px;
    height: 73px;
  }
}

.haupt-titel {
  text-align: center;
  margin-bottom: 24px;

  .txt {
    font-style: normal;
    font-weight: bold;
    font-size: 32px;
    line-height: 125%;
    color: #263043;
  }
}

.auth-form {
  width: 450px;
  background: #ffffff;
  box-shadow: 0px 8px 36px rgba(0, 0, 0, 0.16);
  border-radius: 16px;
  margin-bottom: 40px;
  padding: 24px 24px 40px 24px;
}

.password-forgot {
  font-style: normal;
  font-weight: 600;
  font-size: 16px;
  cursor: pointer;
  line-height: 125%;
  color: #ffffff;
  text-align: center;
}

.input-line {
  margin-bottom: 16px;

  .titel {
    font-style: normal;
    font-weight: 600;
    font-size: 16px;
    line-height: 125%;
    margin-bottom: 16px;
  }

  .input {
    .item {
      height: 50px;
      margin-top: 10px;
      border: 1px solid lightgrey!important;
      box-sizing: border-box;
      border-radius: 8px;
      padding-left: 16px;
    }
  }
}

.signin-btn {
  background: #0082de;
  border-radius: 8px;
  height: 50px;
  display: flex;
  flex-direction: column;
  flex-wrap: nowrap;
  align-content: center;
  justify-content: center;
  align-items: center;

  cursor: pointer;

  .titel {
    font-style: normal;
    font-weight: 600;
    font-size: 14px;
    line-height: 24px;
    color: #ffffff;
  }
}
.send-again{
  background: white;
  border-radius: 8px;
  height: 50px;
  border: 1px solid #7A91A9;
  margin-top: 15px;
  display: flex;
  flex-direction: column;
  flex-wrap: nowrap;
  align-content: center;
  justify-content: center;
  align-items: center;

  cursor: pointer;
}
/* OBJECTS STYLES END */

/* MIXINS STYLES START */
.error-by-signin {
  border-color: red !important;
}
.text-grey{
  color: #7A91A9;
  font-size: 16px;
  text-align: center;
}
.btn-text{
  text-transform: uppercase;
  align-items: center;
  text-align: center;
  letter-spacing: 0.04em;
  font-weight: 700;
  font-size: 14px;
  line-height: 24px;
}
.btn-again{
  color: #7A91A9;
  text-transform: uppercase;
  align-items: center;
  text-align: center;
  letter-spacing: 0.04em;
  font-weight: 700;
  font-size: 14px;
  line-height: 24px;
}
.sms .theme--light.v-input input, .theme--light.v-input textarea{
  color: #0082DE!important;
  font-size: 45px;
}
/* MIXINS STYLES END */
</style>
