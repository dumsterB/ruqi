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

    }
  },
  computed: {
    title() {
      if (this.$route.params.VaсancyId) {
        return 'Карточка вакансии:';
      }
      else{
        return 'Добавить вакансию'
      }
    },
  },
  methods: {
    closeCreateEditForm(){
      this.$router.go(-1);
    }
  },
  async created() {

    if (this.$route.params.VaсancyId) {
      console.log('this.$route.params.VaсancyId ---- ', this.$route.params.VaсancyId);
    }

    if (this.uuid){
      this.$route.meta.title = 'Название вакансии';
    }
    else{
      this.$route.meta.title = 'Добавить вакансию';
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
