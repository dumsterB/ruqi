<template lang="pug">
div
  .cpheum
    .cpheum-user
      v-badge(
        bottom
        dot
        left
        overlap
        avatar
        color="#71D472"
        offset-x="15"
        offset-y="10"
      )
        Avatar(theme="blue")
      .cpheum-user__info
        .cpheum-user__info-row
          .cpheum-user__fullname Станислав
          v-icon(color="#FFFFFF") mdi-chevron-right

        .cpheum-user__info-row
          .cpheum-user__rating Специалист  (ранг 1)
  Widget(:widgets="widgets")

</template>

<script>
import Avatar from '@/components/UI/Avatar';
import Widget from '@/components/composite/Widgets/mobile'
export default {
  components: {
    Avatar,Widget
  },

  props: {
    widgets:{
      type:Array
    }
  },
  data: () => ({}),
  computed: {},

  watch: {},
  methods: {
    /* GETTERS */
    /* SETTERS */
    /* HANDLERS */
    /* HELPERS */
  },

  created() { },
  mounted() { },
}
</script>

<style lang="scss">
.cpheum {
  &-user {
    display: flex;
    flex-direction: row;
    flex-wrap: nowrap;
    align-content: center;
    justify-content: flex-start;
    align-items: center;

    &__fullname {
      font-weight: 700;
      font-size: 24px;
      line-height: 125%;
      color: #FFFFFF;
    }

    &__rating {
      font-weight: 600;
      font-size: 14px;
      line-height: 125%;
      color: #FFFFFF;
    }

    &__info {
      margin-left: 13px;

      &-row {
        display: flex;
        flex-direction: row;
        flex-wrap: nowrap;
        align-content: center;
        justify-content: flex-start;
        align-items: center;
      }
    }
  }
}

</style>
