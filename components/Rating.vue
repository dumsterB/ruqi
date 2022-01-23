<template>

  <div class="wrap-rating">
    <v-rating
      :color="color"
      empty-icon="mdi-star"
      full-icon="mdi-star"
      half-icon="mdi-star-half-full"
      half-increments
      length="5"
      size="14"
      :value="+rating"
      readonly
    ></v-rating>
    <span class="grey--text text--lighten-2 text-caption mr-2">
      {{ this.rating }}
    </span>
  </div>

</template>

<script>
export default {
  props: {
    rating : {
      type  : Object,
    },

    color : {
      type    : String,
      default : "#FFCB45",
    },
  },
  data() {
    return {}
  },
}
</script>

<style lang="scss">

@import '/assets/scss/colors.scss';

.wrap-rating{
  display: flex;
  align-items: center;
  line-height: 1;

  .v-rating{
    margin-right: 10px;
  }

  >span{
    font-size: 16px;
    font-weight: 600;
    color: $grey;
  }

}
</style>
