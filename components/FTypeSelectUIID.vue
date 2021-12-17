<template>
  <div>
    <v-select
      v-model="select"
      :id="id"
      :items="options"
      :item-text="item_text"
      item-value="uuid"
      :rules="[v => !!v || 'Item is required']"
      required
      single-line
      outlined
      filled
      @input="$emit('input', select)"
      hide-details="true"
      :prepend-inner-icon="icon_code"
    ></v-select>
  </div>
</template>

<script>
export default {
  props: ['id', 'name', 'icon', 'params'],
  computed: {
    options() {
      return this.params.options
    },
    item_text() {
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
      select: null,
    }
  },
  methods: {},
  created() {
    //this.select = this.params.options[0].uuid;
  }
}
</script>

<style>

</style>
