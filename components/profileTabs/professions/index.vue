<template lang="pug">

.professions__tab
  .wrapper
    .header
      .haupt-titel {{ hauptTitel }}
      .description {{ description }}
    .body
      .wrapper__body
        selectList(
          :title="titles.select_list"
          :action_add_title="titles.action_add_title"
          :options="selectOptions"
          :items="items"
        )

</template>

<script>

  export default {

    components : {},

    data ()
    {
      return {
        hauptTitel : 'Виды работ',
        description : 'Краткое описание что сюда писать, например напишите в наименовании общедоступное название и примерное расположение.',

        titles : {
          select_list : 'Наименование работ',
          action_add_title : 'Добавить вид работ',
        },

        selectOptions : [
          'кладовщик',
          'комплектовщик',
          'стикеровщик',
          'грузчик',
        ],

        items : [
          { value : 'грузчик' },
          { value : 'комплектовщик' },
          { value : 'кладовщик' },
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
    }

  }

</script>

<style lang="scss">

.professions__tab
{
  /* OBJECTS STYLES START */
    .wrapper
    {
      padding : 32px;
      background: #F6FBFF;
      border: 1px solid #E2E4E5;
      box-sizing: border-box;
      border-radius: 30px;

      .header {
        margin-bottom: 32px;
      }

      .body
      {
        .wrapper__body
        {
          width: 533px;
        }
      }
    }

    .haupt-titel
    {
      font-style: normal;
      font-weight: 600;
      font-size: 20px;
      line-height: 28px;
      color: #263043;
      margin-bottom: 16px;
    }

    .description
    {
      font-style: normal;
      font-weight: normal;
      font-size: 14px;
      line-height: 16px;
      color: #7A91A9;
    }
  /* OBJECTS STYLES END */
}

</style>
