<template lang="pug">
  .rq-user-menu
    v-menu(
      bottom
      min-width="280px"
      rounded="10"
      offset-y
      nudge-bottom="10"
      z-index="1000"
    )
      template(v-slot:activator="{on}")
        v-btn(text v-on="on" height="56" class="mr-3")
          v-col(class="pl-0")
            v-avatar(color="#D6D0FE" size="32")
              span(class="white--text" v-if="user.firstname") {{user.firstname.substr(0, 1)}}
              span(class="white--text" v-if="user.lastname") {{user.lastname.substr(0, 1)}}

          v-col(class="px-0")
            p(class="user_name") {{ user.firstname }} {{ user.lastname }}

      v-card.cpheu-profile-card
        .cpheu-profile-card__item
          v-switch(
            inset
            label="Доступен для работ"
            v-model="value"
            @click="avaibilityHandler"
          )

        v-divider

        v-btn.cpheu-profile-card__item(text)
          v-icon.cpheu-profile-card__item__logo(color="#BBBBBB") mdi-account-circle-outline
          .cpheu-profile-card__item__title(@click="$router.push('/profile')") Мой профиль

        v-btn.cpheu-profile-card__item(text)
          v-icon.cpheu-profile-card__item__logo(color="#BBBBBB") mdi-exit-to-app
          .cpheu-profile-card__item__title(@click="logout") Выйти

    v-badge(bordered color="error" content="25" overlap)
      v-btn(text style="padding: 0 !important;margin: 0 !important;width: auto;height: auto;min-width: unset;")
        img(src="/img/ico_mess.svg" alt="Сообщения")

    v-badge(bordered color="error" overlap style="margin-left: 20px;")
      v-btn(text @click="$router.push('/notification')" style="padding: 0 !important;margin: 0 !important;width: auto;height: auto;min-width: unset;")
        img(src="/img/ico_bell.svg" alt="Оповещение")
</template>

<script>
import {mapActions, mapMutations} from "vuex";

export default {
  components: {},
  data() {
    return {
      value: null,
    };
  },
  computed: {
    notifications_count() {
      return this.$store.getters["notifications/notifications_count"];
    },
    user() {
      return this.$store.getters["user/user"];
    },
    available() {
      return this.$store.getters["executor/available"];
    },
  },
  methods: {
    ...mapActions("executor", ["putAvaibility"]),
    ...mapMutations("executor", ["SET_AVAIBILITY"]),
    ...mapActions("notifications", ["fetchNotificationsCount"]),
    logout() {
      window.localStorage.removeItem("ruqi_auth_data");

      this.$router.push("/signin");
    },
    avaibilityHandler() {
      if (this.value === false) {
        this.SET_AVAIBILITY(true);
        this.putAvaibility(true);
      } else {
        this.SET_AVAIBILITY(false);
        this.putAvaibility(false);
      }
    }
  },
  mounted() {
    this.value = this.available
  }
};
</script>

<style lang="scss">

.cpheu-profile-card {
  .v-btn {
    border-radius: 14px;
    text-transform: none;
    text-align: left;
  }
}

.rq-user-menu {
  width: 350px;
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  align-content: center;
  justify-content: flex-start;
  align-items: center;

  p {
    margin: 0;
    color: #7a91a9;
    font-weight: 600;
  }

  .user_name {
    font-size: 16px;
  }

  .user_mail {
    font-size: 14px;
  }


}
</style>
