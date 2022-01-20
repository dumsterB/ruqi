<template>
  <div class="user-plate" :class="radius">
    <div class="user-avatar">
      <v-avatar
        :color="color"
        size="32"
      >
        <span class="white--text">{{ initials }}</span>
      </v-avatar>
      <span v-if="response" class="user-response">
        <img src="/img/ico_user_arrow.svg" alt="Откликнулся">
      </span>
    </div>
    <div class="user-date">
      <span class="user-name no-wrap">
      {{ first_name + ' ' + last_name }}
    </span>
      <span v-if="date" class="user-date">
      {{ date }}
    </span>
    </div>
  </div>


</template>

<script>
export default {
  props: ['first_name', 'last_name', 'color', 'radius', 'date', 'response'],
  data() {
    return {}
  },
  computed: {
    initials: function () {
      return this.first_name.substr(0, 1) + this.last_name.substr(0, 1);
    },
  },
}
</script>

<style lang="scss">

.user-plate{
  display: flex;
  align-items: center;

  .user-avatar {
    position: relative;
    display: flex;
    margin-right: 14px;

    .v-avatar {
      border-radius: 8px;
      font-size: 13px;
    }
    .user-response {
      position: absolute;
      bottom: -10px;
      right: -7px;
    }
  }

  .user-date{
    display: flex;
    flex-direction: column;
    line-height: 1.25;
    align-items: flex-start;
    font-weight: 600;

    .user-name{
      color: #000;

    }
  }
}

.wrap-composite-state .user-plate{
  .user-avatar {
    margin-right: 8px;
  }
}

.user-plate.rounded {
  .v-avatar {
    border-radius: 50px;
  }
}


</style>
