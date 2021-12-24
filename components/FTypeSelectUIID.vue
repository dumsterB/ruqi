<template>
  <div>
    <v-select
      v-model="select"
      :id="id"
      :items="options"
      :item-text="item_text_v"
      item-value="uuid"
      :rules="[v => !!v || 'Выберите вариант']"
      required
      single-line
      outlined
      filled
      @input="$emit('input', select)"
      hide-details="auto"
      :prepend-inner-icon="icon_code"

    ></v-select>
  </div>
</template>

<script>
export default {
  props: ['id', 'name', 'icon', 'params', 'item_text'],
  computed: {
    options() {
      return this.params.options
    },
    item_text_v() {
      return this.params.item_text
    },
    icon_code() {
      if (this.icon){
        return this.icon;
      }
      else{
        return null;
      }
    },
  },
  data() {
    return {
      select: '',
    }
  },
  methods: {},
  created() {
    this.select = this.params.uuid;
  }
}
</script>

<style>

</style>
