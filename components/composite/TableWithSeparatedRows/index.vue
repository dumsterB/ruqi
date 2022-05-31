
<template lang="pug">
.rq-ctwsr
  TableDesktop.rq-ctwsr__desktop
    slot(name="desktop")

  //- TableMobile.rq-ctwsr__mobile
  //-   slot(name="mobile")
</template>

<script>
import TableDesktop from './desktop';
import TableMobile from './mobile';

export default {
  components: {
    TableDesktop,
    TableMobile,
  },
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
.rq-ctwsr {
  &__row {
    & > div {
      border-top: 1px solid #D5DEE8;
      border-bottom: 1px solid #D5DEE8;
      padding-top: 12px;
      padding-bottom: 12px;

      &:first-child {
        border-radius: 14px 0 0 14px;
        border-left: 1px solid #D5DEE8;
        padding-left: 24px;
      }
      &:last-child {
        border-radius: 0 14px 14px 0;
        border-right: 1px solid #D5DEE8;
        padding-right: 24px;
      }
    }
  }
  .__desktop {}
  .__mobile {}
}
</style>
