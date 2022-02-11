<template>
  <div class="header-wrap">
    <v-app-bar app elevation="0" height="98" color="transparent" class="header-content-crt_exd justify-end align-end d-flex">
      <v-breadcrumbs :items="items">
        <template v-slot:divider>
          <v-icon>mdi-checkbox-blank-circle</v-icon>
        </template>
      </v-breadcrumbs>

      <v-row>
        <v-menu
          bottom
          min-width="280px"
          rounded="10"
          offset-y
          nudge-bottom="10"
          z-index="1000"
        >
          <template v-slot:activator="{ on }">
            <v-btn
              text
              outlined
              v-on="on"
              height="56"
              class="mr-3"
            >
              <v-col class="pl-0">
                <v-avatar
                  color="#D6D0FE"
                  size="32"
                >
                  <span class="white--text">{{ user.initials }}</span>
                </v-avatar>
              </v-col>
              <v-col class="px-0">
                <p class="user_name">{{ user.fullName }}</p>
                <p class="user_mail">
                  {{ user.email }}
                </p>
              </v-col>
            </v-btn>
          </template>
          <v-card>
            <v-list-item-content class="justify-start">
              <div class="mx-auto text-left">
                <v-btn
                  text
                >
                  Профиль
                </v-btn>
                <v-divider class="my-3"></v-divider>
                <v-btn
                  text
                  @click="handlers().signout()"
                >
                  Выход
                </v-btn>
              </div>
            </v-list-item-content>
          </v-card>
        </v-menu>
        <v-badge
          bordered
          color="error"
          :content="notifications.length"
          overlap
        >
          <v-btn
            elevation="0"
            outlined
            text
            tile
            rounded
            width="56"
            height="56"
            @click="$router.push('/notification')"
          >
            <img src="/img/ico_bell.svg" alt="Оповещение">
          </v-btn>
        </v-badge>
        <v-badge
          bordered
          color="error"
          content="25"
          overlap
        >
          <v-btn
            elevation="0"
            outlined
            text
            tile
            rounded
            width="56"
            height="56"
          >
            <img src="/img/ico_mess.svg" alt="Сообщения">
          </v-btn>
        </v-badge>
      </v-row>
    </v-app-bar>
  </div>
</template>
<script>
import {mapActions} from "vuex";

export default {
  data: () => ({
    user: {
      initials: 'АВ',
      fullName: 'Антон Васильев',
      email: 'vasilyev@mail.ru',
    },

    items: [
      {
        text: 'Dashboard',
        disabled: false,
        href: 'breadcrumbs_dashboard',
      },

      {
        text: 'Link 1',
        disabled: false,
        href: 'breadcrumbs_link_1',
      },

      {
        text: 'Link 2',
        disabled: true,
        href: 'breadcrumbs_link_2',
      },
    ],
  }),
  computed:{
    notifications() {
      return this.$store.getters['notifications/notifications'];
    },
  },
  methods:{
    ...mapActions('notifications', ['fetchNotifications',]),

    handlers ()
    {
      return {
        signout : () => {
          window.localStorage.removeItem( 'ruqi_auth_data' );
          this.$router.push( '/signin' );
        },
      }
    },
  },
  async mounted() {
    await this.fetchNotifications();
  }
}
</script>

<style lang="scss">

/* OBJECTS STYLES START */
  .header-content-crt_exd
  {
    .v-toolbar__content
    {
      position        : relative;
      display         : flex;
      align-items     : center;
      z-index         : 0;
      flex-direction  : row;
      flex-wrap       : nowrap;
      align-content   : center;
      justify-content : space-between;
      width           : 100%;

      .v-breadcrumbs
      {
        .v-breadcrumbs__item
        {
          font-weight : normal;
          font-size   : 16px;
          line-height : 22px;
          color       : #627F9C;
        }

        .v-breadcrumbs__divider
        {
          .v-icon
          {
            font-size : 4px;
            color     : #7A91A9;
          }
        }
      }

      .row
      {
        margin  : 0;
        flex    : unset;
      }
    }
  }
/* OBJECTS STYLES END */

/* MIXINS STYLES START */
  .header-content-crt_exd
  {
    .v-breadcrumbs
    {
      li:not( .v-breadcrumbs__divider )
      {
        &:last-child
        {
          .v-breadcrumbs__item
          {
            color : #A6BACC;
          }
        }
      }
    }
  }
/* MIXINS STYLES END */

.v-app-bar {
  padding: 0 24px;
}

.v-menu__content{
  box-shadow: 0 0 73px 5px #EDEEF1;
}

.v-btn {
  border-radius: 14px;
  margin-left: 12px;
  text-transform: none;
  text-align: left;

  p {
    margin: 0;
    color: #7A91A9;
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
