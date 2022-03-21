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
            :items="paymentTypeOptions"
            :title="titles.coverTitle"
            :value="user.settings.type_payment"
            @change="setters().onPaymentTypeSelectChange( { $event } )"
          )
        .bankcard-number( v-show="user.settings.type_payment === 'diekarte'" )
          Input.bankcard-number__input.mix-input(
            :params="{ ...textInputDefaultSettings, hauptTitel : titles.bankcard, value : getters().getCardNumber(), rules : rules.cardNumber }"
            @input="setters().setBankCarcNumber( { event : $event } )"
          )
        .inn-kpp-bic__group
          .inn
            Input.inn__input.mix-input(
              :params="{ ...textInputDefaultSettings, hauptTitel : titles.inn, value : user.settings.inn, rules : rules.inn }"
              @input_change="setters().setInn( { event : $event } )"
            )
          .kpp
            Input.kpp__input.mix-input(
              :params="{ ...textInputDefaultSettings, hauptTitel : titles.kpp, value : user.settings.kpp, rules : rules.kpp }"
              @input_change="setters().setKpp( { event : $event } )"
            )
          .bic
            Input.bic__input.mix-input(
              :params="{ ...textInputDefaultSettings, hauptTitel : titles.bic, value : user.settings.bik, rules : rules.bic }"
              @input_change="setters().setBic( { event : $event } )"
            )
        .payment_correspondent-account__group
          .payment-account
            Input.payment-account__input.mix-input(
              :params="{ ...textInputDefaultSettings, hauptTitel : titles.paymentAccount, value : user.settings.payment_account, rules : rules.paymentAccount }"
              @input_change="setters().setPaymentAccount( { event : $event } )"
            )
          .correspondent-account
            Input.correspondent-account__input.mix-input(
              :params="{ ...textInputDefaultSettings, hauptTitel : titles.correspondentAccount, value : user.settings.correspondent_account, rules : rules.correspondentAccount }"
              @input_change="setters().setCorrespondentAccount( { event : $event } )"
            )
        .bank
          Input.correspondent-account__input.mix-input(
            :params="{ ...textInputDefaultSettings, hauptTitel : titles.bank, value : user.settings.bank, rules : rules.bank }"
            @input_change="setters().setBank( { event : $event } )"
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
          bankcard : 'Номер карты',
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

        paymentTypeOptions : [
          {
            uuid : 'diekarte',
            name : 'банковская карта',
          },

          {
            uuid : 'bargeld',
            name : 'наличные',
          },
        ],

        rules : {
          cardNumber : [
            v => v.replaceAll( ' ', '' )?.length === 16 || 'Номер карты должен содержвать 16 цифр',

            v => {
              const regexp = /([!@#$%^&*])/;

              return !regexp.test( v.replaceAll( ' ', '' ) ) || 'Номер карты не должен содержать специальные символы';
            },

            v => {
              const regexp = /([a-zA-Z])/;

              return !regexp.test( v.replaceAll( ' ', '' ) ) || 'Номер карты не должен содержать буквы';
            },

            // v => {
            //   const regexp = /([A-Z])/;

            //   return !!regexp.test( v ) || 'Номер карты не должен содержать заглавные букву';
            // },
          ],
          inn : [
            ( inn ) => {
              console.log( inn );

              let result = false;

              if ( typeof inn === 'number' )
              {
                inn = inn.toString();
              }
              else if ( typeof inn !== 'string' )
              {
                inn = '';
              }

              if ( !inn.length )
              {
                return 'ИНН пуст';
              }
              else if ( /[^0-9]/.test( inn ) )
              {
                return 'ИНН может состоять только из цифр';
              }
              else if ( [ 10, 12 ].indexOf( inn.length ) === -1 )
              {
                return 'ИНН может состоять только из 10 или 12 цифр';
              }
              else
              {
                let checkDigit = function ( inn, coefficients )
                {
                  let n = 0;

                  for ( let i in coefficients )
                  {
                    n += coefficients[ i ] * inn[ i ];
                  }

                  return parseInt( n % 11 % 10 );
                };

                switch ( inn.length )
                {
                  case 10 :
                    let n10 = checkDigit( inn, [ 2, 4, 10, 3, 5, 9, 4, 6, 8 ] );

                    if ( n10 === parseInt( inn[ 9 ] ) )
                    {
                      result = true;
                    }
                  break;

                  case 12:
                    let n11 = checkDigit( inn, [ 7, 2, 4, 10, 3, 5, 9, 4, 6, 8 ] );
                    let n12 = checkDigit( inn, [ 3, 7, 2, 4, 10, 3, 5, 9, 4, 6, 8 ] );

                    if ( ( n11 === parseInt( inn[ 10 ] ) ) && ( n12 === parseInt( inn[ 11 ] ) ) )
                    {
                      result = true;
                    }
                  break;
                }

                if ( !result )
                {
                  return 'Неправильное контрольное число';
                }
              }

              return result;
            },
          ],

          kpp : [
            ( kpp ) => {
              let result = false;

              if ( typeof kpp === 'number' )
              {
                kpp = kpp.toString();
              }
              else if ( typeof kpp !== 'string' )
              {
                kpp = '';
              }

              if ( !kpp.length )
              {
                return 'КПП пуст';
              }
              else if ( kpp.length !== 9 )
              {
                return 'КПП может состоять только из 9 знаков (цифр или заглавных букв латинского алфавита от A до Z)';
              }
              else if ( !/^[0-9]{4}[0-9A-Z]{2}[0-9]{3}$/.test( kpp ) )
              {
                return 'Неправильный формат КПП';
              }
              else
              {
                result = true;
              }

              return result;
            },
          ],

          bic : [
            ( bik ) => {
              let result = false;

              if ( typeof bik === 'number' )
              {
                bik = bik.toString();
              }
              else if ( typeof bik !== 'string' )
              {
                bik = '';
              }

              if ( !bik.length )
              {
                return 'БИК пуст';
              }
              else if ( /[^0-9]/.test( bik ) )
              {
                return 'БИК может состоять только из цифр';
              }
              else if ( bik.length !== 9 )
              {
                return 'БИК может состоять только из 9 цифр';
              }
              else
              {
                result = true;
              }

              return result;
            },
          ],

          paymentAccount : [
            ( rs ) => {
              let result = false;

              if ( this.rules.bic[ 0 ]( this.user.settings.bik ) )
              {
                if ( typeof rs === 'number' )
                {
                  rs = rs.toString();
                }
                else if ( typeof rs !== 'string' )
                {
                  rs = '';
                }

                if ( !rs.length )
                {
                  return 'Р/С пуст';
                }
                else if ( /[^0-9]/.test( rs ) )
                {
                  return 'Р/С может состоять только из цифр';
                }
                else if ( rs.length !== 20 )
                {
                  return 'Р/С может состоять только из 20 цифр';
                }
                else
                {
                  let bikRs = this.user.settings.bik.toString().slice( -3 ) + rs;
                  let checksum = 0;
                  let coefficients = [ 7, 1, 3, 7, 1, 3, 7, 1, 3, 7, 1, 3, 7, 1, 3, 7, 1, 3, 7, 1, 3, 7, 1 ];

                  for ( let i in coefficients )
                  {
                    checksum += coefficients[ i ] * ( bikRs[ i ] % 10 );
                  }

                  if ( checksum % 10 === 0 )
                  {
                    result = true;
                  }
                  else
                  {
                    return 'Неправильное контрольное число';
                  }
                }
              }

              return result;
            }
          ],

          correspondentAccount : [
            ( ks ) => {
              let result = false;

              if ( this.rules.bic[ 0 ]( this.user.settings.bik ) )
              {
                if ( typeof ks === 'number' )
                {
                  ks = ks.toString();
                }
                else if ( typeof ks !== 'string' )
                {
                  ks = '';
                }

                if ( !ks.length )
                {
                  return 'К/С пуст';
                }
                else if ( /[^0-9]/.test( ks ) )
                {
                  return 'К/С может состоять только из цифр';
                }
                else if ( ks.length !== 20 )
                {
                  return 'К/С может состоять только из 20 цифр';
                }
                else
                {
                  let bikKs = '0' + this.user.settings.bik.toString().slice( 4, 6 ) + ks;
                  let checksum = 0;
                  let coefficients = [ 7, 1, 3, 7, 1, 3, 7, 1, 3, 7, 1, 3, 7, 1, 3, 7, 1, 3, 7, 1, 3, 7, 1 ];

                  for ( let i in coefficients )
                  {
                    checksum += coefficients[ i ] * ( bikKs[ i ] % 10 );
                  }

                  if ( checksum % 10 === 0 )
                  {
                    result = true;
                  }
                  else
                  {
                    return 'Неправильное контрольное число';
                  }
                }
              }
              return result;
            },
          ],

          bank : [
            v => v?.length || 'Наименование банка является обязательным к заполненнию',
          ],
        },

        error: {
          message: null
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
        return {
          getCardNumber : ( payload = {} ) => {
            return this.user.settings.bank_card ? this.user.settings.bank_card.match(/.{1,4}/g).join(' ') : '';
          }
        }
      },

      setters ()
      {
        return {
          onPaymentTypeSelectChange : ( payload = {} ) => {
            console.log( 'onPaymentTypeSelectChange', payload ); // DELETE

            this.setUserData( { settings : { ...this.user.settings, type_payment : payload.$event.ctx } } );
          },

          setBankCarcNumber : ( payload = {} ) => {
            console.log( 'setBankCarcNumber', payload ); // DELETE log muss weg

            this.setUserData( { settings : { ...this.user.settings, bank_card : payload.event.replaceAll( ' ', '' ) } } );
          },

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

          setBank : ( payload = {} ) => {
            console.log( 'setBank', payload ); // DELETE log muss weg

            this.setUserData( { settings : { ...this.user.settings, bank : payload.event } } );
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

    .bankcard-number
    {
      margin-bottom: 24px;

      .bankcard-number__input
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
      align-items: flex-start;
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
