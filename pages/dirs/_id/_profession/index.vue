<template lang="pug">
div
  .d-flex.justify-center.mt-10(v-if="loading")
    v-progress-circular(color="primary" indeterminate)
  div(v-else)
    header-secondary
      .d-flex.align-center.w-full
        .title.mr-auto Редактирование записи: Грузчик
        div
          v-btn.mr-4.btn-blue(outlined text height="48" :loading="loadingForm" @click="onSubmit") Сохранить изменения
        v-btn(outlined text height="48" @click="$router.back()") Закрыть
    v-container.mt-8
      v-card.border-all.pa-5.br-14(:elevation="0" max-width="804" )
        .d-flex.flex-column
          .title.mb-9 Редактировать данные
          v-form(ref="form")
            .field.mb-9(v-for="item in form" :key="item.id")
              .mb-4.font-weight-bold {{ item.title }}
              component(v-bind="typesFields[item.type]" outlined hide-details v-model="item.value")
            div
              v-btn.mr-4.btn-blue(outlined text height="48" :loading="loadingForm" @click="onSubmit") Сохранить изменения
</template>

<script>
import HeaderSecondary from "@/components/pages/HeaderSecondary"
import {mapActions, mapMutations} from "vuex";
import dirs from "@/data/dirs.json";
import {LITERAL_TEXT} from "@/constants/regexp";
import {VTextField, VSelect} from 'vuetify/lib'

export default {
  name: "PageDirsIdProfession",
  components: {
    HeaderSecondary
  },
  data() {
    return {
      dir: null,
      form: {},
      title: null,
      loading: false,
      responseData: null,
      loadingForm: false
    }
  },
  computed: {
    typesFields() {
      return {
        text: {
          is: VTextField
        },
        dropdown: {
          is: VSelect
        }
      }
    },
    dataToSend() {
      const data = {}
      for(const key in this.form) {
        data[key] = this.form[key].value
      }
      return data
    }
  },
  methods: {
    ...mapActions("breadcrumbs", ["initBreadcrumbs",]),
    ...mapMutations("response", ["setSuccess","removeSuccess"]),
    getUrlRequest(method) {
      return this.dir.methods[method].url.split('/').map(item => {
        if (LITERAL_TEXT.test(item)) {
          item = this.$route.params.profession
        }
        return item
      }).join('/')
    },
    getEditableFields() {
      return this.dir ? this.dir.fields.filter(item => {
        return item.editable && this.dir.tableView.findIndex((el) => el.value === item.id) !== -1
      }) : []
    },
    setDataForm () {
      const arr = this.getEditableFields()
      arr.forEach(item => {
        this.form[item.id] = {
          ...item,
          value: this.responseData[item.id]
        }
      })
    },
    async onSubmit() {
      if (this.$refs.form.validate()) {
        this.loadingForm = true
        try {
          const type = this.dir.methods.update.type.toLowerCase()
          await this.$axios[type](`/${this.getUrlRequest('getInfo')}`, this.dataToSend)
          this.setSuccess({type: 'success', text: 'Данные изменены'})
          setTimeout(() => {
            this.removeSuccess()
          }, 2000);
        } catch (e) {
          const msg = e.response && e.response.data ? e.response.data.message : e
          this.setSuccess({type: 'error', text: msg})
          setTimeout(() => {
            this.removeSuccess()
          }, 2000);
        }
        this.loadingForm = false
      }
    }
  },
  async created() {
    this.dir = dirs.find(item => item.id === this.$route.params.id)
    if (!this.dir) {
      this.$nuxt.error('Dir not found')
      return
    }
    this.loading = true
    try {
      const type = this.dir.methods.getInfo.type.toLowerCase()
      const {data: {data}} = await this.$axios[type](`/${this.getUrlRequest('getInfo')}`)
      this.responseData = data
      this.setDataForm()

    } catch (e) {
      console.log(e)
    }
    this.$route.meta.title = 'Грузчик'
    this.initBreadcrumbs(this.$route.fullPath)
    this.loading = false
  }
}
</script>

<style lang="scss">
.ruqi.page--dirs-id-profession {
  padding: 0;
}
</style>
<style lang="scss" scoped>
.field {
  max-width: 534px;
}
</style>
