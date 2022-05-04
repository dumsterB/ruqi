<template lang="pug">
.rq-tabs
  .rq-tabs__main
    .rq-tabs__title Все заявки

  v-tabs
    v-tab(
      v-for="item in items" :key="item.uuid"
      :class="['rq-tabs__tab',]"
      active-class="rq-tabs__tab_active"
    )
      .rq-tabs__tab-main
      slot(
        name="item"
        :item="item"
      )
      .rq-tabs__tab-actions(
        @click.stop="onActionClicked"
      )
        rqIcon(
          v-if="item.isPinned"
          name="clip" width="15" height="15" viewBox="0 0 17 17" fill="#666666"
        )
        rqIcon(
          v-else
          name="close" width="15" height="15" viewBox="0 0 12 12" fill="#666666"

        )
</template>

<script>
import rqIcon from '@/components/UI/rqIcon';

export default {
  components: {
    rqIcon,
  },
  props: {
    items: {
      type: Array,
      required: true,
    },
  },
  methods: {
    // getters
    // setters

    /* HANDLERS */
    onActionClicked() {
      console.debug('onActionClicked');
    }

    // helpers
  },

  data() {
    return {};
  },
};
</script>

<style lang="scss">
.rq-tabs {
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  align-content: center;
  justify-content: flex-start;
  align-items: center;
  box-sizing: border-box;

  &__title {
    font-family: 'Source Sans Pro';
    font-style: normal;
    font-weight: 600;
    font-size: 16px;
    line-height: 125%;
    color: #000000;
    white-space: nowrap;
  }
  &__main {
    box-sizing: border-box;
    padding: 20px 24px;
    height: 60px;
  }
  &__tab {
    display: flex;
    flex-direction: row;
    flex-wrap: nowrap;
    align-content: center;
    justify-content: space-between;
    align-items: center;
    box-sizing: border-box;
    padding: 20px 24px;
    height: 60px;
    cursor: pointer;

    &-main {}
    &-actions {
      display: flex;
      flex-direction: row;
      flex-wrap: nowrap;
      align-content: center;
      justify-content: flex-start;
      align-items: center;
      cursor: pointer;
    }
    &_active {
      background: linear-gradient(0deg, #F1F8FF, #F1F8FF), #E2ECF5;
      // border-bottom: 2px solid #0082DE;
    }
  }

  .v-tabs-bar {
    border-bottom: 0 !important;
    height: 60px;
  }
}
</style>
