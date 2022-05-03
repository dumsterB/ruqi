<template lang="pug">
.rq-tabs
  .rq-tabs__main
    .rq-tabs__title lorem ips

  .rq-tabs__tab.rq-tabs__tab_active
    .rq-tabs__tab-main lorem ipslorem ipslorem ipslorem ips
    .rq-tabs__tab-actions ++

  .rq-tabs__tab.rq-tabs__tab_active
    .rq-tabs__tab-main lorem ipslorem ipslorem ipslorem ips
    .rq-tabs__tab-actions ++
  .rq-tabs__tab.rq-tabs__tab_active
    .rq-tabs__tab-main lorem ipslorem ipslorem ipslorem ips
    .rq-tabs__tab-actions ++
  .rq-tabs__tab.rq-tabs__tab_active
    .rq-tabs__tab-main lorem ipslorem ipslorem ipslorem ips
    .rq-tabs__tab-actions ++
</template>

<script>
export default {
  components: {},

  data() {
    return {};
  },

  methods: {
    // getters
    // setters
    // handlers
    // helpers
  },
};
</script>

<style lang="scss" scoped>
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
  }
  &__main {
    box-sizing: border-box;
    padding: 20px 24px;
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

    &-main {}
    &-actions {}
    &_active {
      background: linear-gradient(0deg, #F1F8FF, #F1F8FF), #E2ECF5;
      border-bottom: 2px solid #0082DE;
    }
  }
}
</style>
