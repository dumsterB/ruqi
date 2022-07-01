<template lang="pug">
  .rq-cptess
    v-text-field.rq-cptess__search-line(
      single-line
      outlined
      prepend-inner-icon="mdi-magnify"
      v-model="newSearchText"
      @input="setSearch"
      hide-details
      placeholder="Введите название работ или професси"
      clearable
    )

</template>

<script>

import _ from 'lodash';

export default {
  components: {},
  props: {},
  computed: {},
  watch: {},
  methods: {
    setSearch: _.debounce(
      function () {
        this.$emit('applySearch', this.newSearchText);
      },
      400
    ),
  },

  data() {
    return {
      newSearchText: '',
    }
  },
  created() {
  },
  mounted() {
  },
}
</script>

<style lang="scss">
.rq-cptess {
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  align-content: center;
  justify-content: flex-start;
  align-items: center;
  padding: 0px 16px;
  height: 40px;
  width: 100%;

  &__search {
    &-icon {
    }

    &-line {
      flex: 1;
      margin-left: 10px;

      &:focus-visible {
        outline: none;
      }

      .v-input__control {
        border-radius: 20px;

        .v-input__slot {
          background: #fff !Important;
          min-height: 40px !Important;

          input {
            width: 100%;
          }

          fieldset{
            border-radius: 20px;
          }
        }
      }

    }
  }

}
</style>
