<template lang="pug">
.tasks-executor-search
  .tasks-executor-search--mobile
    .tasks-executor-search--mobile__header
      .tasks-executor-search--mobile__header-title Поиск работы

      mSearchLine.tasks-executor-search--mobile__header-search
      mContentDisplayController.tasks-executor-search--mobile__header-display-ctrl

    mTasksFilter(
      :isFilterShowed="mFilterVisibility"
      :loader="loaderFilter"
      :regions="regions"
      :region="region"
      :professions="professions"
      :radii="radii"
      :radius="radius"
      :salary="salary"
      @showFilter="showMobFilter"
      @hideFilter="hideMobFilter"
      @selectRegion="selectRegion"
      @selectProfession="selectProfession"
      @selectRadius="selectRadius"
      @setSalary="setSalary"
      @apply="applyFilter"
      @reset="resetFilter"
    )

  .tasks-executor-search--desktop
    h1 Поиск работы
    TasksFilter
    ContentDisplayController.tasks-executor-search--desktop__content-display-ctrl

  TasksList.tasks-executor-search--task-list(:tasks="searchTasks")
</template>

<script>
import { mapActions, mapGetters, } from 'vuex';
import ContentDisplayController from '@/components/pages/tasks/executor/search/ContentDisplayController/desktop';
import mContentDisplayController from '@/components/pages/tasks/executor/search/ContentDisplayController/mobile';
import TasksFilter from '@/components/pages/tasks/executor/search/TasksFilter/desktop';
import mTasksFilter from '@/components/pages/tasks/executor/search/TasksFilter/mobile';
import TasksList from '@/components/pages/tasks/executor/search/TasksList';
import mSearchLine from '@/components/pages/tasks/executor/search/SearchLine';

export default {
  components: {
    ContentDisplayController,
    mContentDisplayController,
    TasksFilter,
    mTasksFilter,
    TasksList,
    mSearchLine,
  },

  props: {},
  data: () => ({
    mFilterVisibility: false,
    loaderFilter: false,
    region: null,
    radius: null,
    salary: null,
    medicalBook: false,
    driverLicense: false,
    startDate: null,
    selectedProfessions: [],

    /* DICTIONARY */
    radii: [
      {
        uuid: '1km',
        name: '1км',
        value: '1',
      },
      {
        uuid: '10km',
        name: '10км',
        value: '10',
      },
      {
        uuid: '15km',
        name: '15км',
        value: '15',
      },
    ],
    regions: [],
    professions: [],
  }),
  computed: {
    ...mapGetters('user', [
      'searchTasks',
    ]),
  },

  watch: {},
  methods: {
    ...mapActions('user', [
      'fetchSearchTasks',
    ]),
    ...mapActions('dictionary', [
      'fetchRegions',
      'fetcProfessions',
    ]),

    /* GETTERS */
    /* SETTERS */
    /* HANDLERS */
    showMobFilter() {
      this.mFilterVisibility = true;
    },
    hideMobFilter() {
      this.mFilterVisibility = false;
    },
    selectRegion(payload = null) {
      if (payload) this.region = payload;
    },
    selectProfession(payload = null) {
      if (!payload) return;

      if (this.selectedProfessions.findIndex(profession => profession.uuid === payload.uuid) !== -1) {
        this.selectedProfessions = this.selectedProfessions.filter(profession => profession.uuid !== payload.uuid);
      } else {
        this.selectedProfessions.push(payload);
      }
    },
    selectRadius(payload = null) {
      if (payload) this.radius = payload;
    },
    setSalary(payload = null) {
      this.salary = payload;
    },
    async applyFilter() {
      this.loaderFilter = true;

      const FILTER = {
        region: this.region ? this.region.name : null,
        radius: this.radius ? this.radius.value : null,
        salary: this.salary,
        medicalBook: this.medicalBook,
        driverLicense: this.driverLicense,
        startDate: this.startDate,
        selectedProfessions: this.selectedProfessions.length
          ? this.selectedProfessions.map(profession => profession.name)
          : null,
      };

      console.debug("applyFilter", FILTER); // DELETE

      await this.fetchSearchTasks({ filter: FILTER })

      this.loaderFilter = false;
      this.mFilterVisibility = false;
    },
    resetFilter() {
      this.region = null;
      this.radius = null;
      this.salary = null;
      this.medicalBook = false;
      this.driverLicense = false;
      this.startDate = null;
      this.selectedProfessions = [];
      this.professions = this.professions.map((profession) => ({
        ...profession,
        selected: false,
      }));
    }

    /* HELPERS */
  },

  async created() {
    this.regions = await this.fetchRegions();
    await this.fetcProfessions().then((professions) => {
      this.professions = professions.map((profession) => ({
        ...profession,
        selected: false,
      }));
    });

    this.fetchSearchTasks()
  },
  mounted() { },
}
</script>

<style lang="scss">
.tasks-executor-search {
  &--desktop {
    display: block;
    max-width: 1272px;

    &__content-display-ctrl {
      margin-top: 32px;
    }
  }

  &--mobile {
    display: none;

    &__header {
      display: flex;
      flex-direction: column;
      flex-wrap: nowrap;
      align-content: center;
      justify-content: center;
      align-items: center;
      background: #0082DE;
      padding-top: 16px;
      padding-bottom: 32px;

      &-title {
        font-family: 'Source Sans Pro';
        font-style: normal;
        font-weight: 700;
        font-size: 24px;
        line-height: 125%;
        color: #FFFFFF;

        @media screen and (min-width: 370px) {
          width: 344px;
        }

        @media screen and (max-width: 370px) {
          width: 315px;
        }
      }

      &-search {
        margin-top: 16px;
      }

      &-display-ctrl {
        margin-top: 20px;
      }
    }
  }

  &--task-list {
    margin-top: 24px;
  }

  @media screen and (max-width: 768px) {
    &--desktop {
      display: none;
    }

    &--mobile {
      display: block;
    }
  }
}
</style>
