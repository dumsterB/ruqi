<template lang="pug">
  .form-select-autocomplete
    v-autocomplete(
      v-model="select"
      :loading="loading"
      :items="items"
      :search-input.sync="search"
      cache-items
      :name="name"
      single-line
      outlined
      filled
      :label="params.placeholder"
      hide-details
      :prepend-inner-icon="icon_code"
      @input="$emit('input', select)")
</template>

<script>
export default {
  props: ['name', 'params', 'value', 'icon',],
  data() {
    return {
      new_value: '',
      loading: false,
      items: [],
      search: null,
      select: null,
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

  watch: {
    search(val) {
      val && val !== this.select && this.querySelections(val)

    },
    params: {
      handler() {
        this.loading = this.params.loading;
        this.items = this.params.states;
      },
      deep: true
    },
  },

  methods: {
    querySelections(v) {
      this.$emit('setItemsList', v);
    },
  },
}
</script>

<style lang="scss">

.form-select-autocomplete {
  .v-input {
    .v-input__control {
      .v-progress-linear__background {
        background: #0082DE !important;
      }
    }
  }

}


</style>
