<template lang="pug">

.input-ui__container
  .input-ui__wrapper
    .input-ui__header( v-if="params.hauptTitel" )
      .input-ui__wrapper-header
        .input-ui__haupt-titel {{ params.hauptTitel }}
    .input-ui__body
      .input-ui__wrapper-body
        v-text-field(
          :value="params.value"
          :solo="params.solo"
          :append-icon="getters().getAppendIcon( { params } )"
          :rules="[ ...( params.rules || [] ) ]"
          :type="getters().getType( { params } )"
          name="input-10-1"
          :label="params.label"
          :hint="params.hint"
          :counter="params.counter"
          @click:append="show = !show"
          @change="handlers().onInputChange( $event )"
        )

</template>

<script>

  export default {

    props : {
      /**
       * The following component parameters are passed to this object
       * {
       *    @param { string-enum }  type : [ 'text', 'password', 'number', ]
       *    @param { string }       hauptTitel
       *    @param { boolean }      solo
       * }
       */
      params : {
        type : Object,
        required : true
      }
    },

    components : {},

    data ()
    {
      return {
        show: false,
        password: '',
        type : {
          pass : 'password',
        },
      }
    },

    methods : {
      getters ()
      {
        return {
          getAppendIcon : ( payload = {} ) => {
            console.log( 'getAppendIcon', payload );

            switch ( payload.params.type )
            {
              case this.type.pass :
              return this.show ? 'mdi-eye' : 'mdi-eye-off';

              default :
              return '';
            }
          },

          getType : ( payload = {} ) => {
            console.log( 'getType', payload );

            switch ( payload.params.type )
            {
              case this.type.pass :
              return this.show ? 'text' : 'password';

              default :
              return 'text';
            }
          },
        }
      },

      setters ()
      {
        return {}
      },

      handlers ()
      {
        return {
          onInputChange : ( payload = {} ) => {
            this.$emit( 'input_change', payload );
          },
        }
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

.input-ui__container
{
  /* OBJECTS STYLES START */
    .input-ui__haupt-titel
    {
      font-style: normal;
      font-weight: 600;
      font-size: 16px;
      line-height: 125%;
      color: #263043;
      margin-bottom: 16px;
    }
  /* OBJECTS STYLES END */
}

</style>
