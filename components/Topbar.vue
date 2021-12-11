<template>
  <div>
    <v-app-bar app elevation="0" height="98" color="#fff" class="justify-end align-end d-flex">
      <v-row>
        <v-menu
          bottom
          min-width="280px"
          rounded="10"
          offset-y
          nudge-bottom="10"
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
export default {
  data: () => ({
    user: {
      initials: 'АВ',
      fullName: 'Антон Васильев',
      email: 'vasilyev@mail.ru',
    },
  }),
}
</script>

<style lang="scss" scoped>

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
