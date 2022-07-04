<template lang="pug">
.executor-mcdc
  v-tabs.executor-mcdc__tabs(
    v-model="tab"
    hide-slider
    active-class="executor-mcdc__tabs-item_active"
    height="43px"
  )
    v-tab.executor-mcdc__tabs-item
      v-icon.executor-mcdc__tabs-item-icon mdi-format-list-bulleted
      span.executor-mcdc__tabs-item-title Списком

    v-tab.executor-mcdc__tabs-item
      v-icon.executor-mcdc__tabs-item-icon mdi-map-outline
      span.executor-mcdc__tabs-item-title На карте
</template>

<script>
export default {
  components: {},
  props: {
    tasksTab: {
      type: [String, Number],
      default: 0,
    },
  },
  computed: {},
  watch: {
    tab(newTab) {
      this.$emit('clickOnTab', newTab);
    },
    tasksTab() {
      this.tab = this.tasksTab;
    },
  },
  methods: {
    /* GETTERS */
    /* SETTERS */
    /* HANDLERS */
    /* HELPERS */
  },

  data() {
    return {
      tab: 0,
    };
  },
  created() { },
  mounted() { },
}
</script>

<style lang="scss">
.executor-mcdc {
  width: 100%;
  padding: 0 16px;

  &__tabs {
    width: max-content;
    background: #349BE4;
    border-radius: 40px;
    width: 100%;

    &-item {
      color: #FFFFFF !important;

      &-icon {
        color: #FFFFFF !important;
        background: transparent !important;
      }

      &-title {
        white-space: nowrap;
      }

      &_active {
        background: #FFFFFF;
        border-radius: 40px;
        color: #0082DE !important;

        .executor-mcdc__tabs-item-icon {
          color: #0082DE !important;
        }
      }

      @media screen and (min-width: 370px) {
        width: 172px;
      }
    }

    .v-tabs-bar {
      border: 0 !important;
    }

    .v-tab {
      padding: 12px 50px !important;
      text-transform: none !important;
      width: 50%;

      @media screen and (max-width: 425px) {
        padding: 12px 40px !important;
      }

      @media screen and (max-width: 385px) {
        padding: 12px 35px !important;
      }

      @media screen and (max-width: 370px) {
        padding: 12px 30px !important;
      }
    }
  }
}
</style>
