<template lang="pug">
.login-page
  .wrapper
    .wrapper-x
      .wraper-y
        .login-container
          .wrapper
            .login-logo
              img.auth-logo( src="@/assets/img/auth-logo.png" )
            .auth-form
              .title-auth.text-center.mb-6 Войти в систему
              v-form(ref="form" @submit.prevent="signin")
                .mb-4
                  .mb-4.font-weight-medium Email или номер телефона
                  v-text-field.br-8(
                    v-model="login.phone_or_email"
                    :error="!!error"
                    outlined hide-details="auto")
                .mb-4
                  .mb-4.font-weight-medium Пароль
                  v-text-field.br-8(
                    v-model.trim="login.password"
                    :type="showPassword ? 'text' : 'password'"
                    :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
                    @click:append="showPassword = !showPassword"
                    outlined
                    hide-details="auto"
                    :error="!!error"
                    )
                .mb-2.error--text(v-if="error") {{ error }}
                button.signin-btn.d-flex.w-full( @click="signin" :disabled="loading")
                  .titel(v-show="!loading") Войти в систему
                  v-progress-circular(v-show="loading" indeterminate color="white" :size="30" )
            .password-forgot Забыли пароль?  Восстановить
</template>

<script>

  export default {

    layout: 'empty',
    components : {},

    data () {
      return {
        login: {
          phone_or_email: '',
          password: ''
        },
        loading: false,
        error: null,
        showPassword: false,
      }
    },

    methods : {
      async signin () {
        this.loading = true
        try {
          const response = await this.$auth.signin( this.login )
          localStorage.setItem( 'ruqi_auth_data', JSON.stringify( response.data.data ));
          this.$router.push( '/' );
        } catch (e) {
          this.error = e.response && e.response.data ? e.response.data.result.message : e.response
        }
        this.loading = false
      },
    }
  }
</script>

<style lang="scss" scoped>
.title-auth {
  font-style: normal;
  font-weight: bold;
  font-size: 32px;
  line-height: 125%;
  color: #263043;
}
.password-forgot {
  font-style: normal;
  font-weight: 600;
  font-size: 16px;
  line-height: 125%;
  color: #FFFFFF;
  text-align: center;
}

/* OBJECTS STYLES START */

  .login-page
  {
    position: fixed;
    height: 100%;
    width: 100%;
    background-color  : #006EDF;

    .wrapper,
    .wrapper-x,
    .wraper-y
    {
      width: 100%;
      height: 100%;
    }

    .wrapper-x
    {
      display: flex;
      flex-direction: row;
      flex-wrap: nowrap;
      justify-content: center;
      align-content: center;
      align-items: center;
    }

    .wraper-y
    {
      display: flex;
      flex-direction: column;
      flex-wrap: nowrap;
      align-content: center;
      justify-content: center;
      align-items: center;
    }
  }

  .login-container
  {
    .wrapper{}
  }

  .login-logo
  {
    text-align: center;
    margin-bottom: 40px;

    .auth-logo
    {
      width   : 216px;
      height  : 73px;
    }
  }

  .haupt-titel
  {
    text-align: center;
    margin-bottom: 24px;
  }

  .auth-form
  {
    width: 450px;
    background: #FFFFFF;
    box-shadow: 0px 8px 36px rgba(0, 0, 0, 0.16);
    border-radius: 16px;
    margin-bottom: 40px;
    padding: 24px 24px 40px 24px;
  }

  .signin-btn
  {
    background: #0082DE;
    border-radius: 8px;
    height: 50px;

    display: flex;
    flex-direction: column;
    flex-wrap: nowrap;
    align-content: center;
    justify-content: center;
    align-items: center;

    cursor: pointer;

    .titel
    {
      font-style: normal;
      font-weight: 600;
      font-size: 14px;
      line-height: 24px;
      color: #FFFFFF;
    }
  }

</style>
<style lang="scss">
.login-page {
  .v-text-field {
    .v-input__slot {
      min-height: 50px !important;
      .v-input__append-inner {
        margin-top: 13px !important;
      }
    }
  }
}
</style>
