<template>
  <div>
    <v-file-input
      label="Загрузить фото"
      single-line
      outlined
      filled
      prepend-icon=""
      prepend-inner-icon="mdi-camera-plus-outline"
      @input="$emit('input', file)"
      v-model="file"
      accept="image/png, image/jpeg, image/bmp"
    ></v-file-input>
  </div>
</template>

<script>
export default {
  props: ['name', 'icon', 'params', 'value', 'label'],
  data() {
    return {
      file: '',
    }
  },
  computed: {
    icon_code() {
      if (this.icon) {
        return this.icon;
      } else {
        return null;
      }
    },
  },
  methods: {},
  created() {
    if (this.value) {
      this.file = this.value;
    }
  },
  watch: {
    value: function () {
      this.file = this.value;
    },
  },
}
</script>

<style lang="scss">


</style>
