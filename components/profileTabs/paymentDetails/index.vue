<template lang="pug">

.payment-details__tab
  .wrapper
    .header
      .haupt-titel {{ hauptTitel }}
      .description {{ description }}
    .body
      .wrapper__body
        .payment-type
          selectSingle.payment-type__list(
            :id="'payment-type'"
            :options="[ 'банковская карта', 'наличные', ]"
            :title="titles.coverTitle"
          )
        .inn-kpp-bic__group
          .inn
            Input.inn__input.mix-input(
              :params="{ ...textInputDefaultSettings, hauptTitel : titles.inn, value : user.settings.inn }"
              @input_change="setters().setInn( { event : $event } )"
            )
          .kpp
            Input.inn__input.mix-input(
              :params="{ ...textInputDefaultSettings, hauptTitel : titles.kpp, value : user.settings.kpp }"
              @input_change="setters().setKpp( { event : $event } )"
            )
          .bic
            Input.inn__input.mix-input(
              :params="{ ...textInputDefaultSettings, hauptTitel : titles.bic, value : user.settings.bik }"
              @input_change="setters().setBic( { event : $event } )"
            )
        .payment_correspondent-account__group
          .payment-account
            Input.payment-account__input.mix-input(
              :params="{ ...textInputDefaultSettings, hauptTitel : titles.paymentAccount, value : user.settings.payment_account }"
              @input_change="setters().setPaymentAccount( { event : $event } )"
            )
          .correspondent-account
            Input.correspondent-account__input.mix-input(
              :params="{ ...textInputDefaultSettings, hauptTitel : titles.correspondentAccount, value : user.settings.correspondent_account }"
              @input_change="setters().setCorrespondentAccount( { event : $event } )"
            )
        .bank
          selectSingle.bank__list(
            :id="'bank__list'"
            :options="[ 'Московский банк ПАО Сбербанк г. Москва', 'Sparkasse Wester Wald Sieg', ]"
            :title="titles.bank"
          )

</template>

<script>

  import { mapActions, mapGetters, } from 'vuex';
  import selectSingle from '@/components/UI/selectSingle';
  import Input from '@/components/UI/input';

  export default {

    components : {
      selectSingle,
      Input,
    },

    data ()
    {
      return {
        hauptTitel : 'Платежные данные',
        description : 'Краткое описание что сюда писать, например напишите в наименовании общедоступное название и примерное расположение.',
        titles : {
          coverTitle : 'Тип оплаты',
          inn : 'ИНН',
          kpp : 'КПП',
          bic : 'БИК',
          paymentAccount : 'Расчетный счет',
          correspondentAccount : 'Корреспондентский счёт',
          bank : 'Банк',
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
          setInn : ( payload = {} ) => {
            console.log( 'setInn', payload ); // DELETE log muss weg

            this.setUserData( { settings : { ...this.user.settings, inn : payload.event } } );
          },

          setKpp : ( payload = {} ) => {
            console.log( 'setKpp', payload ); // DELETE log muss weg

            this.setUserData( { settings : { ...this.user.settings, kpp : payload.event } } );
          },

          setBic : ( payload = {} ) => {
            console.log( 'setBic', payload ); // DELETE log muss weg

            this.setUserData( { settings : { ...this.user.settings, bik : payload.event } } );
          },

          setPaymentAccount : ( payload = {} ) => {
            console.log( 'setPaymentAccount', payload ); // DELETE log muss weg

            this.setUserData( { settings : { ...this.user.settings, payment_account : payload.event } } );
          },

          setCorrespondentAccount : ( payload = {} ) => {
            console.log( 'setCorrespondentAccount', payload ); // DELETE log muss weg

            this.setUserData( { settings : { ...this.user.settings, correspondent_account : payload.event } } );
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
    }

  }

</script>

<style lang="scss">

.payment-details__tab
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
        margin-bottom: 32px;
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
      margin-bottom: 16px;
    }

    .description
    {
      font-style: normal;
      font-weight: normal;
      font-size: 14px;
      line-height: 16px;
      color: #7A91A9;
    }

    .payment-type
    {
      margin-bottom: 24px;

      .payment-type__list
      {
        width: 416px;

        fieldset
        {
          background: #FFFFFF;
          border: 1px solid #E2E4E5;
          box-sizing: border-box;
          border-radius: 4px !important;
        }
      }
    }

    .inn-kpp-bic__group
    {
      display: flex;
      flex-direction: row;
      flex-wrap: nowrap;
      align-content: center;
      justify-content: flex-start;
      align-items: center;
      margin-bottom: 24px;

      .inn, .kpp, .bic
      {
        width: 115px;
      }

      .kpp, .bic
      {
        margin-left: 24px;
      }
    }

    .payment_correspondent-account__group
    {
      display: flex;
      flex-direction: row;
      flex-wrap: nowrap;
      align-content: center;
      justify-content: flex-start;
      align-items: center;
      margin-bottom: 24px;

      .payment-account, .correspondent-account
      {
        width: 197px;
      }

      .correspondent-account
      {
        margin-left: 24px;
      }
    }

    .bank
    {
      .bank__list
      {
        fieldset
        {
          background: #FFFFFF;
          border: 1px solid #E2E4E5;
          box-sizing: border-box;
          border-radius: 4px !important;
        }
      }
    }
  /* OBJECTS STYLES END */

  /* MIXINS STYLES START */
    .v-select__selection.v-select__selection--comma, .v-icon.notranslate.mdi
    {
      color : #000000!important;
    }

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
