<template lang="pug">
div
  .cpheu
    .cpheu-user
      Avatar
      .cpheu-user__info
        .cpheu-user__info-row
          .cpheu-user__fullname(v-if="profile") {{profile.fullname}}
          v-icon(color="#263043" style="margin-top: 8px;") mdi-chevron-right

        .cpheu-user__info-row
          .cpheu-user__status
            v-icon(color="#71D472" x-small) mdi-checkbox-blank-circle
            .cpheu-user__status__title Доступен для работ

          .cpheu-user__rating
            v-icon.cpheu-user__rating__logo mdi-star-outline
            .cpheu-user__rating__title(v-if="profile.rank") {{profile.rank.name}}   ( {{profile.rank.title}} )

  Widget(:widgets="widgets")
</template>

<script>
import Avatar from '@/components/UI/Avatar';
import Widget from '@/components/composite/Widgets/desktop'
import {mapMutations} from "vuex";
export default {
  components: {
    Avatar,Widget
  },

  props: {
    widgets:{},
    profile:{},
  },
  data: () => ({}),
  computed: {},

  watch: {},
  methods: {
    logout(){
      window.localStorage.removeItem("ruqi_auth_data");

      this.$router.push("/signin");
    }
    /* GETTERS */
    /* SETTERS */
    /* HANDLERS */
    /* HELPERS */
  },

  created() { },
  mounted() { },
}
</script>

<style lang="scss">

.cpheu {
  font-family: 'Source Sans Pro';
  font-style: normal;
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  align-content: center;
  justify-content: space-between;
  align-items: center;

  &-user {
    display: flex;
    flex-direction: row;
    flex-wrap: nowrap;
    align-content: center;
    justify-content: flex-start;
    align-items: center;

    &__fullname {
      font-weight: 700;
      font-size: 32px;
      line-height: 125%;
      color: #263043;
    }

    &__info {
      margin-left: 20px;

      &-row {
        display: flex;
        flex-direction: row;
        flex-wrap: nowrap;
        align-content: center;
        justify-content: flex-start;
        align-items: center;
      }
    }

    &__status {
      display: flex;
      flex-direction: row;
      flex-wrap: nowrap;
      align-content: center;
      justify-content: flex-start;
      align-items: center;

      &__title {
        font-weight: 600;
        font-size: 16px;
        line-height: 125%;
        color: #000000;
        margin-left: 6px;
      }
    }

    &__rating {
      display: flex;
      flex-direction: row;
      flex-wrap: nowrap;
      align-content: center;
      justify-content: flex-start;
      align-items: center;

      margin-left: 22px;

      &__logo {
        &>i {
          border: 2px solid #D5DEE8 !important;
        }
      }

      &__title {
        font-weight: 600;
        font-size: 16px;
        line-height: 125%;
        color: #000000;
        margin-left: 9px;
      }
    }
  }

  &-profile {
    background: #FFFFFF;
    border: 1px solid #D5DEE8;
    border-radius: 8px !important;
    cursor: pointer;

    display: flex;
    flex-direction: row;
    flex-wrap: nowrap;
    align-content: center;
    justify-content: flex-start;
    align-items: center;

    box-sizing: content-box;
    padding: 14px 17px !important;

    &__title {
      margin-left: 11px;

      font-weight: 700;
      font-size: 14px;
      line-height: 125%;
      color: #263043;
      text-transform: uppercase;
      user-select: none;
    }
  }

  &-profile-card {
    .v-divider {
      margin: 0;
    }

    &__item {
      display: flex;
      flex-direction: row;
      flex-wrap: nowrap;
      align-content: center;
      justify-content: flex-start;
      align-items: center;
      padding: 11px !important;
      width: 100%;
      border-radius: 0 !important;

      &__title {
        margin-left: 10px;
        font-weight: 600;
        font-size: 16px;
        line-height: 20px;
        color: #263043;
      }

      .v-input--switch--inset {
        margin: 0 !important;

        .v-input__slot {
          margin: 0 !important;

          .v-label {
            font-weight: 600;
            font-size: 16px;
            line-height: 20px;
            color: #263043;
          }
        }

        .v-messages {
          display: none;
        }
      }
    }
  }
}
</style>
