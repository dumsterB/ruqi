
<template lang="pug">
.rq-twsr
  TableDesktop.rq-twsr__desktop
  TableMobile.rq-twsr__mobile
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
.rq-twsr {
  .__desktop {}
  .__mobile {}
}
</style>
