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
            textInputWithTitle.inn__input( :title="titles.inn" )
          .kpp
            textInputWithTitle.inn__input( :title="titles.kpp" )
          .bic
            textInputWithTitle.inn__input( :title="titles.bic" )
        .payment_correspondent-account__group
          .payment-account
            textInputWithTitle.payment-account__input( :title="titles.paymentAccount" )
          .correspondent-account
            textInputWithTitle.correspondent-account__input( :title="titles.correspondentAccount" )
        .bank
          selectSingle.bank__list(
            :id="'bank__list'"
            :options="[ 'Московский банк ПАО Сбербанк г. Москва', 'Sparkasse Wester Wald Sieg', ]"
            :title="titles.bank"
          )

</template>

<script>

  import selectSingle from '@/components/UI/selectSingle';
  import textInputWithTitle from '@/components/UI/textInputWithTitle';

  export default {

    components : {
      selectSingle,
      textInputWithTitle,
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
  /* MIXINS STYLES END */
}

</style>
