<template>

  <v-overlay
    class="addPerformersOverlay"
    :opacity="addPerformersOpacity"
    :value="addPerformersOverlay"
  >
    <div class="addPerformersOverlay__content_wrapper">
      <div class="back-to-app" @click="handlers().onBackToAppClick()">
        <v-icon class="back-to-app__icon mdi mdi-menu-left"></v-icon>

        <div class="back-to-app__title">
          Вернуться к заявке
        </div>

      </div>

      
      <div class="addPerformersOverlay__content">
        <div class="addPerformersOverlay__content_header">
          Добавить исполнителей в заявку
        </div>

        <div class="addPerformersOverlay__content_body">
          <v-tabs
            v-model="tab"
            class="form-tabs"
            light
          >
            <v-tab>Категория</v-tab>
            <v-tab>Категория</v-tab>
          </v-tabs>

          <AddPerformersFilter
            class="filter"
            @apply_filter="handlers().applyFilter()"
          />

          <div class="table-list-style">
            <v-data-table
              v-model="selected"
              show-select
              :headers="PerformersTableHeaders"
              :items="contractors"
              class="elevation-0"
              item-key="uuid"
              :page.sync="page"
              :items-per-page="itemsPerPageTable"
              @page-count="pageCount = $event"
              hide-default-footer
              :search="searchText"
              light
            >
              <template v-slot:item.name="{ item }">
                <UserAvatar
                  :first_name="item.firstname"
                  :last_name="item.lastname"
                  :radius="avatarBorderRadius"
                  :date="item.birthday"
                  response="true"
                  :color="avatarColorManager"
                  :ist_detail_erlaubt="true"
                  :uuid="item ? item.uuid : ''"
                />
              </template>

              <template v-slot:item.rating="{ item }">
                <Rating :rating="item.rating" />
              </template>

              <template v-slot:item.address="{ item }">
                <div class="performer-address">
                  {{ item.address }}
                </div>
              </template>

              <template v-slot:item.onobject="{ item }">
                <div class="d-flex table-on-object">
                  <v-icon>mdi-home-variant-outline</v-icon>
                  <span class="num">
                    {{ item.work_count }}
                  </span>
                </div>
              </template>

              <template v-slot:item.invited="{ item }">
                <v-btn icon>
                  <img src="/img/ico_mail.svg" alt="mail">
                </v-btn>
                <v-btn icon>
                  <img src="/img/ico_telegram.svg" alt="telegram">
                </v-btn>
              </template>

              <template v-slot:item.actions="{ item }">
                <v-btn icon>
                  <v-icon>mdi-dots-vertical</v-icon>
                </v-btn>
              </template>
            </v-data-table>
          </div>
        </div>
      </div>
    </div>

    <AddPerformersSelectedPanel
      v-show="selected.length"
      :selected="selected.length"
      @select_performers="handlers().selectPerformers()"
    />
  </v-overlay>

</template>

<script>
  import { mapState, mapActions, mapGetters, mapMutations } from 'vuex';
  import Rating from "~/components/Rating";

  export default {
    components  : { Rating },

    props : {
      addPerformersOverlay  : {
        type      : Boolean,
        default   : false,
      }
    },

    computed : {
      ...mapGetters( 'contractors', [ 'contractors', ] ),

      request_id ()
      {
        return this.$store.getters[ 'request_id/request_id' ];
      },
    },

    data ()
    {
      return {
        addPerformersAbsolute : true,
        addPerformersOpacity  : 1,
        selected              : [],
        page                  : 1,
        itemsPerPageTable     : 10, //FIXME
        pageCount             : 3, //FIXME
        searchText            : '',
        avatarBorderRadius    : 'rounded',
        avatarColorManager    : '#36B368',

        PerformersTableHeaders  : [
          { text: 'фио', align: 'start', value: 'name', },
          { text: 'Рейтинг', value: 'rating'},
          { text: 'География работ', value: 'address'},
          { text: 'Работал', value: 'onobject'},
          { text: 'Приглашен', value: 'invited'},
          { text: '', value: 'actions', sortable: false},
        ],

        request_id_dispatchers  : [
          {
            address: "",
            avg_price: 3000,
            birthday: "2005-12-28 19:55:56",
            firstname: "Celia",
            fullname: "Marks Celia Abernathy",
            lastname: "Marks",
            middlename: "Abernathy",
            rating: 0,
            uuid: "329bf2d0-6fb6-4e0c-8ea2-553f7ebb9466",
          },

          {
            address: "",
            avg_price: 3000,
            birthday: "2005-12-28 19:55:56",
            firstname: "Celia",
            fullname: "Marks Celia Abernathy",
            lastname: "Marks",
            middlename: "Abernathy",
            rating: 0,
            uuid: "329bf2d0-6fb6-4e0c-8ea2-553f7ebb9466",
          },

          {
            address: "",
            avg_price: 3000,
            birthday: "2005-12-28 19:55:56",
            firstname: "Celia",
            fullname: "Marks Celia Abernathy",
            lastname: "Marks",
            middlename: "Abernathy",
            rating: 0,
            uuid: "329bf2d0-6fb6-4e0c-8ea2-553f7ebb9466",
          },

          {
            address: "",
            avg_price: 3000,
            birthday: "2005-12-28 19:55:56",
            firstname: "Celia",
            fullname: "Marks Celia Abernathy",
            lastname: "Marks",
            middlename: "Abernathy",
            rating: 0,
            uuid: "329bf2d0-6fb6-4e0c-8ea2-553f7ebb9466",
          },
        ],
      }
    },

    methods: {
      ...mapActions( 'contractors', [ 'getContractors', 'inviteContractorsToVacancy', ] ),

      handlers ()
      {
        return {
          onBackToAppClick : ( params = {} ) => {
            console.debug( "onBackToAppClick" );

            this.helpers().backToApp(
              {
                _this : this,
              }
            );
          },

          selectPerformers : ( params = {} ) => {
            console.debug( "selectPerformers" );
            console.debug( this.selected );

            let selectedContractors = [];

            if ( this.selected.length )
            {
              for ( let ctrId = 0; ctrId < this.selected.length; ctrId++ )
              {
                selectedContractors.push( this.selected[ ctrId ].uuid );
              }
            }

            console.debug( "selectedContractors" );
            console.debug( selectedContractors );

            console.debug( "request_id" );
            console.debug( this.request_id.uuid );

            let inviteContractorsToVacancyData = {
              contractors : selectedContractors,
              taskId      : this.request_id.uuid,
            };

            this.inviteContractorsToVacancy( inviteContractorsToVacancyData )
            .then(
              ( response = {} ) => {
                console.debug( 'inviteContractorsToVacancy success' ); //TODO //FIXME muss weg
                console.debug( response ); //TODO //FIXME muss weg

                this.helpers().backToApp(
                  {
                    _this : this,
                  }
                );
              }
            )
            .catch(
              ( error ) => {
                console.debug( 'inviteContractorsToVacancy error' ); //TODO //FIXME muss weg
                console.debug( error ); //TODO //FIXME muss weg
              }
            );
          },

          applyFilter : () => {
            console.debug( 'applyFilter' ); //TODO //FIXME muss weg

            this.getContractors();
          },
        }
      },

      helpers : () => {
        return {
          backToApp : ( params = {} ) => {
            console.debug( "backToApp" ); // FIXME muss weg

            params._this.selected = [];
            params._this.$emit( 'close' );
          },
        }
      },
    },

    mounted ()
    {
      /*console.debug( 'this.getContractors()' );
      this.getContractors();*/
    }
  }
</script>

<style lang="scss">

  /* OBJECTS STYLES START */
    .addPerformersOverlay {
      .v-overlay__content {
        width       : 100%;
        height      : 100%;
        overflow    : scroll;
        background  : #FFFFFF;
      }

      .addPerformersOverlay__content_wrapper {
        background    : #fff;
        width         : 100%;
        color         : #0082DE;
        padding-left  : 24px;
        padding-top   : 27px;
        padding-right : 140px;

        .back-to-app {
          width           : max-content;
          display         : flex;
          flex-direction  : row;
          flex-wrap       : nowrap;
          align-content   : center;
          justify-content : flex-start;
          align-items     : center;
          cursor          : pointer;
          margin-bottom   : 38px;

          .back-to-app__icon {
            color : inherit;
          }
        }

        .addPerformersOverlay__content {
          .addPerformersOverlay__content_header {
            font-weight   : bold;
            font-size     : 32px;
            line-height   : 125%;
            color         : #263043;
            margin-bottom : 20px;
          }
        }
      }
    }

  /* OBJECTS STYLES START */

  .v-tabs-bar {
    border-bottom: 1px solid #D5DEE8;
  }

  .form-tabs {
    margin-bottom : 21px !important;
  }

  .filter {
    margin-bottom: 32px;
  }

</style>