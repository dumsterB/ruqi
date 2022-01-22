<template>
  <div>
    <v-row>
      <v-col cols="9">
        <div class="wrap-composite-header">
          <Header :content="object_id.name" :size="title_size" :isnew="false" :isback="true"/>
        </div>
        <div class="wrap-composite-details">
          <Status title="Состояние" status="active" status_text="Работа"/>
          <div class="num">№ {{ object_id.number }}</div>
          <div class="date" v-if="object_id.created_at">{{ object_id.created_at.substr(0, 10) }}</div>
          <div class="views">
            <v-icon color="#7A91A9">mdi-eye-outline</v-icon>
            159 (+10)
          </div>
          <div class="star">
            <v-icon color="#7A91A9">mdi-star-outline</v-icon>
            159 (+10)
          </div>

        </div>

        <div class="wrap-composite-state">
          <v-container>
            <v-row>
              <v-col cols="10" class="d-flex">
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
                <UserAvatar v-if="" first_name="Василий" last_name="Петров" :color="avatarColorManager"
                            :radius="avatarRounded"/>
              </v-col>
              <v-col cols="2" class="d-flex justify-end">
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
                 :key="index">
            {{ item }}
          </v-tab>
        </v-tabs>

        <v-row v-show="tab == 0" no-gutters class="table-filter-row">
          <v-col
            cols="12"
            sm="3"
          >
            <v-col>
              <v-btn
                text
                height="48"
                outlined
                class="btn-blue"
                :to="{ name: 'request-create', params: { objectId: object_id.uuid }}"
                nuxt
              >
                Создать новую заявку
              </v-btn>
            </v-col>
          </v-col>

          <v-col
            cols="12"
            sm="9"
            class="d-flex justify-end"
          >
            <Search :searchText="searchText" @updateSearchText="updateSearchText"/>
          </v-col>
        </v-row>

        <v-row v-show="tab == 1" no-gutters class="table-filter-row">
          <v-col
            cols="12"
            sm=9
            class="d-flex"
          >
            <div class="bt-table-action">
              <v-btn
                height="40"
                fab
                @click="selectAll"
                color="#F6FBFF"
                active-class="active"
                class="check-btn"
              >
                <v-icon color="#0082DE">
                  {{ activeSelectBtnOption.icon }}
                </v-icon>
              </v-btn>
              <div class="text">
                {{ activeSelectBtnOption.text }}
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
                  mdi-table-large
                </v-icon>
              </v-btn>
              <div class="text">
                сохранить в xls
              </div>
            </div>
          </v-col>
          <v-col
            cols="12"
            sm="3"
            class="d-flex justify-end"
          >
            <Search :searchText="searchText" @updateSearchText="updateSearchText"/>
          </v-col>

        </v-row>

        <v-window v-model="tab">
          <v-tab-item>
            <div class="table-list-style">
              <v-data-table
                :headers="headers"
                :items="object_id_requests"
                class="elevation-0"
                item-key="table_1"
                :page.sync="page"
                :items-per-page="itemsPerPageTable"
                @page-count="pageCount = $event"
                hide-default-footer
                hide-default-header
                :search="searchText"
              >
                <template v-slot:item.name="{ item }">
                  <div @click="openRequest(item.uuid)">
                    <span class="request-i"></span>
                    <span class="color-black">{{ item.name }}</span>
                  </div>

                </template>

                <template v-slot:item.pay="{ item }">
                  <span class="request-pay">{{ item.payment.value }} {{ item.payment.current }} / {{
                      item.payment.period
                    }}</span>
                </template>

                <template v-slot:item.object="{ item }">
                  {{ item.object.name }}
                </template>

                <template v-slot:item.date="{ item }">
                  <div v-if="item.created_at">
                    {{ item.created_at.substr(0, 10) }}
                  </div>
                </template>

                <template v-slot:item.actions="{ item }">
                  <div class="d-flex justify-end">
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
                            <nuxt-link :to="'/request/'+ item.uuid +'/edit/'">
                              <span>Редактировать</span>
                            </nuxt-link>
                          </div>
                        </v-list-item-content>
                      </v-card>
                    </v-menu>
                  </div>
                </template>

              </v-data-table>
            </div>

            <FooterTable :itemsPerPage="itemsPerPage" :pageCount="pageCount" :page="page" @setItemsPerPage="setItemsPerPage" @setCurrentPage="setCurrentPage"/>
          </v-tab-item>
          <v-tab-item>
            <div class="table-list-style select">
              <v-data-table
                :headers="headers_contact"
                :items="object_id_contacts"
                class="elevation-0"
                item-key="table_1"
                :page.sync="page"
                :items-per-page="itemsPerPageTable"
                @page-count="pageCount = $event"
                hide-default-footer
                hide-default-header
                :search="searchText"
                v-model="selectedItems"
                show-select
                ref="dataTable"
              >
                <template v-slot:item.name="{ item }">
                  <div v-if="item.fullname">
                    <UserAvatar :first_name="item.fullname.split(' ')[0]" :last_name="item.fullname.split(' ')[1]"
                                :color="avatarColor"/>
                  </div>

                </template>

                <template v-slot:item.phone="{ item }">
                  {{ item.phone }}
                </template>

                <template v-slot:item.position="{ item }">
                  {{ item.position }}
                </template>

                <template v-slot:item.actions="{ item }">
                  <div class="d-flex justify-end">
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
                            <nuxt-link to="">
                              <span>Редактировать</span>
                            </nuxt-link>
                            <v-divider class="my-3"></v-divider>
                            <a href="#" @click.prevent="">Удалить</a>
                          </div>
                        </v-list-item-content>
                      </v-card>
                    </v-menu>
                  </div>
                </template>

              </v-data-table>
            </div>

            <FooterTable :itemsPerPage="itemsPerPage" :pageCount="pageCount" :page="page" @setItemsPerPage="setItemsPerPage" @setCurrentPage="setCurrentPage"/>
          </v-tab-item>


          <v-tab-item>
            <div>
              {{ object_id.description }}
            </div>
          </v-tab-item>
        </v-window>
      </v-col>
      <v-col cols="3">
        <div class="bar-element">
          <div class="inner-indent">
            <div class="d-flex bar-element-row">
              <div class="title-row">Рейтинг:</div>
              <Rating rating="4"/>
            </div>
            <div class="bar-element-row color-black" v-if="object_id.created_at">На сервисе с
              {{ object_id.created_at.substr(0, 10) }}
            </div>
            <div class="bar-element-row color-main">{{ object_id_requests.length }} заявки активно</div>
            <div class="bar-element-row bar-element-row-top-margin bar-element-title">Основные вакансии:</div>
            <div class="bar-element-row">
              <CloudTag :listTag="listTag"/>
            </div>
          </div>
        </div>

        <div class="bar-element">
          <div v-if="object_id.lat">
            <Map :center_coords="mapCenter" :markers="mapMarker" zoom="12" height="124"/>
          </div>
          <div class="inner-indent">
            <div class="bar-element-row">
              <div class="bar-element-title">Адрес</div>
              <div class="color-black">{{ object_id.region }}, {{ object_id.city }}</div>
            </div>
          </div>
        </div>
      </v-col>
    </v-row>
  </div>
</template>

<script>

import {mapState, mapActions, mapGetters, mapMutations} from 'vuex';

export default {
  props: [],
  data() {
    return {
      coords: [54, 39],
      listTag: ['ГРУЗЧИК', 'РАЗНОРАБОЧИЙ', 'РАЗНОРАБОЧИЙ', 'КЛАДОВЩИК', 'КЛАДОВЩИК'],
      title_size: 'large',
      title_create: false,
      title_page_create: '',
      tabs_list: [
        'Заявки',
        'Контакты',
        'Описание',
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
      page: 1,
      pageCount: 0,
      itemsPerPage: 5,
      selectedItems: [],
      activeSelectAll: 0,
      activeSelectBtn: 0,
      property1: true,
      property2: true,
      searchText: '',
      avatarBorderRadius: 'rounded',
      headers: [
        {text: 'Название', align: 'start', value: 'name',},
        {text: 'Оплата', value: 'pay'},
        {
          text: 'Объект', value: 'object',
          filter: item => {
            if (!this.selectObject) return true;
            return item.uuid == this.selectObject;
          },
        },
        {text: 'Дата', value: 'date'},
        {text: '', value: 'actions', sortable: false},
      ],
      headers_contact: [
        {text: 'Фио', value: 'name', width: '16px'},
        {text: 'Телефон', value: 'phone'},
        {text: 'Должность', value: 'position'},
        {text: '', value: 'actions', sortable: false},
      ],
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
    object_id() {
      return this.$store.getters['object_id/object_id']
    },
    object_id_requests() {
      return this.$store.getters['object_id/object_id_requests']
    },
    object_id_contacts() {
      return this.object_id.contacts;
    },
    activeSelectBtnOption() {
      switch (this.activeSelectBtn) {
        case 0 :
          return {text: 'выделить все', icon: 'mdi-checkbox-blank-circle-outline'}
        case 1:
          return {text: 'снять выделение', icon: 'mdi-check-circle-outline'}
        default:
          return {}
      }
    },
    mapCenter() {
      return [this.object_id.lat, this.object_id.lon];
    },
    mapMarker(){
      return [
        {
          "geometry": {
            "type": "Point",
            "coordinates": [this.object_id.lat, this.object_id.lon]
          },
          "properties": {
            "hintContent": this.object_id.name
          },
          "uuid": this.object_id.uuid
        }
      ]
    }
  },
  methods: {
    ...mapActions('object_id', ['fetchObjectId',]),
    ...mapActions('object_id', ['fetchObjectIdRequest',]),

    openRequest(id) {
      this.$router.push('/request/' + id);
    },
    updateSearchText(value) {
      this.searchText = value;
    },
    openTimesheet() {
      this.$router.push('/objects/' + this.$route.params.id + '/timesheet/');
    },
    selectAll(val) {
      this.activeSelectBtn = +!this.activeSelectBtn;
      if (this.activeSelectAll == 0) {
        this.$refs.dataTable.toggleSelectAll(val);
        this.activeSelectAll += 1;
      } else {
        this.$refs.dataTable.toggleSelectAll();
        this.activeSelectAll = 0;
      }
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
      if (val == '0001') {
        this.$router.push('/objects/' + this.$route.params.id + '/edit/');
      }
    },
  },
  async created() {
    await this.fetchObjectId(this.$route.params.id);
    await this.fetchObjectIdRequest(this.$route.params.id);

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


</style>

