<template lang="pug">

.select-single
  .select-single_titel( v-if="title" ) {{ title }}
  v-select(
    v-model="select"
    :id="id"
    :items="options"
    :rules="[v => !!v || 'Выберите вариант']"
    required
    single-line
    outlined
    filled
    @input="$emit('input', select)"
    hide-details="true"
    :item-color="'#000000'"
  )

</template>

<script>
export default {
  props : {
    'id' : {
      type : String,
      required : true,
    },

    'title' : {
      type : String,
      default : "",
    },

    'options' : {
      type : Array,
      required : true,
    },

    'value' : {
      type : String,
      default : "",
    },
  },

  computed: {},

  data ()
  {
    return {
      select: null,
    }
  },

  methods: {},

  created ()
  {
    if ( this.value )
    {
      this.select = this.value;
    }
    else
    {
      this.select = this.options[ 0 ];
    }

    this.$emit( 'input', this.select );
  },
}
</script>

<style lang="scss">

.select-single
{
  /* OBJECTS STYLES START */
    .select-single_titel
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
