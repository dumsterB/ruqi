<template lang="pug">
  div
    header-secondary
      .d-flex.align-center
        v-btn(fab icon small)
          v-icon(color="#7A91A9") mdi-filter-outline
        search-field(v-model="search")
    v-container.mt-6.d-flex.flex-column
      dir-item.mb-4(v-for="item in filteredDirsList" :key="item.id" :item="item")
</template>

<script>
import {mapActions} from "vuex";
import HeaderSecondary from "../../components/pages/HeaderSecondary";
import DirItem from "../../components/pages/dirs/DirItem";
import SearchField from "@/components/SearchField";
import dirs from '@/data/dirs.json'

export default {
  name: "PageDirs",
  components: {DirItem, SearchField, HeaderSecondary},
  meta: {
    title: 'Справочники'
  },
  data() {
    return {
      search: '',
      dirsList: dirs
    }
  },
  computed: {
    filteredDirsList() {
      const searchLower = this.search.toLowerCase()
      return this.dirsList.filter((item) => {
        item.countRecords = 0
        return item.title.toLowerCase().includes(searchLower)
      })
    }
  },
  methods: {
    ...mapActions("breadcrumbs", ["initBreadcrumbs"]),
  },
  created() {
    this.initBreadcrumbs(this.$route.fullPath)
  },
}
</script>

<style lang="scss">
.ruqi.page--dirs {
  padding: 0;
}
</style>
