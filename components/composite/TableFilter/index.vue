<template lang="pug">
  .ruqi-table-filter.d-flex.align-center
    v-menu(
      bottom,
      offset-y,
      nudge-bottom="10",
      content-class="filters-menu"
      :close-on-content-click="false"
      v-model="isOpened"
      z-index="500"
    )
      template(v-slot:activator="{ on }")
        v-btn.filter-btn(icon, v-on="on" :class="{ active: isApplyFilter }")
          v-badge(color="#EB4D3D" dot :value="isApplyFilter" offset-y="8" offset-x="8")
            v-icon(color="#7A91A9") mdi-filter-outline

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
                  v-expansion-panel(v-for="( item, index ) in selected_fields" :key="index")
                    v-expansion-panel-header {{ fieldHeader(item.field) }}
                    v-expansion-panel-content
                      component(
                        :is="nameComponent(item.type)"
                        :name="item.field + '_' + index"
                        :params="item"
                        :label = "fieldHeader(item.field)"
                        @input="updateFiled(item.field , $event, index)"
                      )

                  v-expansion-panel(v-if="check_fields.length>0")
                    v-expansion-panel-header Ограничения
                    v-expansion-panel-content
                      component(
                        v-for="( item, index ) in check_fields" :key="index"
                        :is="nameComponent(item.type)"
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

    Search(:searchText="searchText" @updateSearchText="updateSearchText" @blurSearch="$emit('blurSearch')" @focusSearch="$emit('focusSearch')")


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
      isApplyFilter: false,
    }
  },
  computed: {
    selected_fields(){
      let filters = [];
      for (let i = 0; i < this.filter.length; i++) {
        if(this.filter[i].type != 'string' && this.filter[i].type != 'text' && this.filter[i].type != 'boolean'){
          filters.push(this.filter[i]);
        }
      }
      return filters;
    },
    check_fields(){
      let filters = [];
      for (let i = 0; i < this.filter.length; i++) {
        if(this.filter[i].type == 'boolean'){
          filters.push(this.filter[i]);
        }
      }
      return filters;
    },
  },
  methods: {
    nameComponent(type) {
      if (type == 'list') {
        return 'Flist';
      } else if (type == 'range' || type == 'range_composit') {
        return 'Frange';
      } else if (type == 'boolean') {
        return 'Fboolean';
      } else if (type == 'string' || type == 'text' || type == 'integer') {
        return 'Fstring';
      }
    },
    fieldHeader(field) {

      let header = this.headers.filter(obj => obj.field == field),
        translit_header = '';

      if (header.length) {
        translit_header = header[0].translit;
      }

      if (header[0] && header[0].unit) {
        translit_header = translit_header + ' ' + header[0].unit;
      }

      return translit_header;
    },
    updateFiled(field, value, index) {
      this.selected_fields[index].value = value;
      console.log('field, value, index ---- ', field, value, index, this.selected_fields);
    },
    applyFilter() {

      const sentFilter = [];
      for (let i = 0; i < this.selected_fields.length; i++) {
        if(this.selected_fields[i].value){
          if (!Array.isArray(this.selected_fields[i].value) || Array.isArray(this.selected_fields[i].value) && this.selected_fields[i].value.length){
            sentFilter.push(this.selected_fields[i]);
          }
        }
      }
      this.$emit('applyFilter', sentFilter, this.searchText);

      this.isOpened = false;

      if(sentFilter.length){
        this.isApplyFilter = true;
      }

    },
    clearFields() {
      this.$refs.form.reset();
      this.panel = [];
      for (let i = 0; i < this.filter.length; i++) {
        this.filter[i].value = null;
      }
      this.$emit('applyFilter', [], this.searchText);
      this.hideFilter();
      this.isApplyFilter = false;
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
  async created() {
    for (let i = 0; i < this.fields.length; i++) {
      this.filter.push(
        {
          "type": this.fields[i].type,
          "field": this.fields[i].field,
          "value": null,
          "options": this.fields[i].options,
        }
      )
    }
  },
}
</script>

<style lang="scss">

@import '/assets/scss/colors.scss';

.ruqi-table-filter {
  flex: 1;

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
