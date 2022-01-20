<template>
  <div>
    <Header :content="title" :size="title_size" :isnew="false" :isback="false"/>

    <v-row no-gutters class="table-filter-row">
      <v-col
        cols="2"
      >
        <v-select
          :items="itemSort"
          outlined
          hide-details="true"
          label="Расположение"
        ></v-select>
      </v-col>
      <v-col
        cols="2"
      >
        <v-select
          :items="itemSort"
          outlined
          hide-details="true"
          label="Категория"
        ></v-select>
      </v-col>
      <v-col
        cols="2"
      >
        <v-select
          :items="itemSort"
          outlined
          hide-details="true"
          label="Активность"
        ></v-select>
      </v-col>

      <v-col
        cols="6"
        class="d-flex justify-end"
      >

        <Search :searchText="searchText" @updateSearchText="updateSearchText"/>
        <v-tabs right class="icon-tabs"
                height="40">
          <v-tab>
            <img src="/img/ico_list.svg" alt="list">
          </v-tab>
          <v-tab>
            <v-icon
              size="24"
              color="gray"
            >
              mdi-map-outline
            </v-icon>
          </v-tab>
        </v-tabs>
      </v-col>
    </v-row>

    <v-divider></v-divider>

    <v-row>
      <v-col>
        <v-btn
          text
          height="48"
          outlined
          class="btn-blue"
          :href="$route.name + '/create'"
        >
          Создать новый объект
        </v-btn>
      </v-col>
    </v-row>

    <div class="table-list-style">
      <v-data-table
        v-model="selected"
        :headers="headers"
        :items="objects"
        class="elevation-0"
        item-key="uuid"
        :page.sync="page"
        :items-per-page="itemsPerPageTable"
        @page-count="pageCount = $event"
        hide-default-footer
      >
        <template v-slot:item.name="{ item }">
          <div class="color-black" @click="openRequest(item.uuid)">
            <span class="request-i"></span>
            {{ item.name }}
          </div>

        </template>

        <template v-slot:item.rating="{ item }">
          <Rating :rating="item.raiting"/>
        </template>

        <template v-slot:item.request="{ item }">
          <div class="color-black">
            {{item.count_tasks}}
          </div>
        </template>

        <template v-slot:item.dispatcher="{ item }">
          <UserAvatar :first_name="item.dispatchers.firstname" :last_name="item.dispatchers.lastname" :color="avatarColor" v-if="item.dispatchers.length > 0"/>
        </template>

        <template v-slot:item.address="{ item }">
          <div  v-if="item.address">
            {{ item.region }}, {{ item.city }}
          </div>
        </template>


        <template v-slot:item.actions="{ item }">
          <v-menu
            bottom
            rounded="10"
            offset-y
            nudge-bottom="10"
          >
            <template v-slot:activator="{ on }">
              <v-btn icon
                     v-on="on">
                <v-icon>mdi-dots-vertical</v-icon>
              </v-btn>
            </template>
            <v-card>
              <v-list-item-content class="justify-start">
                <div class="mx-auto text-left">
                  <nuxt-link :to="'/objects/'+ item.uuid +'/edit/'">
                    <span>Редактировать</span>
                  </nuxt-link>
                  <v-divider class="my-3"></v-divider>
                  <a href="#" @click.prevent="removeRequest(item.uuid)">Удалить</a>
                </div>
              </v-list-item-content>
            </v-card>
          </v-menu>
        </template>
      </v-data-table>
    </div>

    <v-row no-gutters v-if="pageCount > 1">
      <v-col
        cols="4"
      >
        <v-row class="align-center">
          <v-col cols="9" class="d-flex align-center pa-0">
            <v-subheader>Строк на странице:</v-subheader>
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
        cols="4"
      >
        <v-pagination
          v-model="page"
          :length="pageCount"
        ></v-pagination>
      </v-col>
    </v-row>
  </div>
</template>

<script>

import {mapState, mapActions, mapGetters, mapMutations} from 'vuex';

export default {
  data() {
    return {
      title: 'Объекты',
      title_size: 'big',
      title_create: false,
      title_page_create: 'create',
      itemSort: ['Все', 'Активные',],
      searchText: '',
      selectObject: null,
      page: 1,
      pageCount: 0,
      itemsPerPage: 5,
      selected: [],
      avatarColor: '#EFCD4F',
      headers: [
        {text: 'Название', align: 'start', value: 'name',},
        {text: 'Рейтинг', value: 'rating'},
        {text: 'Заявки', value: 'request'},
        {text: 'Диспетчер', value: 'dispatcher'},
        {text: 'Расположен', value: 'address'},
        {text: '', value: 'actions', sortable: false, align: 'right'},
      ],
    }
  },
  created() {

  },
  methods: {
    ...mapActions('objects', ['fetchObjects',]),
    ...mapActions('objects', ['removeRequest',]),

    openRequest(id) {
      this.$router.push('/objects/' + id);
    },
    updateSearchText(value) {
      this.searchText = value;
    }
  },
  computed: {
    objects() {
      return this.$store.getters['objects/objects']
    },
    requestSuccess() {

    },
    itemsPerPageTable() {
      if (this.itemsPerPage) {
        return parseInt(this.itemsPerPage, 10)
      } else {
        return 1;
      }
    }
  },
  async mounted() {
    this.fetchObjects();
  }
}
</script>

<style lang="scss" scoped>

@import '../../assets/scss/colors';


.v-divider {
  margin: 24px 0;
}


</style>
