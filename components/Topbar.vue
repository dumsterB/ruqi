<template lang="pug">
.header-wrap
  v-app-bar(
    app
    elevation="0"
    height="98"
    color="transparent"
    class="header-content-crt_exd justify-end align-end d-flex"
  )
    rqTabs
    v-row
      v-menu(
        bottom
        min-width="280px"
        rounded="10"
        offset-y
        nudge-bottom="10"
        z-index="1000"
      )
        template(v-slot:activator="{on}")
          v-btn(text outlined v-on="on" height="56" class="mr-3")
            v-col(class="pl-0")
              v-avatar(color="#D6D0FE" size="32")
                span(class="white--text" v-if="user.firstname") {{user.firstname.substr(0, 1)}}
                span(class="white--text" v-if="user.lastname") {{user.lastname.substr(0, 1)}}

            v-col(class="px-0")
              p(class="user_name") {{ user.firstname }} {{ user.lastname }}
              p(class="user_mail") {{ user.email }}

        v-card
          v-list-item-content(class="justify-start")
            div(class="mx-auto text-left")
              v-btn(text link to="/profile/") Профиль
              v-divider(class="my-3")
              v-btn(text @click="handlers().signout()") Выход

      v-badge(
        v-if="notifications_count"
        bordered
        color="error"
        :content="notifications_count.count_notifications"
        :value="notifications_count.count_notifications > 0"
        overlap
      )
        v-btn(
          elevation="0"
          outlined
          text
          tile
          rounded
          width="56"
          height="56"
          @click="$router.push('/notification')"
        )
          img(src="/img/ico_bell.svg" alt="Оповещение")

      v-badge(bordered color="error" content="25" overlap)
        v-btn(
          elevation="0"
          outlined
          text
          tile
          rounded
          width="56"
          height="56"
        )
          img(src="/img/ico_mess.svg" alt="Сообщения")
</template>

<script>
import { mapActions } from "vuex";
import rqTabs from '@/components/composite/rqTabs';

export default {
  components: {
    rqTabs,
  },
  computed: {
    notifications_count() {
      return this.$store.getters["notifications/notifications_count"];
    },
    user() {
      return this.$store.getters["user/user"];
    },
  },
  methods: {
    ...mapActions("notifications", ["fetchNotificationsCount"]),

    handlers() {
      return {
        signout: () => {
          window.localStorage.removeItem("ruqi_auth_data");

          this.$router.push("/signin");
        },
      };
    },
  },

  data() {
    return {
      items: [
        {
          text: "Dashboard",
          disabled: false,
          href: "breadcrumbs_dashboard",
        },
        {
          text: "Link 1",
          disabled: false,
          href: "breadcrumbs_link_1",
        },
        {
          text: "Link 2",
          disabled: true,
          href: "breadcrumbs_link_2",
        },
      ],
    };
  },
  async mounted() {
    await this.fetchNotificationsCount();
  },
};
</script>

<style lang="scss">
/* OBJECTS STYLES START */
.header-content-crt_exd {
  .v-toolbar__content {
    position: relative;
    display: flex;
    align-items: center;
    z-index: 0;
    flex-direction: row;
    flex-wrap: nowrap;
    align-content: center;
    justify-content: space-between;
    width: 100%;

    .v-breadcrumbs {
      .v-breadcrumbs__item {
        font-weight: normal;
        font-size: 16px;
        line-height: 22px;
        color: #627f9c;
      }

      .v-breadcrumbs__divider {
        .v-icon {
          font-size: 4px;
          color: #7a91a9;
        }
      }
    }

    .row {
      margin: 0;
      flex: unset;
    }
  }
}
/* OBJECTS STYLES END */

/* MIXINS STYLES START */
.header-content-crt_exd {
  .v-breadcrumbs {
    li:not(.v-breadcrumbs__divider) {
      &:last-child {
        .v-breadcrumbs__item {
          color: #a6bacc;
        }
      }
    }
  }
}
/* MIXINS STYLES END */

.v-app-bar {
  padding: 0 24px;
}

.v-menu__content {
  box-shadow: 0 0 73px 5px #edeef1;
}

.v-btn {
  border-radius: 14px;
  margin-left: 12px;
  text-transform: none;
  text-align: left;

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
