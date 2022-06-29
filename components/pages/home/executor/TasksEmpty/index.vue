<template lang="pug">
  .rq-tasks-empty-wrapper
    .rq-tasks-empty
      .rq-tasks-empty-header.mb-4  {{ title }}
      .rq-tasks-empty-content.mb-8 {{ description }}
      .rq-tasks-empty-btn
        v-btn.btn-blue(text, height="57", outlined, @click="searchTasks")
          v-icon mdi-magnify
          span Найти новые заявки


</template>

<script>
export default {

  props: {
    title: {
      type: String,
      default: '',
    },
    description: {
      type: String,
      default: '',
    },
  },

  data() {
    return {}
  },

  computed: {},

  watch: {},

  methods: {
    searchTasks() {
      this.$router.push("/tasks/contractor/search/");
    }
  },

  created() {
  },

  mounted() {
  },
}
</script>

<style lang="scss">

.rq-tasks-empty-wrapper {
  display: flex;
  justify-content: center;
  margin-top: 80px;

  .rq-tasks-empty {

    display: flex;
    justify-content: center;
    align-items: center;
    max-width: 380px;
    flex-direction: column;

    .rq-tasks-empty-header {
      font-weight: 700;
      font-size: 22px;
    }

    .rq-tasks-empty-content {
      font-weight: 400;
      text-align: center;
    }

    .rq-tasks-empty-btn {
      .v-btn {
        text-transform: none;
        font-weight: 600;
        font-size: 18px;
        border-radius: 14px;

        .v-icon{
          margin-right: 8px;
        }
      }
    }

  }

}

@media screen and (max-width: 768px) {
  .rq-tasks-empty-wrapper {

    .rq-tasks-empty {

      .rq-tasks-empty-header {
        font-size: 16px;
      }

      .rq-tasks-empty-content {
        font-size: 14px;
      }

      .rq-tasks-empty-btn {
        .v-btn {
          height: 40px !important;
          font-size: 14px;
          border-radius: 6px;

        }
      }

    }

  }
}


</style>
