<template lang="pug">
.task-search-filter__index
  .task-search-filter__mobile
    mTasksFilter(
      :isFilterShowed="mFilterVisibility"
      :loader="loaderFilter"
      :regions="regions"
      :region="region"
      :professions="professions"
      :selectedProfessions="selectedProfessions"
      :radii="radii"
      :radius="radius"
      :salary="rate"
      :medicalBook="medicalBook"
      :driverLicense="driverLicense"
      @showFilter="showMobFilter"
      @hideFilter="hideMobFilter"
      @selectRegion="selectRegion"
      @selectProfession="selectProfession"
      @selectRadius="selectRadius"
      @setSalary="setSalary"
      @setMedicalBook="setMedicalBook"
      @setDriverLicense="setDriverLicense"
      @apply="applyFilter"
      @reset="resetFilter"
    )

  .task-search-filter__desktop
    dTasksFilter(
      :loader="loaderFilter"
      :regions="regions"
      :region="region"
      :professions="professions"
      :selectedProfessions="selectedProfessions"
      :radii="radii"
      :radius="radius"
      :salary="rate"
      :medicalBook="medicalBook"
      :driverLicense="driverLicense"
      @selectRegion="selectRegion"
      @selectProfessionDesktop="selectProfessionDesktop"
      @selectRadius="selectRadius"
      @setSalary="setSalary"
      @setMedicalBook="setMedicalBook"
      @setDriverLicense="setDriverLicense"
      @setStartDate="setStartDate"
      @apply="applyFilter"
      @reset="resetFilter"
    )
</template>

<script>
import dTasksFilter from './desktop';
import mTasksFilter from './mobile';

export default {
  components: {
    dTasksFilter,
    mTasksFilter,
  },

  props: {
    regions: {
      type: [],
      default: () => ([]),
    },
    professions: {
      type: [],
      default: () => ([]),
    },
    loaderFilter: {
      type: Boolean,
      default: false,
    },
    mFilterVisibility: {
      type: Boolean,
      default: false,
    },
  },
  data: () => ({
    region: null,
    radius: null,
    rate: null,
    medicalBook: false,
    driverLicense: false,
    startDate: null,
    selectedProfessions: [],

    /* DICTIONARY */
    radii: [
      {
        uuid: '1km',
        name: '1 км',
        value: '1',
      },
      {
        uuid: '10km',
        name: '10 км',
        value: '10',
      },
      {
        uuid: '15km',
        name: '15 км',
        value: '15',
      },
    ],
  }),
  computed: {},

  watch: {},
  methods: {
    /* GETTERS */
    /* SETTERS */
    /* HANDLERS */
    showMobFilter() {
      this.$emit('showMobFilter', true);
    },
    hideMobFilter() {
      this.$emit('hideMobFilter', false);
    },
    selectRegion(payload = null) {
      this.region = payload;
      console.log('selectRegion ---- ', payload)

      if(payload){
        this.radius = null;
      }
    },
    selectProfession(payload = null) {
      if (!payload) return;

      /*if (this.selectedProfessions.findIndex(profession => profession.uuid === payload.uuid) !== -1) {
        this.selectedProfessions = this.selectedProfessions.filter(profession => profession.uuid !== payload.uuid);
      } else {
        this.selectedProfessions.push(payload);
      }*/

      this.selectedProfessions = payload;
    },
    selectProfessionDesktop(payload = null) {
      if (!payload) return;

      this.selectedProfessions = payload;
    },
    selectRadius(payload = null) {
      console.log('радиус');
      if (payload) this.radius = payload;
    },
    setSalary(payload = null) {
      this.rate = payload;
    },
    setMedicalBook(payload = null) {
      console.debug('setMedicalBook', payload, this.medicalBook); // DELETE

      this.medicalBook = payload;
    },
    setDriverLicense(payload = null) {
      console.debug('setDriverLicense', payload); // DELETE

      this.driverLicense = payload;
    },
    setStartDate(payload = null) {
      this.startDate = payload;
    },
    async applyFilter() {
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

      let postBody = {},
        list_params = ['rate', 'region', 'medicalBook', 'driverLicense', 'startDate',];

      for (let i = 0; i < list_params.length; i++) {
        if (this[list_params[i]]) {
          postBody[list_params[i]] = this[list_params[i]];
        }
      }

      if (this.radius && this.radius.value && !this.region) {
        postBody.radius =  this.radius.value;

      }

      if (this.selectedProfessions.length > 0) {
        let selectedAll = [];

        for (let i = 0; i < this.selectedProfessions.length; i++) {
          selectedAll.push(this.selectedProfessions[i].name);
        }
        postBody.professions = JSON.stringify(selectedAll);
      }

      console.log('postBody---', postBody, this.region );

      this.$emit('apply', postBody);
    },
    resetFilter() {
      this.region = null;
      this.radius = null;
      this.rate = null;
      this.medicalBook = false;
      this.driverLicense = false;
      this.startDate = null;
      this.selectedProfessions = [];

      this.$emit('reset');
    },

    /* HELPERS */
  },

  created() { },
  mounted() { },
}
</script>

<style lang="scss">
.task-search-filter {
  &__index {}

  &__mobile {
    display: none;
  }

  &__desktop {
    display: block;
    max-width: 1272px;
  }

  @media screen and (max-width: 768px) {
    &__mobile {
      display: block;
    }

    &__desktop {
      display: none;
    }
  }
}
</style>
