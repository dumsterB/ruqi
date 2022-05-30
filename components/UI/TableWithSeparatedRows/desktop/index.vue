<template lang="pug">
.rq-twsrd
  rqTable
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
  &__row {}
}
</style>
