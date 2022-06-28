<template>
  <div class="map-container" :style="{ height: height + 'px' }">
    <yandex-map :coords="center_coords" :zoom="zoom">
      <template v-for="(item, index) in markers">
        <ymap-marker v-if="item" :key="item.uuid" :coords="item.geometry.coordinates" :marker-id="item.uuid"
          :hint-content="item.properties.hintContent" marker-type="placemark"
          :balloon-template="balloonTemplate(item)"  @balloonopen="requestTask"/>
      </template>
    </yandex-map>
  </div>

</template>

<script>
export default {
  props: [
    'center_coords',
    'markers',
    'zoom',
    'height',
    'entity',
  ],
  data() {
    return {}
  },
  methods: {
    balloonTemplate(info) {
      if (this.entity === 'contractor') {

        let task_date = this.parseDate({ date: info.start_date.substr(0, 10), type: 'date' }) + ' ' + info.start_date.substring(11, 16);
        let icon_object = '<i aria-hidden="true" class="v-icon notranslate mdi mdi-star-outline theme--light" style="color: rgb(244, 209, 80); caret-color: rgb(244, 209, 80);"></i>';

        if(info.subscribe){
          icon_object = '<i aria-hidden="true" class="v-icon notranslate mdi mdi-star theme--light" style="color: rgb(244, 209, 80); caret-color: rgb(244, 209, 80);"></i>';
        }

        return `
          <h2 class="balloon-header">${info.name}</h2>
          <div class="status">открыт набор</div>
          <div class="wrap-rate-date"><div class="rate">${info.rate} р./смена</div><div class="date">${task_date}</div></div>
          <div class="wrap-professions">${info.professions}</div>
          <div class="wrap-object">${icon_object} ${info.object.name}</div>
          <div @click="requestTask" id="request_task">Перейти</div>
        `;
      }
      else {
        return `
          <h2 class="balloon-header">${info.name}</h2>
          <p>Описание: ${info.description}</p>
          <a href="/objects/${info.uuid}">Перейти</a>
        `;
      }
    },

    parseDate: (payload = {}) => {
      let date = payload.date.split("-");

      if (payload.type === "date") {
        return `${date[2]}.${date[1]}.${date[0]}`;
      }
    },

    requestTask(){
      document.getElementById('request_task').addEventListener('click', this.handler);

    },

    handler() {
      console.log('requestTask');
    },
  }
}
</script>

<style lang="scss">
@import '/assets/scss/colors.scss';

.ruqi {
  .ymap-container {
    width: 100%;
    height: 100%;

    .ymaps-2-1-79-balloon{
      border: 1px solid #E0E0E0;
      border-radius: 14px;
      box-shadow: none;
      overflow: hidden;
      padding: 16px;
      width: 355px;
      background: #fff;
    }

    .ymaps-2-1-79-balloon__tail{
      display: none;
    }
  }

  .balloon-header {
    font-weight: 600;
    font-size: 16px;
  }

  .status{
    padding: 4px 8px;
    height: 24px;
    box-sizing: border-box;
    border-radius: 5px;
    display: inline-flex;
    flex-direction: row;
    flex-wrap: nowrap;
    align-content: center;
    justify-content: center;
    align-items: center;
    background: #E4F4FF;
    border: 1px solid #0082DE;
    font-weight: 700;
    font-size: 12px;
    color: #0082DE;
    text-transform: uppercase;
    margin: 16px 0
  }

  .wrap-rate-date{
    display: flex;
    align-items: center;
    line-height: 1;
    margin-bottom: 16px;

    .rate{
      font-weight: 700;
      font-size: 16px;
      margin-right: 16px;
    }

    .date{
      font-weight: 600;
      font-size: 16px;
    }

  }

  .wrap-professions{
    font-weight: 600;
    font-size: 14px;
    line-height: 2;
    color: #666;
    display: flex;
    flex-direction: column;
  }

  .wrap-object{
    font-weight: 600;
    font-size: 14px;
    margin: 24px 0;
    display: flex;
    align-items: center;

    .v-icon{
      margin-right: 6px;
    }
  }
}
</style>
