<template>
  <div class="wrapp-alert">
    <v-alert
      :value="text"
      type="success"
      dismissible
      transition="fade-transition">
      Ваша заявка успешно создана.
    </v-alert>
  </div>
</template>

<script>
export default {
  props: ['type', 'text',],
  data() {
    return {}
  },
  methods: {
    openCreatePage(){
      this.$router.push(this.$route.name + '/create');
    },
  }
}
</script>


<style lang="scss" scoped>

@import '../assets/scss/colors';

.wrapp-alert{
  position: fixed;
  width: 100%;
  bottom: 0;
  left: 0;

  .v-alert{
    margin: 0;
  }
}

</style>
