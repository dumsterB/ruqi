<template>
  <div>
    <div>
      <Header :content="title" :size="title_size" :isnew="false" :isback="false"/>
      <v-tabs
        v-model="tab"
        class="form-tabs"
      >
        <v-tab v-for="(item, index) in tabs_list" :key="index">
          {{ item }}
        </v-tab>
      </v-tabs>


      <v-row no-gutters class="table-filter-row justify-space-between">
        <v-col
          cols="12"
          sm="2"
        >
          <v-select
            :items="itemSort"
            outlined
            value="По рейтингу"
          ></v-select>
        </v-col>
        <v-col
          cols="12"
          sm="4"
          class="d-flex justify-end"
        >
          <Search :searchText="searchText" @updateSearchText = "updateSearchText"/>

        </v-col>
      </v-row>

      <div class="table-list-style">
        <v-data-table
          v-model="selected"
          show-select
          :headers="headers"
          :items="contractors"
          class="elevation-0"
          item-key="id"
          :page.sync="page"
          :items-per-page="itemsPerPage"
          @page-count="pageCount = $event"
          hide-default-footer
          :search="searchText"
        >
          <template v-slot:item.name="{ item }"  >
            <a href="#" @click.prevent="handlers().openPerformer(item.uuid)">
              <UserAvatar :first_name="item.firstname" :last_name="item.lastname" :color="avatarColor" :radius="avatarBorderRadius" :date="temp_date"/>
            </a>
          </template>

          <template v-slot:item.rating="{ item }">
            <Rating :rating="item.rating"/>
          </template>

          <template v-slot:item.address="{ item }">
            <div class="performer-address">
              {{ item.address.city }}, {{ item.address.street  }}
            </div>
          </template>

          <template v-slot:item.salary="{ item }">
            500 р. смена
          </template>

          <template v-slot:item.reg="{ item }">
            25.01.2021
          </template>

          <template v-slot:item.actions="{ item }">
            <v-btn icon>
              <v-icon>mdi-dots-vertical</v-icon>
            </v-btn>
          </template>
        </v-data-table>
      </div>
      <v-row no-gutters>
        <v-col
          cols="12"
          sm="2"
        >
          <v-row class="align-center">
            <v-col cols="8" class="pa-0">
              <v-subheader>Строк на странице:</v-subheader>
            </v-col>
            <v-col cols="4" class="pa-0">
              <div class="pagination-page-num">
                <v-text-field
                  :value="itemsPerPage"
                  type="text"
                  @input="itemsPerPage = $event"
                  single-line
                  outlined
                  hide-details="true"
                ></v-text-field>
              </div>
            </v-col>
          </v-row>
        </v-col>
        <v-col
          cols="12"
          sm="10"
        >
          <v-pagination
            v-model="page"
            :length="pageCount"
          ></v-pagination>
        </v-col>
      </v-row>

    </div>
  </div>
</template>

<script>

  import { mapState, mapActions, mapGetters, mapMutations } from 'vuex';
  import UserAvatar                                         from "@/components/UserAvatar";
  import Search                                             from "@/components/Search";

  export default {
    components  : { Search, UserAvatar },

    computed : {
      ...mapGetters( 'contractors', [ 'contractors', ] ),
    },

    data ()
    {
      return {
        title: 'Исполнители',
        title_size: 'big',
        tabs_list: [
          'Активные', 'Архив',
        ],
        tab: null,
        itemSort: ['По рейтингу', 'По дате',],
        page: 1,
        pageCount: 0,
        itemsPerPage: 5,
        selected: [],
        avatarColor: '#36B368',
        headers: [
          {text: 'ФИО', align: 'start',  value: 'name',},
          {text: 'Рейтинг', value: 'rating'},
          {text: 'Адрес', value: 'address'},
          {text: 'Средняя ставка', value: 'salary'},
          {text: 'Зарегистрирован', value: 'reg'},
          {text: '', value: 'actions', sortable: false},
        ],
        rating: 4.5,
        temp_date: '26.06.1984',
        avatarBorderRadius: 'rounded',
        searchText: '',
      }
    },

    methods : {
      ...mapActions( 'contractors', [ 'getContractors', ] ),

      init ()
      {
        this.getContractors();

        console.debug( 'route' );
        console.debug( this.$route );
      },

      handlers ()
      {
        return {
          openPerformer : ( id ) => {
            this.$router.push('/performers/'+ id);
          },
        }
      },

      updateSearchText ( value )
      {
        this.searchText = value;
      }
    },

    mounted ()
    {
      this.init();
    },
  }

</script>

<style lang="scss">

@import '../../assets/scss/colors';

.ruqi{
  .v-rating .v-icon{
    padding: 2px;
  }
}

</style>
