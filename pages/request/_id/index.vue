<template>
  <div>

    <div class="wrap-composite-header">
      <Header :content="request_id.name" :size="title_size" :isnew="false" :isback="true"/>
      <div class="composite-header-progress" v-if="request_id.completion">
        {{ request_id.completion.completed }} / {{ request_id.completion.total }}
      </div>
      <v-btn icon>
        <v-icon>mdi-dots-horizontal</v-icon>
      </v-btn>
    </div>

    <div class="wrap-composite-details">
      <div class="num">№ 23536223</div>
      <div class="date" v-if="request_id.start_date">{{ request_id.start_date.substring(0, 10) }}</div>
      <div class="views">
        <v-icon color="#7A91A9">mdi-eye-outline</v-icon>
        159 (+10)
      </div>
      <div>Объект:
        <span class="object" v-if="request_id.object">{{request_id.object.name}}</span>
      </div>
    </div>

    <div class="wrap-composite-state">
      <v-container>
        <v-row>
          <v-col cols="7" class="d-flex">
            <v-subheader>Статус:</v-subheader>
            <v-select
              v-model="selectStatus"
              :items="selectStatusOptions"
              item-text="title"
              item-value="uuid"
              solo
              hide-details="true"
              return-object
              color="E5F3FC"
            ></v-select>
            <v-subheader>Ответственный:</v-subheader>
            <UserAvatar v-if="request_id.manager" :first_name="request_id.manager.firstname" :last_name="request_id.manager.lastname" :color="avatarColorManager"
                        :radius="avatarRounded"/>
          </v-col>
          <v-col cols="5" class="d-flex justify-end ">
            <v-btn
              text
              height="48"
              outlined
              class="bt-time-sheet"
              @click="openTimesheet"
            >
              <v-icon
                left
                dark
              >
                mdi-clipboard-text-outline
              </v-icon>
              табель рабочего времени
            </v-btn>
            <v-select
              v-model="activeAction"
              label="Действия"
              :items="selectAction"
              item-text="title"
              item-value="uuid"
              hide-details="true"
              single-line
              outlined
              filled
              max-width="200px"
            ></v-select>
          </v-col>
        </v-row>
      </v-container>
    </div>

    <v-tabs
      v-model="tab"
      class="form-tabs"
    >
      <v-tab v-for="(item, index) in tabs_list"
             :key="index"
             @click="selectData(index)">
        {{ item }}
      </v-tab>
    </v-tabs>
    <v-window v-model="tabContent">
      <v-tab-item>
        <v-row v-show="tab == 0" no-gutters class="table-filter-row">
          <v-col
            cols="12"
            sm="2"
          >
            <v-select
              :items="itemSortStatus"
              label="Статус"
              outlined
              value="Все"
              hide-details="true"
            ></v-select>
          </v-col>
          <v-col
            cols="12"
            sm="3"
            class="d-flex"
          >
            <v-checkbox
              v-model="property1"
              label="Работал на этом объекте"
              hide-details="true"
            ></v-checkbox>
          </v-col>

          <v-col
            cols="12"
            sm="7"
            class="d-flex justify-end"
          >
            <Search :searchText="searchText" @updateSearchText="updateSearchText"/>
          </v-col>
        </v-row>

        <v-row v-show="tab == 1" no-gutters class="table-filter-row">
          <v-col
            cols="12"
            sm="10"
            class="d-flex"
          >
            <div class="bt-table-action">
              <v-btn
                height="40"
                fab
                @click=""
                color="#F6FBFF"
              >
                <v-icon color="#0082DE">
                  mdi-check-circle-outline
                </v-icon>
              </v-btn>
              <div class="text">
                выбрать все
              </div>
            </div>

            <div class="bt-table-action">
              <v-btn
                height="40"
                fab
                @click=""
                color="#F6FBFF"
              >
                <v-icon color="#0082DE">
                  mdi-content-save-outline
                </v-icon>
              </v-btn>
              <div class="text">
                сохранить список
              </div>
            </div>
          </v-col>

          <v-col
            cols="12"
            sm="2"
            class="d-flex justify-end"
          >
            <v-select
              :items="itemSort"
              label="Сортировка"
              outlined
              value="Все"
              hide-details="true"
            ></v-select>
          </v-col>
        </v-row>

        <AddFormPart v-show="tab == 1" text="Добавить исполнителей" @addFormPart="addArtist"/>

        <v-row no-gutters class="dispatchers-header">
          <v-col
            cols="12"
            sm="10"
          >
            <div class="header">
              {{ request_id_dispatchers.length }} {{ request_id_dispatchers_header }}
            </div>
          </v-col>

          <v-col
            cols="12"
            sm="2"
            class="d-flex justify-end"

          >
            <div v-show="tab == 2 || tab == 3">
              <v-select
                :items="itemSort"
                label="Сортировка"
                outlined
                value="Все"
                hide-details="true"
              ></v-select>
            </div>
          </v-col>
        </v-row>

        <div class="table-list-style">
          <v-data-table
            v-model="selected"
            show-select
            :headers="headers"
            :items="request_id_dispatchers"
            class="elevation-0"
            item-key="table_1"
            :page.sync="page"
            :items-per-page="itemsPerPageTable"
            @page-count="pageCount = $event"
            hide-default-footer
          >
            <template v-slot:item.name="{ item }">
              <UserAvatar :first_name="item.firstname" :last_name="item.lastname" :color="avatarColor"
                          :radius="avatarBorderRadius" :date="item.birthday" response="true"/>
            </template>

            <template v-slot:item.rating="{ item }">
              <Rating :rating="item.rating"/>
            </template>

            <template v-slot:item.address="{ item }">
              <div class="performer-address">
                Москва, район длинное название
              </div>
            </template>

            <template v-slot:item.onobject="{ item }">
              <div class="d-flex table-on-object">
                <v-icon>mdi-home-variant-outline</v-icon>
                <span class="num">15</span>
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
                <v-card class="table-action-menu">
                  <v-list-item-content class="justify-start">
                    <div class="mx-auto text-left">
                      <a v-if="tab==0" href="#" @click.prevent="acceptRequest({task_uuid:request_id.uuid, user_uuid: item.uuid})">Принять</a>
                      <v-divider class="my-3" v-if="tab==0"></v-divider>
                      <a href="#" @click.prevent="rejectRequest({task_uuid:request_id.uuid, user_uuid: item.uuid, dispatchMetod: dispatchMetod})">Отклонить</a>
                    </div>
                  </v-list-item-content>
                </v-card>
              </v-menu>
            </template>
          </v-data-table>
        </div>

        <FooterTable :itemsPerPage="itemsPerPage" :pageCount="pageCount" :page="page" @setItemsPerPage="setItemsPerPage" @setCurrentPage="setCurrentPage"/>
      </v-tab-item>

      <v-tab-item>
        <div>
          {{ request_id.description }}
        </div>
      </v-tab-item>
      <v-tab-item>
        <div>
          <div class="table-list-style">
            <v-data-table
              :headers="headers_history"
              :items="request_id_history"
              class="elevation-0 table-history"
              item-key="table_2"
              :page.sync="page"
              :items-per-page="itemsPerPageTable"
              @page-count="pageCount = $event"
              hide-default-footer
            >
              <template v-slot:item.date="{ item }">
                <div class="table-history-date">
                  <div>{{ item.created_at.substring(0, 10) }}</div>
                  <div>{{ item.created_at.substring(11, 19) }}</div>
                </div>
              </template>

              <template v-slot:item.author="{ item }">
                <div class="table-history-author">
                  {{ item.author.name }}
                </div>
              </template>

              <template v-slot:item.element="{ item }">
                <div class="table-history-element">
                  {{ item.status }}
                </div>
              </template>

              <template v-slot:item.change="{ item }">
                <div class="table-history-change">
                  {{ item.description }}
                </div>
              </template>

            </v-data-table>
          </div>
        </div>
      </v-tab-item>
    </v-window>
  </div>
</template>

<script>

import {mapState, mapActions, mapGetters, mapMutations} from 'vuex';
import Rating from "~/components/Rating";

export default {
  components: {Rating},
  props: [],
  data() {
    return {
      title: 'Нужны кладовщики в Леруа',
      title_size: 'large',
      title_create: false,
      title_page_create: '',
      tabs_list: [
        'Отклики',
        'Подбор',
        'Приглашения',
        'Назначенные',
        'Описание',
        'История изменений'
      ],
      tab: null,
      selectStatus: "0001",
      selectStatusOptions: [
        {
          "uuid": "0001",
          "title": 'Активна'
        },
        {
          "uuid": "0002",
          "title": 'Не активна'
        }
      ],
      mfirstname: 'Андрей',
      mlastname: 'Петров',
      avatarColor: '#36B368',
      avatarColorManager: '#D6D0FE',
      avatarRounded: 'rounded',
      selectAction: [
        {
          "uuid": "0001",
          "title": 'Редактировать',
        },
        {
          "uuid": "0002",
          "title": 'Удалить'
        }
      ],
      activeAction: null,
      itemSortStatus: ['Все', 'Работает', 'Готов к работе', 'Неактивен'],
      itemSort: ['По рейтингу', 'По дате'],
      page: 1,
      pageCount: 0,
      itemsPerPage: 5,
      selected: [],
      property1: true,
      property2: true,
      searchText: '',
      avatarBorderRadius: 'rounded',
      headers: [
        {text: 'фио', align: 'start', value: 'name',},
        {text: 'Рейтинг', value: 'rating'},
        {text: 'Адрес', value: 'address'},
        {text: 'На объекте', value: 'onobject'},
        {text: 'Приглашен', value: 'invited'},
        {text: '', value: 'actions', sortable: false, align: 'right'},
      ],
      headers_history: [
        {text: 'Дата', value: 'date',},
        {text: 'Автор', value: 'author'},
        {text: 'Элемент', value: 'element'},
        {text: 'Изменение', value: 'change'},
      ],
      dispatchMetod: 'fetchRequestIdDispatchers',
    }
  },
  computed: {
    itemsPerPageTable() {
      if (this.itemsPerPage) {
        return parseInt(this.itemsPerPage, 10)
      } else {
        return 1;
      }
    },
    request_id() {
      return this.$store.getters['request_id/request_id']
    },
    request_id_dispatchers() {
      return this.$store.getters['request_id_dispatchers/request_id_dispatchers'];
    },
    request_id_history() {
      return this.$store.getters['request_id_dispatchers/request_id_history']
    },
    tabContent() {
      if (this.tab < 4) {
        return 0;
      } else if (this.tab == 4) {
        return 1;
      } else if (this.tab == 5) {
        return 2;
      }
    },
    request_id_dispatchers_header() {
      let length = this.request_id_dispatchers.length,
        last_simbol = length.toString().slice(-1),
        text = '';
      if (this.tab == 0) {
        if (length == 1 || last_simbol == 1) {
          text = 'кандидат';
        } else if (length == 2 || length == 4 || last_simbol == 2 || last_simbol == 4) {
          text = 'кандидата';
        } else {
          text = 'кандидатов';
        }
      } else if (this.tab == 1) {
        if (length == 1 || last_simbol == 1) {
          text = 'исполнитель';
        } else if (length == 2 || length == 4 || last_simbol == 2 || last_simbol == 4) {
          text = 'исполнителя';
        } else {
          text = 'исполнителей';
        }
      } else if (this.tab == 2) {
        if (length == 1 || last_simbol == 1) {
          text = 'приглашен';
        } else {
          text = 'приглашено';
        }
      } else if (this.tab == 3) {
        if (length == 1 || last_simbol == 1) {
          text = 'назначен';
        } else {
          text = 'назначен';
        }
      }
      return text;
    },
  },
  methods: {
    ...mapActions('request_id', ['fetchRequestId',]),
    ...mapActions('request_id_dispatchers', ['fetchRequestIdDispatchers',]),
    ...mapActions('request_id_dispatchers', ['fetchRequestIdDispatchersSelection',]),
    ...mapActions('request_id_dispatchers', ['fetchRequestIdDispatchersInvitations',]),
    ...mapActions('request_id_dispatchers', ['fetchRequestIdDispatchersaAssigned',]),
    ...mapActions('request_id_dispatchers', ['fetchRequestIdHistory',]),
    ...mapActions('request_id_dispatchers', ['acceptRequest',]),
    ...mapActions('request_id_dispatchers', ['rejectRequest',]),

    updateSearchText(value) {
      this.searchText = value;
      this.fetchRequestIdDispatchers({requestId: this.$route.params.id, params: {"name": value}});
    },
    async selectData(index) {
      if (index == 0) {
        await this.fetchRequestIdDispatchers({requestId: this.$route.params.id});
        this.dispatchMetod = 'fetchRequestIdDispatchers';
      } else if (index == 1) {
        await this.fetchRequestIdDispatchersSelection({requestId: this.$route.params.id});
        this.dispatchMetod = 'fetchRequestIdDispatchersSelection';
      } else if (index == 2) {
        await this.fetchRequestIdDispatchersInvitations({requestId: this.$route.params.id});
        this.dispatchMetod = 'fetchRequestIdDispatchersInvitations';
      } else if (index == 3) {
        await this.fetchRequestIdDispatchersaAssigned({requestId: this.$route.params.id});
        this.dispatchMetod = 'fetchRequestIdDispatchersaAssigned';
      }
    },
    openTimesheet(){
      this.$router.push('/request/'+ this.$route.params.id+'/timesheet/');
    },
    addArtist(){

    },
    setItemsPerPage(value){
      this.itemsPerPage = value;
    },
    setCurrentPage(value){
      this.page = value;
    }
  },
  watch: {
    activeAction: function (val) {
      if (val == '0001'){
        this.$router.push('/request/'+ this.$route.params.id+'/edit/');
      }
    },
  },
  async created() {
    await this.fetchRequestId(this.$route.params.id);
    await this.fetchRequestIdDispatchers({requestId: this.$route.params.id});
    await this.fetchRequestIdHistory({requestId: this.$route.params.id});


  },
  async mounted() {
  }
}
</script>

<style lang="scss">

@import '../../../assets/scss/colors';

.wrap-composite-header {
  display: flex;
  align-items: center;
  margin-bottom: 28px;

  .composite-header-progress {
    font-size: 24px;
    font-weight: 900;
    color: $blue;
    background: #E9F6FF;
    padding: 10px 9px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 15px;
    margin: 0 20px 0 20px;
    line-height: 1;
    height: 51px;
  }
}

.wrap-composite-details {
  display: flex;
  align-items: center;
  font-size: 16px;
  font-weight: 600;
  color: $grey;
  padding-left: 66px;
  margin-bottom: 32px;

  > div {
    margin-right: 24px;
  }

  .object {
    color: $black;
    font-weight: 700;
  }
}

.wrap-composite-state {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 11px 24px 11px 0;
  background: white;
  border-radius: 14px;
  box-shadow: 0px 6px 73px rgba(0, 0, 0, 0.07);
  border: 1px solid #e0e0e0;
  margin-bottom: 32px;
  font-weight: 600;

  .v-text-field.v-text-field--solo:not(.v-text-field--solo-flat) > .v-input__control > .v-input__slot {
    box-shadow: none;
    background: $light_blue;
  }

  .theme--light.v-icon {
    color: $blue;
  }

  .bt-time-sheet {
    background: $blue;
    color: white;
    margin-right: 10px;
    border: none;
  }

  .v-select {
    max-width: 200px;
  }

  .v-select__slot {
    height: 48px;
  }

  .v-text-field--filled > .v-input__control > .v-input__slot {
    background: #fff;
  }
}

.table-on-object {
  align-items: center;

  .v-icon {
    margin-right: 5px;
  }
}

.row.dispatchers-header {
  margin: 20px 0 32px 0;
  padding: 4px 0;

  .header {
    font-size: 20px;
    color: $black;
    font-weight: 700;
  }
}

.table-history {

  .table-history-author {
    color: $blue;
  }

  .table-history-element {
    color: $black;
  }

  .table-history-change,
  .table-history-date {
    font-weight: 400;
  }
}

.bt-table-action {
  display: flex;
  align-items: center;
  margin-right: 24px;

  .v-btn {
    box-shadow: none;
    width: 40px;
    height: 40px;
    margin-right: 6px;
  }

  .text {
    font-weight: 700;
    font-size: 14px;
    text-transform: uppercase;
    color: $grey;
  }
}

</style>

