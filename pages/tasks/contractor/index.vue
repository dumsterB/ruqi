<template lang="pug">
.page-task-contractor
  Header.page-task-contractor__header
  .page-task-contractor__tabs
  .page-task-contractor__actions
  .page-task-contractor__banner
  .page-task-contractor__tasks
</template>

<script>
import Header from '@/components/pages/tasks/executor/index/Header';

export default {
  components: {
    Header,
  },

  props: {},
  data: () => ({}),
  computed: {},

  watch: {},
  methods: {
    /* GETTERS */
    /* SETTERS */
    /* HANDLERS */
    /* HELPERS */
  },

  created() {},
  mounted() {},
}
</script>

<style lang="scss">
.page-task-contractor {
  &__header {}
  &__tabs {}
  &__actions {}
  &__banner {}
  &__tasks {}
}
</style>
