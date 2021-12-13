<template>
  <div>
    <Header :content="title" :size="title_size" :isnew="true" :isback="false"/>

    <v-row no-gutters class="table-filter-row">
      <v-col
        cols="12"
        sm="2"
      >
        <v-select
          :items="itemSort"
          outlined
          value="Все"
        ></v-select>
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
      >
        <template v-slot:item.name="{ item }">
          <span class="request-i"></span>
          {{ item.name }}
        </template>

        <template v-slot:item.pay="{ item }">
          <span class="request-pay">{{ item.pay }}</span>
        </template>

        <template v-slot:item.manager="{ item }">
          <UserAvatar :first_name="item.manager_name" :last_name="item.manager_lastname" :color="avatarColor"/>
        </template>

        <template v-slot:item.term="{ item }">
          <div class="request-time">
            <img src="/img/ico_timer.svg" alt="timer">
            {{ item.term }}
          </div>
        </template>

        <template v-slot:item.occupation="{ item }">
          <Occupationbar v-bind:occupation="(item.occupation)"/>
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
      title: 'Заяки',
      title_size: 'big',
      title_create: true,
      title_page_create: 'create',
      itemSort: ['Все', 'Леруа Мерлен', 'SBS'],
      page: 1,
      pageCount: 0,
      itemsPerPage: 3,
      selected: [],
      avatarColor: '#EFCD4F',
      headers: [
        {text: 'Название', align: 'start', sortable: false, value: 'name',},
        {text: 'Оплата', value: 'pay'},
        {text: 'Объект', value: 'object'},
        {text: 'Менеджер', value: 'manager'},
        {text: 'Срок', value: 'term'},
        {text: 'Заполнение', value: 'occupation'},
        {text: '', value: 'actions', sortable: false},
      ],
      desserts: [
        {
          name: 'Нужны кладовщики в Леруа',
          pay: '1000 р. / смена',
          object: 'Леруа Мерлен',
          manager_name: 'Алексей',
          manager_lastname: 'Петров',
          term: '12ч 0м',
          occupation: 20,
          id: 1
        },
        {
          name: 'Нужны кладовщики в Леруа',
          pay: '1000 р. / смена',
          object: 'SBS',
          manager_name: 'Алексей',
          manager_lastname: 'Петров',
          term: '3ч 30м',
          occupation: 34,
          id: 2
        },
        {
          name: 'Нужны кладовщики в Леруа',
          pay: '1000 р. / смена',
          object: 'Леруа Мерлен',
          manager_name: 'Сергей',
          manager_lastname: 'Семенов',
          term: '12ч 0м',
          occupation: 70,
          id: 3
        },
        {
          name: 'Нужны кладовщики в Леруа',
          pay: '1000 р. / смена',
          object: 'Леруа Мерлен 2',
          manager_name: 'Олег',
          manager_lastname: 'Маршал',
          term: '8ч 0м',
          occupation: 20,
          id: 4
        },
        {
          name: 'Нужны кладовщики в Леруа',
          pay: '1000 р. / смена',
          object: 'Леруа Мерлен',
          manager_name: 'Алексей',
          manager_lastname: 'Петров',
          term: '12ч 0м',
          occupation: 20,
          id: 5
        },
      ],
    }
  },
  methods: {},
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
