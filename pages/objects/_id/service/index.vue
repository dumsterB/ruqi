<template lang="pug">

  .add-service
    v-row.d-flex.pa-5.align-center.action-row(no-gutters)
      v-col(cols="10")
        .header-dialog {{ title }}

      v-col.d-flex.justify-end(cols="2")
        v-btn.btn-blue.add(text height="48" outlined @click="")
          span сохранить изменения

        v-btn.add(text height="48" outlined @click="closeCreateEditForm")
          span закрыть




</template>

<script>
export default {
  data() {
    return {
      isAddService: '',
    }
  },
  computed: {
    title() {
      if (this.$route.params.ServiceId) {
        return 'Карточка услуги:';
      }
      else{
        return 'Добавить услугу'
      }
    },
  },
  methods: {
    closeCreateEditForm(){
      this.$router.go(-1);
    }
  },
  async created() {

    if (this.$route.params.ServiceId) {
      console.log('this.$route.params.SeviceId ---- ', this.$route.params.SeviceId);
    }

    if (this.uuid){
      this.$route.meta.title = 'Название услуги';
    }
    else{
      this.$route.meta.title = 'Добавить услугу';
    }



  },
}
</script>

<style lang="scss">

@import '/assets/scss/colors.scss';
.add-service{
  .header-dialog{
    font-weight: 600;
    font-size: 20px;
  }
}

</style>
