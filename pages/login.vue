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
              .wrapper
                .haupt-titel
                  .txt Войти в систему
                .inputs-group
                  .input-line.email-num
                    .titel
                      .txt Email или номер телефона
                    .input
                      input.item()
                  .input-line.password
                    .titel
                      .txt Пароль
                    .input
                      input.item()
                .actions
                  .action
                    .signin-btn
                      .titel Войти в систему

            .password-forgot Забыли пароль?  Восстановить

</template>

<script>

  export default {

    components : {},

    data ()
    {
      return {}
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

<style lang="scss" scoped>

/* OBJECTS STYLES START */

  .login-page
  {
    position: fixed;
    height: 100%;
    width: 100%;

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

    .txt
    {
      font-style: normal;
      font-weight: bold;
      font-size: 32px;
      line-height: 125%;
      color: #263043;
    }
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

  .password-forgot
  {
    font-style: normal;
    font-weight: 600;
    font-size: 16px;
    line-height: 125%;
    color: #FFFFFF;
    text-align: center;
  }

  .input-line
  {
    margin-bottom: 16px;

    .titel
    {
      font-style: normal;
      font-weight: 600;
      font-size: 16px;
      line-height: 125%;
      margin-bottom: 16px;
    }

    .input
    {
      .item
      {
        width: 100%;
        height: 50px;
        border: 1px solid rgba(86, 103, 137, 0.26);
        box-sizing: border-box;
        border-radius: 8px;
      }
    }
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

/* OBJECTS STYLES END */

</style>
