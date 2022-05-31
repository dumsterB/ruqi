<template lang="pug">
.rq-twsrd
  rqTable.rq-twsrd__rq-table
    template( v-slot:body )
      slot
</template>

<script>
import rqTable from '@/components/UI/rqTable';

export default {
  components: {
    rqTable,
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
  created() { },
  mounted() { },
}
</script>

<style lang="scss">
.rq-twsrd {
  &__rq-table {
    .rq-table__main {
      border-collapse: separate;
      border-spacing: 0 16px;

      &-body {
        
      }
    }
  }
}
</style>
