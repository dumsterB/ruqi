<template lang="pug">
.ruqi
  v-app(app)
    v-main
      v-container
        v-navigation-drawer(v-if="!isLoginPage()" width="98" color="blue" app)
          div(class="wrapper-main-menu d-flex flex-column justify-space-between")
            Navbar
            Settingsnav
        div
          Topbar(v-if="!isLoginPage()")
          .content
            Nuxt
            Alert(:requestSuccess="requestSuccess")
</template>

<script>
import { mapActions } from "vuex";
import Topbar from '@/components/Topbar/index.vue';

export default {
  name: "default",
  components: {
    Topbar,
  },

  data() {
    return {
      timerRuqiId: null,
    };
  },

  computed: {
    requestSuccess() {
      return this.$store.getters["response/requestSuccess"];
    },
    authorized() {
      return this.$store.getters["user/userAuthorizationStatus"];
    },
  },

  watch: {
    $route: {
      handler(to, from) {
        const ruqi = document.querySelector(".ruqi");

        if (!ruqi) {
          this.timerRuqiId = setInterval(
            () => {
              // console.log(this);

              const ruqi = document.querySelector(".ruqi");

              if (ruqi && to.name) {
                ruqi.classList.add("page--" + to.name.toLowerCase());

                clearInterval(this.timerRuqiId);
              }
            },

            10
          );

          return;
        }

        if (from !== undefined) {
          //console.log('page--' + from.name);
          //console.log(from.name);

          ruqi.classList.remove("page--" + from.name.toLowerCase());
        }

        ruqi.classList.add("page--" + to.name.toLowerCase());

        // const body = document.getElementsByTagName('body')[0];
        // if (from !== undefined) {
        //   body.classList.remove();
        // }
        // body.classList.add('page--' + to.name.toLowerCase());

        //this.initBreadcrumbs(this.$route.fullPath);
      },

      immediate: true,
    },
  },

  methods: {
    ...mapActions("breadcrumbs", [
      'initBreadcrumbs',
    ]),

    /* HELPERS */
    isLoginPage() {
      return this.$route.name === "signin";
    },
  },

  async created() {
    await this.$socket.setQuery({
      ...this.$socket.query,
      token: JSON.parse(localStorage.getItem('ruqi_auth_data')).token,
    });
    this.$socket.connect();
  },

  mounted() {
    //this.initBreadcrumbs(this.$route.fullPath);
  },
};
</script>

<style lang="scss">
@import url("https://fonts.googleapis.com/css2?family=Source+Sans+Pro:ital,wght@0,200;0,300;0,400;0,600;0,700;0,900;1,200;1,300;1,400;1,600;1,700;1,900&display=swap");
@import "/assets/scss/colors.scss";

html {
  font-family: "Source Sans Pro", sans-serif;
  font-size: 16px;
  color: $grey;

  .v-application {
    font-family: "Source Sans Pro", sans-serif;
  }

  .wrapper-main-menu {
    height: 100%;
  }

  .content {
    position: relative;
    z-index: 50;
  }
}

/* OBJECTS STYLES START */
.page--signin {
  padding: 0;
  margin: 0;
  // background-color  : #006EDF;

  .v-application {
    // background-color  : #006EDF;

    .container {
      padding: 0;
      margin: 0;
    }
  }
}

/* OBJECTS STYLES END */

/* MIXINS STYLES START */
.page--performers-id,
.page--employees-id {
  background-color: #f2faff;

  #app {
    background-color: #f2faff;
  }
}

/* MIXINS STYLES END */
</style>
