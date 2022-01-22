<template>
  <div class="ruqi">
    <v-app app>
      <v-main>
        <v-container>
          <v-navigation-drawer width="98" color="blue" app>
            <div class="wrapper-main-menu d-flex flex-column justify-space-between">
              <Navbar/>
              <Settingsnav/>
            </div>
          </v-navigation-drawer>
          <div>
            <Topbar/>
            <div class="content">
              <Nuxt/>
              <Alert :requestSuccess="requestSuccess"/>
            </div>
          </div>
        </v-container>
      </v-main>
    </v-app>
  </div>
</template>

<script>
export default {
  name: "default",
  computed:{
    requestSuccess() {
      return this.$store.getters['response/requestSuccess'];
    },
  }
}
</script>

<style lang="scss">
  @import url('https://fonts.googleapis.com/css2?family=Source+Sans+Pro:ital,wght@0,200;0,300;0,400;0,600;0,700;0,900;1,200;1,300;1,400;1,600;1,700;1,900&display=swap');
  @import '/assets/scss/colors.scss';

  html {
    font-family: 'Source Sans Pro', sans-serif;
    font-size: 16px;
    color: $grey;

    .v-application {
      font-family: 'Source Sans Pro', sans-serif;
    }

    .wrapper-main-menu {
      height: 100%;
    }

    .content{
      position: relative;
      z-index: 100;
    }
  }
</style>
