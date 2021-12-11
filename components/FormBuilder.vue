<template>
  <div>
    <v-row>
      <v-col cols="12" :lg="item.col"
             v-for="(item, index) in meta" :key="index">
        <div class="form-part-label" v-if="item.label">{{ item.label }}</div>
        <div class="d-flex w-100">
          <component
            :is="item.type"
            :name="item.name"
            :icon="item.icon"
            :params="item.params"
            @input="updateFiled(item.name, $event)"
          />
          <a href="#" v-if="item.remove" @click.prevent="removeItem(index)" class="remove-item">
            <img src="/img/ico_close.svg" alt="Удалить">
          </a>
        </div>
      </v-col>
    </v-row>
  </div>
</template>

<script>
export default {
  props: ['meta',],
  data() {
    return {
      formValues: {},
    }
  },
  methods: {
    updateFiled() {

    },
    removeItem(index) {
      this.$emit('removeItem', index);
    }
  },
  computed: {},
  created() {
    this.meta.map(f => {
      // Vue.set(this.formValues, f.name, null)
    })
  }
}
</script>

<style lang="scss" scoped>
.remove-item {
  margin-left: 16px;
  margin-top: 14px;
}

</style>
