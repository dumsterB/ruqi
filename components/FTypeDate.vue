<template>
  <div>
      <v-menu
        ref="menu1"
        v-model="menu"
        :close-on-content-click="false"
        transition="scale-transition"
        offset-y
        max-width="290px"
        min-width="auto"
      >
        <template v-slot:activator="{ on, attrs }">
          <v-text-field
            v-model="dateFormatted"
            :name = "name"
            prepend-icon="mdi-calendar"
            v-bind="attrs"
            @blur="date = parseDate(dateFormatted)"
            v-on="on"
            filled
            single-line
            outlined
            hide-details="true"
          ></v-text-field>
        </template>
        <v-date-picker
          v-model="date"
          no-title
          @input="updateDate"
        ></v-date-picker>
      </v-menu>
  </div>
</template>

<script>
export default {
  props: ['id', 'name', 'params'],
  data() {
    return {
      date: (new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10),
      dateFormatted: this.formatDate((new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10)),
      menu: false,
    }
  },
  methods: {
    formatDate (date) {
      if (!date) return null

      const [year, month, day] = date.split('-')
      return `${month}/${day}/${year}`
    },
    parseDate (date) {
      if (!date) return null

      const [month, day, year] = date.split('/')
      return `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`
    },
    updateDate(){
      this.$emit('input', this.date);
      this.menu = false;
    }
  },
  watch: {
    date(val) {
      this.dateFormatted = this.formatDate(this.date)
    },
  },
}
</script>

<style>

</style>
