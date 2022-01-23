<template>
  <div class="add-performers-filter">
    <div class="wraper js-filter-scrollbox">
      <div class="select-group">
        <AddPerformersFilterSelect
          class="select"
          :items="regions"
          :title="selects.geography.name"
          :slug="selects.geography.slug"
          @set_filter="( params ) => { handlers().setFilter( params ) }"
        />

        <AddPerformersFilterSelect
          class="select"
          :items="selects.category.items"
          :title="selects.category.name"
          :slug="selects.category.slug"
          @set_filter="( params ) => { handlers().setFilter( params ) }"
        />

        <AddPerformersFilterSelect
          class="select"
          :items="specializations"
          :title="selects.profession.name"
          :slug="selects.profession.slug"
          @set_filter="( params ) => { handlers().setFilter( params ) }"
        />

        <AddPerformersFilterSelect
          class="select"
          :items="selects.rate.items"
          :title="selects.rate.name"
          :slug="selects.rate.slug"
          @set_filter="( params ) => { handlers().setFilter( params ) }"
        />
      </div>

      <div class="apply-btn" @click="handlers().applyFilter()">
        <div class="wrapper">
          <div class="filter-title">
            Применить 
          </div>
        </div>
      </div>
    </div>
    </div>
</template>

<script>

  import {mapState, mapActions, mapGetters, mapMutations} from 'vuex';

  export default {
    components  : {},

    props : {},

    computed : {
      ...mapGetters( 'dictionary', [ 'regions', 'specializations' ] ),
    },

    data ()
    {
      return {
        selects : {
          geography : {
            name  : 'География',
            slug  : 'geography',
            items : [
              {
                name  : "option География 1",
              },

              {
                name  : "option География 2",
              },

              {
                name  : "option География 3",
              },

              {
                name  : "option География 4",
              },
            ],
          },

          category : {
            name  : 'Категория',
            slug  : 'category',
            items : [
              {
                name  : "option Категория",
              },
            ],
          },

          profession : {
            name  : 'Профессия',
            slug  : 'profession',
            items : [
              {
                name  : "option Профессия",
              },
            ],
          },

          rate : {
            name  : 'Ставка',
            slug  : 'rate',
            items : [
              {
                name  : "option Ставка",
              },
            ],
          },
        }
      }
    },

    methods : {
      ...mapActions( 'dictionary', [ 'fetchRegions', 'fetchSpecializations', ] ),
      ...mapActions( 'contractors', [ 'setFilterRegion', 'setFilterSpecialization', ] ),

      handlers ()
      {
        return {
          setFilter : ( params ) => {
            console.debug( 'setFilter' );
            console.debug( params );

            switch ( params.filter )
            {
              case 'geography' :
                this.setFilterRegion( params.value );
              break;

              case 'profession' :
                this.setFilterSpecialization( params.value );
              break;
            }
          },

          applyFilter : () => {
            this.$emit( 'apply_filter' );
          },
        }
      },

      init ()
      {
        this.fetchRegions();
        this.fetchSpecializations();
      },
    },

    mounted ()
    {
      this.init();
    },
  }
</script>

<style lang="scss" scoped>

  /* OBJECTS STYLES START */
    .add-performers-filter {
      background    : #F6FBFF;
      border-radius : 10px;

      .wraper {
        display         : flex;
        flex-direction  : row;
        flex-wrap       : nowrap;
        align-content   : center;
        justify-content : flex-start;
        align-items     : center;
        padding         : 19px 20px;
        overflow-x      : scroll;

        .select-group {
          display : flex;

          .select {
            margin-left : 16px;

            &:first-child {
              margin-left : 0;
            }
          }
        }

        .apply-btn {
          margin-left : 32px;

          .wrapper {
            padding : 5px;

            .filter-title {
              font-weight: bold;
              font-size: 14px;
              line-height: 125%;
              /* or 17px */

              display: flex;
              align-items: center;
              text-align: center;
              text-transform: uppercase;

              /* Фирменный синий */

              color: #0082DE;
            }
          }
        }
      }
    }
  /* OBJECTS STYLES END */
</style>