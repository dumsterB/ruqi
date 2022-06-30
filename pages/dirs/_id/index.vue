<template lang="pug">
div(v-if="dir")
  header-secondary
    .d-flex.align-center.w-full
      v-btn.mr-7(outlined large height="48" @click="$router.push({name: 'dirs'})")
        v-icon mdi-chevron-left
        span.font-weight-bold Назад
      .title.mr-7 Категория: {{ dir.title }}
      v-btn(fab icon small)
        v-icon(color="#7A91A9") mdi-filter-outline
      search-field(v-model="search")
      v-btn.ml-auto.grey.lighten-4(min-width="48" height="48" color="grey-custom" outlined)
        v-icon(color="grey-custom") mdi-dots-horizontal
  v-data-table.table(
    :headers="headers"
    :items="items"
    item-key="uuid"
    hide-default-footer
    show-select
    disable-pagination
    v-model="selectedItems"
    :loading="loading"
  )
    template(v-slot:item.actions="{ item }")
      .d-flex.justify-end.card-actions
        v-menu(
          bottom,
          rounded="10",
          offset-y,
          nudge-bottom="10",
          content-class="card-actions-menu"
        )
          template(v-slot:activator="{ on }")
            v-btn.actions-btn(icon, v-on="on")
              v-icon mdi-dots-horizontal
    template(v-slot:header.settings="{ header }")
        v-icon.fz-18(color="grey-custom") mdi-cog-outline
    template(v-slot:item.name="{item}")
      router-link.text-decoration-none.name(:to="{name: 'dirs-id-profession', params: {profession: item.uuid}}") {{item.name}}
</template>

<script>
import {mapActions} from "vuex"
import HeaderSecondary from "@/components/pages/HeaderSecondary"
import SearchField from "@/components/SearchField"
import dirs from '@/data/dirs.json'

export default {
  name: "PageDirsId",
  components: {
    HeaderSecondary,
    SearchField
  },
  data() {
    return {
      search: '',
      selectedItems: [],
      loading: false,
      items: [],
      dir: null
    }
  },
  computed: {
    headers() {
      return [
        {
          text: "",
          value: "actions",
          sortable: false,
          width: "70px",
          class: "actions",
          align: "center",
        },
        ...this.dir?.tableView,
        {
          text: "",
          value: "settings",
          sortable: false,
          width: "50px",
        },
      ]
    }
  },
  methods: {
    ...mapActions("breadcrumbs", ["initBreadcrumbs",]),
  },
  async created() {
    this.dir = dirs.find(item => item.id === this.$route.params.id)
    if (!this.dir) {
      this.$nuxt.error('Dir not found')
      return
    }
    this.loading = true
    this.$route.meta.title = this.dir.title
    this.initBreadcrumbs(this.$route.fullPath)
    try {
      const {data: {data}} = await this.$axios.get(`/${this.dir.methods.getList.url}`)
      this.items = data
    } catch (e) {
      console.log(e)
    }
    this.loading = false
  },
}
</script>

<style lang="scss">
.ruqi.page--dirs-id {
  padding: 0;
  .v-data-table.table {
    width: calc(100% + 24px);
    max-width: none;
    margin-left: -12px;
    .v-data-table__wrapper > table  {
      > tbody > tr ,
      > thead > tr > th {
        height: 40px !important;
      }
      > tbody > tr > td,
      > thead >  tr > th {
        padding-left: 10px !important;
      }
      > tbody > tr > td:first-child,
      > thead >  tr > th:first-child {
        padding-left: 20px !important;
      }
      > tbody > tr > td:last-child,
      > thead >  tr > th:last-child {
        padding-right: 20px !important;
      }
      > thead > tr  {
        th:nth-child(n + 3) {
          position: relative;
          &::before {
            content: '';
            display: block;
            position: absolute;
            width: 1px;
            top: 10px;
            left: 0;
            bottom: 10px;
            background: #EEEEEE;
          }
          span {
            text-transform: uppercase;
            font-size: 12px;
            font-weight: 700;
            color: $grey-custom;
          }
        }
      }
      > tbody > tr > td {
        font-size: 16px !important;
        font-weight: 600;
        color: #666666;
        border-bottom: none !important;
      }
    }
    .name {
      color: #666666;
    }
  }
}
</style>
<style scoped lang="scss">
.title {
  font-weight: 600;
  font-size: 20px;
}
</style>

