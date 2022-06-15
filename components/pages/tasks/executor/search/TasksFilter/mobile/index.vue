<template lang="pug">
.m-task-search-filter
  .m-task-search-filter--bbar
    v-btn.m-task-search-filter--bbar__container
      svg.m-task-search-filter--bbar__container--icon(
        width="15"
        height="11"
        viewBox="0 0 15 11"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      )
        path(
          d="M14.5 1H0.5C0.2 1 0 0.8 0 0.5C0 0.2 0.2 0 0.5 0H14.5C14.8 0 15 0.2 15 0.5C15 0.8 14.8 1 14.5 1ZM12.5 5.5C12.5 5.2 12.3 5 12 5H3C2.7 5 2.5 5.2 2.5 5.5C2.5 5.8 2.7 6 3 6H12C12.3 6 12.5 5.8 12.5 5.5ZM10 10.5C10 10.2 9.8 10 9.5 10H5.5C5.2 10 5 10.2 5 10.5C5 10.8 5.2 11 5.5 11H9.5C9.8 11 10 10.8 10 10.5Z"
          fill="white"
        )

      v-badge.m-task-search-filter--bbar__container--badge(
        dot
        color="#EB4D3D"
      )
        .m-task-search-filter--bbar__container--title {{ 'Фильтры' }}
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
  created() { },
  mounted() { },
}
</script>

<style lang="scss">
.m-task-search-filter {
  &--bbar {
    position: fixed;
    bottom: 99px;
    width: 100%;
    z-index: 100;
    display: flex;
    flex-direction: row;
    flex-wrap: nowrap;
    align-content: center;
    justify-content: center;
    align-items: center;
    box-sizing: border-box;

    &__container {
      padding: 16px 24px !important;
      background: #0082DE !important;
      border-radius: 8px;
      display: flex;
      flex-direction: row;
      flex-wrap: nowrap;
      align-content: center;
      justify-content: center;
      align-items: center;
      height: auto !important;

      &--badge {
        .v-badge__badge {
          width: 11px;
          height: 11px;
          inset: auto auto calc(100% - 8px) calc(100% - 2px) !important;
        }
      }

      &--title {
        font-family: 'Source Sans Pro';
        font-style: normal;
        font-weight: 700;
        font-size: 14px;
        line-height: 16px;
        letter-spacing: 0.4px;
        color: #FFFFFF;
        margin-left: 8px;
      }
    }
  }
}
</style>
