<template lang="pug">
v-avatar.ui-avatar(
  :color="avatarBackground"
  :height="height"
  :width="width"
)
  v-icon.ui-avatar__stub(
    :color="avatarLogoBackground"
  ) mdi-camera
</template>

<script>
export default {
  components: {},

  props: {
    logo: {
      type: String,
      default: '',
    },

    theme: {
      type: String,
      default: '',
    },
  },
  data: () => ({}),
  computed: {
    avatarBackground() {
      switch (this.theme) {
        case 'blue':
          return '#349CE4';

        default:
          return '#D5DEE8';
      }
    },
    avatarLogoBackground() {
      switch (this.theme) {
        case 'blue':
          return '#2990D7';

        default:
          return '#FFFFFF';
      }
    },
  },

  watch: {},
  methods: {
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
.ui-avatar {}
</style>
