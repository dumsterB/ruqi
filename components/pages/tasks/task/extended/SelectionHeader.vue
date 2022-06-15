<template lang="pug">
  .selection-header
    v-app-bar(
      app
      elevation="0"
      height="84"
      color="transparent"
      class="header-content-crt_exd justify-end align-end d-flex"
    )
      v-row.d-flex.align-center.action-row(no-gutters)
        v-col.d-flex.justify-end(cols="12")

          v-btn.add(text height="48" outlined @click="onBackToAppClick")
            span НАЗАД К ЗАЯВКЕ


</template>

<script>

export default {
  props: {
    status_alias: {
      type: String,
      default: '',
    },
  },
  data() {
    return {

    }
  },
  computed : {
    contractors () {

    },
  },
  methods: {

    onBackToAppClick(){
      this.$emit( 'onBackToAppClick' );
    }
  },
  async created() {

  }
}


</script>

<style lang="scss">

.selection-header{

  .v-toolbar__content{
    padding: 0 24px;
  }

}

</style>
