<template lang="pug">
.relative
  v-btn.btn-magnify(fab small icon @click="changeShow")
    v-icon(color="grey-custom") mdi-magnify
    .dot(v-show="value && !showInput")
  v-text-field.search-field(
      v-show="showInput"
      ref="searchField"
      outlined
      dense
      rounded
      hide-details
      @blur="showInput = !showInput"
      @input="handlerInput"
      :value="value"
      clearable
    )
</template>

<script>
export default {
  name: "SearchField",
  props: {
    value: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      showInput: false
    }
  },
  methods: {
    handlerInput(evt) {
      this.$emit('input', evt ?? '')
    },
    changeShow() {
      this.showInput = !this.showInput
      this.$nextTick(() => this.$refs.searchField.focus())
    },
  }
}
</script>

<style scoped lang="scss">
.btn-magnify {
  z-index: 9;
}
.dot {
  position: absolute;
  border-radius: 5px;
  height: 9px;
  width: 9px;
  background: #eb4d3d;
  right: 8px;
  top: 0;
}
.search-field {
  position: absolute;
  left: 0;
  top: 0;
  min-width: 264px;
  .v-input__slot {
    padding-left: 50px !important;
  }
}

</style>
<style lang="scss">
.v-text-field {
  &.search-field {
    .v-input__slot {
      padding-left: 42px !important;
    }
    fieldset {
      border-radius: inherit;
    }
  }
}
</style>
