<template lang="pug">
.executor-mcdc
  v-tabs.executor-mcdc__tabs(
    hide-slider
    active-class="executor-mcdc__tabs-item_active"
    height="43px"
  )
    v-tab Списком
    v-tab На карте
</template>

<script>
  export default {
    components: {},
    props: {},
    computed: {},
    watch: {},
    methods: {
      /* GETTERS */
      /* SETTERS */
      /* HANDLERS */
      /* HELPERS */
    },

    data() {
      return {}
    },
    created() {},
    mounted() {},
}
</script>

<style lang="scss">
.executor-mcdc {
  &__tabs{
    width: max-content;
    background: #349BE4;
    border-radius: 40px;

    &-item {
      &_active {
        background: #FFFFFF;
        border-radius: 40px;
      }
    }

    .v-tabs-bar {
      border: 0 !important;
    }
  }
}
</style>
