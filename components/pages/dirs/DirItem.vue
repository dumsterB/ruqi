<template lang="pug">
router-link.text-decoration-none(:to="{name: 'dirs-id', params: {id: item.id}}")
  v-hover(v-slot="{ hover }")
    v-sheet.wrapper.d-flex.align-center.pl-6-05.pr-5.py-4.border-all.br-14(:class="{'box-shadow': hover}")
      span.mr-auto.font-weight-medium.name {{ item.title }}
      span.mr-4.grey-custom--text.font-weight-medium.text-body-2 {{ item.countRecords }} {{ labelCountRecords }}
      v-btn.mb-2(fab icon small)
        v-icon.font-weight-medium.pointer.flex-shrink-0(color="grey-custom") mdi-dots-vertical
</template>

<script>
import {declensionOfNumber} from '@/constants/helpers'
export default {
  name: "DirItem",
  props: {
    item: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      labelsCountRecords: ['запись', 'записи', 'записей']
    }
  },
  computed: {
    labelCountRecords() {
      return declensionOfNumber(this.item.countRecords, this.labelsCountRecords)
    }
  }
}
</script>

<style scoped lang="scss">
.wrapper {
  max-height: 63px;
}
.name {
  font-size: 18px;
}
</style>
