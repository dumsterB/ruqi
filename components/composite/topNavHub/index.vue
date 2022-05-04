<template lang="pug">
.rq-top-nav-hub
  .rq-top-nav-hub__node
    .rq-top-nav-hub__title {{$route.meta.title}}
  rqTabs(
    v-show="$route.name === 'tasks'"
    :items="items"
  )
    template(#item="{item}")
      .task-tabs__item
        .task-tabs__title {{item.name}}
</template>

<script>
import rqTabs from '@/components/composite/rqTabs';

export default {
  components: {
    rqTabs,
  },
  methods: {},

  data() {
    return {
      items: [
        {
          uuid: '1',
          name: '01.03 Комплектовщики ОЗОН СБП ',
          isPinned: false,
          isActive: true,
        },
        {
          uuid: '2',
          name: '02.03 Водители ЗАРА Ленина',
          isPinned: true,
          isActive: false,
        },
        {
          uuid: '3',
          name: '02.03 Водители ЗАРА Ленина',
          isPinned: false,
          isActive: false,
        },
        {
          uuid: '4',
          name: '02.03 Водители ЗАРА Ленина',
          isPinned: false,
          isActive: false,
        },
        {
          uuid: '5',
          name: '02.03 Водители ЗАРА Ленина',
          isPinned: false,
          isActive: false,
        },
      ],
    };
  },
  mounted() {
    console.debug(this.$router);
  },
};
</script>

<style lang="scss">
.rq-top-nav-hub {
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  align-content: center;
  justify-content: flex-start;
  align-items: center;
  width: calc(100% - 300px);

  &__title {
    font-family: 'Source Sans Pro';
    font-style: normal;
    font-weight: 600;
    font-size: 16px;
    line-height: 125%;
    color: #000000;
    white-space: nowrap;
    box-sizing: border-box;
    padding: 20px 24px;
    height: 60px;
  }
  &__node {}

  /* OBJECTS */
  .task-tabs {
    &__title {
      max-width: 250px;
    }
    &__item {
      margin-right: 10px;
    }
  }
}
</style>
