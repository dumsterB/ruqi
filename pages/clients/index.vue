<template>
  <div>
    <Header :content="title" :size="title_size" :isnew="false" :isback="false"/>
    <v-tabs
      v-model="tab"
      class="form-tabs"
    >
      <v-tab v-for="(item, index) in tabs_list"
             :key="index"
             @click="selectData(item.id)">
        {{ item.title }}
      </v-tab>
    </v-tabs>

    <v-row no-gutters class="mt-8 row-auto table-filter-row">
      <v-col cols="6">
        <v-btn
          text
          height="48"
          outlined
          class="btn-blue"
          href="/clients/create"
        >
          СОЗДАТЬ НОВОГО КЛИЕНТА
        </v-btn>
      </v-col>
      <v-col cols="6" class="d-flex justify-end">
        <v-select
          :items="sortFiled"
          v-model="sortTypeValue"
          outlined
          label="Фильтр"
          item-text="name"
          item-value="type"
          @change="filter()"
        ></v-select>
        <!--<v-select
          :items="sortType"
          v-model="sortTypeValue"
          outlined
          label="Тип сортировки"
          item-text="name"
          item-value="uuid"
          @change="filter()"
        ></v-select>-->
      </v-col>
    </v-row>

    <v-row>
      <v-col cols="12">
        <div class="table-list-style">
          <v-data-table
            v-model="selected"
            :headers="headers"
            :items="clients"
            class="elevation-0"
            item-key="uuid"
            :page.sync="page"
            :items-per-page="itemsPerPageTable"
            @page-count="pageCount = $event"
            hide-default-footer
            show-select
          >
            <template v-slot:item.name="{ item }">
              <UserAvatar :first_name="item.name" last_name="" :color="avatarColor" :radius="avatarBorderRadius"/>
            </template>

            <template v-slot:item.inn="{ item }">
              <div class="color-black">
                {{ item.inn }}
              </div>
            </template>

            <template v-slot:item.created_at="{ item }">
              {{ item.created_at.substring(0, 10) }} <br>
              {{ item.created_at.substring(11, 16) }}
            </template>

            <template v-slot:item.actions="{ item }">
              <v-menu
                bottom
                rounded="10"
                offset-y
                nudge-bottom="10"
                left
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
                      <nuxt-link :to="'/clients/'+ item.uuid +'/edit/'">
                        <span>Редактировать</span>
                      </nuxt-link>
                      <v-divider class="my-3"></v-divider>
                      <a href="#" @click.prevent="removeRequest({requestId: item.uuid, status: tabs_list[tab].id})">Удалить</a>
                    </div>
                  </v-list-item-content>
                </v-card>
              </v-menu>
            </template>
          </v-data-table>
        </div>
        <FooterTable :itemsPerPage="itemsPerPage" :pageCount="pageCount" :page="page" @setItemsPerPage="setItemsPerPage"
                     @setCurrentPage="setCurrentPage"/>
      </v-col>
    </v-row>
  </div>
</template>

<script>

import {mapState, mapActions, mapGetters, mapMutations} from 'vuex';

export default {
  async fetch({store}) {
    if (store.getters['specializations/specializations'].length === 0) {
      await store.dispatch('specializations/fetch')
    }
    if (store.getters['dictionary/regions'].length === 0) {
      await store.dispatch('dictionary/fetchRegions')
    }
  },
  data() {
    return {
      title: 'Клиенты',
      title_size: 'big',
      title_create: false,
      title_page_create: 'create',
      sortType: [
        {name: 'По возрастанию', uuid: 'asc'},
        {name: 'По убыванию', uuid: 'desc'},
      ],
      sortFiled: [
        {name: 'Юр. лицо', type: 'entity'},
        {name: 'Физ. лицо', type: 'personal'},
      ],
      page: 1,
      pageCount: 0,
      itemsPerPage: 5,
      selected: [],
      avatarColor: '#36B368',
      headers: [
        {text: 'Наименование', align: 'start', value: 'name',},
        {text: 'вид', value: 'type'},
        {text: 'ИНН', value: 'inn'},
        {text: 'создан', value: 'created_at'},
        {text: '', value: 'actions', sortable: false, align: 'right'},
      ],
      tabs_list: [
        { title: 'Активные', id: 'active'},
        { title: 'Архив', id: 'archive'},
      ],
      tab: 0,
      sortTypeValue: 'entity',
      avatarBorderRadius: 'rounded',
    }
  },
  created() {

  },
  methods: {
    ...mapActions('clients', ['fetchClients',]),
    ...mapActions('clients', ['removeRequest',]),

    openRequest(id) {
      this.$router.push('/clients/' + id);
    },
    async selectData(status) {
      await this.fetchClients({"status": status});
    },
    filter() {
      const newRequet = this.postBody;
      this.fetchClients(newRequet);
    },
    setItemsPerPage(value) {
      this.itemsPerPage = value;
    },
    setCurrentPage(value) {
      this.page = value;
    }

  },
  computed: {
    clients() {
      return this.$store.getters['clients/clients'];
    },
    itemsPerPageTable() {
      if (this.itemsPerPage) {
        return parseInt(this.itemsPerPage, 10)
      } else {
        return 1;
      }
    },
    postBody() {
      let postBody = {
        "type": this.sortTypeValue,
        "status": this.tabs_list[this.tab].id,
      }
      console.log(postBody)
      return postBody;
    }
  },
  async mounted() {
    await this.fetchClients({"status": "active"});
  }
}
</script>

<style lang="scss" scoped>

@import '../../assets/scss/colors';


.v-divider {
  margin: 24px 0;
}

</style>