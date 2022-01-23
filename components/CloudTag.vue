<template>
  <ul class="cloud-tag">
    <li v-for="(item, index) in listTag" :key="index">
      {{ item }}
    </li>
  </ul>

</template>

<script>
export default {
  props: ['listTag'],
  data() {
    return {}
  },
}
</script>

<style lang="scss">

@import '/assets/scss/colors.scss';

.ruqi {
  .cloud-tag {
    display: flex;
    flex-wrap: wrap;
    padding: 0;

    li {
      list-style: none;
      display: flex;
      align-items: center;
      justify-content: center;
      color: $blue;
      background: $light_blue;
      padding: 6px 16px;
      border-radius: 19px;
      margin: 0 8px 8px 0;
      text-transform: uppercase;
    }
  }
}

</style>
