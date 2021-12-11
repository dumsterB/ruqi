<template>
  <div class="user-plate">
    <v-avatar
      :color="color"
      size="32"
    >
      <span class="white--text">{{ initials }}</span>
    </v-avatar>
    <span class="user-name">
      {{ first_name + ' ' + last_name}}
    </span>
  </div>
</template>

<script>
export default {
  props: ['first_name', 'last_name', 'color'],
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

<style lang="scss" scoped>
  .v-avatar{
    border-radius: 8px;
    margin-right: 10px;
    font-size: 13px;
  }
</style>
