<template lang="pug">
  .ruqi-table-filter.d-flex.align-center
    v-menu(
      bottom,
      offset-y,
      nudge-bottom="10",
      content-class="filters-menu"
      :close-on-content-click="false"
      v-model="isOpened"
    )
      template(v-slot:activator="{ on }")
        v-btn(icon, v-on="on")
          v-icon mdi-filter-outline

      v-card
        v-list-item-content.pa-0.elevation-0
          .filter-container
            .filter-header.d-flex.align-center.pa-6.justify-space-between
              .header Фильтр
              .actions
                a(@click.prevent="clearFields") Очистить все
                a(@click.prevent="applyFilter") Сохранить

            .filter-content
              v-form(ref="form" v-model="valid" lazy-validation)
                v-expansion-panels(accordion multiple v-model="panel")
                  v-expansion-panel(v-for="( item, index ) in fields" :key="index")
                    v-expansion-panel-header {{ fieldHeader(item.field) }}
                    v-expansion-panel-content
                      component(
                        :is="nameComponent(item.type_value)"
                        :name="item.field + '_' + index"
                        :params="item"
                        :label = "fieldHeader(item.field)"
                        @input="updateFiled(item.field , $event, index)"
                      )

            .filter-footer.d-flex.justify-space-between.pa-6
              v-btn.add(text height="48" outlined @click="hideFilter")
                span отмена
              v-btn.btn-blue.add.ml-4(text height="48" outlined @click="applyFilter")
                span применить

    Search(:searchText="searchText" @updateSearchText="updateSearchText")


</template>

<script>

import Fstring from "@/components/composite/TableFilter/fileds/Fstring";
import Flist from "@/components/composite/TableFilter/fileds/Flist";
import Frange from "@/components/composite/TableFilter/fileds/Frange";
import Fboolean from "@/components/composite/TableFilter/fileds/Fboolean";
import Search from "@/components/composite/TableFilter/Search";

export default {
  props: {
    fields: {
      type: Array,
      default: [],
    },
    headers: {
      type: Array,
      default: [],
    },
  },
  components: {Fstring, Flist, Frange, Fboolean, Search},
  data() {
    return {
      valid: true,
      isOpened: false,
      panel: [],
      filter: [],
      searchText: '',
    }
  },
  computed: {

  },
  methods: {
    nameComponent(type_value) {
      if (type_value == 'list') {
        return 'Flist';
      } else if (type_value == 'range') {
        return 'Frange';
      } else if (type_value == 'boolean') {
        return 'Fboolean';
      } else if (type_value == 'string' || type_value == 'text' || type_value == 'integer') {
        return 'Fstring';
      }
    },
    fieldHeader(field) {

      let header = this.headers.filter(obj => obj.field == field),
        translit_header = '';

      if (header.length) {
        translit_header = header[0].translit;
      }

      if (header[0].unit) {
        translit_header = translit_header + ' ' + header[0].unit;
      }

      return translit_header;
    },
    updateFiled(field, value, index) {
      this.filter[index].value = value;
    },
    applyFilter() {
      //console.log('this.filter-----', this.filter)
      const sentFilter = [];
      for (let i = 0; i < this.filter.length; i++) {
        if(this.filter[i].value){
          sentFilter.push(this.filter[i]);
        }
      }
      this.$emit('applyFilter', sentFilter, this.searchText);
      this.isOpened = false;
    },
    clearFields() {
      this.$refs.form.reset();
      this.panel = [];
      for (let i = 0; i < this.filter.length; i++) {
        this.filter[i].value = null;
      }
    },
    hideFilter() {
      this.isOpened = false;
    },
    defaultValue(type) {
      let defaultValue = null;
      if (type == 'range') {
        defaultValue = {};
      } else if (type == 'list') {
        defaultValue = [];
      }
      return defaultValue;
    },
    updateSearchText(value) {
      this.searchText = value;
      this.applyFilter();
    },
  },
  mounted() {

  },
  watch: {
    fields: function () {
      for (let i = 0; i < this.fields.length; i++) {
        this.filter[i] = {
          "type": this.fields[i].type_value,
          "field": this.fields[i].field,
          "value": null
        }
      }
    },
  },
}
</script>

<style lang="scss">

@import '/assets/scss/colors.scss';

.ruqi-table-filter {
  max-width: 392px;

  .wrap-search{
    fieldset{
      border: none !important;
    }
  }

}

.filters-menu {
  width: 100%;
  max-width: 392px;

  .v-card {
    border-radius: 10px;

    .filter-container {
      width: 100%;

      .filter-header {
        border-bottom: 1px solid #E2E4E5;

        .header {
          font-weight: 700;
          font-size: 18px;
        }

        .actions {
          a {
            color: #0082DE;
            text-transform: none;
            font-weight: 600;

            &:last-child {
              padding-right: 0;
            }

          }
        }
      }

      .filter-content {
        .v-expansion-panel-header {
          height: 52px;
          min-height: 52px;

          &.v-expansion-panel-header--active {
            font-weight: 600;
          }
        }

        .v-expansion-panel-content {
          background: #F7F7F7;

          .v-expansion-panel-content__wrap {
            padding: 16px 24px;
          }
        }

        .v-expansion-panel::before {
          box-shadow: none;
        }
      }

      .filter-footer {
        .add {
          min-width: 116px;
        }

        .btn-blue {
          flex: 1;
        }
      }
    }
  }
}

</style>
