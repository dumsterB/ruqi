<template lang="pug">

.favorite-objects
  .wrapper
    .header
      h3.titel {{ titles.header }}

    .table-list-style
      v-data-table(
        :headers="headers"
        :items="user.favorite_objects"
        class="favorite-objects-table"
        item-key="uuid"
        :item-class="rowClass"
        show-select
        hide-default-footer
        hide-default-header
      )
        template( v-slot:item.name="{ item }" )
          div
            span( class="color-black" ) {{ item.name }}

        template( v-slot:item.rating="{ item }" )
          span( class="request-pay" ) {{ item.raiting }}

        template( v-slot:item.tasks="{ item }" ) {{ item.tasks }}

        template( v-slot:item.address="{ item }" ) {{ item.address }}

        template( v-slot:item.actions="{ item }" )
          div( class="d-flex justify-end" )
            v-menu( bottom rounded="10" offset-y nudge-bottom="10" )
              template( v-slot:activator="{ on }" )
                v-btn.icon( v-on="on" class="mix-edit-btn" )
                  v-icon mdi-dots-vertical

              v-card
                v-list-item-content( class="justify-start" )
                  div( class="mx-auto text-left" )
                    nuxt-link( :to="'/request/'+ item.uuid +'/edit/'" )
                      span Редактировать

</template>

<script>

  import { mapState, mapActions, mapGetters, mapMutations } from 'vuex';
  import { CONTRACTOR, EMPLOYEE }                           from '@/constants/'

  export default {
    components : {},

    props : {
      user_type : {
        type      : String,
        required  : true,
      },
    },

    computed : {
      user ()
      {
        switch ( this.user_type )
        {
          case CONTRACTOR :
          return this.$store.getters[ 'contractors/contractor' ];

          case EMPLOYEE :
          return this.$store.getters[ 'employee_id/employee_id' ];

          default :
          return {};
        }
      },
    },

    data ()
    {
      return {
        titles : {
          header  : 'Любимые объекты',
        },

        headers : [
          {text: 'Фио',       value: 'name', width: '16px'},
          {text: 'Телефон',   value: 'rating'},
          {text: 'Должность', value: 'tasks'},
          {text: '',          value: 'address', },
          {text: '',          value: 'actions', sortable: false},
        ],
      }
    },

    methods : {
      getters ()
      {
        return {}
      },

      setters ()
      {
        return {}
      },

      handlers ()
      {
        return {}
      },

      helpers ()
      {
        return {}
      },

      init (){},

      bindActions (){},

      rowClass( item )
      {
        const rowClass = 'favorite-row';

        return rowClass;;
      }

    }

  }

</script>

<style lang="scss">

/* OBJECTS STYLES START */
  .favorite-objects-table
  {
    background-color  : unset !important;

    .v-data-table__empty-wrapper
    {
      background-color  : #FFFFFF;
    }

    .favorite-row
    {
      background-color  : #FFFFFF !important;

      .color-black
      {
        position : relative;

        &::before
        {
          content           : "";
          position          : absolute;
          width             : 10px;
          height            : 10px;
          background-color  : #19A74A;
          border-radius     : 100%;
          left              : -35px;
          top               : 5px;
        }
      }
    }
  }
/* OBJECTS STYLES END */

/* MIXINS STYLES START */
  .mix-edit-btn
  {
    background: transparent !important;
    border: 0;
    box-shadow: none;
    border-radius: 100%;
    height: 36px;
    width: 30px;
    min-width: 36px !important;
    margin: 0;
    padding: 0;
  }
/* MIXINS STYLES END */

</style>
