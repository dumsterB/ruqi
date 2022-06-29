<template lang="pug">
  .rq-tcdc
    .rq-tcdc__row.mt-8.mb-10
      v-tabs.rq-tcdc__tabs(
        hide-slider
        active-class="rq-tcdc__tabs-item_active"
        height="48px"
        v-model="tab"
      )
        v-tab.rq-tcdc__tabs-item(style="padding: 0 !important;" v-for="(tab, index) in tabs" :key="index")
          span.rq-tcdc__tabs-item-title {{ tab }}


</template>

<script>
export default {
  components: {},

  props: {
    tabs: {
      type: Array,
      default: []
    },
  },

  data() {
    return {
      active: '',
      tab: 0,
    }
  },

  computed: {
  },

  watch: {
    tab(newTab) {
      this.$emit('clickOnTab', newTab);
    },
  },

  methods: {

  },

  created() { },

  mounted() { },
}
</script>

<style lang="scss">
.rq-tcdc {
  &__row {
    display: flex;
    flex-direction: row;
    flex-wrap: nowrap;
    align-content: center;
    justify-content: space-between;
    align-items: center;
  }

  &__title {
    font-style: normal;
    font-weight: 700;
    font-size: 20px;
    line-height: 125%;
    color: #263043;
  }

  &__tabs {
    width: max-content;
    background: #F2F5F8;
    border: 1px solid #D5DEE8;
    border-radius: 40px;
    flex: none !important;

    &-item {
      width: 156px;
      color: #FFFFFF !important;

      &-icon {
        color: #FFFFFF !important;
        background: transparent !important;
      }

      &-title {
        font-style: normal;
        font-weight: 600;
        font-size: 16px;
        line-height: 125%;
        white-space: nowrap;
        color: #263043;
        margin-left: 10px;
      }

      &_active {
        background: #FFFFFF;
        border: 1px solid #D5DEE8;
        border-radius: 40px;
        color: #0082DE !important;

        .rq-tcdc__tabs-item-icon {
          &--list {
            fill: #0082DE !important;
          }

          &--map {
            stroke: #0082DE !important;
          }
        }

        .rq-tcdc__tabs-item-title {
          color: #0082DE !important;
        }
      }
    }

    .v-tabs-bar {
      border: 0 !important;
    }

    .v-tab {
      padding: 12px 50px !important;
      text-transform: none !important;
    }
  }

}
</style>
