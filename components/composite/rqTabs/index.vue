<template lang="pug">
.rq-tabs
  .rq-tabs__main
    .rq-tabs__title lorem ips

  .rq-tabs__tab.rq-tabs__tab_active
    .rq-tabs__tab-main lorem ipslorem ipslorem ipslorem ips
    .rq-tabs__tab-actions
      v-icon mdi-close
      svg(
        width="17" height="17" viewBox="0 0 17 17" fill="none" xmlns="http://www.w3.org/2000/svg"
      )
        path(
          d="M11.2573 1.31243L15.6876 5.74268C16.6428 6.6979 16.3815 8.30824 15.1732 8.91238L10.7796 11.1092C10.6578 11.1701 10.5647 11.2763 10.5203 11.405L9.40186 14.6424C9.12551 15.4424 8.10707 15.677 7.50861 15.0785L5.08335 12.6532L1.23657 16.5H0.5V15.7634L4.34678 11.9167L1.92153 9.49142C1.32307 8.89295 1.55765 7.87451 2.35762 7.59816L5.59505 6.47977C5.72376 6.43531 5.82994 6.34221 5.89084 6.22041L8.08762 1.82681C8.69175 0.618527 10.3021 0.357204 11.2573 1.31243Z" fill="#666666"
        )

  .rq-tabs__tab.rq-tabs__tab_active
    .rq-tabs__tab-main lorem ipslorem ipslorem ipslorem ips
    .rq-tabs__tab-actions
      v-icon mdi-close
  .rq-tabs__tab.rq-tabs__tab_active
    .rq-tabs__tab-main lorem ipslorem ipslorem ipslorem ips
    .rq-tabs__tab-actions
      v-icon mdi-close
  .rq-tabs__tab.rq-tabs__tab_active
    .rq-tabs__tab-main lorem ipslorem ipslorem ipslorem ips
    .rq-tabs__tab-actions
      v-icon mdi-close
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
    &-actions {
      cursor: pointer;
    }
    &_active {
      background: linear-gradient(0deg, #F1F8FF, #F1F8FF), #E2ECF5;
      border-bottom: 2px solid #0082DE;
    }
  }
}
</style>
