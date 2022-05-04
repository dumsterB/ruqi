<template lang="pug">
.rq-topbar
  v-app-bar(
    app
    elevation="0"
    height="60"
    color="transparent"
    class="header-content-crt_exd justify-end align-end d-flex"
  )
    rqTabs(:items="items" style="width: calc(100% - 300px);")
      template(#item="{item}")
        .task-tabs__item
          .task-tabs__title {{item.name}}

    userMenu
</template>

<script>
import { mapActions } from "vuex";
import rqTabs from '@/components/composite/rqTabs';
import userMenu from '@/components/userMenu';

export default {
  components: {
    rqTabs,
    userMenu,
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
          uuid: '1',
          name: '01.03 Комплектовщики ОЗОН СБП ',
          isPinned: false,
          isActive: true,
        },
        {
          uuid: '2',
          name: '02.03 Водители ЗАРА Ленина',
          isPinned: true,
          isActive: false,
        },
        {
          uuid: '3',
          name: '02.03 Водители ЗАРА Ленина',
          isPinned: false,
          isActive: false,
        },
        {
          uuid: '4',
          name: '02.03 Водители ЗАРА Ленина',
          isPinned: false,
          isActive: false,
        },
        {
          uuid: '5',
          name: '02.03 Водители ЗАРА Ленина',
          isPinned: false,
          isActive: false,
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

.rq-topbar {
  .task-tabs {
    &__title {
      max-width: 250px;
    }
    &__item {
      margin-right: 10px;
    }
  }
}

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
    padding: 0;
    border-bottom: 1px solid #E0E0E0;

    .row {
      margin: 0;
      flex: unset;
    }
  }
}

/* MIXINS STYLES START */
.v-app-bar {
  //padding: 0 24px;
}
</style>
