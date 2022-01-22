<template>
  <div class="map-container" :style="{height: height + 'px'}">
    <yandex-map
      :coords="center_coords"
      :zoom="zoom"
    >
      <ymap-marker
        v-for="(item, index) in markers"
        :key="index"
        :coords="item.geometry.coordinates"
        :marker-id="item.uuid"
        :hint-content="item.properties.hintContent"
        marker-type="placemark"
      />
    </yandex-map>
  </div>

</template>

<script>
export default {
  props: ['center_coords', 'markers', 'zoom', 'height' ],
  data() {
    return {}
  },
}
</script>

<style lang="scss">

@import '/assets/scss/colors.scss';

.ruqi {
  .ymap-container {
    width: 100%;
    height: 100%;
  }

}

</style>
