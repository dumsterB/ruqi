<template lang="pug">
  .form-search-autocomplete
    v-text-field(
      :name="name"
      v-model="newSearchText"
      :loading="loading"
      :placeholder="params.placeholder"
      single-line
      outlined
      :filled="params.filled"
      :dense="params.dense"
      clearable
      hide-details
      :prepend-inner-icon="icon_code"
      @input="setItemsListYandex"
      id="suggest"
    )
    .search-results(v-if="isShowList" v-click-outside="onClickOutside")
      .item-result(v-for="item in items" @click="selectItem(item.displayName)" ) {{ item.displayName }}


</template>

<script>

import _ from 'lodash';
import {loadYmap} from 'vue-yandex-maps';

export default {
  props: {
    name: {
      type: String,
      default: '',
    },
    params: {
      type: Object,
      default() {
        return {}
      }
    },
    icon: {
      type: String,
      default: '',
    },
    value: {
      type: String,
      default: '',
    },
  },

  data() {
    return {
      loading: false,
      items: [],
      newSearchText: '',
      isShowList: false,
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
    params: {
      handler() {
        this.loading = this.params.loading;
        this.items = this.params.states;

        if (this.items && this.items.length) {
          this.isShowList = true;
        } else {
          this.isShowList = false;
        }
      },
      deep: true
    },
    value: function () {
      this.newSearchText = this.value;
    },
  },

  methods: {

    setItemsList: _.debounce(
      function () {
        this.$emit('input', this.newSearchText);
        if (this.newSearchText) {
          this.$emit('setItemsList', this.newSearchText);
        } else {
          this.isShowList = false;
        }
      },
      400
    ),

    async setItemsListYandex() {

      this.$emit('input', this.newSearchText);

      let self = this;

      if (this.newSearchText) {
        ymaps.suggest(this.newSearchText).then(function (items) {
          self.items = items;
          if (items.length) {
            self.isShowList = true;
          } else {
            self.isShowList = false;
          }
        });
      }
    },

    selectItem(item) {
      this.newSearchText = item;
      this.isShowList = false;
      this.$emit('input', this.newSearchText);
    },

    onClickOutside() {
      this.isShowList = false;
      this.$emit('input', this.newSearchText);
    }
  },

  created() {
    this.newSearchText = this.value;
  },

  async mounted() {
    await loadYmap({debug: true});
  }
}
</script>

<style lang="scss">

.form-search-autocomplete {
  position: relative;

  .v-input {
    z-index: 2;
    background: #fff;
  }

  .search-results {
    position: absolute;
    width: 100%;
    left: 0;
    top: 48px;
    background: #fff;
    border: 1px solid #E0E0E0;
    border-radius: 4px;
    padding: 12px 0;
    max-height: 300px;
    overflow: auto;
    z-index: 1;
    box-shadow: 0 0 73px 5px rgba(0, 0, 0, 0.1);

    .item-result {
      display: flex;
      align-items: center;
      padding: 8px 16px;
      min-height: 48px;
      cursor: pointer;
      transition: .3s cubic-bezier(.25, .8, .5, 1);

      &:hover {
        background: #f6f6f6;
      }
    }
  }

}


</style>
