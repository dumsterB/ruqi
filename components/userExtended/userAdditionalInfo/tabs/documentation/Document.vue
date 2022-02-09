<template lang="pug">

.document
  .wrapper
    .header
      .titel {{ name }}
      v-divider
    .body
      .attachment-list
        Attachment

</template>

<script>

  import Attachment from "./Attachment";

  export default {

    props : {
      name : {
        type      : String,
        required  : true,
      },

      attachment : {
        type      : Array,
        required  : true,
      },
    },

    components : {
      Attachment,
    },

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



</style>
