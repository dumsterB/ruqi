<template lang="pug">

.operating-schedule-tab__container
  .operating-schedule-tab__wrapper
    .operating-schedule-tab__header
      .operating-schedule-tab__haupt-titel {{ hauptTitel }}
    .operating-schedule-tab__body
      .operating-schedule-tab__wrapper__body
        .operating-schedule-tab__description.desc1 {{ descriptions.desc1 }}

        v-checkbox.work-days(
          label="2 через 2"
          color="info"
          value="info"
          hide-details
        )

        v-checkbox.work-days(
          label="3 через 3"
          color="info"
          value="info"
          hide-details
        )

        v-checkbox.work-days(
          label="индивидуальный"
          color="info"
          value="info"
          hide-details
        )

        .individual-days
          .individual-day(
            v-for="( individualDay, index ) in individualDays" :key="index"
          )
            v-checkbox(
              :label="individualDay.day"
              color="info"
              value="info"
              hide-details
            )

        .dont-invite-weekends-holidays
          v-checkbox.dont-invite-weekends-holidays__item(
              :label="checkboxLabels.dontInviteWeekendsHolidays"
              color="info"
              value="info"
              hide-details
            )
          .operating-schedule-tab__description {{ descriptions.desc2 }}

        .operating-schedule-time
          .time-period
            .time-from.indent-left {{ timePeriod.from }}
            FTypeTime.time-punkt.indent-left

            .time-from.indent-left {{ timePeriod.to }}
            FTypeTime.time-punkt.indent-left

        .dont-invite-to-night-shifts
          v-checkbox.dont-invite-to-night-shifts__item(
              :label="checkboxLabels.dontInviteToNightShifts"
              color="info"
              value="info"
              hide-details
            )
          .operating-schedule-tab__description {{ descriptions.desc3 }}


</template>

<script>

  export default {

    components : {},

    data ()
    {
      return {
        hauptTitel : 'Желаемый график работ',

        checkboxLabels : {
          dontInviteWeekendsHolidays : 'не приглашать в выходные и праздничные дни',
          dontInviteToNightShifts : 'не приглашать в ночные смены',
        },

        descriptions : {
          desc1 : 'Укажите дни, в которые вы хотели бы получать приглашения в заявки',
          desc2 : 'Мы не будем приглашать вас на объекты во время официальных праздников и выходных',
          desc3 : 'Мы не будем приглашать в вас на заявки, время работы которых попадает в промежуток 22:00 – 06:00',
        },

        individualDays : [
          {
            day : 'пн',
          },

          {
            day : 'вт',
          },

          {
            day : 'ср',
          },

          {
            day : 'чт',
          },

          {
            day : 'пт',
          },

          {
            day : 'сб',
          },

          {
            day : 'вс',
          },
        ],

        timePeriod : {
          from : 'с',
          to : 'до',
        },
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

.operating-schedule-tab__container
{
  /* OBJECTS STYLES START */
    .operating-schedule-tab__wrapper
    {
      padding : 32px;
      background: #F6FBFF;
      border: 1px solid #E2E4E5;
      box-sizing: border-box;
      border-radius: 30px;

      .operating-schedule-tab__header {
        margin-bottom: 24px;
      }

      .operating-schedule-tab__body
      {
        .operating-schedule-tab__wrapper__body
        {
          width: 533px;
        }
      }
    }

    .operating-schedule-tab__haupt-titel
    {
      font-style: normal;
      font-weight: 600;
      font-size: 20px;
      line-height: 28px;
      color: #263043;
    }

    .operating-schedule-tab__description
    {
      font-style: normal;
      font-weight: normal;
      font-size: 14px;
      line-height: 16px;
      color: #7A91A9;
      margin-bottom: 24px;
    }
    .work-days
    {
      margin-bottom: 24px;
    }

    .individual-days
    {
      display: flex;
      flex-direction: row;
      flex-wrap: nowrap;
      align-content: center;
      justify-content: flex-start;
      align-items: center;
      margin-bottom: 32px;

      .individual-day
      {
        background: #FFFFFF;
        border: 1px solid #E2E4E5;
        box-sizing: border-box;
        border-radius: 4px;
        padding: 15px;
        margin-right: 16px;

        &:last-child
        {
          margin-right: 0;
        }
      }
    }

    .dont-invite-weekends-holidays
    {
      .dont-invite-weekends-holidays__item
      {
        margin-bottom: 10px;
      }
    }

    .operating-schedule-time
    {
      margin-bottom: 20px;
    }

    .dont-invite-to-night-shifts
    {
      .dont-invite-to-night-shifts__item
      {
        margin-bottom: 10px;
      }
    }
  /* OBJECTS STYLES END */

  /* MIXINS STYLES START */
    .desc1
    {
      margin-bottom: 32px;
    }

    .v-input--selection-controls
    {
      margin-top: 0 !important;
      padding-top: 0 !important;
    }

    .time-period
    {
      display: flex;
      flex-direction: row;
      flex-wrap: nowrap;
      align-content: center;
      justify-content: flex-start;
      align-items: center;

      .time-punkt
      {
        fieldset
        {
          background: #FFFFFF !important;
          border: 1px solid #E2E4E5 !important;
          box-sizing: border-box !important;
          border-radius: 4px !important;
        }
      }

      .indent-left
      {
        margin-left: 10px;

        &:first-child
        {
          margin-left: 0px;
        }
      }
    }
  /* MIXINS STYLES END */
}

</style>
