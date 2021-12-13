<template>
  <div>
    <Header :content="title" :size="title_size" :isnew="false" :isback="false"/>

    <v-row no-gutters class="table-filter-row">
      <v-col
        cols="12"
        sm="2"
      >
        <v-select
          :items="itemSort"
          outlined
          value="Все"
          hide-details="true"
        ></v-select>
      </v-col>
      <v-col
        cols="12"
        sm="2"
      >
        <v-select
          :items="itemSort"
          outlined
          value="Все"
          hide-details="true"
        ></v-select>
      </v-col>

      <v-col
        cols="12"
        sm="7"
        class="d-flex justify-end"
      >
        <Search :searchText="searchText" @updateSearchText = "updateSearchText"/>
      </v-col>

      <v-col
        cols="12"
        sm="1"
      >
        <v-tabs right class="icon-tabs"
                height="40">
          <v-tab>
            <img src="img/ico_list.svg" alt="list">
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
    <v-row no-gutters class="table-filter-row">
      <v-col
        cols="12"
        sm="6"
        class="d-flex"
      >
        <v-checkbox
          v-model="property1"
          label="Свойство 1"
        ></v-checkbox>
        <v-checkbox
          v-model="property2"
          label="Свойство 2"
        ></v-checkbox>
      </v-col>
    </v-row>
    <v-divider></v-divider>

    <div class="table-list-style">
      <v-data-table
        v-model="selected"
        show-select
        :headers="headers"
        :items="desserts"
        class="elevation-0"
        item-key="id"
        :page.sync="page"
        :items-per-page="itemsPerPageTable"
        @page-count="pageCount = $event"
        hide-default-footer
        :search="searchText"
      >
        <template v-slot:item.name="{ item }">
          <span class="request-i"></span>
          {{ item.name }}
        </template>

        <template v-slot:item.pay="{ item }">
          <span class="request-pay">{{ item.pay }}</span>
        </template>

        <template v-slot:item.rating="{ item }">
          <v-rating
            color="#FFCB45"
            empty-icon="mdi-star"
            full-icon="mdi-star"
            half-icon="mdi-star-half-full"
            hover
            half-increments
            length="5"
            size="14"
            v-model="item.rating"
          ></v-rating>
          <span class="grey--text text--lighten-2 text-caption mr-2">
              {{ item.rating }}
            </span>
        </template>

        <template v-slot:item.manager="{ item }">
          <UserAvatar :first_name="item.manager_name" :last_name="item.manager_lastname" :color="avatarColor"/>
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
</template>

<script>
import UserAvatar from "@/components/UserAvatar";

export default {
  components: {UserAvatar},
  data() {
    return {
      title: 'Объекты',
      title_size: 'big',
      title_create: false,
      title_page_create: 'create',
      itemSort: ['Все', 'Леруа Мерлен', 'SBS'],
      page: 1,
      pageCount: 0,
      itemsPerPage: 3,
      selected: [],
      avatarColor: '#EFCD4F',
      property1: true,
      property2: true,
      searchText: '',
      headers: [
        {text: 'Название', align: 'start', value: 'name',},
        {text: 'Рейтинг', value: 'rating'},
        {text: 'Заявки', value: 'request'},
        {text: 'Менеджер', value: 'manager'},
        {text: 'Расположен', value: 'address'},
        {text: '', value: 'actions', sortable: false},
      ],
      desserts: [
        {
          name: 'Леруа мерлен',
          rating: 4.5,
          request: 999,
          manager_name: 'Алексей',
          manager_lastname: 'Петров',
          address: 'Промышленный проезд, 9, село Беседы, Ленинский городской округ',
          id: 1
        },
        {
          name: 'Леруа мерлен',
          rating: 4.5,
          request: 25,
          manager_name: 'Алексей',
          manager_lastname: 'Петров',
          address: 'Промышленный проезд, 9, село Беседы, Ленинский городской округ',
          id: 2
        },
        {
          name: 'Леруа мерлен',
          rating: 4.5,
          request: 105,
          manager_name: 'Алексей',
          manager_lastname: 'Петров',
          address: 'Промышленный проезд, 9, село Беседы, Ленинский городской округ',
          id: 3
        },
        {
          name: 'Леруа мерлен',
          rating: 4.5,
          request: 999,
          manager_name: 'Алексей',
          manager_lastname: 'Петров',
          address: 'Промышленный проезд, 9, село Беседы, Ленинский городской округ',
          id: 4
        },
        {
          name: 'Леруа мерлен',
          rating: 4.5,
          request: 999,
          manager_name: 'Алексей',
          manager_lastname: 'Петров',
          address: 'Промышленный проезд, 9, село Беседы, Ленинский городской округ',
          id: 5
        },
      ],
    }
  },
  methods: {
    updateSearchText(value){
      this.searchText = value;
    }
  },
  computed: {
    itemsPerPageTable() {
      if (this.itemsPerPage) {
        return parseInt(this.itemsPerPage, 10)
      } else {
        return 1;
      }
    }
  },
}
</script>

<style lang="scss" scoped>

@import '../../assets/scss/colors';

.request-i {
  display: inline-block;
  width: 10px;
  height: 10px;
  background: $green;
  margin-right: 8px;
  border-radius: 10px;
}

.request-pay {
  background: $light_blue;
  color: $blue;
  padding: 7px 8px;
  border-radius: 6px;
  font-size: 14px;
  font-weight: 700;
}

.request-time {
  display: flex;
  align-items: center;
  line-height: 1;

  img {
    margin-right: 12px;
  }
}

</style>

