<template lang="pug">
  .inner-task-page-selections
    SelectionHeader(@onBackToAppClick="onBackToAppClick")

    SelectionFilter

    Responses(:items="contractors" :headers="headers" :options="options" @callAction="callAction" @setSelected="setSelected")

</template>

<script>
import {mapState, mapActions, mapGetters, mapMutations} from 'vuex';
import SelectionFilter from "@/components/pages/tasks/task/extended/SelectionFilter";
import SelectionHeader from "@/components/pages/tasks/task/extended/SelectionHeader";
import Responses from "@/components/pages/tasks/task/extended/Responses";

export default {
  meta: {
    title: 'Подбор'
  },
  components: {SelectionFilter, Responses, SelectionHeader},
  data() {
    return {
      headers: [
        { text: "фио", align: "start", value: "fullname" },
        { text: "Лет", value: "age", width: '112px' },
        { text: "география", value: "geography", width: '286px' },
        { text: "ранг", value: "rang", width: '112px' },
        { text: "ставка", value: "rate", width: '112px'},
        { text: "профессия", value: "professions" },
        { text: "Работал", value: "works" },
      ],
      options: {},
      selectedItems: [],
    }
  },
  computed : {
    ...mapGetters("breadcrumbs", ["BREADCRUMBS"]),

    contractors () {
      return this.$store.getters[ 'request_id_dispatchers/request_id_search' ];
    },

  },
  methods: {
    ...mapActions( 'contractors', [ 'getContractors', 'inviteContractorsToVacancy', 'setSortColumn', 'setSortOrder' ] ),
    ...mapActions("breadcrumbs", ["initBreadcrumbs", "setBreadcrumbs"]),
    ...mapActions("request_id_dispatchers", ["fetchRequestIdSearch",]),

    onBackToAppClick(){
      this.$router.go(-1);
    },

    callAction({action, uuids, params}) {
      console.log('callAction ------', action, uuids);
      this[action](uuids, params);
    },

    setSelected(selected) {
      console.log(selected);
      this.selectedItems = selected;
    },

  },

  beforeDestroy() {
    this.setBreadcrumbs({
      crumbs: this.BREADCRUMBS.slice(0, this.BREADCRUMBS.length - 1),
    });
  },

  async created() {
    await this.fetchRequestIdSearch({
      requestId: this.$route.params.id,
      params: {"page": 1},
      concat: false,
      unit: true
    });

    this.initBreadcrumbs(this.$route.fullPath);

  }
}


</script>

<style lang="scss">

.ruqi.page--tasks-id-selection {
  padding: 0;
  background: #f5f5f5;

  .theme--light.v-application {
    background: #f5f5f5;
  }

  .inner-task-page-selections {

    background: #fff;

    >.container {
      padding: 0;
    }
  }

  .v-main__wrap {
    > .container {
      padding: 0;
    }
  }
}

</style>
